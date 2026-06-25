import 'package:flutter/material.dart';
import '../theme/color_tokens.dart';

class PmBottomNav extends StatelessWidget {
  final int currentIndex;
  final Function(int) onTap;
  final List<PmNavItem> items;

  const PmBottomNav({
    super.key,
    required this.currentIndex,
    required this.onTap,
    required this.items,
  });

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      currentIndex: currentIndex,
      onTap: onTap,
      type: BottomNavigationBarType.fixed,
      selectedItemColor: ColorTokens.primary,
      unselectedItemColor: ColorTokens.textSecondary,
      items: items.map((item) => BottomNavigationBarItem(
        icon: item.badge != null
            ? Badge(
                label: Text('${item.badge}'),
                child: Icon(item.icon),
              )
            : Icon(item.icon),
        activeIcon: item.badge != null
            ? Badge(
                label: Text('${item.badge}'),
                child: Icon(item.activeIcon ?? item.icon),
              )
            : Icon(item.activeIcon ?? item.icon),
        label: item.label,
      )).toList(),
    );
  }
}

class PmNavItem {
  final IconData icon;
  final IconData? activeIcon;
  final String label;
  final int? badge;

  const PmNavItem({
    required this.icon,
    this.activeIcon,
    required this.label,
    this.badge,
  });
}
