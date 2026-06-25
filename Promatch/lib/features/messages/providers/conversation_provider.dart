import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/conversation_model.dart';
import 'chat_providers.dart';

final conversationsProvider = FutureProvider<List<ConversationModel>>((ref) async {
  final chatRepo = ref.watch(chatRepositoryProvider);
  return chatRepo.getConversations();
});

final selectedConversationProvider = StateProvider<ConversationModel?>((ref) => null);

final unreadCountProvider = Provider<int>((ref) {
  final conversations = ref.watch(conversationsProvider).valueOrNull;
  if (conversations == null) return 0;
  return conversations.fold(0, (sum, conv) => sum + conv.unread);
});
