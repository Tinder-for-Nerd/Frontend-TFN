import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/dio_client.dart';
import '../../../shared/models/message_model.dart';
import '../../../shared/models/profile_model.dart';
import '../models/conversation_model.dart';

class ChatRepository {
  final DioClient _client;

  ChatRepository(this._client);

  Future<List<ConversationModel>> getConversations() async {
    try {
      final response = await _client.get('/conversations');
      final data = response.data as Map<String, dynamic>;
      final conversations = (data['data'] as List)
          .map((e) => ConversationModel.fromJson(e as Map<String, dynamic>))
          .toList();
      return conversations;
    } catch (_) {
      return _mockConversations();
    }
  }

  Future<List<MessageModel>> getMessages(String conversationId) async {
    try {
      final response = await _client.get('/conversations/$conversationId/messages');
      final data = response.data as Map<String, dynamic>;
      final messages = (data['data'] as List)
          .map((e) => MessageModel.fromJson(e as Map<String, dynamic>))
          .toList();
      return messages;
    } catch (_) {
      return _mockMessages();
    }
  }

  Future<MessageModel> sendMessage({
    required String conversationId,
    required String content,
    String? messageType,
    String? attachmentUrl,
  }) async {
    try {
      final response = await _client.post('/conversations/$conversationId/messages', data: {
        'content': content,
        'messageType': messageType ?? 'text',
        'attachmentUrl': attachmentUrl,
      });
      final data = response.data as Map<String, dynamic>;
      return MessageModel.fromJson(data['data'] as Map<String, dynamic>);
    } catch (_) {
      return MessageModel(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        conversationId: conversationId,
        senderId: 'me',
        content: content,
        createdAt: DateTime.now(),
        messageType: messageType ?? 'text',
        attachmentUrl: attachmentUrl,
      );
    }
  }

  List<ConversationModel> _mockConversations() {
    return [
      ConversationModel(
        id: '1', person: _mockProfile('Sarah Chen', 'UX Designer'), status: 'active',
        unread: 2, lastMessage: 'That sounds great! When are you free?', lastTime: '2m ago',
      ),
      ConversationModel(
        id: '2', person: _mockProfile('Alex Rivera', 'Full-Stack Dev'), status: 'active',
        unread: 0, lastMessage: 'I can help with that React component', lastTime: '1h ago',
      ),
    ];
  }

  ProfileModel _mockProfile(String name, String title) {
    return ProfileModel(
      id: name.toLowerCase().replaceAll(' ', '-'), username: name.toLowerCase().replaceAll(' ', '.'),
      name: name, title: title, role: 'pro', audience: '', domain: '', intent: '',
      commitment: '', workStyle: '', location: 'Remote', tone: '', match: 95,
      verified: true, bio: '', headline: '', skills: [], goals: [], why: [],
      mutuals: 0, views: 0, sessions: 0, events: 0, links: [], cover: '',
    );
  }

  List<MessageModel> _mockMessages() {
    return [
      MessageModel(id: 'm1', conversationId: '1', senderId: 'them', content: 'Hey! How are you?', createdAt: DateTime.now().subtract(const Duration(hours: 2))),
      MessageModel(id: 'm2', conversationId: '1', senderId: 'me', content: 'I\'m doing great! Ready to collaborate.', createdAt: DateTime.now().subtract(const Duration(hours: 1))),
    ];
  }
}
