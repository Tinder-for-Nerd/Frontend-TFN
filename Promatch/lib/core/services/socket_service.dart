import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:socket_io_client/socket_io_client.dart';
import '../constants/socket_events.dart';

class SocketService {
  IO.Socket? _socket;
  bool _isConnected = false;

  bool get isConnected => _isConnected;

  Future<void> connect(String token) async {
    if (_isConnected) return;

    _socket = IO.io(
      'https://api.promatch.dev',
      OptionBuilder()
        .setTransports(['websocket'])
        .setExtraHeaders({'Authorization': 'Bearer $token'})
        .enableAutoConnect()
        .build(),
    );

    _socket!.onConnect((_) {
      _isConnected = true;
    });

    _socket!.onDisconnect((_) {
      _isConnected = false;
    });

    _socket!.onError((error) {
      _isConnected = false;
    });

    _socket!.connect();
  }

  void disconnect() {
    _socket?.disconnect();
    _socket?.dispose();
    _socket = null;
    _isConnected = false;
  }

  void emit(String event, [dynamic data]) {
    _socket?.emit(event, data);
  }

  void on(String event, dynamic Function(dynamic) handler) {
    _socket?.on(event, handler);
  }

  void off(String event) {
    _socket?.off(event);
  }

  // Typing indicators
  void emitTyping(String conversationId) {
    emit(SocketEvents.typing, {'conversationId': conversationId});
  }

  void emitTypingStopped(String conversationId) {
    emit(SocketEvents.typingStopped, {'conversationId': conversationId});
  }

  void emitMessageRead(String conversationId, String messageId) {
    emit(SocketEvents.messageRead, {
      'conversationId': conversationId,
      'messageId': messageId,
    });
  }

  void sendMessage(String conversationId, Map<String, dynamic> message) {
    emit(SocketEvents.messageSent, {
      'conversationId': conversationId,
      'message': message,
    });
  }
}
