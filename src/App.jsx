import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';

// Modular Page Imports
import { LandingPage, FeaturesPage, AboutPage, ContactPage } from './modules/public/pages';
import { LoginPage } from './modules/auth/pages';
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
  CallPage
} from './modules/dashboard/pages';
import { StudentHomePage, StudentProgressPage } from './modules/student/pages';
import { 
  ProOverviewPage, 
  NetworkPage, 
  ProInboxPage, 
  ProCalendarPage, 
  ProAnalyticsPage, 
  ProCompanyPage 
} from './modules/pro/pages';

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage mode="login" />} />
        <Route path="/signup" element={<LoginPage mode="signup" />} />
        <Route path="/onboarding" element={<Navigate to="/onboarding/step-1" replace />} />
        <Route path="/onboarding/:step" element={<OnboardingPage />} />

        {/* Dashboard Pages */}
        <Route path="/dashboard/feed" element={<FeedPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/messages" element={<MessagesPage />} />
        <Route path="/dashboard/connections" element={<ConnectionsPage />} />
        <Route path="/dashboard/calendar" element={<CalendarPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/notifications" element={<NotificationsPage />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />

        {/* Student Domain */}
        <Route path="/student" element={<Navigate to="/student/home" replace />} />
        <Route path="/student/home" element={<StudentHomePage />} />
        <Route path="/student/discover" element={<DiscoverPage variant="student" />} />
        <Route path="/student/connections" element={<ConnectionsPage />} />
        <Route path="/student/messages" element={<MessagesPage variant="student" />} />
        <Route path="/student/messages/:threadId" element={<MessagesPage variant="student" />} />
        <Route path="/student/sessions" element={<SessionsPage />} />
        <Route path="/student/events" element={<EventsPage variant="student" />} />
        <Route path="/student/events/:eventId" element={<EventsPage variant="student" />} />
        <Route path="/student/progress" element={<StudentProgressPage />} />

        {/* Pro Domain */}
        <Route path="/pro" element={<Navigate to="/pro/overview" replace />} />
        <Route path="/pro/overview" element={<ProOverviewPage />} />
        <Route path="/pro/discover" element={<DiscoverPage variant="pro" />} />
        <Route path="/pro/network" element={<NetworkPage />} />
        <Route path="/pro/inbox" element={<ProInboxPage />} />
        <Route path="/pro/inbox/:threadId" element={<ProInboxPage />} />
        <Route path="/pro/calendar" element={<ProCalendarPage />} />
        <Route path="/pro/events" element={<EventsPage variant="pro" />} />
        <Route path="/pro/events/:eventId" element={<EventsPage variant="pro" />} />
        <Route path="/pro/analytics" element={<ProAnalyticsPage />} />
        <Route path="/pro/company" element={<ProCompanyPage />} />

        {/* Shared and Catch-all */}
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call/:sessionId" element={<CallPage />} />

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
  );
}