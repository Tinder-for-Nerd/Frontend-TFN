import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { Button, Avatar, Badge, Icon } from '../../../components/ui';
import { Brand, SectionHeader } from '../../../components/common';
import { profiles } from '../../../data/mockData';
import { getBookedSession } from '../../../data/bookedSessions';
import { useSocket } from '../../../hooks/useSocket';

const rtcConfig = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export function CallPage() {
  const { sessionId = 'sarah-chen' } = useParams();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookedSession = useMemo(() => getBookedSession(sessionId), [sessionId]);
  const sessionUser = bookedSession?.withUser || sessionId;
  const profile = useMemo(() => {
    const candidates = Object.values(profiles ?? {});
    return candidates.find((candidate) => candidate?.username === sessionUser || candidate?.id === sessionUser) || profiles.sarah;
  }, [sessionUser]);
  const { emit, on, isConnected, isMock } = useSocket();
  const peerId = useMemo(() => `web-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, []);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const screenStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const peerRef = useRef(null);
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);
  const [hasJoined, setHasJoined] = useState(searchParams.get('ready') !== '1');
  const [hasEnded, setHasEnded] = useState(location.pathname.endsWith('/ended'));
  const [status, setStatus] = useState(searchParams.get('ready') === '1' ? 'Ready to join' : 'Joining room...');
  const [hasRemoteVideo, setHasRemoteVideo] = useState(false);

  usePageMeta('Tinder for Nerds | Call room', 'Join a clean video call room with meeting controls and session context.');

  useEffect(() => {
    setHasEnded(location.pathname.endsWith('/ended'));
  }, [location.pathname]);

  useEffect(() => {
    if (!hasJoined || hasEnded) return undefined;

    let disposed = false;

    async function ensurePeer() {
      if (peerRef.current || typeof RTCPeerConnection === 'undefined') return peerRef.current;

      const peer = new RTCPeerConnection(rtcConfig);
      const remoteStream = new MediaStream();
      remoteStreamRef.current = remoteStream;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;

      peer.onicecandidate = (event) => {
        if (event.candidate) {
          emit('call_ice_candidate', { roomId: sessionId, peerId, candidate: event.candidate });
        }
      };

      peer.ontrack = (event) => {
        event.streams[0]?.getTracks().forEach((track) => remoteStream.addTrack(track));
        setHasRemoteVideo(true);
        setStatus('Connected');
      };

      peerRef.current = peer;
      return peer;
    }

    async function startMedia() {
      try {
        if (!cameraOn && !micOn) {
          setStatus(isMock ? 'Demo signaling connected' : 'Waiting for professional...');
          emit('call_join', { roomId: sessionId, peerId, professionalId: profile.username });
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ video: cameraOn, audio: micOn });
        if (disposed) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        localStreamRef.current = stream;
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        const peer = await ensurePeer();
        stream.getTracks().forEach((track) => peer?.addTrack(track, stream));
        setStatus(isMock ? 'Demo signaling connected' : 'Waiting for professional...');
        emit('call_join', { roomId: sessionId, peerId, professionalId: profile.username });
      } catch (error) {
        setCameraOn(false);
        setMicOn(false);
        setStatus('Camera/microphone unavailable. You can still join with signaling.');
        emit('call_join', { roomId: sessionId, peerId, professionalId: profile.username });
      }
    }

    startMedia();

    const offReady = on('call_ready', async (payload) => {
      if (payload?.roomId !== sessionId || payload?.targetPeerId !== peerId) return;
      const peer = await ensurePeer();
      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);
      emit('call_offer', { roomId: sessionId, peerId, targetPeerId: payload.peerId, offer });
      setStatus('Connecting WebRTC...');
    });

    const offOffer = on('call_offer', async (payload) => {
      if (payload?.roomId !== sessionId || payload?.targetPeerId !== peerId || !payload.offer) return;
      const peer = await ensurePeer();
      await peer.setRemoteDescription(new RTCSessionDescription(payload.offer));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);
      emit('call_answer', { roomId: sessionId, peerId, targetPeerId: payload.peerId, answer });
    });

    const offAnswer = on('call_answer', async (payload) => {
      if (payload?.roomId !== sessionId || payload?.targetPeerId !== peerId || !payload.answer) return;
      await peerRef.current?.setRemoteDescription(new RTCSessionDescription(payload.answer));
      setStatus('Connected');
    });

    const offIce = on('call_ice_candidate', async (payload) => {
      if (payload?.roomId !== sessionId || payload?.targetPeerId !== peerId || !payload.candidate) return;
      await peerRef.current?.addIceCandidate(new RTCIceCandidate(payload.candidate));
    });

    const offEnded = on('call_ended', (payload) => {
      if (payload?.roomId !== sessionId) return;
      finishCall({ notifyPeer: false });
    });

    return () => {
      disposed = true;
      offReady?.();
      offOffer?.();
      offAnswer?.();
      offIce?.();
      offEnded?.();
      emit('call_leave', { roomId: sessionId, peerId });
      screenStreamRef.current?.getTracks().forEach((track) => track.stop());
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      remoteStreamRef.current?.getTracks().forEach((track) => track.stop());
      peerRef.current?.close();
    };
  }, [emit, hasEnded, hasJoined, isMock, on, peerId, profile.username, sessionId]);

  const toggleTrack = (kind) => {
    const stream = localStreamRef.current;
    if (!stream) return;
    stream.getTracks().filter((track) => track.kind === kind).forEach((track) => {
      track.enabled = !track.enabled;
      if (kind === 'video') setCameraOn(track.enabled);
      if (kind === 'audio') setMicOn(track.enabled);
    });
  };

  const stopScreenShare = async ({ restoreStatus = true } = {}) => {
    const cameraTrack = localStreamRef.current?.getVideoTracks()[0];
    const sender = peerRef.current?.getSenders().find((item) => item.track?.kind === 'video');

    if (cameraTrack) {
      await sender?.replaceTrack(cameraTrack);
    }

    screenStreamRef.current?.getTracks().forEach((track) => track.stop());
    screenStreamRef.current = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = localStreamRef.current;
    setScreenSharing(false);
    if (restoreStatus) setStatus(isMock ? 'Demo signaling connected' : 'Waiting for professional...');
  };

  const stopAllMedia = () => {
    screenStreamRef.current?.getTracks().forEach((track) => track.stop());
    screenStreamRef.current = null;
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
    remoteStreamRef.current?.getTracks().forEach((track) => track.stop());
    remoteStreamRef.current = null;
    peerRef.current?.close();
    peerRef.current = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    setScreenSharing(false);
    setHasRemoteVideo(false);
  };

  const toggleScreenShare = async () => {
    if (!navigator.mediaDevices?.getDisplayMedia || !peerRef.current) return;

    if (screenSharing) {
      await stopScreenShare();
      return;
    }

    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      const screenTrack = displayStream.getVideoTracks()[0];
      const sender = peerRef.current.getSenders().find((item) => item.track?.kind === 'video');

      if (sender) {
        await sender.replaceTrack(screenTrack);
      } else {
        peerRef.current.addTrack(screenTrack, displayStream);
      }

      screenStreamRef.current = displayStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = displayStream;
      setScreenSharing(true);
      setStatus('You are presenting your screen');

      screenTrack.onended = () => {
        stopScreenShare();
      };
    } catch (error) {
      setStatus('Screen sharing was cancelled or is unavailable in this browser.');
    }
  };

  const finishCall = async ({ notifyPeer = true } = {}) => {
    if (notifyPeer) emit('call_ended', { roomId: sessionId, peerId });
    await stopScreenShare({ restoreStatus: false });
    stopAllMedia();
    setHasEnded(true);
    setHasJoined(false);
    setStatus('Meeting ended');
    navigate(`/call/${encodeURIComponent(sessionId)}/ended`, { replace: true });
  };

  const endCall = () => {
    finishCall();
  };

  const rejoinCall = () => {
    setHasEnded(false);
    setHasJoined(false);
    setStatus('Ready to join');
    navigate(`/call/${encodeURIComponent(sessionId)}?ready=1`);
  };

  if (hasEnded) {
    return (
      <div className="pm-call-page">
        <div className="pm-call-page__grain" />
        <a className="pm-skip-link" href="#main">
          Skip to content
        </a>
        <header className="pm-call-page__topbar">
          <Brand />
          <Button to="/student/connections" variant="secondary">
            Connections
          </Button>
        </header>

        <main id="main" className="pm-call-room pm-call-room--ready">
          <section className="pm-panel pm-meet-ready pm-meet-ready--ended">
            <div className="pm-meet-ready__preview">
              <div className="pm-meet-ready__camera">
                <Avatar name={profile.name} initials={profile.avatar} tone={profile.tone} size="xl" />
                <span>Meeting ended</span>
              </div>
            </div>

            <div className="pm-meet-ready__details">
              <Badge tone="teal" variant="soft">
                Session complete
              </Badge>
              <h1>Meeting ended</h1>
              <p>
                Your one-to-one session with {profile.name} has ended. You can rejoin the room or return to your connections.
              </p>
              <div className="pm-card-actions">
                <Button variant="primary" icon="video" onClick={rejoinCall}>
                  Rejoin
                </Button>
                <Button to="/student/connections" variant="secondary">
                  Go to connections
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  if (!hasJoined) {
    return (
      <div className="pm-call-page">
        <div className="pm-call-page__grain" />
        <a className="pm-skip-link" href="#main">
          Skip to content
        </a>
        <header className="pm-call-page__topbar">
          <Brand />
          <Button to="/student/connections" variant="secondary">
            Back to connections
          </Button>
        </header>

        <main id="main" className="pm-call-room pm-call-room--ready">
          <section className="pm-panel pm-meet-ready">
            <div className="pm-meet-ready__preview">
              <div className="pm-meet-ready__camera">
                <Avatar name={profiles.me.name} initials={profiles.me.avatar} tone={profiles.me.tone} size="xl" />
                <span>Camera preview</span>
              </div>
              <div className="pm-meet-ready__toggles">
                <button className="pm-control-button" type="button" onClick={() => setMicOn((value) => !value)}>
                  <Icon name="microphone" size={16} /> {micOn ? 'Mic on' : 'Mic off'}
                </button>
                <button className="pm-control-button" type="button" onClick={() => setCameraOn((value) => !value)}>
                  <Icon name="video" size={16} /> {cameraOn ? 'Camera on' : 'Camera off'}
                </button>
              </div>
            </div>

            <div className="pm-meet-ready__details">
              <Badge tone="teal" variant="soft">
                1:1 session confirmed
              </Badge>
              <h1>Ready to join?</h1>
              <p>
                Your one-to-one session with {profile.name} is ready. Join the room when you are set.
              </p>
              <div className="pm-meet-ready__meta">
                <span>{bookedSession?.day || 'Today'}</span>
                <span>{bookedSession?.slot || 'Now'}</span>
                <span>Room: {sessionId}</span>
              </div>
              <div className="pm-card-actions">
                <Button variant="primary" icon="video" onClick={() => setHasJoined(true)}>
                  Join now
                </Button>
                <Button variant="secondary" to={`/student/messages/${profile.username}`}>
                  Message first
                </Button>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="pm-call-page">
      <div className="pm-call-page__grain" />
      <a className="pm-skip-link" href="#main">
        Skip to content
      </a>
      <header className="pm-call-page__topbar">
        <Brand />
        <Button to={`/student/messages/${profile.username}`} variant="secondary">
          Back to chat
        </Button>
      </header>

      <main id="main" className="pm-call-room">
        <section className="pm-panel">
          <SectionHeader
            eyebrow={isConnected ? 'Socket.io signaling online' : 'Connecting signaling'}
            title={`Meeting with ${profile.name}`}
            description={`${status}. WebRTC uses STUN and Socket.io signaling events for offers, answers, and ICE candidates.`}
          />
          <div className="pm-call-toolbar">
            <span>{isMock ? 'Demo socket mode' : 'Live socket mode'}</span>
            <span>Room: {sessionId}</span>
          </div>
          <div className="pm-video-grid pm-video-grid--meet">
            <article className="pm-video-tile pm-video-tile--primary pm-video-tile--live">
              <video ref={localVideoRef} autoPlay playsInline muted />
              {!cameraOn && !screenSharing && <Avatar name={profiles.me.name} initials={profiles.me.avatar} tone={profiles.me.tone} size="xl" />}
              <span>{screenSharing ? 'You are presenting' : 'You'}</span>
            </article>
            <article className="pm-video-tile pm-video-tile--live">
              <video ref={remoteVideoRef} autoPlay playsInline />
              {!hasRemoteVideo && (
                <Avatar name={profile.name} initials={profile.avatar} tone={profile.tone} size="xl" />
              )}
              <span>{profile.name}</span>
            </article>
          </div>
          <div className="pm-call-controls">
            <button className="pm-control-button" type="button" onClick={() => toggleTrack('audio')}>
              <Icon name="messages" size={16} /> {micOn ? 'Mute' : 'Unmute'}
            </button>
            <button className="pm-control-button" type="button" onClick={() => toggleTrack('video')}>
              <Icon name="video" size={16} /> {cameraOn ? 'Camera off' : 'Camera on'}
            </button>
            <button className="pm-control-button" type="button" onClick={toggleScreenShare}>
              <Icon name="video" size={16} /> {screenSharing ? 'Stop sharing' : 'Share screen'}
            </button>
            <button className="pm-control-button pm-control-button--danger" type="button" onClick={endCall}>
              End
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
