# ProMatch (Tinder for Nerds) — Flutter Migration Plan (Part 1/4)

## Enterprise-Grade Architecture Document

---

# TABLE OF CONTENTS

1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project Structure](#3-project-structure)
4. [Data Models](#4-data-models)

---

# 1. ARCHITECTURE OVERVIEW

## 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Flutter Application                          │
├─────────────────────────────────────────────────────────────────────┤
│  UI Layer (Widgets)                                                  │
│  ┌──────────────────────────────────────────────────────────────────┐│
│  │  Feature Modules (auth, discover, chat, profile, events, etc.)   ││
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐    ││
│  │  │  Pages   │ │ Widgets  │ │ Dialogs  │ │  Custom Widgets  │    ││
│  │  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────────┬─────────┘    ││
│  └───────┼────────────┼────────────┼─────────────────┼─────────────┘│
├──────────┼────────────┼────────────┼─────────────────┼──────────────┤
│  State   │   Riverpod Providers                                      │
│  ┌───────┴─────────────────────────────────────────────────────────┐│
│  │  ┌────────┐ ┌────────┐ ┌──────────┐ ┌────────┐ ┌───────────┐   ││
│  │  │  Auth  │ │ Chat   │ │ Discover │ │ Events │ │ Analytics │   ││
│  │  └───┬────┘ └───┬────┘ └────┬─────┘ └───┬────┘ └─────┬─────┘   ││
│  └──────┼──────────┼───────────┼────────────┼────────────┼─────────┘│
├─────────┼──────────┼───────────┼────────────┼────────────┼──────────┤
│  Domain │  Repositories + Services                                   │
│  ┌──────┴──────────┴───────────┴────────────┴────────────┴────────┐ │
│  │  AuthRepo │ ChatRepo │ DiscoveryRepo │ EventsRepo │ Analytics  │ │
│  └──────┬──────────┬───────────┬────────────┬────────────┬────────┘ │
├─────────┼──────────┼───────────┼────────────┼────────────┼──────────┤
│  Data   │  Data Sources                                             │
│  ┌──────┴──────────┴───────────┴────────────┴────────────┴────────┐ │
│  │  ┌─────────┐  ┌──────────────┐  ┌────────────┐                 │ │
│  │  │  Dio    │  │  Socket.IO   │  │  Hive DB   │                 │ │
│  │  │ (REST)  │  │  (Realtime)  │  │ (Local)    │                 │ │
│  │  └─────────┘  └──────────────┘  └────────────┘                 │ │
│  └─────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

## 1.2 Architecture Patterns

| Concern | Pattern | Implementation |
|---------|---------|----------------|
| Presentation | MVVM | Widget (View) -> Riverpod (ViewModel) |
| State Management | Riverpod | StateNotifierProvider, FutureProvider, StreamProvider |
| Data Access | Repository | AuthRepository, ChatRepository, DiscoveryRepository |
| Networking | Dio | DioClient with interceptors, retry, caching |
| Realtime | Socket.IO Client | SocketService with connection manager |
| Local Storage | Hive + SharedPreferences | Hive for complex objects, SP for settings |
| Routing | GoRouter | Declarative route tree with auth guards |
| DI | Riverpod | Auto-disposed providers |
| JSON | Freezed + JsonSerializable | Auto-generated models |

---

# 2. TECHNOLOGY STACK

| Category | Choice | Version | Purpose |
|----------|--------|---------|---------|
| Language | Dart | 3.x | Application language |
| Framework | Flutter | Stable (3.x) | Cross-platform UI |
| State | Riverpod | 2.x | State management + DI |
| Routing | GoRouter | 14.x | Declarative routing |
| HTTP | Dio | 5.x | REST client with interceptors |
| Socket | socket_io_client | 3.x | Realtime communication |
| Local DB | Hive | 2.x + Flutter adapter | Offline storage |
| Preferences | SharedPreferences | 2.x | Key-value store |
| Serialization | Freezed | 2.x | Immutable models |
| Serialization | JsonSerializable | json_annotation | JSON codegen |
| Charts | fl_chart | 0.70.x | Analytics visualizations |
| Images | cached_network_image | 3.x | Image loading + caching |
| Calendar | table_calendar | 3.x | Calendar widget |
| Notifications | flutter_local_notifications | 17.x | Push notifications |
| Video calls | flutter_webrtc | 0.12.x | Peer-to-peer calls |
| Animation | flutter_animate | 4.x | Declarative animations |
| Responsive | responsive_framework | 1.x | Breakpoint management |
| Linting | flutter_lints | 5.x | Code quality |

---

# 3. PROJECT STRUCTURE

```
promatch_flutter/
├── android/
├── ios/
├── web/
├── windows/
├── lib/
│   ├── main.dart                              # Entry point
│   ├── app.dart                               # MaterialApp + GoRouter
│   │
│   ├── core/
│   │   ├── constants/
│   │   │   ├── app_constants.dart             # App-wide constants
│   │   │   ├── api_constants.dart             # API URLs, timeouts
│   │   │   ├── storage_keys.dart              # Hive/SP keys
│   │   │   └── socket_events.dart             # Socket event constants
│   │   │
│   │   ├── theme/
│   │   │   ├── app_theme.dart                 # ThemeData (light + dark)
│   │   │   ├── color_tokens.dart              # Color definitions
│   │   │   ├── text_styles.dart               # Typography
│   │   │   ├── spacing.dart                   # Spacing system
│   │   │   └── theme_extensions.dart          # Custom ThemeExtensions
│   │   │
│   │   ├── network/
│   │   │   ├── dio_client.dart                # Dio singleton + interceptors
│   │   │   ├── auth_interceptor.dart          # Bearer token injection
│   │   │   ├── error_interceptor.dart         # Error handling
│   │   │   ├── mock_interceptor.dart          # Mock data fallback
│   │   │   ├── api_response.dart              # Generic API response wrapper
│   │   │   └── api_exceptions.dart            # Custom exceptions
│   │   │
│   │   ├── services/
│   │   │   ├── socket_service.dart            # Socket connection manager
│   │   │   ├── notification_service.dart      # Local + push notifications
│   │   │   ├── deep_link_service.dart         # Deep link handling
│   │   │   └── connectivity_service.dart      # Network connectivity
│   │   │
│   │   ├── storage/
│   │   │   ├── hive_service.dart              # Hive initialization + helpers
│   │   │   ├── preferences_service.dart       # SharedPreferences wrapper
│   │   │   └── session_manager.dart           # Auth session persistence
│   │   │
│   │   ├── utils/
│   │   │   ├── date_utils.dart                # Date formatting
│   │   │   ├── string_utils.dart              # Initials, truncation
│   │   │   ├── validators.dart                # Form validators
│   │   │   ├── debouncer.dart                 # Typing debounce
│   │   │   └── logger.dart                    # App logger
│   │   │
│   │   └── widgets/
│   │       ├── pm_avatar.dart                 # Avatar widget
│   │       ├── pm_badge.dart                  # Badge widget
│   │       ├── pm_button.dart                 # Button variants
│   │       ├── pm_card.dart                   # Card container
│   │       ├── pm_chip.dart                   # Chip/tag widget
│   │       ├── pm_modal.dart                  # Modal/dialog wrapper
│   │       ├── pm_skeleton.dart               # Loading skeletons
│   │       ├── pm_toast.dart                  # Toast notifications
│   │       ├── pm_empty_state.dart            # Empty state widget
│   │       ├── pm_section_header.dart         # Section headers
│   │       ├── pm_stat_card.dart              # Analytics stat card
│   │       ├── pm_loading_overlay.dart        # Loading indicator
│   │       ├── pm_error_widget.dart           # Error display
│   │       └── pm_bottom_nav.dart             # Bottom navigation
│   │
│   ├── routes/
│   │   ├── app_router.dart                    # GoRouter configuration
│   │   ├── route_names.dart                   # Route name constants
│   │   ├── auth_guard.dart                    # Route-level auth guard
│   │   └── role_guard.dart                    # Role-based routing guard
│   │
│   ├── shared/
│   │   ├── models/
│   │   │   ├── user_model.dart                # User model
│   │   │   ├── profile_model.dart             # Profile model
│   │   │   ├── message_model.dart             # Message model
│   │   │   ├── thread_model.dart              # Conversation model
│   │   │   ├── event_model.dart               # Event model
│   │   │   ├── notification_model.dart        # Notification model
│   │   │   ├── fit_score_model.dart           # Fit score model
│   │   │   ├── analytics_model.dart           # Analytics data model
│   │   │   └── subscription_model.dart        # Subscription model
│   │   │
│   │   └── providers/
│   │       ├── auth_state_provider.dart        # Auth state management
│   │       ├── user_provider.dart             # Current user provider
│   │       ├── socket_provider.dart           # Socket connection provider
│   │       └── subscription_provider.dart     # Subscription state
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── models/
│   │   │   │   ├── auth_role.dart             # AuthRole enum + config
│   │   │   │   └── login_payload.dart         # Login request/response
│   │   │   ├── repositories/
│   │   │   │   └── auth_repository.dart       # Login, signup, logout
│   │   │   ├── providers/
│   │   │   │   └── auth_providers.dart        # Auth riverpod providers
│   │   │   ├── pages/
│   │   │   │   ├── role_selector_page.dart    # Role selection screen
│   │   │   │   ├── login_page.dart            # Role-specific login
│   │   │   │   └── logout_page.dart           # Logout handler
│   │   │   └── widgets/
│   │   │       ├── role_card.dart             # Role selection card
│   │   │       ├── oauth_button.dart          # Google/LinkedIn button
│   │   │       └── login_form.dart            # Email/password form
│   │   │
│   │   ├── student/
│   │   │   ├── pages/
│   │   │   │   ├── student_home_page.dart
│   │   │   │   ├── student_feed_page.dart
│   │   │   │   ├── student_progress_page.dart
│   │   │   │   ├── student_billing_page.dart
│   │   │   │   └── professional_search_page.dart
│   │   │   ├── providers/student_providers.dart
│   │   │   └── widgets/student_nav.dart
│   │   │
│   │   ├── professional/
│   │   │   ├── pages/
│   │   │   │   ├── pro_overview_page.dart
│   │   │   │   ├── pro_inbox_page.dart
│   │   │   │   ├── pro_calendar_page.dart
│   │   │   │   ├── pro_analytics_page.dart
│   │   │   │   └── pro_company_page.dart
│   │   │   ├── providers/pro_providers.dart
│   │   │   └── widgets/pro_nav.dart
│   │   │
│   │   ├── organization/
│   │   │   ├── pages/
│   │   │   │   ├── org_dashboard_page.dart
│   │   │   │   └── org_settings_page.dart
│   │   │   ├── providers/org_providers.dart
│   │   │   └── widgets/org_nav.dart
│   │   │
│   │   ├── freelancer/
│   │   │   ├── pages/
│   │   │   │   ├── freelancer_dashboard_page.dart
│   │   │   │   ├── freelancer_discover_page.dart
│   │   │   │   ├── freelancer_profile_page.dart
│   │   │   │   ├── freelancer_onboarding_page.dart
│   │   │   │   └── portfolio_analyzer_page.dart
│   │   │   ├── providers/freelancer_providers.dart
│   │   │   └── widgets/freelancer_nav.dart
│   │   │
│   │   ├── startup/
│   │   │   ├── pages/
│   │   │   │   ├── startup_onboarding_page.dart
│   │   │   │   ├── hiring_dashboard_page.dart
│   │   │   │   └── project_post_page.dart
│   │   │   ├── providers/startup_providers.dart
│   │   │   └── widgets/startup_nav.dart
│   │   │
│   │   ├── messages/
│   │   │   ├── models/
│   │   │   │   ├── conversation_model.dart
│   │   │   │   └── message_model.dart
│   │   │   ├── repositories/chat_repository.dart
│   │   │   ├── providers/
│   │   │   │   ├── chat_providers.dart
│   │   │   │   ├── conversation_provider.dart
│   │   │   │   └── message_provider.dart
│   │   │   ├── pages/
│   │   │   │   ├── messages_page.dart
│   │   │   │   └── message_detail_page.dart
│   │   │   └── widgets/
│   │   │       ├── conversation_tile.dart
│   │   │       ├── message_bubble.dart
│   │   │       ├── message_composer.dart
│   │   │       ├── typing_indicator.dart
│   │   │       ├── attachment_picker.dart
│   │   │       └── voice_message_widget.dart
│   │   │
│   │   ├── discover/
│   │   │   ├── models/
│   │   │   │   ├── discover_filter.dart
│   │   │   │   └── match_result.dart
│   │   │   ├── repositories/discover_repository.dart
│   │   │   ├── providers/
│   │   │   │   ├── discover_providers.dart
│   │   │   │   └── swipe_provider.dart
│   │   │   ├── pages/discover_page.dart
│   │   │   └── widgets/
│   │   │       ├── swipe_deck.dart
│   │   │       ├── swipe_card.dart
│   │   │       ├── match_modal.dart
│   │   │       ├── discover_filters.dart
│   │   │       └── professional_search_modal.dart
│   │   │
│   │   ├── feed/
│   │   │   ├── repositories/feed_repository.dart
│   │   │   ├── providers/feed_providers.dart
│   │   │   ├── pages/feed_page.dart
│   │   │   └── widgets/
│   │   │       ├── reels_feed.dart
│   │   │       ├── feed_card.dart
│   │   │       └── feed_actions.dart
│   │   │
│   │   ├── profile/
│   │   │   ├── repositories/profile_repository.dart
│   │   │   ├── providers/profile_providers.dart
│   │   │   ├── pages/profile_page.dart
│   │   │   └── widgets/
│   │   │       ├── profile_header.dart
│   │   │       ├── profile_tabs.dart
│   │   │       ├── profile_skills.dart
│   │   │       ├── profile_goals.dart
│   │   │       ├── profile_fit_score.dart
│   │   │       ├── profile_edit_form.dart
│   │   │       └── mini_profile_card.dart
│   │   │
│   │   ├── connections/
│   │   │   ├── repositories/connections_repository.dart
│   │   │   ├── providers/connections_providers.dart
│   │   │   ├── pages/connections_page.dart
│   │   │   └── widgets/connection_tile.dart
│   │   │
│   │   ├── events/
│   │   │   ├── models/event_model.dart
│   │   │   ├── repositories/events_repository.dart
│   │   │   ├── providers/events_providers.dart
│   │   │   ├── pages/
│   │   │   │   ├── events_page.dart
│   │   │   │   ├── event_detail_page.dart
│   │   │   │   ├── host_event_page.dart
│   │   │   │   ├── create_opportunity_page.dart
│   │   │   │   └── organizer_dashboard_page.dart
│   │   │   └── widgets/
│   │   │       ├── event_card.dart
│   │   │       ├── event_calendar.dart
│   │   │       ├── rsvp_button.dart
│   │   │       └── event_calendar_menu.dart
│   │   │
│   │   ├── analytics/
│   │   │   ├── repositories/analytics_repository.dart
│   │   │   ├── providers/analytics_providers.dart
│   │   │   ├── pages/analytics_page.dart
│   │   │   └── widgets/
│   │   │       ├── match_quality_chart.dart
│   │   │       ├── skill_demand_chart.dart
│   │   │       ├── growth_chart.dart
│   │   │       └── kpi_dashboard.dart
│   │   │
│   │   ├── settings/
│   │   │   ├── repositories/settings_repository.dart
│   │   │   ├── providers/settings_providers.dart
│   │   │   ├── pages/settings_page.dart
│   │   │   └── widgets/
│   │   │       ├── settings_tabs.dart
│   │   │       ├── profile_settings_form.dart
│   │   │       ├── account_settings.dart
│   │   │       ├── notification_settings.dart
│   │   │       ├── privacy_settings.dart
│   │   │       ├── appearance_settings.dart
│   │   │       ├── billing_settings.dart
│   │   │       └── danger_zone.dart
│   │   │
│   │   ├── notifications/
│   │   │   ├── repositories/notification_repository.dart
│   │   │   ├── providers/notification_providers.dart
│   │   │   ├── pages/notifications_page.dart
│   │   │   └── widgets/
│   │   │       ├── notification_center.dart
│   │   │       ├── notification_tile.dart
│   │   │       └── notification_badge.dart
│   │   │
│   │   ├── billing/
│   │   │   ├── repositories/billing_repository.dart
│   │   │   ├── providers/billing_providers.dart
│   │   │   ├── pages/pro_checkout_page.dart
│   │   │   └── widgets/
│   │   │       ├── pricing_card.dart
│   │   │       └── checkout_form.dart
│   │   │
│   │   ├── sessions/
│   │   │   ├── repositories/sessions_repository.dart
│   │   │   ├── providers/sessions_providers.dart
│   │   │   ├── pages/sessions_page.dart
│   │   │   └── widgets/
│   │   │       ├── session_card.dart
│   │   │       ├── session_calendar.dart
│   │   │       └── availability_picker.dart
│   │   │
│   │   ├── call/
│   │   │   ├── models/call_session_model.dart
│   │   │   ├── repositories/call_repository.dart
│   │   │   ├── providers/call_providers.dart
│   │   │   ├── pages/call_page.dart
│   │   │   └── widgets/
│   │   │       ├── video_view.dart
│   │   │       ├── call_controls.dart
│   │   │       └── call_overlay.dart
│   │   │
│   │   ├── onboarding/
│   │   │   ├── models/onboarding_step.dart
│   │   │   ├── providers/onboarding_providers.dart
│   │   │   ├── pages/onboarding_page.dart
│   │   │   └── widgets/
│   │   │       ├── step_basic_info.dart
│   │   │       ├── step_skills.dart
│   │   │       ├── step_intent.dart
│   │   │       └── step_preferences.dart
│   │   │
│   │   └── public/
│   │       ├── pages/
│   │       │   ├── landing_page.dart
│   │       │   ├── features_page.dart
│   │       │   ├── about_page.dart
│   │       │   └── contact_page.dart
│   │       └── widgets/
│   │           ├── landing_hero.dart
│   │           ├── landing_features.dart
│   │           ├── landing_steps.dart
│   │           ├── landing_testimonials.dart
│   │           ├── landing_stats.dart
│   │           ├── pricing_section.dart
│   │           └── grid_distortion.dart
│   │
│   └── app_shell.dart
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── fonts/
│   └── mock_data/
│
├── test/
│   ├── unit/
│   ├── widget/
│   ├── integration/
│   └── mocks/
│
├── pubspec.yaml
├── analysis_options.yaml
├── build.yaml
└── .env.example
```

---

# 4. DATA MODELS

## 4.1 User Model

```dart
// lib/shared/models/user_model.dart
@freezed
class UserModel with _$UserModel {
  const factory UserModel({
    required String id,
    required String name,
    required String email,
    required AuthRole role,
    String? avatarToken,
    String? avatarUrl,
    bool? verified,
    bool? firstLogin,
    DateTime? loggedInAt,
  }) = _UserModel;

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);
}
```

## 4.2 Auth Role Enum

```dart
// lib/features/auth/models/auth_role.dart
enum AuthRole { student, pro, org }

extension AuthRoleX on AuthRole {
  String get path {
    switch (this) {
      case AuthRole.student: return 'student';
      case AuthRole.pro: return 'professional';
      case AuthRole.org: return 'organization';
    }
  }

  String get label {
    switch (this) {
      case AuthRole.student: return 'Student';
      case AuthRole.pro: return 'Professional';
      case AuthRole.org: return 'Organization';
    }
  }

  String get dashboardRoute {
    switch (this) {
      case AuthRole.student: return '/student/home';
      case AuthRole.pro: return '/pro/overview';
      case AuthRole.org: return '/org/dashboard';
    }
  }
}
```

## 4.3 Profile Model

```dart
// lib/shared/models/profile_model.dart
@freezed
class ProfileModel with _$ProfileModel {
  const factory ProfileModel({
    required String id,
    required String username,
    required String name,
    required String title,
    required String role,
    required String audience,
    required String domain,
    required String intent,
    required String commitment,
    required String workStyle,
    required String location,
    required String tone,
    required int match,
    required bool verified,
    required String bio,
    required String headline,
    required List<String> skills,
    required List<String> goals,
    required List<String> why,
    required int mutuals,
    required int views,
    required int sessions,
    required int events,
    required List<String> links,
    required String cover,
    String? avatar,
    String? src,
    String? companyStage,
    String? responseRate,
    String? avgResponse,
  }) = _ProfileModel;

  factory ProfileModel.fromJson(Map<String, dynamic> json) =>
      _$ProfileModelFromJson(json);
}
```

## 4.4 Message Model

```dart
// lib/features/messages/models/message_model.dart
@freezed
class MessageModel with _$MessageModel {
  const factory MessageModel({
    required String id,
    required String conversationId,
    required String senderId,
    required String content,
    required DateTime createdAt,
    required bool read,
    String? messageType,
    String? attachmentUrl,
  }) = _MessageModel;

  factory MessageModel.fromJson(Map<String, dynamic> json) =>
      _$MessageModelFromJson(json);

  bool get isMine => senderId == 'me';
}
```

## 4.5 Conversation Model

```dart
// lib/features/messages/models/conversation_model.dart
@freezed
class ConversationModel with _$ConversationModel {
  const factory ConversationModel({
    required String id,
    required ProfileModel person,
    required String status,
    required int unread,
    required String lastMessage,
    required String lastTime,
    required List<MessageModel> messages,
  }) = _ConversationModel;

  factory ConversationModel.fromJson(Map<String, dynamic> json) =>
      _$ConversationModelFromJson(json);
}
```

## 4.6 Event Model

```dart
// lib/features/events/models/event_model.dart
@freezed
class EventModel with _$EventModel {
  const factory EventModel({
    required String id,
    required String title,
    required String host,
    required String format,
    required String domain,
    required String date,
    required String time,
    required int durationMinutes,
    required String location,
    required int attendees,
    required List<String> tags,
    required String summary,
    required List<String> agenda,
    String? linkedinEventUrl,
  }) = _EventModel;

  factory EventModel.fromJson(Map<String, dynamic> json) =>
      _$EventModelFromJson(json);
}
```

## 4.7 Fit Score Model

```dart
// lib/shared/models/fit_score_model.dart
@freezed
class FitScoreModel with _$FitScoreModel {
  const factory FitScoreModel({
    required int overall,
    required int skills,
    required int experience,
    required int projects,
    required int availability,
  }) = _FitScoreModel;

  factory FitScoreModel.fromJson(Map<String, dynamic> json) =>
      _$FitScoreModelFromJson(json);
}
```

## 4.8 Notification Model

```dart
// lib/shared/models/notification_model.dart
@freezed
class NotificationModel with _$NotificationModel {
  const factory NotificationModel({
    required String id,
    required String type,
    required String title,
    required String message,
    required String timestamp,
    required bool read,
    String? link,
  }) = _NotificationModel;

  factory NotificationModel.fromJson(Map<String, dynamic> json) =>
      _$NotificationModelFromJson(json);
}
```

## 4.9 Analytics Model

```dart
// lib/shared/models/analytics_model.dart
@freezed
class AnalyticsSummary with _$AnalyticsSummary {
  const factory AnalyticsSummary({
    required List<TrendPoint> matchQuality,
    required double responseRate,
    required List<SkillDemand> skillDemand,
  }) = _AnalyticsSummary;

  factory AnalyticsSummary.fromJson(Map<String, dynamic> json) =>
      _$AnalyticsSummaryFromJson(json);
}

@freezed
class TrendPoint with _$TrendPoint {
  const factory TrendPoint({
    required String label,
    required double value,
  }) = _TrendPoint;

  factory TrendPoint.fromJson(Map<String, dynamic> json) =>
      _$TrendPointFromJson(json);
}

@freezed
class SkillDemand with _$SkillDemand {
  const factory SkillDemand({
    required String skill,
    required double demand,
  }) = _SkillDemand;

  factory SkillDemand.fromJson(Map<String, dynamic> json) =>
      _$SkillDemandFromJson(json);
}
```

## 4.10 Subscription Model

```dart
// lib/shared/models/subscription_model.dart
@freezed
class SubscriptionModel with _$SubscriptionModel {
  const factory SubscriptionModel({
    required String plan,
    required List<String> gatedFeatures,
  }) = _SubscriptionModel;

  factory SubscriptionModel.fromJson(Map<String, dynamic> json) =>
      _$SubscriptionModelFromJson(json);

  bool canUse(String feature) =>
      plan == 'pro' || !gatedFeatures.contains(feature);
}
```

## 4.11 Discover Filter Model

```dart
// lib/features/discover/models/discover_filter.dart
@freezed
class DiscoverFilter with _$DiscoverFilter {
  const factory DiscoverFilter({
    String? domain,
    List<String>? skills,
    String? intent,
    String? location,
    String? commitment,
  }) = _DiscoverFilter;

  factory DiscoverFilter.fromJson(Map<String, dynamic> json) =>
      _$DiscoverFilterFromJson(json);
}
```

## 4.12 React -> Flutter Model Migration Table

| React (Mock Data) | Flutter Model | Location |
|-------------------|---------------|----------|
| `profiles.me` / `profiles.sarah` etc. | `ProfileModel` | `lib/shared/models/profile_model.dart` |
| `studentThreads` / `proThreads` | `ConversationModel` | `lib/features/messages/models/conversation_model.dart` |
| `thread.messages[]` | `MessageModel` | `lib/features/messages/models/message_model.dart` |
| `events[]` | `EventModel` | `lib/features/events/models/event_model.dart` |
| `notifications[]` | `NotificationModel` | `lib/shared/models/notification_model.dart` |
| `buildFitScore()` | `FitScoreModel` | `lib/shared/models/fit_score_model.dart` |
| `analyticsTrend` / `skillDemandData` | `AnalyticsSummary` | `lib/shared/models/analytics_model.dart` |
| `AUTH_ROLES` config | `AuthRole` enum + extension | `lib/features/auth/models/auth_role.dart` |
| `subscriptionStore` | `SubscriptionModel` | `lib/shared/models/subscription_model.dart` |
| Filter params in `discoverUtils` | `DiscoverFilter` | `lib/features/discover/models/discover_filter.dart` |
