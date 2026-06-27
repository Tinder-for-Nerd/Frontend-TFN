import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/auth_provider.dart';
import '../providers/chat_provider.dart';
import '../data/app_seed_data.dart';
import '../theme/brand_theme.dart';
import '../widgets/web_parity_widgets.dart';
import 'discover/discover_screen.dart';
import 'feed/feed_screen.dart';
import 'chat/chat_list_screen.dart';
import 'calendar/calendar_screen.dart';
import 'profile/profile_screen.dart';
import 'notifications/notifications_screen.dart';

class DashboardShell extends StatefulWidget {
  const DashboardShell({super.key});

  @override
  State<DashboardShell> createState() => _DashboardShellState();
}

class _DashboardShellState extends State<DashboardShell> {
  int _currentIndex = 0;

  final List<Widget> _screens = [
    const DiscoverScreen(),
    const FeedScreen(),
    const ChatListScreen(),
    const CalendarScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final authProvider = Provider.of<AuthProvider>(context);
    final chatProvider = Provider.of<ChatProvider>(context);
    
    final role = authProvider.currentRole;
    final currentUser = authProvider.currentUser;

    final roleType = roleFromId(role);
    final roleAccent = BrandColors.roleAccent(roleType);

    // Get unread chats count
    final unreadCount = chatProvider.threads.fold<int>(0, (sum, t) => sum + t.unreadCount);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: BrandColors.surfaceMuted,
        elevation: 8,
        scrolledUnderElevation: 0,
        shadowColor: BrandColors.navy.withValues(alpha: 0.12),
        title: Row(
          children: [
            const Icon(Icons.bolt, color: BrandColors.textInverse, size: 24),
            const SizedBox(width: 8),
            Text(
              'Tinder For Nerds',
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w900,
                fontSize: 20,
              ),
            ),
            const SizedBox(width: 6),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: roleAccent.withValues(alpha: 0.08),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                role.toUpperCase(),
                style: TextStyle(
                  color: roleAccent,
                  fontWeight: FontWeight.w800,
                  fontSize: 8,
                  letterSpacing: 0.5,
                ),
              ),
            ),
          ],
        ),
        actions: [
          // Notification center indicator
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.notifications_outlined, color: BrandColors.textPrimary),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (_) => const NotificationsScreen()),
                  );
                },
              ),
              Positioned(
                right: 8,
                top: 8,
                child: Container(
                  width: 8,
                  height: 8,
                  decoration: const BoxDecoration(
                    color: BrandColors.studentAccent,
                    shape: BoxShape.circle,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(width: 8),
          
          // User Avatar Indicator
          Padding(
            padding: const EdgeInsets.only(right: 16.0),
            child: WebAvatar(
              initials: currentUser?.avatar ?? 'ME',
              role: roleType,
              radius: 16,
            ),
          ),
        ],
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(3),
          child: Container(
            color: BrandColors.boldBorder,
            height: 3,
          ),
        ),
      ),
      body: WebScaffoldBackground(
        child: IndexedStack(
          index: _currentIndex,
          children: _screens,
        ),
      ),
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: BrandColors.surfaceMuted,
          border: Border(
            top: BorderSide(
              color: BrandColors.boldBorder,
              width: 3.0,
            ),
          ),
          boxShadow: BrandShadows.md,
        ),
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          onTap: (index) {
            setState(() {
              _currentIndex = index;
            });
          },
          type: BottomNavigationBarType.fixed,
          backgroundColor: BrandColors.surfaceMuted,
          selectedItemColor: roleAccent,
          unselectedItemColor: BrandColors.textSecondary.withValues(alpha: 0.6),
          selectedLabelStyle: const TextStyle(fontWeight: FontWeight.w800, fontSize: 11),
          unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 11),
          elevation: 0,
          items: [
            const BottomNavigationBarItem(
              icon: Icon(Icons.style_outlined),
              activeIcon: Icon(Icons.style),
              label: 'Discover',
            ),
            const BottomNavigationBarItem(
              icon: Icon(Icons.feed_outlined),
              activeIcon: Icon(Icons.feed),
              label: 'Feed',
            ),
            BottomNavigationBarItem(
              icon: Stack(
                children: [
                  const Icon(Icons.chat_bubble_outline),
                  if (unreadCount > 0)
                    Positioned(
                      right: 0,
                      top: 0,
                      child: Container(
                        padding: const EdgeInsets.all(2),
                        decoration: BoxDecoration(
                          color: BrandColors.studentAccent,
                          borderRadius: BorderRadius.circular(6),
                        ),
                        constraints: const BoxConstraints(
                          minWidth: 12,
                          minHeight: 12,
                        ),
                        child: Text(
                          '$unreadCount',
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 8,
                            fontWeight: FontWeight.w900,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    ),
                ],
              ),
              activeIcon: const Icon(Icons.chat_bubble),
              label: 'Messages',
            ),
            const BottomNavigationBarItem(
              icon: Icon(Icons.calendar_today_outlined),
              activeIcon: Icon(Icons.calendar_today),
              label: 'Sessions',
            ),
            const BottomNavigationBarItem(
              icon: Icon(Icons.person_outline),
              activeIcon: Icon(Icons.person),
              label: 'Profile',
            ),
          ],
        ),
      ),
    );
  }
}
