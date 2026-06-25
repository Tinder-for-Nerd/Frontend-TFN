import 'package:flutter/material.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../../../core/widgets/pm_avatar.dart';
import '../models/conversation_model.dart';

class ConversationTile extends StatelessWidget {
  final ConversationModel conversation;
  final VoidCallback onTap;

  const ConversationTile({
    super.key,
    required this.conversation,
    required this.onTap,
  });

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
