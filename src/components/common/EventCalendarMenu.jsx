import { useEffect, useRef, useState } from 'react';
import '../../styles/event-calendar-menu.css';
import { Button } from '../ui';
import { downloadIcsFile, getEventCalendarLinks } from '../../utils/eventCalendar';

export function EventCalendarMenu({
  event,
  variant = 'secondary',
  size = 'lg',
  label = 'Add to Calendar',
  className = '',
  menuClassName = 'pm-event-calendar-menu',
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const links = getEventCalendarLinks(event);

  useEffect(() => {
    if (!open) return undefined;

    const handlePointerDown = (pointerEvent) => {
      if (!rootRef.current?.contains(pointerEvent.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (keyboardEvent) => {
      if (keyboardEvent.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const handleIcsDownload = () => {
    downloadIcsFile(event);
    setOpen(false);
  };

  if (!links.hasLinks) {
    return (
      <Button variant={variant} size={size} icon="calendar" className={className} disabled>
        {label}
      </Button>
    );
  }

  return (
    <div className={`${menuClassName} ${className}`.trim()} ref={rootRef}>
      <Button
        variant={variant}
        size={size}
        icon="calendar"
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((value) => !value)}
      >
        {label}
      </Button>

      {open ? (
        <div className="pm-event-calendar-menu__panel" role="menu" aria-label="Calendar options">
          {links.google ? (
            <a
              className="pm-event-calendar-menu__item"
              role="menuitem"
              href={links.google}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Google Calendar
            </a>
          ) : null}

          {links.outlook ? (
            <a
              className="pm-event-calendar-menu__item"
              role="menuitem"
              href={links.outlook}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              Outlook Calendar
            </a>
          ) : null}

          {links.linkedin ? (
            <a
              className="pm-event-calendar-menu__item pm-event-calendar-menu__item--linkedin"
              role="menuitem"
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              LinkedIn Event
            </a>
          ) : null}

          <button
            type="button"
            className="pm-event-calendar-menu__item"
            role="menuitem"
            onClick={handleIcsDownload}
          >
            Download .ics (Apple / other)
          </button>
        </div>
      ) : null}
    </div>
  );
}
