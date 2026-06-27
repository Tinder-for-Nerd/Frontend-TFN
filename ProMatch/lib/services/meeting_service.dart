import 'package:flutter/foundation.dart';
import 'package:flutter_webrtc/flutter_webrtc.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;

class MeetingService extends ChangeNotifier {
  MeetingService({
    required this.roomId,
    required this.peerId,
    required this.professionalId,
    this.socketUrl = const String.fromEnvironment(
      'SOCKET_URL',
      defaultValue: 'http://localhost:3000',
    ),
  });

  final String roomId;
  final String peerId;
  final String professionalId;
  final String socketUrl;

  final RTCVideoRenderer localRenderer = RTCVideoRenderer();
  final RTCVideoRenderer remoteRenderer = RTCVideoRenderer();

  io.Socket? _socket;
  RTCPeerConnection? _peer;
  MediaStream? _localStream;
  MediaStream? _remoteStream;

  bool micEnabled = true;
  bool cameraEnabled = true;
  bool connected = false;
  bool socketConnected = false;
  bool remoteVideoVisible = false;
  String status = 'Joining meeting...';

  Future<void> initialize() async {
    await localRenderer.initialize();
    await remoteRenderer.initialize();
    _connectSocket();
    await _openMedia();
    await _createPeer();
    _socket?.emit('call_join', {
      'roomId': roomId,
      'peerId': peerId,
      'professionalId': professionalId,
    });
  }

  void _connectSocket() {
    _socket = io.io(
      socketUrl,
      io.OptionBuilder()
          .setTransports(['websocket'])
          .disableAutoConnect()
          .build(),
    );

    _socket!
      ..onConnect((_) {
        socketConnected = true;
        status = 'Socket.io signaling connected';
        notifyListeners();
      })
      ..onDisconnect((_) {
        socketConnected = false;
        status = 'Socket disconnected';
        notifyListeners();
      })
      ..on('call_ready', (payload) => _handleReady(Map<String, dynamic>.from(payload as Map)))
      ..on('call_offer', (payload) => _handleOffer(Map<String, dynamic>.from(payload as Map)))
      ..on('call_answer', (payload) => _handleAnswer(Map<String, dynamic>.from(payload as Map)))
      ..on('call_ice_candidate', (payload) => _handleIce(Map<String, dynamic>.from(payload as Map)))
      ..on('call_ended', (_) {
        status = 'Call ended';
        connected = false;
        notifyListeners();
      })
      ..connect();
  }

  Future<void> _openMedia() async {
    try {
      _localStream = await navigator.mediaDevices.getUserMedia({
        'audio': true,
        'video': {
          'facingMode': 'user',
        },
      });
      localRenderer.srcObject = _localStream;
      status = 'Camera and microphone ready';
    } catch (_) {
      micEnabled = false;
      cameraEnabled = false;
      status = 'Camera/microphone unavailable. Signaling is still ready.';
    }
    notifyListeners();
  }

  Future<void> _createPeer() async {
    _peer = await createPeerConnection({
      'iceServers': [
        {'urls': 'stun:stun.l.google.com:19302'},
      ],
    });

    _remoteStream = await createLocalMediaStream('remote-$roomId');
    remoteRenderer.srcObject = _remoteStream;

    _localStream?.getTracks().forEach((track) {
      _peer?.addTrack(track, _localStream!);
    });

    _peer?.onIceCandidate = (candidate) {
      _socket?.emit('call_ice_candidate', {
        'roomId': roomId,
        'peerId': peerId,
        'candidate': candidate.toMap(),
      });
    };

    _peer?.onTrack = (event) {
      if (event.track.kind == 'video') {
        _remoteStream?.addTrack(event.track);
        remoteVideoVisible = true;
        connected = true;
        status = 'Connected';
        notifyListeners();
      }
    };
  }

  Future<void> _handleReady(Map<String, dynamic> payload) async {
    if (payload['roomId'] != roomId || payload['targetPeerId'] != peerId) return;
    final offer = await _peer?.createOffer();
    if (offer == null) return;
    await _peer?.setLocalDescription(offer);
    _socket?.emit('call_offer', {
      'roomId': roomId,
      'peerId': peerId,
      'targetPeerId': payload['peerId'],
      'offer': offer.toMap(),
    });
    status = 'Calling professional...';
    notifyListeners();
  }

  Future<void> _handleOffer(Map<String, dynamic> payload) async {
    if (payload['roomId'] != roomId || payload['targetPeerId'] != peerId) return;
    final offer = Map<String, dynamic>.from(payload['offer'] as Map);
    await _peer?.setRemoteDescription(RTCSessionDescription(offer['sdp'] as String?, offer['type'] as String?));
    final answer = await _peer?.createAnswer();
    if (answer == null) return;
    await _peer?.setLocalDescription(answer);
    _socket?.emit('call_answer', {
      'roomId': roomId,
      'peerId': peerId,
      'targetPeerId': payload['peerId'],
      'answer': answer.toMap(),
    });
  }

  Future<void> _handleAnswer(Map<String, dynamic> payload) async {
    if (payload['roomId'] != roomId || payload['targetPeerId'] != peerId) return;
    final answer = Map<String, dynamic>.from(payload['answer'] as Map);
    await _peer?.setRemoteDescription(RTCSessionDescription(answer['sdp'] as String?, answer['type'] as String?));
    connected = true;
    status = 'Connected';
    notifyListeners();
  }

  Future<void> _handleIce(Map<String, dynamic> payload) async {
    if (payload['roomId'] != roomId || payload['targetPeerId'] != peerId) return;
    final candidate = Map<String, dynamic>.from(payload['candidate'] as Map);
    await _peer?.addCandidate(RTCIceCandidate(
      candidate['candidate'] as String?,
      candidate['sdpMid'] as String?,
      candidate['sdpMLineIndex'] as int?,
    ));
  }

  void toggleMic() {
    micEnabled = !micEnabled;
    _localStream?.getAudioTracks().forEach((track) => track.enabled = micEnabled);
    notifyListeners();
  }

  void toggleCamera() {
    cameraEnabled = !cameraEnabled;
    _localStream?.getVideoTracks().forEach((track) => track.enabled = cameraEnabled);
    notifyListeners();
  }

  void endCall() {
    _socket?.emit('call_ended', {'roomId': roomId, 'peerId': peerId});
    status = 'Call ended';
    connected = false;
    notifyListeners();
  }

  Future<void> disposeService() async {
    _socket?.emit('call_leave', {'roomId': roomId, 'peerId': peerId});
    _socket?.dispose();
    await _peer?.close();
    _localStream?.getTracks().forEach((track) => track.stop());
    _remoteStream?.getTracks().forEach((track) => track.stop());
    await localRenderer.dispose();
    await remoteRenderer.dispose();
  }
}
