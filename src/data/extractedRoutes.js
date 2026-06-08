function LoginRoute() {
  return <LoginPage mode="login" />;
}

function SignupRoute() {
  return <LoginPage mode="signup" />;
}

function StudentHomeRoute() {
  return <StudentHomePage />;
}

function StudentDiscoverRoute() {
  return <DiscoverPage variant="student" />;
}

function StudentConnectionsRoute() {
  return <ConnectionsPage />;
}

function StudentMessagesRoute() {
  return <MessagesPage variant="student" />;
}

function StudentSessionsRoute() {
  return <SessionsPage />;
}

function StudentEventsRoute() {
  return <EventsPage variant="student" />;
}

function StudentProgressRoute() {
  return <StudentProgressPage />;
}

function ProOverviewRoute() {
  return <ProOverviewPage />;
}

function ProDiscoverRoute() {
  return <DiscoverPage variant="pro" />;
}

function ProNetworkRoute() {
  return <NetworkPage />;
}

function ProInboxRoute() {
  return <ProInboxPage />;
}

function ProCalendarRoute() {
  return <ProCalendarPage />;
}

function ProEventsRoute() {
  return <EventsPage variant="pro" />;
}

function ProAnalyticsRoute() {
  return <ProAnalyticsPage />;
}

function ProCompanyRoute() {
  return <ProCompanyPage />;
}

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