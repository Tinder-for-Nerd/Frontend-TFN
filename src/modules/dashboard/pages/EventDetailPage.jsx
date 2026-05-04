import { useParams, useNavigate } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Icon } from '../../../components/ui';
import { events } from '../../../data/mockData';

export function EventDetailPage({ variant = 'student' }) {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = events.find((e) => e.id === eventId);

  usePageMeta(
    event ? `${event.title} | Tinder for Nerds` : 'Event Detail | Tinder for Nerds',
    event ? event.summary : 'Event details and registration.'
  );

  if (!event) {
    return (
      <AppShell variant={variant} title="Event Not Found">
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
    <AppShell 
      variant={variant} 
      title="Event Details"
      subtitle={event.title}
    >
      <div className="pm-event-detail">
        <header className="pm-event-detail__header">
          <Button 
            variant="secondary" 
            size="sm" 
            icon="chevron-left" 
            onClick={() => navigate(-1)}
            style={{ marginBottom: '24px' }}
          >
            Back to events
          </Button>

          <div className="pm-event-detail__hero pm-panel">
            <Badge tone={event.format === 'Virtual' ? 'teal' : 'violet'} variant="solid">
              {event.format}
            </Badge>
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
              <Button variant="secondary" size="lg" icon="calendar">Add to Calendar</Button>
            </div>
          </div>
        </header>

        <section className="pm-event-detail__body pm-two-column">
          <div className="pm-event-main-content">
            <div className="pm-panel">
              <h2 className="pm-subheading">About this event</h2>
              <p>Join us for an immersive session focused on {event.domain.toLowerCase()}. This event is designed for builders, founders, and students who want to deepen their knowledge and expand their network.</p>
              
              <h3 className="pm-subheading" style={{ marginTop: '32px' }}>Agenda</h3>
              <ul className="pm-agenda-list">
                {event.agenda?.map((item, idx) => (
                  <li key={idx}>
                    <div className="pm-agenda-dot" />
                    <span>{item}</span>
                  </li>
                )) || (
                  <>
                    <li><div className="pm-agenda-dot" /> <span>Introductions and Networking</span></li>
                    <li><div className="pm-agenda-dot" /> <span>Keynote Presentation</span></li>
                    <li><div className="pm-agenda-dot" /> <span>Interactive Q&A Session</span></li>
                    <li><div className="pm-agenda-dot" /> <span>Closing Remarks</span></li>
                  </>
                )}
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
                {[1, 2, 3, 4, 5].map(i => (
                  <div key={i} className="pm-avatar-stack-item" style={{ width: '40px', height: '40px' }} />
                ))}
              </div>
              <p style={{ marginTop: '16px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                Including Sarah Chen, Raj Patel, and 3 others you may know.
              </p>
            </div>

            <div className="pm-panel pm-host-card">
              <h3 className="pm-subheading">Hosted by</h3>
              <div className="pm-host-info">
                <div className="pm-host-avatar" />
                <div>
                  <strong>{event.host}</strong>
                  <span>Top Mentor in {event.domain}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" style={{ width: '100%', marginTop: '16px' }}>View Host Profile</Button>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        .pm-event-detail {
          display: grid;
          gap: 32px;
        }
        .pm-event-detail__hero {
          padding: 48px;
          background: linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-base) 100%);
          position: relative;
          overflow: hidden;
        }
        .pm-event-detail__hero h1 {
          font-family: var(--font-display);
          font-size: 3rem;
          margin: 20px 0;
          letter-spacing: -0.03em;
        }
        .pm-event-meta-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin: 40px 0;
          padding: 32px 0;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }
        .pm-meta-box {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .pm-meta-box strong {
          display: block;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-tertiary);
        }
        .pm-meta-box span {
          font-weight: 600;
        }
        .pm-event-actions {
          display: flex;
          gap: 16px;
        }
        .pm-agenda-list {
          display: grid;
          gap: 16px;
          margin-top: 24px;
        }
        .pm-agenda-list li {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          background: var(--bg-base);
          border-radius: 12px;
        }
        .pm-agenda-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--brand-teal);
        }
        .pm-attendee-stat {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .pm-attendee-stat strong {
          font-size: 32px;
          font-family: var(--font-display);
        }
        .pm-host-info {
          display: flex;
          gap: 16px;
          align-items: center;
          margin-top: 16px;
        }
        .pm-host-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--brand-violet-glow);
        }
        .pm-host-info strong {
          display: block;
        }
        .pm-host-info span {
          font-size: 12px;
          color: var(--text-secondary);
        }

        @media (max-width: 768px) {
          .pm-event-detail__hero {
            padding: 24px;
          }
          .pm-event-detail__hero h1 {
            font-size: 2rem;
          }
          .pm-event-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </AppShell>
  );
}
