import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/models/message_model.dart';
import '../models/conversation_model.dart';
import '../repositories/chat_repository.dart';
import 'chat_providers.dart';

final messagesProvider = FutureProvider.family<List<MessageModel>, String>((ref, conversationId) async {
  final chatRepo = ref.watch(chatRepositoryProvider);
  return chatRepo.getMessages(conversationId);
});

final sendMessageProvider = Provider.family<void, SendMessageArgs>((ref, args) async {
  final chatRepo = ref.watch(chatRepositoryProvider);
  await chatRepo.sendMessage(
    conversationId: args.conversationId,
    content: args.content,
    messageType: args.messageType,
    attachmentUrl: args.attachmentUrl,
  );
  ref.invalidate(messagesProvider(args.conversationId));
});

class SendMessageArgs {
  final String conversationId;
  final String content;
  final String? messageType;
  final String? attachmentUrl;

  const SendMessageArgs({
    required this.conversationId,
    required this.content,
    this.messageType,
    this.attachmentUrl,
  });
}
