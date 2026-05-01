import { useState } from 'react';
import { Button, Icon } from '../../../components/ui';
import '../../../styles/calendar.css';

export function CalendarPage() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Call with Maya',
      time: '2:00 PM',
      duration: '30 min',
      participant: 'Maya Chen',
      status: 'confirmed',
    },
    {
      id: 2,
      title: 'Hackathon meetup',
      time: '6:00 PM',
      duration: '2h',
      participant: 'Tech community',
      status: 'upcoming',
    },
  ]);

  return (
    <div className="pm-calendar-page">
      <header className="pm-calendar-header">
        <h1 className="pm-calendar-header__title">Calendar</h1>
        <Button variant="primary" size="sm">
          <Icon name="plus" />
          Schedule
        </Button>
      </header>

      <div className="pm-calendar-stats">
        <div className="pm-stat-card">
          <p className="pm-stat-label">This week</p>
          <p className="pm-stat-value">{events.length}</p>
        </div>
        <div className="pm-stat-card">
          <p className="pm-stat-label">Next call</p>
          <p className="pm-stat-value">{events[0].time}</p>
        </div>
      </div>

      <div className="pm-events-list">
        <h2 className="pm-events-list__title">Upcoming</h2>
        {events.map((event) => (
          <div key={event.id} className={`pm-event-card pm-event-card--${event.status}`}>
            <div className="pm-event-time">
              <span className="pm-event-hour">{event.time.split(':')[0]}</span>
              <span className="pm-event-ampm">{event.time.includes('PM') ? 'PM' : 'AM'}</span>
            </div>
            <div className="pm-event-content">
              <h3 className="pm-event-title">{event.title}</h3>
              <p className="pm-event-participant">{event.participant}</p>
              <span className="pm-event-duration">{event.duration}</span>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="chevron-right" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
