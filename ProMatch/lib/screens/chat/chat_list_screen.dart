import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/chat_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/web_parity_widgets.dart';
import 'chat_detail_screen.dart';

class ChatListScreen extends StatefulWidget {
  const ChatListScreen({super.key});

  @override
  State<ChatListScreen> createState() => _ChatListScreenState();
}

class _ChatListScreenState extends State<ChatListScreen> {
  String _filter = 'All';
  String _query = '';

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final chatProvider = Provider.of<ChatProvider>(context);
    final threads = chatProvider.threads.where((thread) {
      final matchesFilter = _filter == 'All' || thread.unreadCount > 0;
      final query = _query.trim().toLowerCase();
      final matchesQuery = query.isEmpty ||
          thread.participant.name.toLowerCase().contains(query) ||
          thread.lastMessage.text.toLowerCase().contains(query);
      return matchesFilter && matchesQuery;
    }).toList();

    return Scaffold(
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 16, 16, 10),
            child: Column(
              children: [
                WebSearchField(
                  hintText: 'Search conversations',
                  onChanged: (value) => setState(() => _query = value),
                ),
                const SizedBox(height: 16),
                Align(
                  alignment: Alignment.centerLeft,
                  child: WebSegmentedControl(
                    options: const ['All', 'Unread'],
                    selected: _filter,
                    onChanged: (value) => setState(() => _filter = value),
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: threads.isEmpty
                ? _buildEmptyState(context)
                : ListView.builder(
              padding: const EdgeInsets.symmetric(vertical: 8),
              itemCount: threads.length,
              itemBuilder: (context, index) {
                final thread = threads[index];
                final participant = thread.participant;
                final lastMessage = thread.lastMessage;
                final isUnread = thread.unreadCount > 0;

                final isStudent = participant.role.toLowerCase() == 'student';
                final accentColor = isStudent
                    ? BrandColors.studentAccent
                    : BrandColors.proAccent;

                return Column(
                  children: [
                    Material(
                      color: Colors.transparent,
                      child: ListTile(
                        contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
                        onTap: () {
                          // Mark thread as read
                          chatProvider.markAsRead(thread.id);

                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => ChatDetailScreen(threadId: thread.id),
                            ),
                          );
                        },
                        leading: Badge(
                          isLabelVisible: isUnread,
                          label: Text('${thread.unreadCount}'),
                          backgroundColor: BrandColors.studentAccent,
                          child: CircleAvatar(
                            radius: 24,
                            backgroundColor: accentColor.withValues(alpha: 0.08),
                            child: Text(
                              participant.avatar,
                              style: TextStyle(
                                color: accentColor,
                                fontWeight: FontWeight.w800,
                                fontSize: 16,
                              ),
                            ),
                          ),
                        ),
                        title: Row(
                          children: [
                            Text(
                              participant.name,
                              style: theme.textTheme.labelLarge?.copyWith(
                                fontWeight: isUnread ? FontWeight.w900 : FontWeight.w700,
                              ),
                            ),
                            if (participant.verified) ...[
                              const SizedBox(width: 4),
                              const Icon(
                                Icons.verified,
                                size: 14,
                                color: BrandColors.textInverse,
                              ),
                            ],
                          ],
                        ),
                        subtitle: Padding(
                          padding: const EdgeInsets.only(top: 4.0),
                          child: thread.isTyping
                              ? const Text(
                                  'typing...',
                                  style: TextStyle(
                                    color: BrandColors.textInverse,
                                    fontWeight: FontWeight.w700,
                                    fontStyle: FontStyle.italic,
                                  ),
                                )
                              : Text(
                                  lastMessage.text,
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    fontWeight: isUnread ? FontWeight.w700 : FontWeight.normal,
                                    color: isUnread ? BrandColors.textPrimary : BrandColors.textSecondary,
                                  ),
                                ),
                        ),
                        trailing: Text(
                          _formatTimestamp(lastMessage.timestamp),
                          style: theme.textTheme.labelSmall?.copyWith(
                            fontSize: 10,
                            fontWeight: isUnread ? FontWeight.w800 : FontWeight.normal,
                          ),
                        ),
                      ),
                    ),
                    const Divider(color: BrandColors.boldBorder, height: 2, indent: 84),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
    return Center(
      child: Container(
        padding: const EdgeInsets.all(28),
        decoration: BoxDecoration(
          color: BrandColors.surfaceMuted,
          borderRadius: BrandRadii.lgBorderRadius,
          border: Border.all(color: BrandColors.borderSubtle),
          boxShadow: BrandShadows.sm,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: BrandColors.textInverse.withValues(alpha: 0.08),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.chat_bubble_outline, color: BrandColors.textInverse, size: 36),
            ),
            const SizedBox(height: 20),
            Text(
              'No active chats.',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Matches you connect with on the Discover tab will appear here.',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }

  String _formatTimestamp(DateTime time) {
    final now = DateTime.now();
    final difference = now.difference(time);
    
    if (difference.inMinutes < 60) {
      return '${difference.inMinutes}m ago';
    } else if (difference.inHours < 24) {
      return '${difference.inHours}h ago';
    } else {
      return '${difference.inDays}d ago';
    }
  }
}
