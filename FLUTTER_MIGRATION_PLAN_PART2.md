# ProMatch (Tinder for Nerds) — Flutter Migration Plan (Part 2/4)

## 5. Routing Architecture | 6. State Management Map

---

# 5. ROUTING ARCHITECTURE

## 5.1 GoRouter Configuration

```dart
// lib/routes/app_router.dart
final appRouter = GoRouter(
  initialLocation: '/',
  debugLogDiagnostics: true,
  redirect: authGuard,
  routes: [
    // Public Routes
    GoRoute(
      path: '/',
      name: RouteNames.landing,
      builder: (_, __) => const LandingPage(),
    ),
    GoRoute(
      path: '/features',
      name: RouteNames.features,
      builder: (_, __) => const FeaturesPage(),
    ),
    GoRoute(
      path: '/about',
      name: RouteNames.about,
      builder: (_, __) => const AboutPage(),
    ),
    GoRoute(
      path: '/contact',
      name: RouteNames.contact,
      builder: (_, __) => const ContactPage(),
    ),

    // Auth Routes
    GoRoute(
      path: '/login',
      name: RouteNames.roleSelector,
      builder: (_, __) => const RoleSelectorPage(),
    ),
    GoRoute(
      path: '/login/:rolePath',
      name: RouteNames.login,
      builder: (_, state) => LoginPage(
        mode: 'login',
        rolePath: state.pathParameters['rolePath']!,
      ),
    ),
    GoRoute(
      path: '/signup/:rolePath',
      name: RouteNames.signup,
      builder: (_, state) => LoginPage(
        mode: 'signup',
        rolePath: state.pathParameters['rolePath']!,
      ),
    ),
    GoRoute(
      path: '/logout',
      name: RouteNames.logout,
      builder: (_, __) => const LogoutPage(),
    ),

    // Protected: Onboarding
    GoRoute(
      path: '/onboarding/:step',
      name: RouteNames.onboarding,
      builder: (_, state) => OnboardingPage(
        step: state.pathParameters['step']!,
      ),
    ),

    // Protected: Shared Routes
    GoRoute(
      path: '/profile/:username',
      name: RouteNames.profile,
      builder: (_, state) => ProfilePage(
        username: state.pathParameters['username']!,
      ),
    ),
    GoRoute(
      path: '/notifications',
      name: RouteNames.notifications,
      builder: (_, __) => const NotificationsPage(),
    ),

    // Student Shell
    ShellRoute(
      builder: (_, __, child) => StudentShell(child: child),
      routes: [
        GoRoute(path: '/student/home', name: RouteNames.studentHome, builder: (_, __) => const StudentHomePage()),
        GoRoute(path: '/student/discover', name: RouteNames.studentDiscover, builder: (_, __) => const DiscoverPage(variant: 'student')),
        GoRoute(path: '/student/feed', name: RouteNames.studentFeed, builder: (_, __) => const StudentFeedPage()),
        GoRoute(path: '/student/messages', name: RouteNames.studentMessages, builder: (_, __) => const MessagesPage(variant: 'student'),
          routes: [GoRoute(path: ':threadId', name: RouteNames.studentMessageThread, builder: (_, state) => MessagesPage(variant: 'student', threadId: state.pathParameters['threadId']))]),
        GoRoute(path: '/student/connections', name: RouteNames.studentConnections, builder: (_, __) => const ConnectionsPage()),
        GoRoute(path: '/student/events', name: RouteNames.studentEvents, builder: (_, __) => const EventsPage(variant: 'student'),
          routes: [
            GoRoute(path: ':eventId', name: RouteNames.studentEventDetail, builder: (_, state) => EventDetailPage(eventId: state.pathParameters['eventId']!)),
            GoRoute(path: 'host', name: RouteNames.studentHostEvent, builder: (_, __) => const HostEventPage(variant: 'student')),
            GoRoute(path: 'organizer', name: RouteNames.studentOrganizerDashboard, builder: (_, __) => const OrganizerDashboardPage(variant: 'student')),
          ]),
        GoRoute(path: '/student/sessions', name: RouteNames.studentSessions, builder: (_, __) => const SessionsPage()),
        GoRoute(path: '/student/search', name: RouteNames.studentSearch, builder: (_, __) => const ProfessionalSearchPage()),
        GoRoute(path: '/student/progress', name: RouteNames.studentProgress, builder: (_, __) => const StudentProgressPage()),
        GoRoute(path: '/student/billing', name: RouteNames.studentBilling, builder: (_, __) => const StudentBillingPage()),
        GoRoute(path: '/student/settings', name: RouteNames.studentSettings, builder: (_, __) => const SettingsPage(variant: 'student')),
      ],
    ),

    // Professional Shell
    ShellRoute(
      builder: (_, __, child) => ProShell(child: child),
      routes: [
        GoRoute(path: '/pro/overview', name: RouteNames.proOverview, builder: (_, __) => const ProOverviewPage()),
        GoRoute(path: '/pro/discover', name: RouteNames.proDiscover, builder: (_, __) => const DiscoverPage(variant: 'pro')),
        GoRoute(path: '/pro/network', name: RouteNames.proNetwork, builder: (_, __) => const NetworkPage()),
        GoRoute(path: '/pro/inbox', name: RouteNames.proInbox, builder: (_, __) => const ProInboxPage(),
          routes: [GoRoute(path: ':threadId', name: RouteNames.proInboxThread, builder: (_, state) => ProInboxPage(threadId: state.pathParameters['threadId']))]),
        GoRoute(path: '/pro/calendar', name: RouteNames.proCalendar, builder: (_, __) => const ProCalendarPage()),
        GoRoute(path: '/pro/events', name: RouteNames.proEvents, builder: (_, __) => const EventsPage(variant: 'pro'),
          routes: [
            GoRoute(path: ':eventId', name: RouteNames.proEventDetail, builder: (_, state) => EventDetailPage(eventId: state.pathParameters['eventId']!)),
            GoRoute(path: 'host', name: RouteNames.proHostEvent, builder: (_, __) => const HostEventPage(variant: 'pro')),
            GoRoute(path: 'organizer', name: RouteNames.proOrganizerDashboard, builder: (_, __) => const OrganizerDashboardPage(variant: 'pro')),
          ]),
        GoRoute(path: '/pro/analytics', name: RouteNames.proAnalytics, builder: (_, __) => const ProAnalyticsPage()),
        GoRoute(path: '/pro/company', name: RouteNames.proCompany, builder: (_, __) => const ProCompanyPage()),
        GoRoute(path: '/pro/billing', name: RouteNames.proBilling, builder: (_, __) => const ProCheckoutPage()),
        GoRoute(path: '/pro/settings', name: RouteNames.proSettings, builder: (_, __) => const SettingsPage(variant: 'pro')),
      ],
    ),

    // Organization Shell
    ShellRoute(
      builder: (_, __, child) => OrgShell(child: child),
      routes: [
        GoRoute(path: '/org/dashboard', name: RouteNames.orgDashboard, builder: (_, __) => const OrgDashboardPage()),
        GoRoute(path: '/org/events', name: RouteNames.orgEvents, builder: (_, __) => const EventsPage(variant: 'student')),
        GoRoute(path: '/org/settings', name: RouteNames.orgSettings, builder: (_, __) => const SettingsPage(variant: 'student')),
      ],
    ),

    // Freelancer Routes
    GoRoute(path: '/freelancer/onboarding/:step', name: RouteNames.freelancerOnboarding, builder: (_, state) => FreelancerOnboardingPage(step: state.pathParameters['step']!)),
    GoRoute(path: '/freelancer/dashboard', name: RouteNames.freelancerDashboard, builder: (_, __) => const FreelancerDashboardPage()),
    GoRoute(path: '/freelancer/discover', name: RouteNames.freelancerDiscover, builder: (_, __) => const FreelancerDiscoverPage()),
    GoRoute(path: '/freelancer/profile/:username', name: RouteNames.freelancerProfile, builder: (_, state) => FreelancerProfilePage(username: state.pathParameters['username']!)),
    GoRoute(path: '/freelancer/portfolio', name: RouteNames.freelancerPortfolio, builder: (_, __) => const PortfolioAnalyzerPage()),

    // Startup Routes
    GoRoute(path: '/startup/onboarding/:step', name: RouteNames.startupOnboarding, builder: (_, state) => StartupOnboardingPage(step: state.pathParameters['step']!)),
    GoRoute(path: '/startup/hiring', name: RouteNames.startupHiring, builder: (_, __) => const HiringDashboardPage()),
    GoRoute(path: '/startup/projects/new', name: RouteNames.startupProjectPost, builder: (_, __) => const ProjectPostPage()),

    // Call Route
    GoRoute(path: '/call/:sessionId', name: RouteNames.call, builder: (_, state) => CallPage(sessionId: state.pathParameters['sessionId']!)),

    // Legacy Redirects
    GoRoute(path: '/discover', redirect: (_, __) => '/student/discover'),
    GoRoute(path: '/matches', redirect: (_, __) => '/student/connections'),
    GoRoute(path: '/chat', redirect: (_, __) => '/student/messages'),
    GoRoute(path: '/chat/:threadId', redirect: (_, state) => '/student/messages/${state.pathParameters['threadId']}'),
    GoRoute(path: '/booking', redirect: (_, __) => '/student/sessions'),
    GoRoute(path: '/events/:eventId', redirect: (_, state) => '/student/events/${state.pathParameters['eventId']}'),

    // Catch-all
    GoRoute(path: '/:unmatched', redirect: (_, __) => '/'),
  ],
);
```

## 5.2 Auth Guard

```dart
// lib/routes/auth_guard.dart
String? authGuard(BuildContext context, GoRouterState state) {
  final auth = ref.read(authStateProvider);
  final isLoggedIn = auth != null;
  final isAuthRoute = state.matchedLocation.startsWith('/login') ||
      state.matchedLocation.startsWith('/signup');
  final isPublicRoute = _publicRoutes.any(
    (r) => state.matchedLocation.startsWith(r),
  );

  if (isPublicRoute || isAuthRoute) {
    if (isLoggedIn && isAuthRoute) {
      return auth!.role.dashboardRoute;
    }
    return null;
  }

  if (!isLoggedIn) return '/login';

  if (!_hasRoleAccess(state, auth!.role)) {
    return auth.role.dashboardRoute;
  }

  return null;
}
```

## 5.3 Route Names

```dart
// lib/routes/route_names.dart
abstract class RouteNames {
  static const landing = 'landing';
  static const features = 'features';
  static const about = 'about';
  static const contact = 'contact';
  static const roleSelector = 'role-selector';
  static const login = 'login';
  static const signup = 'signup';
  static const logout = 'logout';
  static const onboarding = 'onboarding';
  static const profile = 'profile';
  static const notifications = 'notifications';
  static const studentHome = 'student-home';
  static const studentDiscover = 'student-discover';
  static const studentFeed = 'student-feed';
  static const studentMessages = 'student-messages';
  static const studentMessageThread = 'student-message-thread';
  static const studentConnections = 'student-connections';
  static const studentEvents = 'student-events';
  static const studentEventDetail = 'student-event-detail';
  static const studentHostEvent = 'student-host-event';
  static const studentOrganizerDashboard = 'student-organizer';
  static const studentSessions = 'student-sessions';
  static const studentSearch = 'student-search';
  static const studentProgress = 'student-progress';
  static const studentBilling = 'student-billing';
  static const studentSettings = 'student-settings';
  static const proOverview = 'pro-overview';
  static const proDiscover = 'pro-discover';
  static const proNetwork = 'pro-network';
  static const proInbox = 'pro-inbox';
  static const proInboxThread = 'pro-inbox-thread';
  static const proCalendar = 'pro-calendar';
  static const proEvents = 'pro-events';
  static const proEventDetail = 'pro-event-detail';
  static const proHostEvent = 'pro-host-event';
  static const proOrganizerDashboard = 'pro-organizer';
  static const proAnalytics = 'pro-analytics';
  static const proCompany = 'pro-company';
  static const proBilling = 'pro-billing';
  static const proSettings = 'pro-settings';
  static const orgDashboard = 'org-dashboard';
  static const orgEvents = 'org-events';
  static const orgSettings = 'org-settings';
  static const freelancerOnboarding = 'freelancer-onboarding';
  static const freelancerDashboard = 'freelancer-dashboard';
  static const freelancerDiscover = 'freelancer-discover';
  static const freelancerProfile = 'freelancer-profile';
  static const freelancerPortfolio = 'freelancer-portfolio';
  static const startupOnboarding = 'startup-onboarding';
  static const startupHiring = 'startup-hiring';
  static const startupProjectPost = 'startup-project-post';
  static const call = 'call';
}
```

## 5.4 React -> Flutter Route Migration Table

| React Route | Flutter Route | Auth | Role |
|------------|---------------|------|------|
| `/` | `/` | No | All |
| `/features` | `/features` | No | All |
| `/about` | `/about` | No | All |
| `/contact` | `/contact` | No | All |
| `/login` | `/login` | No | All |
| `/login/:rolePath` | `/login/:rolePath` | No | All |
| `/signup/:rolePath` | `/signup/:rolePath` | No | All |
| `/logout` | `/logout` | No | All |
| `/onboarding/:step` | `/onboarding/:step` | Yes | Any |
| `/student/home` | `/student/home` | Yes | Student |
| `/student/discover` | `/student/discover` | Yes | Student |
| `/student/feed` | `/student/feed` | Yes | Student |
| `/student/messages` | `/student/messages` | Yes | Student |
| `/student/messages/:threadId` | `/student/messages/:threadId` | Yes | Student |
| `/student/connections` | `/student/connections` | Yes | Student |
| `/student/events` | `/student/events` | Yes | Student |
| `/student/events/:eventId` | `/student/events/:eventId` | Yes | Student |
| `/student/events/host` | `/student/events/host` | Yes | Student |
| `/student/events/organizer` | `/student/events/organizer` | Yes | Student |
| `/student/sessions` | `/student/sessions` | Yes | Student |
| `/student/search` | `/student/search` | Yes | Student |
| `/student/progress` | `/student/progress` | Yes | Student |
| `/student/billing` | `/student/billing` | Yes | Student |
| `/student/settings` | `/student/settings` | Yes | Student |
| `/pro/overview` | `/pro/overview` | Yes | Pro |
| `/pro/discover` | `/pro/discover` | Yes | Pro |
| `/pro/network` | `/pro/network` | Yes | Pro |
| `/pro/inbox` | `/pro/inbox` | Yes | Pro |
| `/pro/inbox/:threadId` | `/pro/inbox/:threadId` | Yes | Pro |
| `/pro/calendar` | `/pro/calendar` | Yes | Pro |
| `/pro/events` | `/pro/events` | Yes | Pro |
| `/pro/analytics` | `/pro/analytics` | Yes | Pro |
| `/pro/company` | `/pro/company` | Yes | Pro |
| `/pro/billing` | `/pro/billing` | Yes | Pro |
| `/pro/settings` | `/pro/settings` | Yes | Pro |
| `/org/dashboard` | `/org/dashboard` | Yes | Org |
| `/org/events` | `/org/events` | Yes | Org |
| `/org/settings` | `/org/settings` | Yes | Org |
| `/profile/:username` | `/profile/:username` | Yes | Any |
| `/notifications` | `/notifications` | Yes | Any |
| `/call/:sessionId` | `/call/:sessionId` | Yes | Any |
| `/freelancer/*` | `/freelancer/*` | Yes | Fl |
| `/startup/*` | `/startup/*` | Yes | St |

---

# 6. STATE MANAGEMENT MAP

## 6.1 Riverpod Provider Architecture

### Auth State
```dart
@riverpod
class AuthState extends _$AuthState {
  @override
  UserModel? build() => null;

  void login(UserModel user) => state = user;
  void logout() => state = null;
}
```

### Socket Service
```dart
@riverpod
SocketService socketService(SocketServiceRef ref) {
  final service = SocketService();
  ref.onDispose(() => service.disconnect());
  return service;
}
```

### Discover State
```dart
@riverpod
class DiscoverState extends _$DiscoverState {
  @override
  AsyncValue<List<ProfileModel>> build({required String variant, DiscoverFilter? filter}) {
    _fetch(variant, filter);
    return const AsyncLoading();
  }

  Future<void> _fetch(String variant, DiscoverFilter? filter) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await Future.delayed(const Duration(milliseconds: 120));
      return variant == 'pro' ? proDiscoverProfiles : studentDiscoverProfiles;
    });
  }
}

@riverpod
class SwipeState extends _$SwipeState {
  @override
  int build() => 0;

  void pass() => state++;
  void connect() => state++;
  void superConnect() => state++;
  void reset() => state = 0;
}
```

### Chat State
```dart
@riverpod
class ConversationList extends _$ConversationList {
  @override
  AsyncValue<List<ConversationModel>> build({required String variant}) {
    _fetch(variant);
    return const AsyncLoading();
  }
}

@riverpod
class TypingState extends _$TypingState {
  @override
  Map<String, String> build() => {};

  void startTyping(String conversationId, String userId) {
    state = {...state, conversationId: userId};
  }
  void stopTyping(String conversationId) {
    state = {...state}..remove(conversationId);
  }
}

@riverpod
class PresenceState extends _$PresenceState {
  @override
  Map<String, bool> build() => {};

  void updatePresence(String userId, bool online) {
    state = {...state, userId: online};
  }
}
```

### Notification State
```dart
@riverpod
class NotificationList extends _$NotificationList {
  @override
  AsyncValue<List<NotificationModel>> build() { _fetch(); return const AsyncLoading(); }

  void pushNotification(NotificationModel n) {
    state = state.whenData((list) => [n, ...list].take(50).toList());
  }
  void markAsRead(String id) {
    state = state.whenData((list) => list.map((n) => n.id == id ? n.copyWith(read: true) : n).toList());
  }
  void markAllAsRead() {
    state = state.whenData((list) => list.map((n) => n.copyWith(read: true)).toList());
  }
  void clear() { state = const AsyncData([]); }
}
```

### Profile State
```dart
@riverpod
class ProfileState extends _$ProfileState {
  @override
  AsyncValue<ProfileModel?> build(String username) {
    _fetch(username);
    return const AsyncLoading();
  }

  Future<void> _fetch(String username) async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await Future.delayed(const Duration(milliseconds: 120));
      return profiles.values.firstWhere(
        (p) => p.username == username,
        orElse: () => profiles['me']!,
      );
    });
  }
}
```

### Analytics State
```dart
@riverpod
class AnalyticsData extends _$AnalyticsData {
  @override
  AsyncValue<AnalyticsSummary> build() { _fetch(); return const AsyncLoading(); }

  Future<void> _fetch() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      await Future.delayed(const Duration(milliseconds: 120));
      return const AnalyticsSummary(
        matchQuality: [TrendPoint(label: 'Mon', value: 72), TrendPoint(label: 'Tue', value: 78)],
        responseRate: 64,
        skillDemand: [SkillDemand(skill: 'React', demand: 92), SkillDemand(skill: 'AI', demand: 86)],
      );
    });
  }
}
```

### Subscription State
```dart
@riverpod
class SubscriptionState extends _$SubscriptionState {
  @override
  SubscriptionModel build() => const SubscriptionModel(
    plan: 'free',
    gatedFeatures: ['advanced-analytics', 'priority-matches', 'portfolio-analyzer', 'unlimited-projects'],
  );

  void setPlan(String plan) {
    state = state.copyWith(plan: plan, gatedFeatures: plan == 'pro' ? [] : state.gatedFeatures);
  }
}
```

### Theme State
```dart
@riverpod
class ThemeModeState extends _$ThemeModeState {
  @override
  ThemeMode build() => ThemeMode.system;
  void setTheme(ThemeMode mode) => state = mode;
}
```

## 6.2 React -> Flutter State Migration Table

| React (Zustand/Context/Query) | Flutter (Riverpod) | Type |
|------------------------------|-------------------|------|
| `userStore` | `authStateProvider` | StateNotifier |
| `chatStore` | `TypingState` + `PresenceState` | StateNotifier |
| `notificationStore` | `NotificationList` | AsyncNotifier |
| `sidebarStore` | Local widget state | - |
| `subscriptionStore` | `SubscriptionState` | StateNotifier |
| `AuthContext` | `authStateProvider` | StateNotifier |
| `SocketContext` | `SocketService` + `socketStatusProvider` | Service + Stream |
| `useCurrentUserQuery` | `authStateProvider` | StateNotifier |
| `useDiscoveryProfilesQuery` | `DiscoverState` | AsyncNotifier |
| `useConversationsQuery` | `ConversationList` | AsyncNotifier |
| `useMessagesQuery` | Local within chat | Stream/State |
| `useNotificationsQuery` | `NotificationList` | AsyncNotifier |
| `useBillingPlanQuery` | `SubscriptionState` | StateNotifier |
| `useAnalyticsSummaryQuery` | `AnalyticsData` | AsyncNotifier |
