import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Avatar, Badge, Button, Icon } from '../../../components/ui';
import { profiles, events as baseEvents } from '../../../data/mockData';
import '../../../styles/organizer-dashboard.css';

export function OrganizerDashboardPage({ variant = 'student' }) {
  const navigate = useNavigate();
  usePageMeta('Organizer Dashboard | Tinder for Nerds', 'Manage hosted events, attendees, and announcements.');

  const organizer = useMemo(() => {
    // Demo-friendly default: pro view shows Sarah as organizer, student shows "me".
    return variant === 'pro' ? profiles.sarah : profiles.me;
  }, [variant]);

  const seededEvents = useMemo(() => {
    const seed = (baseEvents ?? []).slice(0, 3).map((event, idx) => ({
      ...event,
      id: `hosted-${organizer.username}-${event.id}`,
      host: organizer.name,
      status: idx === 0 ? 'Upcoming' : idx === 1 ? 'Draft' : 'Past',
      rsvps: Math.max(12, Math.round((event.attendees ?? 0) * 0.72)),
      checkins: idx === 2 ? Math.round((event.attendees ?? 0) * 0.64) : 0,
      revenue: event.format === 'Virtual' ? 0 : 4999,
    }));

    return seed;
  }, [organizer]);

  const [hostedEvents, setHostedEvents] = useState(() => seededEvents);
  const [activeId, setActiveId] = useState(() => seededEvents[0]?.id ?? null);
  const [announcement, setAnnouncement] = useState('');

  const activeEvent = useMemo(
    () => hostedEvents.find((ev) => ev.id === activeId) ?? hostedEvents[0] ?? null,
    [activeId, hostedEvents]
  );

  const stats = useMemo(() => {
    const upcoming = hostedEvents.filter((e) => e.status === 'Upcoming').length;
    const drafts = hostedEvents.filter((e) => e.status === 'Draft').length;
    const past = hostedEvents.filter((e) => e.status === 'Past').length;
    const totalRsvps = hostedEvents.reduce((sum, e) => sum + (e.rsvps ?? 0), 0);
    const totalRevenue = hostedEvents.reduce((sum, e) => sum + (e.revenue ?? 0), 0);
    return { upcoming, drafts, past, totalRsvps, totalRevenue };
  }, [hostedEvents]);

  const attendees = useMemo(() => {
    if (!activeEvent) return [];
    const count = Math.min(24, Math.max(8, Math.round((activeEvent.rsvps ?? 0) * 0.25)));
    const people = [profiles.raj, profiles.priya, profiles.nora, profiles.mei, profiles.liam].filter(Boolean);
    const list = [];
    for (let i = 0; i < count; i += 1) {
      const person = people[i % people.length];
      list.push({
        id: `${activeEvent.id}-att-${i}`,
        name: person.name,
        username: person.username,
        title: person.title || person.role || 'Member',
        status: i % 7 === 0 ? 'Checked in' : 'RSVP',
      });
    }
    return list;
  }, [activeEvent]);

  const toneForStatus = (status) => {
    if (status === 'Upcoming') return 'teal';
    if (status === 'Draft') return 'amber';
    return 'violet';
  };

  const handleDuplicate = (event) => {
    const copy = {
      ...event,
      id: `copy-${Date.now()}`,
      title: `${event.title} (Copy)`,
      status: 'Draft',
      rsvps: 0,
      checkins: 0,
    };
    setHostedEvents((current) => [copy, ...current]);
    setActiveId(copy.id);
  };

  const handleCancel = (event) => {
    setHostedEvents((current) =>
      current.map((ev) => (ev.id === event.id ? { ...ev, status: 'Past' } : ev))
    );
  };

  const handleSendAnnouncement = () => {
    const trimmed = announcement.trim();
    if (!trimmed) return;
    // Mock action: in real app this would hit an API.
    setAnnouncement('');
    navigate(`/${variant}/events`);
  };

  return (
    <AppShell
      variant={variant}
      title="Organizer dashboard"
      subtitle="Run your events: manage RSVPs, publish updates, and track outcomes."
      actions={
        <div className="pm-org-actions">
          <Button variant="secondary" to={`/${variant}/events`}>
            View events
          </Button>
          <Button variant="primary" icon="plus" to={`/${variant}/events/host`}>
            Create event
          </Button>
        </div>
      }
    >
      <div className="pm-org">
        <header className="pm-org__top">
          <div className="pm-org__identity">
            <Avatar
              name={organizer.name}
              src={organizer.src}
              initials={organizer.avatar}
              tone={organizer.tone}
              size="lg"
            />
            <div className="pm-org__who">
              <strong>{organizer.name}</strong>
              <span>{organizer.title || organizer.role || 'Organizer'}</span>
            </div>
          </div>

          <div className="pm-org__kpis" aria-label="Organizer stats">
            <Kpi label="Upcoming" value={stats.upcoming} icon="calendar" />
            <Kpi label="Drafts" value={stats.drafts} icon="spark" />
            <Kpi label="Past" value={stats.past} icon="chart" />
            <Kpi label="RSVPs" value={stats.totalRsvps} icon="connections" />
            <Kpi label="Revenue" value={`${stats.totalRevenue} INR`} icon="company" />
          </div>
        </header>

        <div className="pm-org__grid">
          <section className="pm-org__panel pm-panel" aria-label="Hosted events">
            <div className="pm-org__panel-head">
              <div>
                <h2>Hosted events</h2>
                <p>Draft, publish, and manage your events from one place.</p>
              </div>
            </div>

            <div className="pm-org-event-list" role="list">
              {hostedEvents.map((event) => (
                <button
                  key={event.id}
                  type="button"
                  className={`pm-org-event ${activeId === event.id ? 'is-active' : ''}`}
                  onClick={() => setActiveId(event.id)}
                >
                  <div className="pm-org-event__left">
                    <Badge tone={toneForStatus(event.status)} variant="soft">
                      {event.status}
                    </Badge>
                    <div className="pm-org-event__meta">
                      <strong>{event.title}</strong>
                      <span>
                        {event.date} · {event.time} · {event.format}
                      </span>
                    </div>
                  </div>
                  <div className="pm-org-event__right">
                    <span className="pm-org-event__chip">
                      <Icon name="connections" size={14} /> {event.rsvps ?? 0}
                    </span>
                    <span className="pm-org-event__chip">
                      <Icon name="messages" size={14} /> {Math.max(0, Math.round((event.rsvps ?? 0) * 0.12))}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="pm-org__panel pm-panel" aria-label="Event operations">
            <div className="pm-org__panel-head pm-org__panel-head--tight">
              <div>
                <h2>{activeEvent?.title ?? 'Event details'}</h2>
                <p>Announcements, check-in, and attendee management.</p>
              </div>
              {activeEvent ? (
                <div className="pm-org__panel-actions">
                  <Button variant="secondary" size="sm" onClick={() => handleDuplicate(activeEvent)}>
                    Duplicate
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => handleCancel(activeEvent)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="sm" to={`/${variant}/events/${activeEvent.id.replace(`hosted-${organizer.username}-`, '')}`}>
                    Open
                  </Button>
                </div>
              ) : null}
            </div>

            <div className="pm-org-ops">
              <div className="pm-org-ops__cards">
                <div className="pm-org-mini pm-card">
                  <div className="pm-org-mini__icon">
                    <Icon name="connections" size={18} />
                  </div>
                  <div>
                    <strong>RSVPs</strong>
                    <span>{activeEvent?.rsvps ?? 0}</span>
                  </div>
                </div>
                <div className="pm-org-mini pm-card">
                  <div className="pm-org-mini__icon">
                    <Icon name="chart" size={18} />
                  </div>
                  <div>
                    <strong>Check-ins</strong>
                    <span>{activeEvent?.checkins ?? 0}</span>
                  </div>
                </div>
                <div className="pm-org-mini pm-card">
                  <div className="pm-org-mini__icon">
                    <Icon name="company" size={18} />
                  </div>
                  <div>
                    <strong>Revenue</strong>
                    <span>{activeEvent?.revenue ?? 0} INR</span>
                  </div>
                </div>
              </div>

              <div className="pm-org-ops__announce pm-card" aria-label="Announcement composer">
                <div className="pm-org-ops__announce-head">
                  <strong>Send announcement</strong>
                  <span className="pm-org-muted">
                    Goes to all attendees (mock)
                  </span>
                </div>
                <textarea
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                  placeholder="Share logistics, link, or last-minute updates..."
                  className="pm-org-announce__input"
                />
                <div className="pm-org-announce__actions">
                  <Button variant="secondary" size="sm" onClick={() => setAnnouncement('')}>
                    Clear
                  </Button>
                  <Button variant="primary" size="sm" onClick={handleSendAnnouncement} disabled={!announcement.trim()}>
                    Send
                  </Button>
                </div>
              </div>

              <div className="pm-org-ops__attendees pm-card" aria-label="Attendees">
                <div className="pm-org-ops__attendees-head">
                  <strong>Attendees</strong>
                  <div className="pm-org-ops__attendees-actions">
                    <Button variant="secondary" size="sm">
                      Export CSV
                    </Button>
                    <Button variant="secondary" size="sm">
                      Check-in mode
                    </Button>
                  </div>
                </div>
                <div className="pm-org-attendee-list" role="list">
                  {attendees.map((att) => (
                    <button
                      key={att.id}
                      type="button"
                      className="pm-org-attendee"
                      onClick={() => navigate(`/profile/${att.username}`)}
                    >
                      <div className="pm-org-attendee__who">
                        <div className="pm-org-attendee__avatar" aria-hidden="true">
                          {att.name
                            .split(' ')
                            .map((part) => part[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div className="pm-org-attendee__meta">
                          <strong>{att.name}</strong>
                          <span>{att.title}</span>
                        </div>
                      </div>
                      <Badge tone={att.status === 'Checked in' ? 'teal' : 'amber'} variant="soft">
                        {att.status}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function Kpi({ label, value, icon }) {
  return (
    <div className="pm-org-kpi pm-card" aria-label={label}>
      <div className="pm-org-kpi__icon" aria-hidden="true">
        <Icon name={icon} size={18} />
      </div>
      <div className="pm-org-kpi__meta">
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

