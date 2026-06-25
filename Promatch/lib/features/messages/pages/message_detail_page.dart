import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../../../shared/models/message_model.dart';
import '../providers/conversation_provider.dart';
import '../providers/message_provider.dart';
import '../widgets/message_bubble.dart';
import '../widgets/message_composer.dart';

class MessageDetailPage extends ConsumerWidget {
  final String threadId;

  const MessageDetailPage({super.key, required this.threadId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final messagesAsync = ref.watch(messagesProvider(threadId));
    final conversation = ref.watch(selectedConversationProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text(conversation?.person.name ?? 'Chat'),
      ),
      body: Column(
        children: [
          Expanded(
            child: messagesAsync.when(
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (err, _) => Center(child: Text('Error: $err')),
              data: (messages) {
                if (messages.isEmpty) {
                  return const Center(child: Text('No messages yet'));
                }
                return ListView.builder(
                  padding: const EdgeInsets.all(AppSpacing.lg),
                  reverse: true,
                  itemCount: messages.length,
                  itemBuilder: (context, index) {
                    final msg = messages[index];
                    return MessageBubble(
                      message: msg,
                      isMine: msg.senderId == 'me' || msg.isMine,
                    );
                  },
                );
              },
            ),
          ),
          MessageComposer(
            onSend: (content) {
              ref.read(sendMessageProvider(SendMessageArgs(
                conversationId: threadId,
                content: content,
              )));
            },
          ),
        ],
      ),
    );
  }
}
