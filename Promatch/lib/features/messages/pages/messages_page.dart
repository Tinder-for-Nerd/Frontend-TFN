import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../../../core/widgets/pm_avatar.dart';
import '../../../core/widgets/pm_skeleton.dart';
import '../providers/conversation_provider.dart';

class MessagesPage extends ConsumerWidget {
  final String variant;
  final String? threadId;

  const MessagesPage({
    super.key,
    this.variant = 'default',
    this.threadId,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final conversationsAsync = ref.watch(conversationsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Messages')),
      body: conversationsAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, _) => Center(child: Text('Error: $err')),
        data: (conversations) {
          if (conversations.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.chat_bubble_outline, size: 64, color: ColorTokens.textSecondary),
                  const SizedBox(height: AppSpacing.lg),
                  Text('No conversations yet', style: AppTextStyles.subtitle2),
                ],
              ),
            );
          }
          return ListView.separated(
            padding: const EdgeInsets.symmetric(vertical: AppSpacing.sm),
            itemCount: conversations.length,
            separatorBuilder: (_, __) => const Divider(height: 1),
            itemBuilder: (context, index) {
              final conv = conversations[index];
              return _ConversationTile(
                conversation: conv,
                onTap: () => context.push('/messages/${conv.id}'),
              );
            },
          );
        },
      ),
    );
  }
}

class _ConversationTile extends StatelessWidget {
  final dynamic conversation;
  final VoidCallback onTap;

  const _ConversationTile({required this.conversation, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: PmAvatar(
        name: conversation.person.name,
        size: 48,
      ),
      title: Text(
        conversation.person.name,
        style: AppTextStyles.label.copyWith(
          fontWeight: conversation.unread > 0 ? FontWeight.w600 : FontWeight.w400,
        ),
      ),
      subtitle: Text(
        conversation.lastMessage,
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
        style: AppTextStyles.caption,
      ),
      trailing: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          Text(conversation.lastTime, style: AppTextStyles.caption),
          if (conversation.unread > 0) ...[
            const SizedBox(height: 4),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: const BoxDecoration(
                color: ColorTokens.primary,
                shape: BoxShape.circle,
              ),
              child: Text(
                '${conversation.unread}',
                style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w600),
              ),
            ),
          ],
        ],
      ),
      onTap: onTap,
    );
  }
}
