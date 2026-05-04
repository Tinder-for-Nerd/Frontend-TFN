import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { Badge, Button, Icon } from '../../../components/ui';
import { events as baseEvents, sessions as baseSessions, availabilityWeeks } from '../../../data/mockData';
import '../../../styles/calendar.css';

export function CalendarPage({ variant = 'student' }) {
  const navigate = useNavigate();
  usePageMeta('Tinder for Nerds | Calendar', 'Monthly calendar view for sessions and events.');

  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(() => new Date(today.getFullYear(), today.getMonth(), today.getDate()));

  const year = cursor.getFullYear();
  const month = cursor.getMonth(); // 0-indexed
  const monthLabel = cursor.toLocaleString(undefined, { month: 'long', year: 'numeric' });

  const daysInMonth = useMemo(() => new Date(year, month + 1, 0).getDate(), [year, month]);
  const startDow = useMemo(() => (new Date(year, month, 1).getDay() + 6) % 7, [year, month]); // Mon=0

  const toKey = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const parsedEvents = useMemo(() => {
    const monthMap = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };
    return (baseEvents ?? []).map((ev) => {
      const [monStr, dayStr] = String(ev.date ?? '').split(' ');
      const m = monthMap[monStr] ?? month;
      const day = Number(dayStr);
      const date = Number.isFinite(day) ? new Date(year, m, day) : new Date(year, month, 1);
      return { ...ev, _date: date, _key: toKey(date), _type: 'event' };
    });
  }, [month, year]);

  const calendarItems = useMemo(() => {
    const items = [];

    // Add public events
    parsedEvents.forEach((ev) => {
      items.push({
        id: `event-${ev.id}`,
        key: ev._key,
        when: ev.time,
        title: ev.title,
        subtitle: `${ev.format} · ${ev.domain}`,
        tone: ev.format === 'Virtual' ? 'teal' : 'violet',
        kind: 'Event',
        onOpen: () => navigate(`/${variant}/events/${ev.id}`),
      });
    });

    // Add sample sessions (attach them to the availability week dates in the current month)
    const anchorDates = (availabilityWeeks ?? []).map((d) => d.date).filter((n) => Number.isFinite(n));
    const sessionSeeds = baseSessions ?? [];
    anchorDates.slice(0, sessionSeeds.length).forEach((dayNum, idx) => {
      if (dayNum < 1 || dayNum > daysInMonth) return;
      const date = new Date(year, month, dayNum);
      const key = toKey(date);
      const session = sessionSeeds[idx];
      items.push({
        id: `session-${session.id}-${key}`,
        key,
        when: session.time,
        title: session.title,
        subtitle: session.detail,
        tone: 'amber',
        kind: 'Session',
        onOpen: () => navigate('/student/sessions'),
      });
    });

    return items;
  }, [daysInMonth, month, navigate, parsedEvents, variant, year]);

  const itemsByDay = useMemo(() => {
    const map = new Map();
    calendarItems.forEach((item) => {
      const arr = map.get(item.key) ?? [];
      arr.push(item);
      map.set(item.key, arr);
    });
    // Keep list stable: sort by time string if present
    map.forEach((arr, key) => {
      arr.sort((a, b) => String(a.when).localeCompare(String(b.when)));
      map.set(key, arr);
    });
    return map;
  }, [calendarItems]);

  const selectedKey = useMemo(() => toKey(selected), [selected]);
  const selectedItems = useMemo(() => itemsByDay.get(selectedKey) ?? [], [itemsByDay, selectedKey]);

  const upcomingCount = useMemo(() => calendarItems.length, [calendarItems.length]);
  const nextItem = useMemo(() => calendarItems[0] ?? null, [calendarItems]);

  const gotoPrev = () => {
    const next = new Date(year, month - 1, 1);
    setCursor(next);
    setSelected(new Date(next.getFullYear(), next.getMonth(), 1));
  };

  const gotoNext = () => {
    const next = new Date(year, month + 1, 1);
    setCursor(next);
    setSelected(new Date(next.getFullYear(), next.getMonth(), 1));
  };

  return (
    <AppShell
      variant={variant === 'pro' ? 'pro' : 'student'}
      title="Calendar"
      subtitle="See upcoming sessions and events at a glance."
      actions={
        <div className="pm-cal-actions">
          <Button variant="secondary" onClick={() => setSelected(new Date(today.getFullYear(), today.getMonth(), today.getDate()))}>
            Today
          </Button>
          <Button
            variant="primary"
            icon="plus"
            onClick={() => navigate(variant === 'pro' ? '/pro/events/host' : '/student/sessions')}
          >
            Schedule
          </Button>
        </div>
      }
    >
      <div className="pm-cal">
        <header className="pm-cal__head">
          <div className="pm-cal__month">
            <h1>{monthLabel}</h1>
            <div className="pm-cal__nav">
              <button className="pm-icon-button" type="button" aria-label="Previous month" onClick={gotoPrev}>
                <Icon name="chevron-left" size={18} />
              </button>
              <button className="pm-icon-button" type="button" aria-label="Next month" onClick={gotoNext}>
                <Icon name="chevron-right" size={18} />
              </button>
            </div>
          </div>

          <div className="pm-cal__stats">
            <div className="pm-cal-stat pm-card">
              <span>Upcoming</span>
              <strong>{upcomingCount}</strong>
            </div>
            <div className="pm-cal-stat pm-card">
              <span>Next</span>
              <strong>{nextItem?.when ?? '—'}</strong>
            </div>
          </div>
        </header>

        <div className="pm-cal__grid-wrap">
          <div className="pm-cal__dow" aria-hidden="true">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>

          <div className="pm-cal__grid" role="grid" aria-label="Month view">
            {Array.from({ length: startDow }).map((_, idx) => (
              <div key={`pad-${idx}`} className="pm-cal__cell pm-cal__cell--pad" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const date = new Date(year, month, dayNum);
              const key = toKey(date);
              const cellItems = itemsByDay.get(key) ?? [];
              const isSelected = selected.getFullYear() === year && selected.getMonth() === month && selected.getDate() === dayNum;
              const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === dayNum;

              return (
                <button
                  key={key}
                  type="button"
                  className={`pm-cal__cell ${isSelected ? 'is-selected' : ''} ${isToday ? 'is-today' : ''}`}
                  onClick={() => setSelected(date)}
                >
                  <div className="pm-cal__cell-top">
                    <span className="pm-cal__day">{dayNum}</span>
                    {cellItems.length ? <span className="pm-cal__dot" aria-hidden="true" /> : null}
                  </div>
                  <div className="pm-cal__cell-badges" aria-hidden="true">
                    {cellItems.slice(0, 2).map((item) => (
                      <span key={item.id} className={`pm-cal__pill pm-cal__pill--${item.kind.toLowerCase()}`}>
                        {item.kind}
                      </span>
                    ))}
                    {cellItems.length > 2 ? <span className="pm-cal__more">+{cellItems.length - 2}</span> : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <section className="pm-cal__agenda pm-panel" aria-label="Agenda">
          <div className="pm-cal__agenda-head">
            <div>
              <h2>Agenda</h2>
              <p>{selected.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</p>
            </div>
            <Button variant="ghost" onClick={() => navigate(variant === 'pro' ? '/pro/events' : '/student/events')}>
              View all <Icon name="chevron-right" size={16} />
            </Button>
          </div>

          {selectedItems.length === 0 ? (
            <div className="pm-cal__empty pm-card">
              <Badge tone="teal" variant="soft">
                No items
              </Badge>
              <h3>Nothing scheduled for this day.</h3>
              <p>Use Schedule to create a session or host an event.</p>
            </div>
          ) : (
            <div className="pm-cal__agenda-list" role="list">
              {selectedItems.map((item) => (
                <button key={item.id} type="button" className="pm-cal-item" onClick={item.onOpen}>
                  <div className="pm-cal-item__left">
                    <Badge tone={item.tone} variant="soft">
                      {item.kind}
                    </Badge>
                    <div className="pm-cal-item__meta">
                      <strong>{item.title}</strong>
                      <span>{item.subtitle}</span>
                    </div>
                  </div>
                  <div className="pm-cal-item__right">
                    <span className="pm-cal-item__time">{item.when}</span>
                    <Icon name="chevron-right" size={16} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
