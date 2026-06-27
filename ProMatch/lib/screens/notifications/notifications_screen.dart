import 'package:flutter/material.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/web_parity_widgets.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  static const _items = [
    _NotificationItem(
      icon: Icons.person_add_alt_1,
      title: 'Sarah Chen accepted your connection',
      body: 'You can now message Sarah and schedule a professional call.',
      time: '2m',
      unread: true,
    ),
    _NotificationItem(
      icon: Icons.chat_bubble_outline,
      title: 'New message from Raj Patel',
      body: 'I can send a starter repo if you want.',
      time: '1h',
      unread: true,
    ),
    _NotificationItem(
      icon: Icons.calendar_month,
      title: 'Meeting reminder',
      body: 'Your co-founder alignment sync starts soon.',
      time: 'Today',
      unread: false,
    ),
    _NotificationItem(
      icon: Icons.thumb_up_alt_outlined,
      title: 'Mei Lin reacted to your post',
      body: 'Your Flutter prototype update is getting traction.',
      time: 'Yesterday',
      unread: false,
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Notifications',
          style: theme.textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
        ),
        bottom: const PreferredSize(
          preferredSize: Size.fromHeight(3),
          child: SizedBox(
            height: 3,
            child: DecoratedBox(decoration: BoxDecoration(color: BrandColors.boldBorder)),
          ),
        ),
      ),
      body: WebScaffoldBackground(
        child: ListView(
          padding: const EdgeInsets.all(16),
          children: [
            WebCard(
              bold: true,
              child: Row(
                children: [
                  const Icon(Icons.notifications_active_outlined, color: BrandColors.primary),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      'Stay updated on connections, comments, reposts, meetings, and messages.',
                      style: theme.textTheme.bodyMedium?.copyWith(fontWeight: FontWeight.w700),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            ..._items.map((item) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: WebCard(
                    bold: item.unread,
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(
                            color: BrandColors.primary.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(14),
                          ),
                          child: Icon(item.icon, color: BrandColors.primary),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Row(
                                children: [
                                  Expanded(
                                    child: Text(
                                      item.title,
                                      style: theme.textTheme.labelLarge?.copyWith(
                                        color: BrandColors.textPrimary,
                                        fontWeight: FontWeight.w900,
                                      ),
                                    ),
                                  ),
                                  Text(item.time, style: theme.textTheme.labelSmall),
                                ],
                              ),
                              const SizedBox(height: 5),
                              Text(item.body, style: theme.textTheme.bodyMedium),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                )),
          ],
        ),
      ),
    );
  }
}

class _NotificationItem {
  const _NotificationItem({
    required this.icon,
    required this.title,
    required this.body,
    required this.time,
    required this.unread,
  });

  final IconData icon;
  final String title;
  final String body;
  final String time;
  final bool unread;
}
