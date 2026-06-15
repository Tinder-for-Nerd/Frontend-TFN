import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Icon } from '../ui';
import { useSocketContext } from '../../context/SocketProvider';

function getNotificationIcon(type) {
  switch (type) {
    case 'match':
      return 'spark';
    case 'message':
      return 'messages';
    case 'event':
      return 'calendar';
    case 'booking':
      return 'calendar';
    default:
      return 'bell';
  }
}

export function NotificationCenter({ href = '/notifications', className = '' }) {
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const [open, setOpen] = useState(false);
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
  } = useSocketContext();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        close();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [close, open]);

  const handleItemClick = (item) => {
    markAsRead(item.id);
    close();
    if (item.link) {
      navigate(item.link);
    }
  };

  const preview = notifications.slice(0, 6);

  return (
    <div className={`notif-center ${className}`.trim()} ref={panelRef}>
      <button
        type="button"
        className={`notif-center__trigger site-header__icon-btn${open ? ' is-active' : ''}`}
        aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        <Bell size={20} />
        {unreadCount > 0 ? (
          <span className="notif-center__badge" aria-hidden="true">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="notif-center__panel" role="menu" aria-label="Notifications">
          <header className="notif-center__head">
            <h2>Notifications</h2>
            {unreadCount > 0 ? (
              <button type="button" className="notif-center__mark-all" onClick={markAllAsRead}>
                Mark all read
              </button>
            ) : null}
          </header>

          <div className="notif-center__list">
            {preview.length === 0 ? (
              <p className="notif-center__empty">You&apos;re all caught up.</p>
            ) : (
              preview.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="menuitem"
                  className={`notif-center__item${item.read ? '' : ' is-unread'}`}
                  onClick={() => handleItemClick(item)}
                >
                  <span className="notif-center__icon">
                    <Icon name={getNotificationIcon(item.type)} />
                  </span>
                  <span className="notif-center__copy">
                    <strong>{item.title}</strong>
                    <span>{item.message}</span>
                    <em>{item.timestamp}</em>
                  </span>
                  {!item.read ? <span className="notif-center__dot" aria-hidden="true" /> : null}
                </button>
              ))
            )}
          </div>

          <footer className="notif-center__foot">
            <Link to={href} className="notif-center__view-all" onClick={close}>
              View all notifications
            </Link>
          </footer>
        </div>
      ) : null}
    </div>
  );
}
