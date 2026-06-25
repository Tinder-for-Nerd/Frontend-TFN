import 'dart:developer' as dev;

class AppLogger {
  static bool _enabled = true;

  static void enable() => _enabled = true;
  static void disable() => _enabled = false;

  static void info(String message, {String? tag}) {
    if (!_enabled) return;
    dev.log('[INFO]${tag != null ? ' [$tag]' : ''} $message');
  }

  static void warning(String message, {String? tag}) {
    if (!_enabled) return;
    dev.log('[WARNING]${tag != null ? ' [$tag]' : ''} $message');
  }

  static void error(String message, {Object? error, StackTrace? stackTrace, String? tag}) {
    if (!_enabled) return;
    dev.log(
      '[ERROR]${tag != null ? ' [$tag]' : ''} $message',
      error: error,
      stackTrace: stackTrace,
    );
  }

  static void debug(String message, {String? tag}) {
    if (!_enabled) return;
    dev.log('[DEBUG]${tag != null ? ' [$tag]' : ''} $message');
  }
}
