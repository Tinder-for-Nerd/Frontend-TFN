import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../data/app_seed_data.dart';
import '../../providers/chat_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/web_parity_widgets.dart';
import '../chat/chat_detail_screen.dart';

class CalendarScreen extends StatelessWidget {
  const CalendarScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final chatProvider = Provider.of<ChatProvider>(context);
    final sessions = chatProvider.sessions;
    final threads = chatProvider.threads;

    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              '1:1 Session Calls',
              style: theme.textTheme.displayMedium,
            ),
            const SizedBox(height: 8),
            Text(
              'Manage your scheduled co-founder syncs and mentor advisory calls.',
              style: theme.textTheme.bodyMedium,
            ),
            const SizedBox(height: 24),
            
            Expanded(
              child: ListView(
                children: [
                  Text(
                    'Scheduled sessions',
                    style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
                  ),
                  const SizedBox(height: 12),
                  if (sessions.isEmpty)
                    _buildEmptyState(context)
                  else
                    ...sessions.map((session) => _SessionCard(session: session)),
                  const SizedBox(height: 28),
                  Row(
                    children: [
                      Expanded(
                        child: Text(
                          'Connections (${threads.length})',
                          style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
                        ),
                      ),
                      const Icon(Icons.people_alt_outlined, color: BrandColors.textInverse),
                    ],
                  ),
                  const SizedBox(height: 12),
                  if (threads.isEmpty)
                    WebCard(
                      bold: true,
                      child: const Text(
                        'No connections made yet. Keep swiping on the Discover tab!',
                        textAlign: TextAlign.center,
                        style: TextStyle(color: BrandColors.textSecondary),
                      ),
                    )
                  else
                    ...threads.map((thread) {
                      final participant = thread.participant;
                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: WebCard(
                          bold: true,
                          padding: EdgeInsets.zero,
                          child: Material(
                            color: Colors.transparent,
                            child: ListTile(
                              contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                              leading: WebAvatar(
                                initials: participant.avatar,
                                role: roleFromId(participant.role),
                                radius: 22,
                              ),
                              title: Text(
                                participant.name,
                                style: theme.textTheme.labelLarge?.copyWith(fontWeight: FontWeight.w900),
                              ),
                              subtitle: Text(
                                participant.title,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                              trailing: const Icon(Icons.chat_bubble_outline, color: BrandColors.textInverse),
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (_) => ChatDetailScreen(threadId: thread.id),
                                  ),
                                );
                              },
                            ),
                          ),
                        ),
                      );
                    }),
                ],
              ),
            ),
          ],
        ),
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
          boxShadow: BrandShadows.sm,
          border: Border.all(color: BrandColors.borderSubtle),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: BrandColors.tertiary.withValues(alpha: 0.1),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.calendar_today_outlined, color: BrandColors.tertiary, size: 36),
            ),
            const SizedBox(height: 20),
            Text(
              'No active calls scheduled.',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 6),
            Text(
              'Book calls with your matches inside the messages panel.',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
          ],
        ),
      ),
    );
  }
}

class _SessionCard extends StatelessWidget {
  const _SessionCard({required this.session});

  final ScheduledSession session;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isStudent = session.participant.role.toLowerCase() == 'student';
    final accentColor = isStudent ? BrandColors.studentAccent : BrandColors.proAccent;

    return Padding(
      padding: const EdgeInsets.only(bottom: 16.0),
      child: WebCard(
        bold: true,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
              decoration: BoxDecoration(
                color: accentColor.withValues(alpha: 0.08),
                borderRadius: BrandRadii.smBorderRadius,
              ),
              child: Column(
                children: [
                  Text(
                    session.time,
                    style: TextStyle(
                      color: accentColor,
                      fontWeight: FontWeight.w900,
                      fontSize: 16,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    session.date,
                    style: TextStyle(
                      color: accentColor.withValues(alpha: 0.8),
                      fontWeight: FontWeight.w700,
                      fontSize: 11,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    session.topic,
                    style: theme.textTheme.titleLarge?.copyWith(
                      fontSize: 16,
                      fontWeight: FontWeight.w800,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Flexible(
                        child: Text(
                          'with ${session.participant.name}',
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: theme.textTheme.bodyMedium?.copyWith(
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                      const SizedBox(width: 4),
                      if (session.participant.verified)
                        const Icon(
                          Icons.verified,
                          size: 14,
                          color: BrandColors.textInverse,
                        ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Meeting ID: 394-102-88',
                    style: theme.textTheme.labelSmall?.copyWith(fontSize: 10),
                  ),
                ],
              ),
            ),
            IconButton(
              icon: const Icon(Icons.videocam, color: BrandColors.textInverse, size: 28),
              onPressed: () {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Starting Video Call Session...'),
                    behavior: SnackBarBehavior.floating,
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
