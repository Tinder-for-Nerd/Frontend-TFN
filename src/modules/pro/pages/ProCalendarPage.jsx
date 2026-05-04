import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Chip, Avatar } from '../../../components/ui';
import { SectionHeader, StatCard, ActivityItem } from '../../../components/common';
import { profiles, availabilityWeeks, events } from '../../../data/mockData';

export function ProCalendarPage() {
  const [monthView, setMonthView] = useState('monthly');

  usePageMeta('Tinder for Nerds | Calendar', 'Monthly and weekly calendar views for availability, sessions, and bookings.');

  return (
    <AppShell variant="pro" title="Calendar" subtitle="Availability and bookings for professional users" actions={<Button variant="secondary">Share availability</Button>}>
      <div className="pm-tab-row">
        {['monthly', 'weekly'].map((item) => (
          <button className={cx('pm-tab', monthView === item && 'is-active')} key={item} type="button" onClick={() => setMonthView(item)}>
            {item === 'monthly' ? 'Monthly view' : 'Weekly view'}
          </button>
        ))}
      </div>

      <div className="pm-two-column pm-two-column--calendar">
        <section className="pm-panel">
          <SectionHeader eyebrow="Calendar" title={monthView === 'monthly' ? 'Monthly view' : 'Weekly view'} description="A calendar-first layout makes it easy to keep a public schedule visible." />
          <div className="pm-calendar-board">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div className="pm-calendar-board__cell" key={day}>
                <span>{day}</span>
                <strong>{day === 'Thu' ? '2' : day === 'Mon' ? '1' : ''}</strong>
              </div>
            ))}
          </div>
        </section>
        <aside className="pm-panel">
          <SectionHeader eyebrow="Availability" title="Your availability" description="Control what is visible to connections and who can book you." />
          <div className="pm-stack-list">
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} active={session.id === 'intro'} />
            ))}
          </div>
          <Button variant="secondary">Set recurring slots</Button>
        </aside>
      </div>
    </AppShell>
  );
}