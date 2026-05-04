import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Chip, Icon } from '../../../components/ui';
import { SectionHeader } from '../../../components/common';
import { events } from '../../../data/mockData';

function EventCard({ event, variant }) {
  return (
    <article className="pm-card pm-event-card">
      <div className="pm-event-card__image" style={{ background: `var(--surface-container-high)` }}>
        <Badge tone={event.format === 'Virtual' ? 'teal' : 'violet'} className="pm-event-format-badge">
          {event.format}
        </Badge>
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
      actions={<Button variant="primary" icon="spark" to={`/${variant}/events/host`}>Host an event</Button>}
    >
      <div className="pm-events-container">
        {/* Featured Section */}
        {activeEvent && (
          <section className="pm-featured-event-hero">
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
                <button className="pm-calendar-btn">Save to Calendar</button>
              </div>
            </div>
          </section>
        )}

        {/* Filters */}
        <nav className="pm-tabs">
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
          background: var(--surface-container-high);
          border-radius: var(--radius-xl);
          padding: 48px;
          border: 1px solid var(--outline-variant);
          position: relative;
          overflow: hidden;
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
        .pm-tabs {
          display: flex;
          gap: 32px;
          border-bottom: 1px solid var(--outline-variant);
          padding-bottom: 2px;
        }
        .pm-tabs button {
          background: none;
          border: none;
          padding: 8px 0 16px;
          font-family: var(--font-display);
          font-weight: 600;
          color: var(--on-surface-variant);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pm-tabs button.is-active {
          color: var(--primary);
        }
        .pm-tabs button.is-active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--primary);
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
        }
        .pm-event-format-badge {
          position: absolute;
          top: 12px;
          left: 12px;
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
      `}</style>
    </AppShell>
  );
}