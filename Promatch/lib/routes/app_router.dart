import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'route_names.dart';
import 'auth_guard.dart';

final GlobalKey<NavigatorState> _rootNavigator = GlobalKey<NavigatorState>(debugLabel: 'root');

final appRouter = GoRouter(
  navigatorKey: _rootNavigator,
  initialLocation: '/',
  debugLogDiagnostics: true,
  redirect: AuthGuard.redirect,
  routes: [
    // Public Routes
    GoRoute(
      path: '/',
      name: RouteNames.landing,
      builder: (_, __) => const Placeholder(), // LandingPage
    ),
    GoRoute(
      path: '/features',
      name: RouteNames.features,
      builder: (_, __) => const Placeholder(), // FeaturesPage
    ),
    GoRoute(
      path: '/about',
      name: RouteNames.about,
      builder: (_, __) => const Placeholder(), // AboutPage
    ),
    GoRoute(
      path: '/contact',
      name: RouteNames.contact,
      builder: (_, __) => const Placeholder(), // ContactPage
    ),

    // Auth Routes
    GoRoute(
      path: '/login',
      name: RouteNames.roleSelector,
      builder: (_, __) => const Placeholder(), // RoleSelectorPage
    ),
    GoRoute(
      path: '/login/:rolePath',
      name: RouteNames.login,
      builder: (_, state) => const Placeholder(), // LoginPage
    ),
    GoRoute(
      path: '/signup/:rolePath',
      name: RouteNames.signup,
      builder: (_, state) => const Placeholder(), // LoginPage(signup)
    ),

    // Student Routes
    GoRoute(
      path: '/student/home',
      name: RouteNames.studentHome,
      builder: (_, __) => const Placeholder(), // StudentHomePage
    ),
    GoRoute(
      path: '/student/discover',
      name: RouteNames.studentDiscover,
      builder: (_, __) => const Placeholder(), // DiscoverPage
    ),
    GoRoute(
      path: '/student/feed',
      name: RouteNames.studentFeed,
      builder: (_, __) => const Placeholder(), // StudentFeedPage
    ),
    GoRoute(
      path: '/student/messages',
      name: RouteNames.studentMessages,
      builder: (_, __) => const Placeholder(), // MessagesPage
      routes: [
        GoRoute(
          path: ':threadId',
          name: RouteNames.studentMessageThread,
          builder: (_, state) => const Placeholder(), // MessageDetail
        ),
      ],
    ),
    GoRoute(
      path: '/student/connections',
      name: RouteNames.studentConnections,
      builder: (_, __) => const Placeholder(), // ConnectionsPage
    ),
    GoRoute(
      path: '/student/progress',
      name: RouteNames.studentProgress,
      builder: (_, __) => const Placeholder(), // StudentProgressPage
    ),

    // Professional Routes
    GoRoute(
      path: '/pro/overview',
      name: RouteNames.proOverview,
      builder: (_, __) => const Placeholder(), // ProOverviewPage
    ),
    GoRoute(
      path: '/pro/inbox',
      name: RouteNames.proInbox,
      builder: (_, __) => const Placeholder(), // ProInboxPage
    ),
    GoRoute(
      path: '/pro/calendar',
      name: RouteNames.proCalendar,
      builder: (_, __) => const Placeholder(), // ProCalendarPage
    ),
    GoRoute(
      path: '/pro/analytics',
      name: RouteNames.proAnalytics,
      builder: (_, __) => const Placeholder(), // ProAnalyticsPage
    ),
    GoRoute(
      path: '/pro/company',
      name: RouteNames.proCompany,
      builder: (_, __) => const Placeholder(), // ProCompanyPage
    ),

    // Organization Routes
    GoRoute(
      path: '/org/dashboard',
      name: RouteNames.orgDashboard,
      builder: (_, __) => const Placeholder(), // OrgDashboardPage
    ),
    GoRoute(
      path: '/org/settings',
      name: RouteNames.orgSettings,
      builder: (_, __) => const Placeholder(), // OrgSettingsPage
    ),

    // Shared Routes
    GoRoute(
      path: '/profile/:username',
      name: RouteNames.profile,
      builder: (_, state) => const Placeholder(), // ProfilePage
    ),
    GoRoute(
      path: '/notifications',
      name: RouteNames.notifications,
      builder: (_, __) => const Placeholder(), // NotificationsPage
    ),
    GoRoute(
      path: '/events',
      name: RouteNames.events,
      builder: (_, __) => const Placeholder(), // EventsPage
    ),
    GoRoute(
      path: '/events/:eventId',
      name: RouteNames.eventDetail,
      builder: (_, state) => const Placeholder(), // EventDetailPage
    ),
    GoRoute(
      path: '/messages',
      name: RouteNames.messages,
      builder: (_, __) => const Placeholder(), // MessagesPage
      routes: [
        GoRoute(
          path: ':threadId',
          name: RouteNames.messageDetail,
          builder: (_, state) => const Placeholder(), // MessageDetailPage
        ),
      ],
    ),
    GoRoute(
      path: '/settings',
      name: RouteNames.settings,
      builder: (_, __) => const Placeholder(), // SettingsPage
    ),
    GoRoute(
      path: '/settings/profile',
      name: RouteNames.profileSettings,
      builder: (_, __) => const Placeholder(),
    ),
    GoRoute(
      path: '/settings/account',
      name: RouteNames.accountSettings,
      builder: (_, __) => const Placeholder(),
    ),
    GoRoute(
      path: '/settings/notifications',
      name: RouteNames.notificationSettings,
      builder: (_, __) => const Placeholder(),
    ),
    GoRoute(
      path: '/settings/privacy',
      name: RouteNames.privacySettings,
      builder: (_, __) => const Placeholder(),
    ),
    GoRoute(
      path: '/settings/appearance',
      name: RouteNames.appearanceSettings,
      builder: (_, __) => const Placeholder(),
    ),
    GoRoute(
      path: '/settings/billing',
      name: RouteNames.billingSettings,
      builder: (_, __) => const Placeholder(),
    ),
    GoRoute(
      path: '/sessions',
      name: RouteNames.sessions,
      builder: (_, __) => const Placeholder(), // SessionsPage
    ),
    GoRoute(
      path: '/billing/pro',
      name: RouteNames.proCheckout,
      builder: (_, __) => const Placeholder(), // ProCheckoutPage
    ),
    GoRoute(
      path: '/analytics',
      name: RouteNames.analytics,
      builder: (_, __) => const Placeholder(), // AnalyticsPage
    ),
    GoRoute(
      path: '/onboarding/:step',
      name: RouteNames.onboarding,
      builder: (_, state) => const Placeholder(), // OnboardingPage
    ),
  ],
);
