# ProMatch (Tinder for Nerds) — Flutter Migration Plan (Part 4/4)

## 11-16. Feed, Profile, Events, Analytics, Design, Responsive | 17-21. Packages, Phases, Sequence, Boilerplate, Deployment

---

# 11. FEED SYSTEM

## 11.1 Reels-Style Feed

```dart
// lib/features/feed/widgets/reels_feed.dart
class ReelsFeed extends StatefulWidget {
  // Instagram Reels-style vertical swipe
  // PageView.builder with scrollDirection: Axis.vertical
  // Each page: full-screen card with image/video + overlay
  // BouncingScrollPhysics for over-scroll
  // onPageChanged triggers lazy load
}
```

## 11.2 React -> Flutter Feed Migration

| React | Flutter |
|-------|---------|
| `InstagramReelsFeed.jsx` | `ReelsFeed` widget |
| `FeedPage.jsx` | `FeedPage` widget |
| Vertical scroll with cards | `PageView.builder(vertical)` |

---

# 12. PROFILE SYSTEM

## 12.1 Widget Tree

```
ProfilePage
├── ProfileHeader
│   ├── CoverImage (gradient)
│   ├── Avatar + verify badge
│   ├── Name + Title
│   ├── Location
│   ├── Stats (Views, Sessions, Events, Response Rate)
│   ├── Bio/Headline
│   ├── FitScore (circular ring)
│   ├── Action buttons (Edit/Message/Connect)
│   └── SocialLinks
│
├── ProfileTabs
│   ├── Overview: Why matched, Skills, Goals, Badges, Activity
│   ├── Posts: ActivityItem list
│   ├── Events: EventCard list
│   ├── Analytics: KPI + Charts (pro only)
│   └── Connections: Connected/Pending/Suggested
│
└── ProfileEditForm (modal/page)
    └── Photo, Name, Title, Bio, Skills, Goals, Links, etc.
```

## 12.2 React -> Flutter Profile Migration

| React | Flutter |
|-------|---------|
| `ProfilePage.jsx` | `ProfilePage` widget |
| `FitScore.jsx` | `ProfileFitScore` widget |
| `MiniProfileCard.jsx` | `MiniProfileCard` widget |
| `ActivityItem.jsx` | `ActivityItem` widget (reusable) |

---

# 13. EVENTS SYSTEM

## 13.1 Widget Tree

```
EventsPage
├── ViewToggle (List/Calendar)
├── FilterChips (All/Virtual/In-person/Domain)
├── ListView -> EventCard
│   ├── DateBadge, Title, Host, Format, Time
│   ├── Location, Attendees, Tags, RSVP badge
└── CalendarView (table_calendar)

EventDetailPage
├── Header, Date/Time, Location
├── Attendees, Tags, Summary, Agenda
├── LinkedIn link, RSVP button
└── Calendar actions (Google Calendar, ICS)

HostEventPage
└── Form: title, format, date, time, duration, location, summary, agenda

OrganizerDashboardPage
└── My events, attendee stats, RSVP management
```

## 13.2 React -> Flutter Events Migration

| React | Flutter |
|-------|---------|
| `EventsPage.jsx` | `EventsPage` widget |
| `EventDetailPage.jsx` | `EventDetailPage` widget |
| `HostEventPage.jsx` | `HostEventPage` widget |
| `OrganizerDashboardPage.jsx` | `OrganizerDashboardPage` widget |
| `EventCalendarMenu.jsx` | `EventCalendarMenu` widget |

---

# 14. ANALYTICS/CHARTS

## 14.1 Chart Migration

| React (Recharts) | Flutter (fl_chart) |
|------------------|-------------------|
| `<LineChart>` | `LineChart()` |
| `<Line dataKey>` | `LineChartBarData()` |
| `<BarChart layout="vertical">` | `BarChart()` + `BarChartGroupData()` |
| `<ResponsiveContainer>` | `LayoutBuilder` + `SizedBox` |
| `<XAxis>` / `<YAxis>` | `FlTitlesData` + `SideTitles` |
| `<CartesianGrid>` | `FlGridData` |
| `<Tooltip>` | `LineTouchData` / `BarTouchData` |
| `<Legend>` | `FlLegendData` |

## 14.2 Analytics Page Widget Tree

```
AnalyticsPage
├── KPIDashboard (grid of StatCards)
│   └── Views, Matches, Messages, Calls, Conversion, Top Skill
├── MatchQualityChart (LineChart)
│   └── matchQuality + responseRate over months
└── SkillDemandChart (BarChart, horizontal)
    └── React, AI, Design, etc.
```

---

# 15. DESIGN SYSTEM

## 15.1 Color Tokens

```dart
// lib/core/theme/color_tokens.dart
class AppColors {
  static const primary = Color(0xFF0084FF);        // Electric Blue
  static const primaryContainer = Color(0xFF319AFF);
  static const secondary = Color(0xFF111A3E);       // Deep Blue
  static const tertiary = Color(0xFFFF801E);        // Orange

  static const success = Color(0xFF15803D);
  static const warning = Color(0xFFB45309);
  static const error = Color(0xFFBA1A1A);

  static const surface = Color(0xFFFFFFFF);
  static const surfaceLow = Color(0xFFF8FAFC);
  static const surfaceHigh = Color(0xFFEEF2FB);
  static const bgBase = Color(0xFFF8F4EC);          // App background

  static const textPrimary = Color(0xFF111A3E);
  static const textSecondary = Color(0xFF44475E);

  // Accent tones (per profile)
  static const toneTeal = Color(0xFF0ECFBF);
  static const toneViolet = Color(0xFF6C5CE7);
  static const toneRose = Color(0xFFF472B6);
  static const toneAmber = Color(0xFFF59E0B);

  static const border = Color(0x1F111A3E);

  // Dark theme
  static const surfaceDark = Color(0xFF0A0A0F);
  static const surfaceContainerDark = Color(0xFF121218);
  static const surfaceHighDark = Color(0xFF1A1A24);
  static const textPrimaryDark = Color(0xFFE8E8ED);
  static const textSecondaryDark = Color(0xFF9494A0);
}
```

## 15.2 Typography

```dart
// lib/core/theme/text_styles.dart
class AppTextStyles {
  static const _display = 'Fustat';
  static const _body = 'Inter';
  static const _mono = 'JetBrains Mono';

  static TextTheme get light => TextTheme(
    displayLarge: TextStyle(fontFamily: _display, fontSize: 32, fontWeight: FontWeight.w700),
    displayMedium: TextStyle(fontFamily: _display, fontSize: 28, fontWeight: FontWeight.w700),
    displaySmall: TextStyle(fontFamily: _display, fontSize: 24, fontWeight: FontWeight.w600),
    headlineLarge: TextStyle(fontFamily: _display, fontSize: 22, fontWeight: FontWeight.w600),
    headlineMedium: TextStyle(fontFamily: _display, fontSize: 20, fontWeight: FontWeight.w600),
    headlineSmall: TextStyle(fontFamily: _body, fontSize: 18, fontWeight: FontWeight.w600),
    titleLarge: TextStyle(fontFamily: _body, fontSize: 16, fontWeight: FontWeight.w600),
    titleMedium: TextStyle(fontFamily: _body, fontSize: 14, fontWeight: FontWeight.w600),
    bodyLarge: TextStyle(fontFamily: _body, fontSize: 16, fontWeight: FontWeight.w400),
    bodyMedium: TextStyle(fontFamily: _body, fontSize: 14, fontWeight: FontWeight.w400),
    bodySmall: TextStyle(fontFamily: _body, fontSize: 12, fontWeight: FontWeight.w400),
    labelLarge: TextStyle(fontFamily: _body, fontSize: 14, fontWeight: FontWeight.w500),
    labelSmall: TextStyle(fontFamily: _body, fontSize: 11, fontWeight: FontWeight.w500),
  );
}
```

## 15.3 Spacing

```dart
// lib/core/theme/spacing.dart
class AppSpacing {
  static const double xs = 4;
  static const double sm = 8;
  static const double md = 16;
  static const double lg = 24;
  static const double xl = 32;
  static const double xxl = 48;
  static const double xxxl = 64;

  static const EdgeInsets pagePadding = EdgeInsets.all(md);
  static const EdgeInsets cardPadding = EdgeInsets.all(md);

  static const double radiusSm = 4;
  static const double radiusMd = 12;
  static const double radiusLg = 16;
  static const double radiusXl = 24;
  static const double radiusFull = 9999;
}
```

## 15.4 Theme Data

```dart
// lib/core/theme/app_theme.dart
class AppTheme {
  static ThemeData get light => ThemeData(
    useMaterial3: true,
    brightness: Brightness.light,
    colorScheme: ColorScheme.light(
      primary: AppColors.primary,
      secondary: AppColors.secondary,
      tertiary: AppColors.tertiary,
      error: AppColors.error,
      surface: AppColors.surface,
      onPrimary: Colors.white,
      onSecondary: Colors.white,
      onSurface: AppColors.textPrimary,
      outline: AppColors.border,
    ),
    textTheme: AppTextStyles.light,
    scaffoldBackgroundColor: AppColors.bgBase,
    cardTheme: CardTheme(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
        side: BorderSide(color: AppColors.border),
      ),
      color: AppColors.surface,
    ),
    appBarTheme: const AppBarTheme(elevation: 0, centerTitle: false),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      elevation: 0,
      selectedItemColor: AppColors.primary,
      unselectedItemColor: AppColors.textSecondary,
    ),
    dividerTheme: DividerThemeData(color: AppColors.border, thickness: 1),
  );

  static ThemeData get dark => ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    colorScheme: ColorScheme.dark(
      primary: AppColors.primary,
      secondary: AppColors.secondary,
      tertiary: AppColors.tertiary,
      error: AppColors.error,
      surface: AppColors.surfaceDark,
      onSurface: AppColors.textPrimaryDark,
      outline: AppColors.border,
    ),
    textTheme: AppTextStyles.light.apply(
      bodyColor: AppColors.textPrimaryDark,
      displayColor: AppColors.textPrimaryDark,
    ),
    scaffoldBackgroundColor: AppColors.surfaceDark,
    cardTheme: CardTheme(
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppSpacing.radiusMd),
        side: BorderSide(color: AppColors.border),
      ),
      color: AppColors.surfaceContainerDark,
    ),
    appBarTheme: const AppBarTheme(
      elevation: 0, centerTitle: false,
      backgroundColor: AppColors.surfaceDark,
    ),
    bottomNavigationBarTheme: BottomNavigationBarThemeData(
      elevation: 0,
      backgroundColor: AppColors.surfaceContainerDark,
      selectedItemColor: AppColors.primary,
      unselectedItemColor: AppColors.textSecondaryDark,
    ),
  );
}
```

## 15.5 Design Token Migration

| React (CSS) | Flutter |
|-------------|---------|
| `--brand-teal: #0ecfbf` | `AppColors.toneTeal` |
| `--accent-violet: #6c5ce7` | `AppColors.toneViolet` |
| `--accent-rose: #f472b6` | `AppColors.toneRose` |
| `--bg-base: #f8f4ec` | `AppColors.bgBase` |
| `.pm-avatar` | `PmAvatar` widget |
| `.pm-button` | `PmButton` widget |
| `.pm-badge` | `PmBadge` widget |
| `.pm-chip` | `PmChip` widget |
| `.pm-card` | `PmCard` widget |
| spacing scale | `AppSpacing` constants |
| radius scale | `AppSpacing.radius*` constants |
| Tailwind config | `AppTheme` + `colorScheme` |

---

# 16. RESPONSIVE BREAKPOINTS

## 16.1 Breakpoint Definitions

```dart
// responsive_framework breakpoints
const Breakpoint(start: 0, end: 767, name: MOBILE);
const Breakpoint(start: 768, end: 1023, name: TABLET);
const Breakpoint(start: 1024, end: 1279, name: DESKTOP);
const Breakpoint(start: 1280, end: double.infinity, name: WIDE);
```

## 16.2 Responsive Layout Rules

| Element | Mobile | Tablet | Desktop | Wide |
|---------|--------|--------|---------|------|
| Nav | Bottom | Bottom | Side | Side |
| Messages | Single | Split 40/60 | Split 35/65 | Split 30/70 |
| Discover | Full | Side preview | +Info | +Profile |
| Profile | 1 col | 2 col | 2 col | 3 col |
| Events | List | List/Grid | Grid | Grid+Cal |
| Analytics | 1 col | 2 col | 3 col | 4 col |
| Feed | Full | Center | Center | Center |

---

# 17. ALL PACKAGES (pubspec.yaml)

```yaml
name: promatch_flutter
description: Tinder for Nerds - ProMatch
version: 1.0.0

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_riverpod: ^2.6.1
  riverpod_annotation: ^2.6.1
  go_router: ^14.6.2
  dio: ^5.7.0
  socket_io_client: ^3.0.2
  hive: ^2.2.3
  hive_flutter: ^1.1.0
  shared_preferences: ^2.3.4
  freezed_annotation: ^2.4.4
  json_annotation: ^4.9.0
  fl_chart: ^0.70.2
  cached_network_image: ^3.4.1
  table_calendar: ^3.1.3
  flutter_local_notifications: ^17.2.4
  flutter_webrtc: ^0.12.3
  flutter_animate: ^4.5.2
  responsive_framework: ^1.5.1
  intl: ^0.19.0
  path_provider: ^2.1.5
  url_launcher: ^6.3.1
  connectivity_plus: ^6.1.1
  share_plus: ^10.1.4
  image_picker: ^1.1.2
  flutter_svg: ^2.0.17
  flutter_dotenv: ^5.2.1

dev_dependencies:
  flutter_test:
    sdk: flutter
  build_runner: ^2.4.14
  freezed: ^2.5.7
  json_serializable: ^6.9.4
  riverpod_generator: ^2.6.3
  flutter_lints: ^5.0.0
  mocktail: ^1.0.4

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/icons/
    - assets/fonts/
    - .env
  fonts:
    - family: Fustat
      fonts:
        - asset: assets/fonts/Fustat-Regular.ttf
        - asset: assets/fonts/Fustat-Medium.ttf
          weight: 500
        - asset: assets/fonts/Fustat-SemiBold.ttf
          weight: 600
        - asset: assets/fonts/Fustat-Bold.ttf
          weight: 700
    - family: Inter
      fonts:
        - asset: assets/fonts/Inter-Regular.ttf
        - asset: assets/fonts/Inter-Medium.ttf
          weight: 500
        - asset: assets/fonts/Inter-SemiBold.ttf
          weight: 600
        - asset: assets/fonts/Inter-Bold.ttf
          weight: 700
    - family: JetBrains Mono
      fonts:
        - asset: assets/fonts/JetBrainsMono-Regular.ttf
        - asset: assets/fonts/JetBrainsMono-Bold.ttf
          weight: 700
```

---

# 18. IMPLEMENTATION PHASES (11 Weeks)

## Phase 1: Foundation (Week 1-2)
- Flutter project setup, pubspec, folder structure
- Core: constants, theme (light+dark), spacing, colors, typography
- Core widgets: Avatar, Badge, Button, Card, Chip, Modal, Skeleton, Toast, EmptyState
- Data models (all Freezed + JsonSerializable) + build_runner
- Network: Dio client, interceptors, mock interceptor
- Storage: Hive, SharedPreferences, session manager

## Phase 2: Auth + Routing (Week 3)
- AuthRole model + AuthRepository + Riverpod auth state
- GoRouter setup, route names, auth guard, role guard
- Login page: role selector, email/password, OAuth buttons
- Session persistence + AppShell with responsive nav

## Phase 3: Socket + Messaging (Week 4)
- SocketService: connect, disconnect, events, mock mode
- ConversationList provider + MessagesPage (split view)
- MessageBubble + MessageComposer + TypingIndicator
- Read receipts + presence + typing stream

## Phase 4: Discover + Swipe (Week 5)
- SwipeCard: gesture detection, spring animation, stamp overlay
- SwipeDeck: stack positioning, lazy loading, image preloading
- DiscoverFilters + MatchModal + DiscoverProvider

## Phase 5: Feed + Profile (Week 6)
- Reels feed: vertical PageView, physics, lazy loading
- ProfilePage: header, tabs, skills, goals, FitScore
- ProfileEditForm + ConnectionsPage

## Phase 6: Events + Analytics (Week 7)
- EventList + EventDetail + RSVP + HostEvent
- fl_chart: MatchQualityChart + SkillDemandChart
- KPI dashboard + AnalyticsProvider

## Phase 7: Role Dashboards + Billing (Week 8)
- Student pages, Pro pages, Org pages
- Freelancer pages, Startup pages
- Billing: pricing, checkout, subscription
- Settings: 7 tabs (Profile/Account/Notifications/Privacy/Appearance/Billing/Danger)

## Phase 8: Notifications + Polish (Week 9)
- NotificationCenter + NotificationPage + bell badge
- NotificationService + deep linking
- Command palette (Ctrl+K) + landing page

## Phase 9: Testing + Responsive (Week 10)
- Responsive layout pass across all breakpoints
- Widget tests: core, discover, messages
- Unit tests: repositories, providers, models
- Integration tests: auth, message, discover flows

## Phase 10: Production Prep (Week 11)
- Performance: const widgets, lazy loading, caching
- Web: PWA, SEO, deep linking
- Android: app bundle, permissions, splash
- iOS: certificates, Info.plist, push
- Windows: desktop sizing, taskbar

---

# 19. AI CODING SEQUENCE (190 files in order)

## Phase 1 — Foundation (Files 1-51)
```
pubspec.yaml, analysis_options.yaml, build.yaml,
lib/main.dart, lib/app.dart,
core/constants/ (app, api, storage, socket),
core/theme/ (color_tokens, text_styles, spacing, app_theme, theme_extensions),
core/widgets/ (pm_avatar, badge, button, card, chip, modal, skeleton, toast, empty_state, section_header, stat_card, loading_overlay, error_widget, bottom_nav),
shared/models/ (user, profile, message, thread, event, notification, fit_score, analytics, subscription),
core/network/ (dio_client, auth_interceptor, error_interceptor, mock_interceptor, api_response, api_exceptions),
core/storage/ (hive_service, preferences_service, session_manager),
core/utils/ (date_utils, string_utils, validators, debouncer, logger)
```

## Phase 2 — Auth + Routing (Files 52-67)
```
auth/models/ (auth_role, login_payload),
auth/repositories/auth_repository.dart,
shared/providers/ (auth_state_provider, user_provider),
routes/ (route_names, auth_guard, role_guard, app_router),
auth/widgets/ (role_card, oauth_button, login_form),
auth/pages/ (role_selector, login, logout),
auth/providers/auth_providers.dart
```

## Phase 3 — Socket + Messages (Files 68-83)
```
core/services/socket_service.dart,
shared/providers/socket_provider.dart,
messages/models/ (conversation, message),
messages/repositories/chat_repository.dart,
messages/providers/ (chat, conversation, message),
messages/widgets/ (conversation_tile, message_bubble, message_composer, typing_indicator, attachment_picker, voice_message_widget),
messages/pages/ (messages, message_detail)
```

## Phase 4 — Discover (Files 84-94)
```
discover/models/ (discover_filter, match_result),
discover/repositories/discover_repository.dart,
discover/providers/ (discover, swipe),
discover/widgets/ (swipe_card, swipe_deck, match_modal, discover_filters, professional_search_modal),
discover/pages/discover_page.dart
```

## Phase 5 — Feed + Profile (Files 95-110)
```
feed/ (repository, provider, widgets: reels, card, actions, pages),
profile/ (repository, provider, widgets: header, tabs, skills, goals, fit_score, edit_form, mini_profile_card, pages)
```

## Phase 6 — Events + Analytics (Files 111-129)
```
events/ (model, repository, provider, widgets: card, calendar, rsvp, menu, pages: list, detail, host, create_opportunity, organizer_dashboard),
analytics/ (repository, provider, widgets: match_quality_chart, skill_demand_chart, growth_chart, kpi_dashboard, pages)
```

## Phase 7 — Role Dashboards + Billing (Files 130-163)
```
student/*, professional/*, organization/*, freelancer/*, startup/*,
billing/*, settings/*, connections/*, sessions/*
```

## Phase 8 — Notifications + Polish (Files 164-180)
```
notifications/*, call/*, onboarding/*, public/*, assets/*
```

## Phase 9 — Testing (Files 181-190)
```
test/unit/*, test/widget/*, test/integration/*
```

---

# 20. BOILERPLATE TEMPLATES

## 20.1 main.dart

```dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'app.dart';
import 'core/theme/app_theme.dart';
import 'core/storage/hive_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await dotenv.load();
  await HiveService.initialize();

  runApp(const ProviderScope(child: ProMatchApp()));
}

class ProMatchApp extends ConsumerWidget {
  const ProMatchApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final themeMode = ref.watch(themeModeStateProvider);

    return MaterialApp.router(
      title: 'ProMatch',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,
      themeMode: themeMode,
      routerConfig: appRouter,
      builder: (context, child) {
        return ResponsiveBreakpoints.builder(
          child: child!,
          breakpoints: [
            const Breakpoint(start: 0, end: 767, name: MOBILE),
            const Breakpoint(start: 768, end: 1023, name: TABLET),
            const Breakpoint(start: 1024, end: 1279, name: DESKTOP),
            const Breakpoint(start: 1280, end: double.infinity, name: WIDE),
          ],
        );
      },
    );
  }
}
```

## 20.2 Dio Client

```dart
final dioClientProvider = Provider<DioClient>((ref) => DioClient());

class DioClient {
  late final Dio _dio;

  DioClient() {
    _dio = Dio(BaseOptions(
      baseUrl: dotenv.env['API_URL'] ?? '',
      connectTimeout: const Duration(seconds: 30),
      receiveTimeout: const Duration(seconds: 30),
      headers: {'Content-Type': 'application/json'},
    ));
    _dio.interceptors.addAll([AuthInterceptor(), ErrorInterceptor(), MockInterceptor()]);
  }

  Future<Response<T>> get<T>(String path, {Map<String, dynamic>? params}) => _dio.get(path, queryParameters: params);
  Future<Response<T>> post<T>(String path, {dynamic data}) => _dio.post(path, data: data);
  Future<Response<T>> put<T>(String path, {dynamic data}) => _dio.put(path, data: data);
  Future<Response<T>> patch<T>(String path, {dynamic data}) => _dio.patch(path, data: data);
  Future<Response<T>> delete<T>(String path) => _dio.delete(path);
}
```

## 20.3 App Shell (Responsive)

```dart
class AppShell extends StatelessWidget {
  final Widget child;
  final List<NavItem> navItems;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: [
          if (ResponsiveBreakpoints.of(context).isDesktop)
            SideNav(navItems: navItems),
          Expanded(child: child),
        ],
      ),
      bottomNavigationBar: ResponsiveBreakpoints.of(context).isMobile
          ? BottomNav(navItems: navItems)
          : null,
    );
  }
}
```

## 20.4 Provider Pattern

```dart
// Standard pattern for all feature providers:
@riverpod
FeatureRepository featureRepository(FeatureRepositoryRef ref) {
  return FeatureRepository(ref.watch(dioClientProvider));
}

@riverpod
class FeatureState extends _$FeatureState {
  @override
  AsyncValue<List<Model>> build() { _fetch(); return const AsyncLoading(); }

  Future<void> _fetch() async {
    state = const AsyncLoading();
    state = await AsyncValue.guard(() async {
      return ref.read(featureRepositoryProvider).getAll();
    });
  }
}

@riverpod
Future<void> featureAction(FeatureActionRef ref, {required String id}) async {
  await ref.read(featureRepositoryProvider).doAction(id);
  ref.invalidate(featureStateProvider);
}
```

---

# 21. PRODUCTION DEPLOYMENT

## 21.1 Build Commands

```bash
flutter build appbundle --release          # Android
flutter build ios --release && flutter build ipa --release  # iOS
flutter build web --release                # Web
flutter build windows --release            # Windows
```

## 21.2 Environment Variables

| Variable | Purpose |
|----------|---------|
| `API_URL` | Backend REST API base URL |
| `SOCKET_URL` | Socket.IO server URL |
| `GOOGLE_OAUTH_CLIENT_ID` | Google OAuth |
| `LINKEDIN_CLIENT_ID` | LinkedIn OAuth |
| `SENTRY_DSN` | Error tracking |
| `MIXPANEL_TOKEN` | Analytics |

## 21.3 Platform Config

- **Android**: minSdk 24, compileSdk 34, WebRTC + notification permissions
- **iOS**: NSCameraUsageDescription, NSMicrophoneUsageDescription, push caps, universal links
- **Web**: PWA manifest, service worker, SEO meta tags
- **Windows**: Min window 1024x768

## 21.4 Performance Targets

| Metric | Target |
|--------|--------|
| Frame rate | 60 FPS (120 on 120Hz) |
| Cold start | < 2s |
| Page transition | < 100ms |
| API response | < 200ms (mock) |
| Memory peak | < 200MB |
| APK size | < 40MB |
| Web initial JS | < 2MB |

## 21.5 Optimization Checklist

- [ ] `const` constructors on all widgets
- [ ] `RepaintBoundary` on animated widgets
- [ ] `ListView.builder` for all lists
- [ ] `cached_network_image` for all images
- [ ] `autoDispose` on unused Riverpod providers
- [ ] Lazy loading tabs
- [ ] Hive for offline-first data
- [ ] Dio interceptor caching
- [ ] Tree shaking in release builds
- [ ] ProGuard rules for Android

---

# CRITICAL REACT->FLUTTER MIGRATION TABLE

| React Concept | Flutter Equivalent | File |
|--------------|-------------------|------|
| `react-router-dom` BrowserRouter | GoRouter | `lib/routes/app_router.dart` |
| `AuthContext` | `authStateProvider` (Riverpod) | `lib/shared/providers/auth_state_provider.dart` |
| `ProtectedRoute` | `authGuard` (GoRouter redirect) | `lib/routes/auth_guard.dart` |
| Zustand stores | Riverpod `StateNotifierProvider` | Each feature providers file |
| React Query hooks | Riverpod `AsyncNotifierProvider` | Each feature providers file |
| `socket.io-client` | `socket_io_client` dart | `lib/core/services/socket_service.dart` |
| Mock socket | `_runMockSocket()` inline | `socket_service.dart` |
| `framer-motion` | Flutter `AnimationController` + `flutter_animate` | Swipe/Discover widgets |
| `Recharts` | `fl_chart` | `lib/features/analytics/widgets/*.dart` |
| `localStorage` | `SharedPreferences` | `lib/core/storage/preferences_service.dart` |
| TailwindCSS | Material 3 `ThemeData` | `lib/core/theme/app_theme.dart` |
| `lucide-react` icons | Flutter Icons + custom SVG | `lib/core/widgets/` |
| CSS `pm-*` classes | `Pm*` widgets | `lib/core/widgets/*.dart` |
| `canvas-confetti` | Custom confetti animation | `match_modal.dart` |
| React Context | Riverpod Provider | Shared providers |
| `three.js` GridDistortion | Custom `CustomPainter` canvas | `grid_distortion.dart` |
| React `useParams` | GoRouter `state.pathParameters` | Route handlers |
| `sessionStorage` | `SharedPreferences` | `session_manager.dart` |
| `React.memo` | `const` constructors + `shouldRebuild` | All widgets |
| `useCallback` | Riverpod auto-optimization | Providers |
| `useMemo` | Riverpod `.select()` | `ref.watch(provider.select(...))` |

---

*End of Flutter Migration Plan — All 21 sections complete across 4 parts.*
