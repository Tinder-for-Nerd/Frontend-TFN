import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Chip, Icon } from '../../../components/ui';
import { SectionHeader, EventCalendarMenu } from '../../../components/common';
import { events } from '../../../data/mockData';

const EVENT_THUMBNAILS = {
  Product: {
    emoji: '🚀',
    accent: '#0084ff',
    background:
      'radial-gradient(circle at 18% 22%, rgba(255,255,255,0.92) 0 9%, transparent 10%), radial-gradient(circle at 78% 30%, rgba(255,255,255,0.55) 0 12%, transparent 13%), linear-gradient(135deg, #0084ff 0%, #6c5ce7 55%, #ffb703 100%)',
  },
  Engineering: {
    emoji: '⚙️',
    accent: '#10b981',
    background:
      'radial-gradient(circle at 18% 24%, rgba(255,255,255,0.9) 0 8%, transparent 9%), repeating-linear-gradient(45deg, rgba(255,255,255,0.16) 0 10px, transparent 10px 20px), linear-gradient(135deg, #111827 0%, #0ea5e9 48%, #22c55e 100%)',
  },
  Design: {
    emoji: '🎨',
    accent: '#ec4899',
    background:
      'radial-gradient(circle at 20% 24%, rgba(255,255,255,0.85) 0 13%, transparent 14%), radial-gradient(circle at 78% 70%, rgba(255,255,255,0.55) 0 15%, transparent 16%), linear-gradient(135deg, #ec4899 0%, #f97316 48%, #fde047 100%)',
  },
};

function EventCard({ event, variant }) {
  const thumbnail = EVENT_THUMBNAILS[event.domain] ?? EVENT_THUMBNAILS.Product;

  return (
    <article className="pm-card pm-event-card">
      <div className="pm-event-card__image" style={{ background: thumbnail.background }}>
        <Badge tone={event.format === 'Virtual' ? 'teal' : 'violet'} className="pm-event-format-badge">
          {event.format}
        </Badge>
        <div className="pm-event-thumb">
          <span className="pm-event-thumb__emoji" aria-hidden="true">{thumbnail.emoji}</span>
          <span className="pm-event-thumb__domain">{event.domain}</span>
          <strong>{event.title}</strong>
        </div>
        <div className="pm-event-thumb__ring" style={{ borderColor: thumbnail.accent }} aria-hidden="true" />
      </div>
      <div className="pm-event-card__content">
        <div className="pm-event-card__meta">
          <span className="pm-event-date">{event.date}</span>
          <span className="pm-event-dot" />
          <span className="pm-event-time">{event.time}</span>
        </div>
        <h3 className="pm-event-card__title">{event.title}</h3>
        <p className="pm-event-card__summary">{event.summary}</p>
        
        <div className="pm-event-card__footer">
          <div className="pm-event-attendees">
            <div className="pm-avatar-stack pm-avatar-stack--sm">
              {[1, 2, 3].map(i => (
                <div key={i} className="pm-avatar-stack-item" style={{ zIndex: 4-i }} />
              ))}
            </div>
            <span>{event.attendees} attending</span>
          </div>
          <Button variant="ghost" size="sm" to={`/${variant}/events/${event.id}`}>
            Details <Icon name="chevron-right" size={14} />
          </Button>
        </div>
      </div>
    </article>
  );
}

export function EventsPage({ variant = 'student' }) {
  const { eventId } = useParams();
  const [filter, setFilter] = useState('All');
  
  const eventList = events.filter((event) => 
    filter === 'All' || event.format === filter || event.domain === filter
  );
  
  const activeEvent = events.find((event) => event.id === eventId) || eventList[0];

  usePageMeta(
    variant === 'pro' ? 'Pro Events | Tinder for Nerds' : 'Student Events | Tinder for Nerds',
    'Browse virtual and in-person events hosted by professionals and the community.'
  );

  return (
    <AppShell 
      variant={variant} 
      title="Events" 
      subtitle={variant === 'pro' ? 'Community and founder events' : 'Student and community events'} 
      className="pm-events-shell"
      actions={
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          <Button variant="secondary" to={`/${variant}/events/organizer`}>
            Organizer dashboard
          </Button>
          <Button variant="primary" icon="spark" to={`/${variant}/events/host`}>
            Host an event
          </Button>
        </div>
      }
    >
      <div className="pm-events-container">
        {/* Featured Section */}
        {activeEvent && (
          <section className="pm-featured-event-hero">
            <div
              className="pm-featured-event-art"
              style={{ background: (EVENT_THUMBNAILS[activeEvent.domain] ?? EVENT_THUMBNAILS.Product).background }}
              aria-hidden="true"
            >
              <span>{(EVENT_THUMBNAILS[activeEvent.domain] ?? EVENT_THUMBNAILS.Product).emoji}</span>
              <strong>{activeEvent.domain}</strong>
            </div>
            <div className="pm-featured-content">
              <Badge tone="rose" variant="soft">Upcoming Highlight</Badge>
              <h1>{activeEvent.title}</h1>
              <p>{activeEvent.summary}</p>
              
              <div className="pm-event-hero-meta">
                <div className="pm-hero-meta-item">
                  <Icon name="calendar" size={18} />
                  <span>{activeEvent.date} @ {activeEvent.time}</span>
                </div>
                <div className="pm-hero-meta-item">
                  <Icon name="spark" size={18} />
                  <span>{activeEvent.format} Event</span>
                </div>
              </div>

              <div className="pm-hero-actions">
                <button className="pm-rsvp-btn">RSVP Now</button>
                <EventCalendarMenu
                  event={activeEvent}
                  variant="secondary"
                  size="md"
                  label="Save to Calendar"
                  className="pm-hero-calendar-menu"
                />
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <nav className="pm-event-tabs">
          {['All', 'Virtual', 'In-person', 'Product', 'Engineering', 'Design'].map((item) => (
            <button 
              key={item} 
              className={filter === item ? 'is-active' : ''} 
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Event Grid */}
        <section className="pm-event-grid">
          {eventList.map((event) => (
            <EventCard key={event.id} event={event} variant={variant} />
          ))}
        </section>
      </div>

      <style>{`
        /* From Uiverse.io by TCdesign-dev — Adapted for Tinder for Nerds */
        .pm-calendar-btn {
          align-items: center;
          appearance: none;
          background-color: var(--surface-container-highest);
          border-radius: 12px;
          border-width: 0;
          box-shadow:
            rgba(0, 0, 0, 0.2) 0 2px 4px,
            rgba(0, 0, 0, 0.15) 0 7px 13px -3px,
            var(--outline-variant) 0 -3px 0 inset;
          box-sizing: border-box;
          color: var(--on-surface);
          cursor: pointer;
          display: inline-flex;
          height: 48px;
          justify-content: center;
          line-height: 1;
          list-style: none;
          overflow: hidden;
          padding-left: 24px;
          padding-right: 24px;
          position: relative;
          text-align: left;
          text-decoration: none;
          transition: box-shadow 0.15s, transform 0.15s;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          white-space: nowrap;
          will-change: box-shadow, transform;
          font-size: 15px;
          font-weight: 700;
          font-family: var(--font-display);
          text-transform: uppercase;
        }

        .pm-calendar-btn:focus {
          box-shadow:
            var(--outline-variant) 0 0 0 1.5px inset,
            rgba(0, 0, 0, 0.4) 0 2px 4px,
            rgba(0, 0, 0, 0.3) 0 7px 13px -3px,
            var(--outline-variant) 0 -3px 0 inset;
        }

        .pm-calendar-btn:hover {
          box-shadow:
            rgba(0, 0, 0, 0.3) 0 4px 8px,
            rgba(0, 0, 0, 0.2) 0 7px 13px -3px,
            var(--outline-variant) 0 -3px 0 inset;
          transform: translateY(-2px);
        }

        .pm-calendar-btn:active {
          box-shadow: var(--outline-variant) 0 3px 7px inset;
          transform: translateY(2px);
        }

        /* From Uiverse.io by nikk7007 — Adapted for Tinder for Nerds */ 
        .pm-rsvp-btn {
          --color: #00A97F;
          --color2: rgb(10, 25, 30);
          padding: 0.8em 2em;
          background-color: transparent;
          border-radius: 12px;
          border: 1px solid var(--color);
          transition: .5s;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          z-index: 1;
          font-weight: 700;
          font-size: 15px;
          font-family: var(--font-display);
          text-transform: uppercase;
          color: var(--color);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 160px;
        }

        .pm-rsvp-btn::after, .pm-rsvp-btn::before {
          content: '';
          display: block;
          height: 100%;
          width: 100%;
          transform: skew(90deg) translate(-50%, -50%);
          position: absolute;
          inset: 50%;
          left: 25%;
          z-index: -1;
          transition: .5s ease-out;
          background-color: var(--color);
        }

        .pm-rsvp-btn::before {
          top: -50%;
          left: -25%;
          transform: skew(90deg) rotate(180deg) translate(-50%, -50%);
        }

        .pm-rsvp-btn:hover::before {
          transform: skew(45deg) rotate(180deg) translate(-50%, -50%);
        }

        .pm-rsvp-btn:hover::after {
          transform: skew(45deg) translate(-50%, -50%);
        }

        .pm-rsvp-btn:hover {
          color: var(--color2);
        }

        .pm-rsvp-btn:active {
          filter: brightness(.7);
          transform: scale(.98);
        }

        .pm-events-container {
          display: grid;
          gap: 40px;
        }
        .pm-featured-event-hero {
          display: grid;
          grid-template-columns: minmax(220px, 0.42fr) minmax(0, 1fr);
          gap: 28px;
          align-items: stretch;
          background: var(--surface-container-high);
          border-radius: var(--radius-xl);
          padding: 22px;
          border: 1px solid var(--outline-variant);
          position: relative;
          overflow: hidden;
        }
        .pm-featured-event-art {
          min-height: 260px;
          border-radius: 18px;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: 8px;
          padding: 26px;
          color: #ffffff;
          text-shadow: 0 2px 12px rgba(0,0,0,0.28);
        }
        .pm-featured-event-art::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.42)),
            radial-gradient(circle at 82% 18%, rgba(255,255,255,0.72), transparent 28%);
        }
        .pm-featured-event-art span,
        .pm-featured-event-art strong {
          position: relative;
          z-index: 1;
        }
        .pm-featured-event-art span {
          width: 64px;
          height: 64px;
          display: grid;
          place-items: center;
          border-radius: 16px;
          background: #ffffff;
          border: 3px solid #111111;
          box-shadow: 6px 6px 0 rgba(0,0,0,0.18);
          text-shadow: none;
          font-size: 34px;
        }
        .pm-featured-event-art strong {
          font-family: var(--font-display);
          font-size: clamp(1.55rem, 3vw, 2.25rem);
          letter-spacing: -0.03em;
        }
        .pm-featured-content {
          padding: 26px;
        }
        .pm-featured-content h1 {
          font-family: var(--font-display);
          font-size: 2.5rem;
          margin: 16px 0;
          color: var(--on-surface);
          letter-spacing: -0.02em;
        }
        .pm-featured-content p {
          font-size: 1.1rem;
          color: var(--on-surface-variant);
          max-width: 600px;
          margin-bottom: 32px;
        }
        .pm-event-hero-meta {
          display: flex;
          gap: 32px;
          margin-bottom: 40px;
        }
        .pm-hero-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--on-surface);
          font-weight: 500;
        }
        .pm-hero-actions {
          display: flex;
          gap: 16px;
        }
        .pm-event-tabs {
          display: flex;
          gap: 0;
          width: fit-content;
          max-width: 100%;
          overflow-x: auto;
          border: 3px solid #111111;
          border-radius: 12px;
          background: #ffffff;
          box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.16);
        }
        .pm-event-tabs button {
          background: #ffffff !important;
          border: none !important;
          border-right: 2px solid #111111 !important;
          box-shadow: none !important;
          padding: 12px 16px;
          border-radius: 0 !important;
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--on-surface-variant);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pm-event-tabs button:last-child {
          border-right: none !important;
        }
        .pm-event-tabs button.is-active {
          color: var(--primary);
          background: #eaf4ff !important;
        }
        .pm-event-tabs button.is-active::after {
          display: none;
        }
        .pm-event-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 24px;
        }
        .pm-event-card {
          display: flex;
          flex-direction: column;
          background: var(--surface-container-lowest);
          border: 1px solid var(--outline-variant);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: all 0.2s;
        }
        .pm-event-card:hover {
          transform: translateY(-4px);
          border-color: var(--primary);
          box-shadow: var(--shadow-ambient);
        }
        .pm-event-card__image {
          height: 140px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          padding: 18px;
        }
        .pm-event-card__image::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.36)),
            radial-gradient(circle at 88% 12%, rgba(255,255,255,0.7), transparent 24%);
        }
        .pm-event-format-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 2;
          background: #ffffff !important;
          border: 2px solid #111111 !important;
          box-shadow: 3px 3px 0 rgba(0,0,0,0.14);
        }
        .pm-event-thumb {
          position: relative;
          z-index: 1;
          display: grid;
          gap: 2px;
          color: #ffffff;
          text-shadow: 0 2px 10px rgba(0,0,0,0.28);
        }
        .pm-event-thumb__emoji {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 12px;
          background: rgba(255,255,255,0.92);
          border: 2px solid #111111;
          box-shadow: 4px 4px 0 rgba(0,0,0,0.16);
          text-shadow: none;
          font-size: 22px;
          margin-bottom: 6px;
        }
        .pm-event-thumb__domain {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .pm-event-thumb strong {
          font-family: var(--font-display);
          font-size: 1.2rem;
          line-height: 1.15;
          max-width: 16ch;
        }
        .pm-event-thumb__ring {
          position: absolute;
          right: -32px;
          bottom: -38px;
          width: 128px;
          height: 128px;
          border: 18px solid;
          border-radius: 50%;
          opacity: 0.5;
        }
        .pm-event-card__content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
        }
        .pm-event-card__meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: var(--on-surface-variant);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .pm-event-dot {
          width: 3px;
          height: 3px;
          background: var(--outline);
          border-radius: 50%;
        }
        .pm-event-card__title {
          font-family: var(--font-display);
          font-size: 1.25rem;
          margin: 0;
          color: var(--on-surface);
        }
        .pm-event-card__summary {
          font-size: 14px;
          color: var(--on-surface-variant);
          line-height: 1.6;
          margin: 0;
          flex: 1;
        }
        .pm-event-card__footer {
          margin-top: 16px;
          padding-top: 20px;
          border-top: 1px solid var(--outline-variant);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pm-event-attendees {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: var(--on-surface-variant);
        }

        @media (max-width: 640px) {
          .pm-events-shell .pm-topbar__actions {
            display: flex;
            gap: 8px;
          }

          .pm-events-shell .pm-topbar__action--search,
          .pm-events-shell .pm-topbar__bell {
            display: none;
          }

          .pm-events-shell .pm-main {
            padding-top: 18px;
          }

          .pm-events-container {
            gap: 20px;
          }

          .pm-events-shell .pm-main__actions {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
            width: 100%;
          }

          .pm-events-shell .pm-main__actions > * {
            width: 100%;
            justify-content: center;
          }

          .pm-featured-event-hero {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 18px;
            border-radius: 24px;
          }

          .pm-featured-event-art {
            min-height: 180px;
            padding: 20px;
          }

          .pm-featured-content {
            padding: 0;
          }

          .pm-featured-content h1 {
            font-size: clamp(2rem, 7vw, 2.75rem);
            line-height: 1.04;
            margin: 14px 0 12px;
          }

          .pm-featured-content p {
            font-size: 1rem;
            line-height: 1.55;
            margin-bottom: 22px;
          }

          .pm-event-hero-meta {
            display: grid;
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 22px;
          }

          .pm-hero-actions {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .pm-rsvp-btn,
          .pm-calendar-btn {
            width: 100%;
            min-width: 0;
            padding-left: 18px;
            padding-right: 18px;
            font-size: 14px;
          }

          .pm-event-tabs {
            gap: 12px;
            padding-bottom: 0;
            overflow-x: auto;
            scrollbar-width: none;
          }

          .pm-event-tabs::-webkit-scrollbar {
            display: none;
          }

          .pm-event-tabs button {
            flex: 0 0 auto;
            padding: 8px 0 12px;
            font-size: 0.9rem;
            white-space: nowrap;
          }

          .pm-event-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .pm-event-card__content {
            padding: 18px;
          }

          .pm-event-card__footer {
            margin-top: 10px;
            padding-top: 14px;
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }

          .pm-event-card__footer .pm-button,
          .pm-event-card__footer a,
          .pm-event-card__footer button {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </AppShell>
  );
}
