# ProMatch (Tinder for Nerds) — Flutter Migration Plan (Part 3/4)

## 7. Auth | 8. Socket | 9. Chat | 10. Discover

---

# 7. AUTHENTICATION SYSTEM

## 7.1 Auth Role Model

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

  String get accentColorHex {
    switch (this) {
      case AuthRole.student: return '#FF6B6B';
      case AuthRole.pro: return '#0084FF';
      case AuthRole.org: return '#FFB347';
    }
  }

  String get tagline {
    switch (this) {
      case AuthRole.student: return 'Your next co-founder is one swipe away.';
      case AuthRole.pro: return 'Where serious builders find their technical co-founder.';
      case AuthRole.org: return "Your community's builder network, supercharged.";
    }
  }

  List<String> get tags {
    switch (this) {
      case AuthRole.student: return ['Hackathons', 'Side projects', 'Early teams'];
      case AuthRole.pro: return ['Co-founders', 'Advisors', 'Freelancers'];
      case AuthRole.org: return ['GDG Chapters', 'Incubators', 'Accelerators'];
    }
  }

  List<String> get oauthOrder {
    switch (this) {
      case AuthRole.student: return ['google', 'linkedin'];
      case AuthRole.pro: return ['linkedin', 'google'];
      case AuthRole.org: return ['google'];
    }
  }

  String get dashboardRoute {
    switch (this) {
      case AuthRole.student: return '/student/home';
      case AuthRole.pro: return '/pro/overview';
      case AuthRole.org: return '/org/dashboard';
    }
  }

  static AuthRole fromPath(String path) {
    switch (path.toLowerCase()) {
      case 'professional': return AuthRole.pro;
      case 'organization': return AuthRole.org;
      default: return AuthRole.student;
    }
  }
}
```

## 7.2 Auth Repository

```dart
// lib/features/auth/repositories/auth_repository.dart
class AuthRepository {
  final DioClient _client;

  AuthRepository(this._client);

  Future<UserModel> login(String email, String password, AuthRole role) async {
    try {
      final response = await _client.post('/auth/login', data: {
        'email': email, 'password': password, 'role': role.path,
      });
      return UserModel.fromJson(response.data['user']);
    } on DioException {
      await Future.delayed(const Duration(milliseconds: 120));
      return UserModel(
        id: 'mock-user', name: email.split('@').first, email: email,
        role: role, avatarToken: 'AK', verified: false, loggedInAt: DateTime.now(),
      );
    }
  }

  Future<UserModel> signup(String email, String password, AuthRole role, {String? name}) async {
    try {
      final response = await _client.post('/auth/signup', data: {
        'email': email, 'password': password, 'name': name ?? email.split('@').first, 'role': role.path,
      });
      return UserModel.fromJson(response.data['user']);
    } on DioException {
      await Future.delayed(const Duration(milliseconds: 120));
      return UserModel(
        id: 'mock-user', name: name ?? email.split('@').first, email: email,
        role: role, avatarToken: 'AK', verified: false, firstLogin: true, loggedInAt: DateTime.now(),
      );
    }
  }

  Future<UserModel> oauthLogin(String provider, String token, AuthRole role) async {
    try {
      final response = await _client.post('/auth/oauth', data: {
        'provider': provider, 'token': token, 'role': role.path,
      });
      return UserModel.fromJson(response.data['user']);
    } on DioException {
      await Future.delayed(const Duration(milliseconds: 120));
      return UserModel(
        id: 'mock-oauth', name: 'OAuth User', email: 'oauth@example.com',
        role: role, avatarToken: 'OU', verified: true, loggedInAt: DateTime.now(),
      );
    }
  }

  Future<void> logout() async {
    try { await _client.post('/auth/logout'); } on DioException { }
  }
}
```

## 7.3 Session Persistence

```dart
// lib/core/storage/session_manager.dart
class SessionManager {
  static const _userKey = 'pm_user';
  final SharedPreferences _prefs;
  final HiveService _hive;

  SessionManager(this._prefs, this._hive);

  Future<void> saveSession(UserModel user) async {
    await _prefs.setString(_userKey, jsonEncode(user.toJson()));
    await _hive.put('user', user.toJson());
  }

  UserModel? restoreSession() {
    final stored = _prefs.getString(_userKey);
    if (stored == null) return null;
    try {
      return UserModel.fromJson(jsonDecode(stored));
    } catch (_) {
      _prefs.remove(_userKey);
      return null;
    }
  }

  Future<void> clearSession() async {
    await _prefs.remove(_userKey);
    await _hive.delete('user');
  }
}
```

## 7.4 Auth Flow Diagram

```
Login Flow:
selector -> input -> repo.login/signup -> save session -> redirect to dashboard

Protected Route Flow:
route match -> auth guard -> logged in? -> role check -> pass/redirect

Logout Flow:
button -> repo.logout -> clear session -> redirect to /
```

## 7.5 React -> Flutter Auth Migration

| React | Flutter |
|-------|---------|
| `src/context/AuthContext.jsx` | `authStateProvider` (Riverpod) |
| `packages/shared/src/stores/userStore.js` | `authStateProvider` |
| `src/modules/auth/authConfig.js` | `AuthRole` enum + `AuthRoleX` extension |
| `src/modules/auth/pages/RoleSelectorPage.jsx` | `RoleSelectorPage` widget |
| `src/modules/auth/pages/RoleLoginPage.jsx` | `LoginPage` widget |
| `src/modules/auth/pages/LogoutPage.jsx` | `LogoutPage` widget |
| `src/components/common/ProtectedRoute.jsx` | `authGuard` (GoRouter redirect) |
| `src/lib/socket.js` | `SocketService` |
| `localStorage pm_user` | `SharedPreferences` + `sessionManager` |

---

# 8. SOCKET SYSTEM

## 8.1 Socket Service

```dart
// lib/core/services/socket_service.dart
enum SocketStatus { disconnected, connecting, connected, mock }

class SocketService {
  Socket? _socket;
  SocketStatus _status = SocketStatus.disconnected;
  final _statusController = StreamController<SocketStatus>.broadcast();
  final _messageController = StreamController<Map<String, dynamic>>.broadcast();
  final _typingController = StreamController<Map<String, dynamic>>.broadcast();
  final _presenceController = StreamController<Map<String, dynamic>>.broadcast();
  final _notificationController = StreamController<Map<String, dynamic>>.broadcast();

  Stream<SocketStatus> get statusStream => _statusController.stream;
  Stream<Map<String, dynamic>> get messageStream => _messageController.stream;
  Stream<Map<String, dynamic>> get typingStream => _typingController.stream;
  Stream<Map<String, dynamic>> get presenceStream => _presenceController.stream;
  Stream<Map<String, dynamic>> get notificationStream => _notificationController.stream;

  void connect() {
    final socketUrl = dotenv.env['SOCKET_URL'];
    if (socketUrl != null && socketUrl.isNotEmpty) {
      _status = SocketStatus.connecting;
      _statusController.add(_status);
      _socket = io(socketUrl, {
        'autoConnect': true,
        'transports': ['websocket', 'polling'],
        'reconnection': true,
        'reconnectionAttempts': 8,
        'reconnectionDelay': 1200,
      });
      _socket!.onConnect((_) {
        _status = SocketStatus.connected;
        _statusController.add(_status);
        _bindEvents();
      });
      _socket!.onDisconnect((_) {
        _status = SocketStatus.disconnected;
        _statusController.add(_status);
      });
    } else {
      _status = SocketStatus.mock;
      _statusController.add(_status);
      _startMockServer();
    }
  }

  void _bindEvents() {
    _socket!.on('receive_message', (d) => _messageController.add(d));
    _socket!.on('user_typing', (d) => _typingController.add(d));
    _socket!.on('typing_stopped', (d) => _typingController.add(d));
    _socket!.on('presence_update', (d) => _presenceController.add(d));
    _socket!.on('notification', (d) => _notificationController.add(d));
    _socket!.on('message_read_ack', (d) {});
  }

  void _startMockServer() { _runMockSocket(); }

  void _runMockSocket() {
    // Full mock server matching src/lib/mockSocket.js
    // Auto-replies, presence cycling (28s), typing simulations
  }

  void joinRoom(String id) => _socket?.emit('join_room', {'conversationId': id});
  void leaveRoom(String id) => _socket?.emit('leave_room', {'conversationId': id});
  void sendMessage(String id, String c) => _socket?.emit('send_message', {'conversationId': id, 'content': c});
  void startTyping(String id) => _socket?.emit('typing_start', {'conversationId': id});
  void stopTyping(String id) => _socket?.emit('typing_stop', {'conversationId': id});
  void markRead(String msgId, String convId) => _socket?.emit('message_read', {'messageId': msgId, 'conversationId': convId});
  void disconnect() { _socket?.disconnect(); _socket = null; _status = SocketStatus.disconnected; _statusController.add(_status); }
  void dispose() { disconnect(); _statusController.close(); _messageController.close(); _typingController.close(); _presenceController.close(); _notificationController.close(); }
}
```

## 8.2 Socket Event Constants

```dart
// lib/core/constants/socket_events.dart
class SocketEvents {
  static const joinRoom = 'join_room';
  static const leaveRoom = 'leave_room';
  static const sendMessage = 'send_message';
  static const receiveMessage = 'receive_message';
  static const typingStart = 'typing_start';
  static const typingStop = 'typing_stop';
  static const userTyping = 'user_typing';
  static const typingStopped = 'typing_stopped';
  static const messageRead = 'message_read';
  static const messageReadAck = 'message_read_ack';
  static const notification = 'notification';
  static const presenceUpdate = 'presence_update';
}
```

## 8.3 React -> Flutter Socket Migration

| React | Flutter |
|-------|---------|
| `src/lib/socket.js` | `SocketService` class |
| `src/lib/mockSocket.js` | `_runMockSocket()` in `SocketService` |
| `src/context/SocketProvider.jsx` | `socketServiceProvider` (Riverpod) |
| `src/hooks/useSocket.js` | `ref.watch(socketServiceProvider)` |
| `src/hooks/useChat.js` | `ChatRepository` + socket bridge |
| `packages/shared/src/socket/events.js` | `SocketEvents` constants |
| `SOCKET_EVENTS` enum | `SocketEvents` class |

---

# 9. CHAT/MESSAGING SYSTEM

## 9.1 Widget Tree

```
MessagesPage
├── AppBar (search, filter toggle)
├── ResponsiveSplitView
│   ├── ConversationList (left panel)
│   │   ├── FilterToggle (All/Unread)
│   │   ├── SearchField
│   │   └── ListView.builder
│   │       └── ConversationTile
│   │           ├── Avatar
│   │           ├── Name + LastMessage
│   │           ├── Time + UnreadBadge
│   │           └── OnlineIndicator
│   │
│   └── ConversationArea (right/full on mobile)
│       ├── MessageAppBar (name, online status)
│       ├── Expanded -> ListView.builder
│       │   └── MessageBubble
│       │       ├── Avatar (them only)
│       │       ├── Content + Time + ReadReceipt
│       │       └── TailTriangle
│       ├── TypingIndicator (animated dots)
│       └── MessageComposer
│           ├── AttachmentButton
│           ├── TextField (typing detection)
│           ├── VoiceButton
│           └── SendButton
```

## 9.2 Chat Flow

```
Type -> debounce 300ms -> emit typing_start
Stop -> emit typing_stop
Send -> emit send_message -> receive_message
Auto-reply -> typing_start -> receive_message
Active room -> auto mark_read -> emit message_read
Open thread -> join_room -> leave_old_room
```

## 9.3 Chat Repository

```dart
// lib/features/messages/repositories/chat_repository.dart
class ChatRepository {
  final DioClient _dio;
  final SocketService _socket;

  ChatRepository(this._dio, this._socket);

  Future<List<ConversationModel>> getConversations() async {
    final response = await _dio.get('/chat/conversations');
    return (response.data as List).map((j) => ConversationModel.fromJson(j)).toList();
  }

  Future<List<MessageModel>> getMessages(String conversationId) async {
    final response = await _dio.get('/chat/conversations/$conversationId/messages');
    return (response.data as List).map((j) => MessageModel.fromJson(j)).toList();
  }

  void sendMessage(String id, String text) => _socket.sendMessage(id, text);
  void startTyping(String id) => _socket.startTyping(id);
  void stopTyping(String id) => _socket.stopTyping(id);
  void markAsRead(String convId, String msgId) => _socket.markRead(msgId, convId);
  void joinRoom(String id) => _socket.joinRoom(id);
  void leaveRoom(String id) => _socket.leaveRoom(id);
}
```

## 9.4 React -> Flutter Chat Migration

| React | Flutter |
|-------|---------|
| `src/hooks/useChat.js` | `ChatRepository` + `conversationListProvider` |
| `MessagesPage.jsx` | `MessagesPage` widget |
| `thread list` | `ConversationTile` widget |
| `message bubbles` | `MessageBubble` widget |
| `composer` | `MessageComposer` widget |
| `typing state` | `TypingIndicator` + `TypingState` provider |
| `read receipts` | Socket `message_read_ack` event |
| `presence` | `PresenceState` provider |

---

# 10. DISCOVER/SWIPE FEATURE

## 10.1 Widget Tree

```
DiscoverPage
├── AppBar (title + filter button)
├── SwipeDeck
│   └── Stack
│       ├── SwipeCard (top, z:10)
│       │   ├── GestureDetector (pan)
│       │   ├── HeroImage (cached)
│       │   ├── Vignette overlay
│       │   ├── StampOverlay (CONNECT/PASS/SUPER)
│       │   ├── Body: FitScore, Avatar, Name, Bio, Badges, Skills
│       │   └── Action buttons (Pass/Super/Connect)
│       ├── SwipeCard (z:9, offset)
│       └── SwipeCard (z:8, offset)
├── DiscoverFilters (BottomSheet)
│   └── Domain, Skills, Intent, Location, Commitment
└── MatchModal (dialog)
    └── Animation, avatars, "It's a match!", actions
```

## 10.2 Animation Strategy

| React (framer-motion) | Flutter |
|------------------------|---------|
| `motion.div` drag | `GestureDetector` + `AnimatedBuilder` |
| `useMotionValue(x)` | `ValueNotifier<double>` |
| `useTransform` | `Tween<double>` |
| `onDragEnd` | `onPanEnd` |
| `spring` | `SpringDescription` |
| `whileTap` | `onTapDown/onTapUp` |

## 10.3 React -> Flutter Discover Migration

| React | Flutter |
|-------|---------|
| `DiscoverPage.jsx` | `DiscoverPage` widget |
| `SwipeStack.jsx` | `SwipeDeck` widget |
| `SwipeCard.jsx` | `SwipeCard` widget |
| `MatchModal.jsx` | `MatchModal` widget |
| `DiscoverFilters.jsx` | `DiscoverFilters` widget |
| `discoverUtils.js` | `DiscoverFilter` model + filtering logic |
| `ProfessionalSearchModal.jsx` | `ProfessionalSearchModal` widget |
