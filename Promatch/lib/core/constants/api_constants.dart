class ApiConstants {
  static const String baseUrl = 'https://api.promatch.dev';
  static const Duration connectTimeout = Duration(seconds: 10);
  static const Duration receiveTimeout = Duration(seconds: 15);
  static const int maxRetries = 3;
  static const Duration retryDelay = Duration(seconds: 2);

  // Endpoints
  static const String authLogin = '/auth/login';
  static const String authSignup = '/auth/signup';
  static const String authLogout = '/auth/logout';
  static const String authRefresh = '/auth/refresh';
  static const String profiles = '/profiles';
  static const String discover = '/discover';
  static const String matches = '/matches';
  static const String conversations = '/conversations';
  static const String messages = '/messages';
  static const String events = '/events';
  static const String notifications = '/notifications';
  static const String analytics = '/analytics';
  static const String subscription = '/subscription';
  static const String sessions = '/sessions';
  static const String feed = '/feed';
  static const String connections = '/connections';
  static const String billing = '/billing';
  static const String upload = '/upload';
}
