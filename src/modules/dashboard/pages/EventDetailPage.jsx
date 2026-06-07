import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Icon } from '../../../components/ui';
import { EventCalendarMenu } from '../../../components/common';
import { events, profiles } from '../../../data/mockData';
import '../../../styles/event-detail.css';

function resolveHostUsername(hostName) {
  if (!hostName) return null;

  const match = Object.values(profiles ?? {}).find(
    (profile) => profile?.name?.toLowerCase() === hostName.toLowerCase()
  );

  if (match?.username) return match.username;

  return hostName.toLowerCase().replace(/\s+/g, '-');
}

export function EventDetailPage({ variant = 'student' }) {
  const { eventId } = useParams();
  const event = events.find((e) => e.id === eventId);
  const hostUsername = useMemo(
    () => resolveHostUsername(event?.host),
    [event?.host]
  );
  const hostProfile = useMemo(
    () => Object.values(profiles ?? {}).find((profile) => profile?.username === hostUsername),
    [hostUsername]
  );

  usePageMeta(
    event ? `${event.title} | Tinder for Nerds` : 'Event Detail | Tinder for Nerds',
    event ? event.summary : 'Event details and registration.'
  );

  if (!event) {
    return (
      <AppShell variant={variant} className="pm-event-detail-shell" hideTopbar>
        <div className="pm-panel" style={{ textAlign: 'center', padding: '80px 24px' }}>
          <Icon name="calendar" size={48} style={{ opacity: 0.2, marginBottom: '24px' }} />
          <h2>Event not found</h2>
          <p>The event you are looking for does not exist or has been moved.</p>
          <Button to={`/${variant}/events`} variant="primary" style={{ marginTop: '24px' }}>
            Back to events
          </Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell variant={variant} className="pm-event-detail-shell" hideTopbar>
      <div className="pm-event-detail">
        <div className="pm-event-detail__toolbar">
          <Button
            variant="secondary"
            size="sm"
            to={`/${variant}/events`}
          >
            ← Back to events
          </Button>
          <Badge tone={event.format === 'Virtual' ? 'teal' : 'violet'}>
            {event.format}
          </Badge>
        </div>

        <header className="pm-event-detail__header">
          <div className="pm-event-detail__hero pm-panel">
            <h1>{event.title}</h1>
            <p className="pm-lede">{event.summary}</p>

            <div className="pm-event-meta-grid">
              <div className="pm-meta-box">
                <Icon name="calendar" />
                <div>
                  <strong>Date & Time</strong>
                  <span>{event.date} at {event.time}</span>
                </div>
              </div>
              <div className="pm-meta-box">
                <Icon name="spark" />
                <div>
                  <strong>Domain</strong>
                  <span>{event.domain}</span>
                </div>
              </div>
              <div className="pm-meta-box">
                <Icon name="connections" />
                <div>
                  <strong>Host</strong>
                  <span>{event.host}</span>
                </div>
              </div>
            </div>

            <div className="pm-event-actions">
              <Button variant="primary" size="lg" icon="spark">RSVP for Event</Button>
              <EventCalendarMenu
                event={event}
                variant="secondary"
                size="lg"
                label="Add to Calendar"
              />
            </div>
          </div>
        </header>

        <section className="pm-event-detail__body pm-two-column">
          <div className="pm-event-main-content">
            <div className="pm-panel">
              <h2 className="pm-subheading">About this event</h2>
              <p>
                Join us for an immersive session focused on {event.domain.toLowerCase()}. This event is designed for builders, founders, and students who want to deepen their knowledge and expand their network.
              </p>

              {event.location ? (
                <p style={{ marginTop: '16px' }}>
                  <strong>Location:</strong> {event.location}
                </p>
              ) : null}

              <h3 className="pm-subheading" style={{ marginTop: '32px' }}>Agenda</h3>
              <ul className="pm-agenda-list">
                {(event.agenda ?? []).map((item) => (
                  <li key={item}>
                    <div className="pm-agenda-dot" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pm-event-sidebar">
            <div className="pm-panel">
              <h3 className="pm-subheading">Attendees</h3>
              <div className="pm-attendee-stat">
                <strong>{event.attendees}</strong>
                <span>people are going</span>
              </div>
              <div className="pm-avatar-stack pm-avatar-stack--lg" style={{ marginTop: '16px' }}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="pm-avatar-stack-item" style={{ width: '40px', height: '40px' }} />
                ))}
              </div>
              <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                Including Sarah Chen, Raj Patel, and others you may know.
              </p>
            </div>

            <div className="pm-panel pm-host-card">
              <h3 className="pm-subheading">Hosted by</h3>
              <div className="pm-host-info">
                <div
                  className="pm-host-avatar"
                  style={
                    hostProfile?.src
                      ? { backgroundImage: `url(${hostProfile.src})` }
                      : undefined
                  }
                  aria-hidden="true"
                />
                <div>
                  <strong>{event.host}</strong>
                  <span>Top Mentor in {event.domain}</span>
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                style={{ width: '100%', marginTop: '16px' }}
                to={hostUsername ? `/profile/${hostUsername}` : '/profile/me'}
              >
                View Host Profile
              </Button>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
