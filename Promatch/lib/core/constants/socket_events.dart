class SocketEvents {
  static const String connect = 'connect';
  static const String disconnect = 'disconnect';
  static const String error = 'error';

  // Chat
  static const String messageSent = 'message:sent';
  static const String messageReceived = 'message:received';
  static const String messageRead = 'message:read';
  static const String typing = 'message:typing';
  static const String typingStopped = 'message:typing:stopped';

  // Match
  static const String matchCreated = 'match:created';
  static const String matchAccepted = 'match:accepted';
  static const String matchRejected = 'match:rejected';

  // Presence
  static const String userOnline = 'user:online';
  static const String userOffline = 'user:offline';

  // Notifications
  static const String notification = 'notification';

  // Events
  static const String eventUpdated = 'event:updated';
  static const String rsvpUpdated = 'rsvp:updated';

  // Call
  static const String callOffer = 'call:offer';
  static const String callAnswer = 'call:answer';
  static const String callIceCandidate = 'call:ice:candidate';
  static const String callEnded = 'call:ended';
}
