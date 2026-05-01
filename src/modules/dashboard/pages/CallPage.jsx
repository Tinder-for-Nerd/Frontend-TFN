import { useParams } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { Button, Avatar } from '../../../components/ui';
import { Brand, SectionHeader } from '../../../components/common';
import { profiles } from '../../../data/mockData';

export function CallPage() {
  const { sessionId = 'sarah-chen' } = useParams();
  const profile = profiles[sessionId] || profiles.sarah;

  usePageMeta('ProMatch | Call room', 'Join a clean video call room with meeting controls and session context.');

  return (
    <div className="pm-call-page">
      <div className="pm-call-page__grain" />
      <a className="pm-skip-link" href="#main">
        Skip to content
      </a>
      <header className="pm-call-page__topbar">
        <Brand />
        <Button to={`/chat/${profile.username}`} variant="secondary">
          Back to chat
        </Button>
      </header>

      <main id="main" className="pm-call-room">
        <section className="pm-panel">
          <SectionHeader eyebrow="WebRTC room" title="Live call in progress" description="Mute, toggle camera, share screen, or end the session from one compact control bar." />
          <div className="pm-video-grid">
            <article className="pm-video-tile pm-video-tile--primary">
              <span>You</span>
              <Avatar name={profiles.me.name} initials={profiles.me.avatar} tone={profiles.me.tone} size="xl" />
            </article>
            <article className="pm-video-tile">
              <span>{profile.name}</span>
              <Avatar name={profile.name} initials={profile.avatar} tone={profile.tone} size="xl" />
            </article>
          </div>
          <div className="pm-call-controls">
            <button className="pm-control-button" type="button">Mute</button>
            <button className="pm-control-button" type="button">Camera</button>
            <button className="pm-control-button pm-control-button--danger" type="button">End</button>
            <button className="pm-control-button" type="button">Share</button>
          </div>
        </section>
      </main>
    </div>
  );
}
