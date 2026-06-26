import 'profile_model.dart';

class Message {
  final String id;
  final String senderId;
  final String text;
  final DateTime timestamp;
  final bool isRead;

  Message({
    required this.id,
    required this.senderId,
    required this.text,
    required this.timestamp,
    this.isRead = false,
  });
}

class ChatThread {
  final String id;
  final ProfileModel participant;
  final List<Message> messages;
  final bool isTyping;
  final int unreadCount;

  ChatThread({
    required this.id,
    required this.participant,
    required this.messages,
    this.isTyping = false,
    this.unreadCount = 0,
  });

  Message get lastMessage => messages.isNotEmpty
      ? messages.last
      : Message(
          id: 'empty',
          senderId: 'system',
          text: 'No messages yet.',
          timestamp: DateTime.now(),
        );

  ChatThread copyWith({
    List<Message>? messages,
    bool? isTyping,
    int? unreadCount,
  }) {
    return ChatThread(
      id: id,
      participant: participant,
      messages: messages ?? this.messages,
      isTyping: isTyping ?? this.isTyping,
      unreadCount: unreadCount ?? this.unreadCount,
    );
  }
}
