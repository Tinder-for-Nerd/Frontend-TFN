import { useNavigate } from 'react-router-dom';
import { Icon, Button } from '../../../components/ui';
import { AppShell } from '../../../components/layout';
import { useSocketContext } from '../../../context/SocketProvider';
import '../../../styles/notifications.css';

function getIcon(type) {
  switch (type) {
    case 'match':
      return 'spark';
    case 'message':
      return 'messages';
    case 'event':
      return 'calendar';
    case 'booking':
    case 'session':
      return 'video';
    case 'analytics':
    case 'profile_view':
      return 'chart';
    case 'connection':
      return 'connections';
    default:
      return 'bell';
  }
}

export function NotificationsPage() {
  const navigate = useNavigate();
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    clearAll,
  } = useSocketContext();

  const handleClick = (item) => {
    markAsRead(item.id);
    if (item.link) navigate(item.link);
  };

  return (
    <AppShell title="Notifications" variant="student">
      <div className="pm-notifications-page">
        <header className="pm-notifications-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Button
              variant="secondary"
              size="sm"
              icon="chevron-left"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <h1 className="pm-notifications-header__title">
              Notifications
              {unreadCount > 0 ? (
                <span className="pm-notifications-header__count">{unreadCount}</span>
              ) : null}
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {unreadCount > 0 ? (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            ) : null}
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear all
            </Button>
          </div>
        </header>

        <div className="pm-notifications-list">
          {notifications.length === 0 ? (
            <p className="pm-notifications-empty">No notifications yet.</p>
          ) : (
            notifications.map((notif) => (
              <button
                key={notif.id}
                type="button"
                className={`pm-notification-item pm-notification-item--${
                  notif.read ? 'read' : 'unread'
                }`}
                onClick={() => handleClick(notif)}
              >
                <div className="pm-notification-icon">
                  <Icon name={getIcon(notif.type)} />
                </div>
                <div className="pm-notification-content">
                  <h3 className="pm-notification-title">{notif.title}</h3>
                  <p className="pm-notification-message">{notif.message}</p>
                  <span className="pm-notification-time">{notif.timestamp}</span>
                </div>
                {!notif.read ? <div className="pm-notification-dot" /> : null}
              </button>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
