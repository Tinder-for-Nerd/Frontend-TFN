import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Chip, Avatar } from '../../../components/ui';
import { SectionHeader, StatCard, ActivityItem } from '../../../components/common';
import { profiles, availabilityWeeks, events } from '../../../data/mockData';

export function SessionsPage() {
  const [selectedDay, setSelectedDay] = useState(availabilityWeeks[0].date);
  const [selectedSlot, setSelectedSlot] = useState(availabilityWeeks[0].slots[0]);
  const selectedDayInfo = availabilityWeeks.find((day) => day.date === selectedDay) || availabilityWeeks[0];

  usePageMeta('Tinder for Nerds | Sessions', 'Student bookings and availability management for calls, feedback, and mentoring sessions.');

  return (
    <AppShell variant="student" title="Sessions" subtitle="Upcoming calls and your availability" actions={<Button to="/student/messages" variant="secondary">Back to messages</Button>}>
      <div className="pm-two-column pm-two-column--sessions">
        <section className="pm-panel">
          <SectionHeader eyebrow="Upcoming sessions" title="Your scheduled calls" description="Join, reschedule, or cancel without losing the conversation context." />
          <div className="pm-stack-list">
            {sessions.map((session, index) => (
              <SessionCard key={session.id} session={session} active={index === 0} />
            ))}
          </div>
        </section>

        <section className="pm-panel">
          <SectionHeader eyebrow="Availability" title="Set your availability" description="Click slots to signal when people can book with you." />
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
            <Button>Book a session</Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}