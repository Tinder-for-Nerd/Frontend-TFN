import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { cx } from '../../../utils/helpers';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Avatar } from '../../../components/ui';
import { SectionHeader } from '../../../components/common';
import { profiles, availabilityWeeks, sessions } from '../../../data/mockData';
import { getBookedSessions } from '../../../data/bookedSessions';

export function SessionsPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const withUser = params.get('with');

  const [selectedDay, setSelectedDay] = useState(availabilityWeeks[0].date);
  const [selectedSlot, setSelectedSlot] = useState(availabilityWeeks[0].slots[0]);
  const selectedDayInfo = availabilityWeeks.find((day) => day.date === selectedDay) || availabilityWeeks[0];
  const bookedSessions = useMemo(() => getBookedSessions(), []);

  usePageMeta('Tinder for Nerds | Sessions', 'Student bookings and availability management for calls, feedback, and mentoring sessions.');

  const person = useMemo(() => {
    if (!withUser) return null;
    const candidates = Object.values(profiles ?? {});
    return candidates.find((p) => p?.username === withUser) ?? null;
  }, [withUser]);

  const bookLabel = person?.name ? `Book with ${person.name}` : 'Book a session';

  const handleBook = () => {
    navigate(
      `/student/billing?with=${encodeURIComponent(withUser || 'me')}&day=${encodeURIComponent(
        String(selectedDay)
      )}&slot=${encodeURIComponent(selectedSlot)}`
    );
  };

  return (
    <AppShell variant="student" title="Sessions" subtitle="Upcoming calls and your availability" actions={<Button to="/student/messages" variant="secondary">Back to messages</Button>}>
      <div className="pm-two-column pm-two-column--sessions">
        <section className="pm-panel">
          <SectionHeader eyebrow="Upcoming sessions" title="Your scheduled calls" description="Join, reschedule, or cancel without losing the conversation context." />
          <div className="pm-stack-list">
            {bookedSessions.map((session) => (
              <BookedSessionCard key={session.id} session={session} />
            ))}
            {sessions.map((session, index) => (
              <SessionCard key={session.id} session={session} active={index === 0} />
            ))}
          </div>
        </section>

        <section className="pm-panel">
          <SectionHeader
            eyebrow="Availability"
            title={person?.name ? `Schedule with ${person.name}` : 'Set your availability'}
            description={person?.name ? 'Pick a day and time, then book to continue to payment.' : 'Click slots to signal when people can book with you.'}
          />
          <div className="pm-calendar-grid">
            {availabilityWeeks.map((day) => (
              <button className={cx('pm-day-card', selectedDay === day.date && 'is-active')} key={day.date} type="button" onClick={() => { setSelectedDay(day.date); setSelectedSlot(day.slots[0]); }}>
                <span>{day.day}</span>
                <strong>{day.date}</strong>
              </button>
            ))}
          </div>
          <div className="pm-slot-list">
            {selectedDayInfo.slots.map((slot) => (
              <button className={cx('pm-slot-card', selectedSlot === slot && 'is-active')} key={slot} type="button" onClick={() => setSelectedSlot(slot)}>
                {slot}
              </button>
            ))}
          </div>
          <div className="pm-card-actions">
            <Button variant="secondary">Set recurring slots</Button>
            <Button onClick={handleBook}>{bookLabel}</Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function BookedSessionCard({ session }) {
  const profile = Object.values(profiles ?? {}).find((person) => person?.username === session.withUser) || profiles.sarah;

  return (
    <article
      className="pm-card is-active"
      style={{
        padding: 14,
        borderRadius: 12,
        display: 'grid',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <Avatar
            name={profile.name}
            src={profile.src}
            initials={profile.avatar}
            tone={profile.tone}
            size="sm"
          />
          <div style={{ minWidth: 0 }}>
            <strong style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              1:1 with {profile.name}
            </strong>
            <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              Confirmed after payment
            </span>
          </div>
        </div>
        <Badge tone="teal" variant="soft">
          Booked
        </Badge>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>
          {session.day} · {session.slot}
        </span>
        <Button to={`/call/${encodeURIComponent(session.id)}?ready=1`} variant="secondary" size="sm">
          Join
        </Button>
      </div>
    </article>
  );
}

function SessionCard({ session, active }) {
  return (
    <article
      className={cx('pm-card', active && 'is-active')}
      style={{
        padding: 14,
        borderRadius: 12,
        display: 'grid',
        gap: 10,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <Avatar
            name={profiles.me?.name ?? 'Me'}
            src={profiles.me?.src}
            initials={profiles.me?.avatar ?? 'ME'}
            tone={profiles.me?.tone}
            size="sm"
          />
          <div style={{ minWidth: 0 }}>
            <strong style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {session.title}
            </strong>
            <span style={{ display: 'block', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {session.detail}
            </span>
          </div>
        </div>
        <Badge tone="teal" variant="soft">
          {session.mode}
        </Badge>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <span style={{ color: 'var(--text-secondary)', fontWeight: 700 }}>
          {session.day} · {session.time}
        </span>
        <Button variant="secondary" size="sm">
          Join
        </Button>
      </div>
    </article>
  );
}
