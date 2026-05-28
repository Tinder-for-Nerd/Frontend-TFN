import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';


// Modular Page Imports
import { LandingPage, FeaturesPage, AboutPage, ContactPage } from './modules/public/pages';
import { LoginPage, LogoutPage } from './modules/auth/pages';
import { OnboardingPage } from './modules/onboarding/pages';
import { 
  FeedPage, 
  ProfilePage, 
  MessagesPage, 
  ConnectionsPage, 
  CalendarPage, 
  SettingsPage, 
  NotificationsPage, 
  AnalyticsPage,
  DiscoverPage,
  SessionsPage,
  EventsPage,
  EventDetailPage,
  HostEventPage,
  CreateOpportunityPage,
  OrganizerDashboardPage,
  CallPage
} from './modules/dashboard/pages';
import { StudentHomePage, StudentProgressPage, StudentFeedPage, StudentBillingPage } from './modules/student/pages';
import { 
  ProOverviewPage, 
  NetworkPage, 
  ProInboxPage, 
  ProCalendarPage, 
  ProAnalyticsPage, 
  ProCompanyPage 
} from './modules/pro/pages';

// Helper: wrap element with ProtectedRoute
const P = ({ children }) => <ProtectedRoute>{children}</ProtectedRoute>;

// Helper for Legacy Routes
function LegacyChatRoute() {
  const { threadId } = useParams();
  return <Navigate to={`/student/messages/${threadId || 'sarah-chen'}`} replace />;
}

function LegacyBookingRoute() {
  return <Navigate to="/student/sessions" replace />;
}

function LegacyDiscoverRoute() {
  return <Navigate to="/student/discover" replace />;
}

function LegacyMatchesRoute() {
  return <Navigate to="/student/connections" replace />;
}

function LegacyEventsRoute() {
  const { eventId } = useParams();
  return <Navigate to={`/student/events/${eventId || 'career-night'}`} replace />;
}

function LegacyProfileRoute() {
  const { userId } = useParams();
  return <Navigate to={`/profile/${userId || 'me'}`} replace />;
}

function ScrollLockSafeguard() {
  const location = useLocation();

  useEffect(() => {
    // 1. Clear any inline style scroll locks on body/html
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    }
    if (document.documentElement.style.overflow === 'hidden') {
      document.documentElement.style.overflow = '';
    }

    // 2. Clear discover scroll lock classes if we are not on a discover route
    const isDiscover = location.pathname.includes('/discover');
    if (!isDiscover) {
      document.documentElement.classList.remove('pm-discover-page-active', 'pm-scroll-locked');
      document.body.classList.remove('pm-discover-page-active', 'pm-scroll-locked');
    }
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollLockSafeguard />
        <Routes>
          {/* Public pages — accessible without login */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage mode="login" />} />
          <Route path="/signup" element={<LoginPage mode="signup" />} />
          <Route path="/logout" element={<LogoutPage />} />

          {/* Protected: Onboarding */}
          <Route path="/onboarding" element={<P><OnboardingPage /></P>} />
          <Route path="/onboarding/:step" element={<P><OnboardingPage /></P>} />

          {/* Protected: Dashboard Pages */}
          <Route path="/dashboard/feed" element={<P><FeedPage /></P>} />
          <Route path="/dashboard/profile" element={<P><ProfilePage /></P>} />
          <Route path="/dashboard/messages" element={<P><MessagesPage /></P>} />
          <Route path="/dashboard/connections" element={<P><ConnectionsPage /></P>} />
          <Route path="/dashboard/calendar" element={<P><CalendarPage variant="student" /></P>} />
          <Route path="/dashboard/settings" element={<P><SettingsPage /></P>} />
          <Route path="/dashboard/notifications" element={<P><NotificationsPage /></P>} />
          <Route path="/dashboard/analytics" element={<P><AnalyticsPage /></P>} />

          {/* Protected: Student Domain */}
          <Route path="/student" element={<Navigate to="/student/home" replace />} />
          <Route path="/student/home" element={<P><StudentHomePage /></P>} />
          <Route path="/student/feed" element={<P><StudentFeedPage /></P>} />
          <Route path="/student/discover" element={<P><DiscoverPage variant="student" /></P>} />
          <Route path="/student/connections" element={<P><ConnectionsPage /></P>} />
          <Route path="/student/messages" element={<P><MessagesPage variant="student" /></P>} />
          <Route path="/student/messages/:threadId" element={<P><MessagesPage variant="student" /></P>} />
          <Route path="/student/sessions" element={<P><SessionsPage /></P>} />
          <Route path="/student/billing" element={<P><StudentBillingPage /></P>} />
          <Route path="/student/events" element={<P><EventsPage variant="student" /></P>} />
          <Route path="/student/events/organizer" element={<P><OrganizerDashboardPage variant="student" /></P>} />
          <Route path="/student/events/host" element={<P><HostEventPage variant="student" /></P>} />
          <Route path="/student/events/create-opportunity" element={<P><CreateOpportunityPage variant="student" /></P>} />
          <Route path="/student/events/:eventId" element={<P><EventDetailPage variant="student" /></P>} />
          <Route path="/student/progress" element={<P><StudentProgressPage /></P>} />
          <Route path="/student/settings" element={<P><SettingsPage variant="student" /></P>} />

          {/* Protected: Pro Domain */}
          <Route path="/pro" element={<Navigate to="/pro/overview" replace />} />
          <Route path="/pro/overview" element={<P><ProOverviewPage /></P>} />
          <Route path="/pro/discover" element={<P><DiscoverPage variant="pro" /></P>} />
          <Route path="/pro/network" element={<P><NetworkPage /></P>} />
          <Route path="/pro/inbox" element={<P><ProInboxPage /></P>} />
          <Route path="/pro/inbox/:threadId" element={<P><ProInboxPage /></P>} />
          <Route path="/pro/calendar" element={<P><ProCalendarPage /></P>} />
          <Route path="/pro/events" element={<P><EventsPage variant="pro" /></P>} />
          <Route path="/pro/events/organizer" element={<P><OrganizerDashboardPage variant="pro" /></P>} />
          <Route path="/pro/events/host" element={<P><HostEventPage variant="pro" /></P>} />
          <Route path="/pro/events/create-opportunity" element={<P><CreateOpportunityPage variant="pro" /></P>} />
          <Route path="/pro/events/:eventId" element={<P><EventDetailPage variant="pro" /></P>} />
          <Route path="/pro/analytics" element={<P><ProAnalyticsPage /></P>} />
          <Route path="/pro/company" element={<P><ProCompanyPage /></P>} />
          <Route path="/pro/profile/:username" element={<P><ProfilePage variant="pro" /></P>} />
          <Route path="/pro/settings" element={<P><SettingsPage variant="pro" /></P>} />

          {/* Protected: Shared */}
          <Route path="/profile/:username" element={<P><ProfilePage variant="student" /></P>} />
          <Route path="/settings" element={<Navigate to="/student/settings" replace />} />
          <Route path="/notifications" element={<P><NotificationsPage /></P>} />
          <Route path="/call/:sessionId" element={<P><CallPage /></P>} />

          {/* Redirects */}
          <Route path="/feed" element={<Navigate to="/student/discover" replace />} />
          <Route path="/connections" element={<Navigate to="/student/connections" replace />} />
          <Route path="/messages" element={<Navigate to="/student/messages" replace />} />
          <Route path="/bookings" element={<Navigate to="/student/sessions" replace />} />
          <Route path="/events" element={<Navigate to="/student/events" replace />} />
          <Route path="/profile" element={<Navigate to="/profile/me" replace />} />

          {/* Legacy Support */}
          <Route path="/discover" element={<LegacyDiscoverRoute />} />
          <Route path="/matches" element={<LegacyMatchesRoute />} />
          <Route path="/chat" element={<LegacyChatRoute />} />
          <Route path="/chat/:threadId" element={<LegacyChatRoute />} />
          <Route path="/booking" element={<LegacyBookingRoute />} />
          <Route path="/booking/:professionalId" element={<LegacyBookingRoute />} />
          <Route path="/events/:eventId" element={<LegacyEventsRoute />} />
          <Route path="/profile/:userId" element={<LegacyProfileRoute />} />
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
