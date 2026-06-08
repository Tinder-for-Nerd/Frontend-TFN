import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Global design system — provides all CSS custom properties, component styles, and layout
import './styles/tinderfornerds-dark.css';
import './styles/site-nav.css';
import './styles/instagram-feed.css';
import './styles/messages.css';
import './styles/premium-messages.css';
import './styles/login.css';
import './styles/feed.css';
import './styles/profile.css';
import './styles/calendar.css';
import './styles/settings.css';
import './styles/notifications.css';
import './styles/analytics.css';
import './styles/landing.css';
import './styles/features.css';
import './styles/about.css';
import './styles/contact.css';

import './styles/event-detail.css';
import './styles/event-calendar-menu.css';
/* Layout overrides — must load last to win over page-specific CSS */
import './styles/site-layout.css';
document.body.classList.add('pm-light-theme');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
