import { cx } from '../../utils/helpers';

export function Icon({ name, size = 18, className = '', ...props }) {
  const incomingStyle = props.style || {};
  const common = {
    className: cx('pm-icon', className),
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
    ...props,
    style: {
      '--pm-icon-size': `${size}px`,
      ...incomingStyle,
    },
  };

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M4 11.5 12 4l8 7.5" />
          <path d="M6 10.5V20h12v-9.5" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...common}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
          <path d="M4 18l1.2 3.2L8 22l-2.8.8L4 26" />
        </svg>
      );
    case 'messages':
      return (
        <svg {...common}>
          <path d="M5 6h14v10H8l-3 3V6z" />
          <path d="M8 10h8" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="3" />
          <path d="M8 3v4M16 3v4M4 10h16" />
        </svg>
      );
    case 'events':
      return (
        <svg {...common}>
          <path d="M4 8h16" />
          <path d="M7 4v4M17 4v4" />
          <path d="M5 6.5h14v13H5z" />
        </svg>
      );
    case 'connections':
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="2.5" />
          <circle cx="16" cy="8" r="2.5" />
          <circle cx="12" cy="16" r="2.5" />
          <path d="M9.8 9.2 11 12M14.2 9.2 13 12" />
        </svg>
      );
    case 'profile':
      return (
        <svg {...common}>
          <circle cx="12" cy="8.5" r="3.5" />
          <path d="M5 20c1.8-3.8 4.5-5.7 7-5.7s5.2 1.9 7 5.7" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M4 12h2m12 0h2M12 4v2m0 12v2M6.6 6.6 8 8m8 0 1.4-1.4M6.6 17.4 8 16m8 0 1.4 1.4" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...common}>
          <path d="M4 19h16" />
          <rect x="6" y="11" width="3" height="8" rx="1.2" />
          <rect x="11" y="8" width="3" height="11" rx="1.2" />
          <rect x="16" y="5" width="3" height="14" rx="1.2" />
        </svg>
      );
    case 'company':
      return (
        <svg {...common}>
          <path d="M4 20V6h8v14" />
          <path d="M12 20V10h8v10" />
          <path d="M7 9h2M7 13h2M7 17h2M15 13h2M15 17h2" />
        </svg>
      );
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="5.5" />
          <path d="M20 20l-3.8-3.8" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...common}>
          <path d="M12 4a4 4 0 0 0-4 4v2.4c0 .9-.3 1.8-.8 2.5L6 14.4V16h12v-1.6l-1.2-2.5c-.5-.7-.8-1.6-.8-2.5V8a4 4 0 0 0-4-4z" />
          <path d="M10.5 18a1.5 1.5 0 0 0 3 0" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case 'close':
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      );
    case 'check-circle':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m8.5 12.2 2.3 2.3 4.8-5" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'phone':
      return (
        <svg {...common}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case 'video':
      return (
        <svg {...common}>
          <path d="m22 8-6 4 6 4V8z" />
          <rect x="2" y="6" width="14" height="12" rx="2" ry="2" />
        </svg>
      );
    case 'more':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="5" cy="12" r="1" />
        </svg>
      );
    case 'smile':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      );
    case 'microphone':
      return (
        <svg {...common}>
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      );
    case 'check-double':
      return (
        <svg {...common}>
          <path d="M18 6 7 17l-5-5" />
          <path d="m22 10-7.5 7.5L13 16" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg {...common}>
          <path d="m9 5 6 7-6 7" />
        </svg>
      );
    case 'chevron-left':
      return (
        <svg {...common}>
          <path d="m15 5-6 7 6 7" />
        </svg>
      );
    case 'chevron-down':
      return (
        <svg {...common}>
          <path d="m5 9 7 6 7-6" />
        </svg>
      );
    case 'chevron-up':
      return (
        <svg {...common}>
          <path d="m5 15 7-6 7 6" />
        </svg>
      );
    case 'arrow-up':
      return (
        <svg {...common}>
          <path d="M12 19V5" />
          <path d="m5 12 7-7 7 7" />
        </svg>
      );
    case 'arrow-down':
      return (
        <svg {...common}>
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      );
    case 'history':
      return (
        <svg {...common}>
          <path d="M3 12a9 9 0 1 0 3-6.7" />
          <path d="M3 4v5h5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case 'logout':
      return (
        <svg {...common}>
          <path d="M10 7V5a1 1 0 0 1 1-1h7v16h-7a1 1 0 0 1-1-1v-2" />
          <path d="M3 12h10m-3-3 3 3-3 3" />
        </svg>
      );
    case 'send':
      return (
        <svg {...common}>
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      );
    case 'message-circle':
      return (
        <svg {...common}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L21 3.5Z" />
        </svg>
      );
    case 'repeat':
      return (
        <svg {...common}>
          <path d="M17 2l4 4-4 4" />
          <path d="M3 11V9a4 4 0 0 1 4-4h14" />
          <path d="M7 22l-4-4 4-4" />
          <path d="M21 13v2a4 4 0 0 1-4 4H3" />
        </svg>
      );
    case 'thumbs-up':
      return (
        <svg {...common}>
          <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          <path d="M14 10V5a3 3 0 0 0-3-3l-1 7" />
          <path d="M7 10h8a2 2 0 0 1 2 2l-1 7a2 2 0 0 1-2 2H7V10z" />
        </svg>
      );
    default:
      return null;
  }
}
