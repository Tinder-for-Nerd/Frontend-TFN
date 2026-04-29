import { useState } from 'react';
import { Icon, Button } from '../ui';
import '../../styles/notifications.css';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'match',
      title: 'New match!',
      message: 'You matched with Maya Chen',
      timestamp: '5 min ago',
      read: false,
    },
    {
      id: 2,
      type: 'message',
      title: 'New message',
      message: 'Andre: "Lets connect tomorrow"',
      timestamp: '2h ago',
      read: false,
    },
    {
      id: 3,
      type: 'event',
      title: 'Event starting soon',
      message: 'Hackathon meetup starts in 1 hour',
      timestamp: '1d ago',
      read: true,
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case 'match':
        return 'spark';
      case 'message':
        return 'messages';
      case 'event':
        return 'calendar';
      default:
        return 'bell';
    }
  };

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <div className="pm-notifications-page">
      <header className="pm-notifications-header">
        <h1 className="pm-notifications-header__title">Notifications</h1>
        <Button variant="ghost" size="sm">
          Clear all
        </Button>
      </header>

      <div className="pm-notifications-list">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`pm-notification-item pm-notification-item--${
              notif.read ? 'read' : 'unread'
            }`}
            onClick={() => markAsRead(notif.id)}
          >
            <div className="pm-notification-icon">
              <Icon name={getIcon(notif.type)} />
            </div>
            <div className="pm-notification-content">
              <h3 className="pm-notification-title">{notif.title}</h3>
              <p className="pm-notification-message">{notif.message}</p>
              <span className="pm-notification-time">{notif.timestamp}</span>
            </div>
            {!notif.read && <div className="pm-notification-dot"></div>}
          </div>
        ))}
      </div>
    </div>
  );
}
