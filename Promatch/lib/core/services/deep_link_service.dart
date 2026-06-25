class DeepLinkService {
  Uri? _pendingUri;

  Uri? get pendingUri => _pendingUri;

  void handleDeepLink(Uri uri) {
    _pendingUri = uri;
  }

  void clearPending() {
    _pendingUri = null;
  }

  Map<String, String>? parseDeepLink(Uri uri) {
    final segments = uri.pathSegments;
    if (segments.isEmpty) return null;

    switch (segments[0]) {
      case 'profile':
        if (segments.length > 1) return {'type': 'profile', 'username': segments[1]};
      case 'event':
        if (segments.length > 1) return {'type': 'event', 'eventId': segments[1]};
      case 'message':
        if (segments.length > 1) return {'type': 'message', 'threadId': segments[1]};
      case 'call':
        if (segments.length > 1) return {'type': 'call', 'sessionId': segments[1]};
    }
    return null;
  }
}
