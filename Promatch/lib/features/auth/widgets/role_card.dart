import 'package:flutter/material.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../models/auth_role.dart';

class RoleCard extends StatelessWidget {
  final AuthRole role;
  final VoidCallback onTap;

  const RoleCard({
    super.key,
    required this.role,
    required this.onTap,
  });

  Color get _accentColor {
    switch (role) {
      case AuthRole.student: return ColorTokens.studentAccent;
      case AuthRole.pro: return ColorTokens.proAccent;
      case AuthRole.org: return ColorTokens.orgAccent;
    }
  }

  IconData get _icon {
    switch (role) {
      case AuthRole.student: return Icons.school;
      case AuthRole.pro: return Icons.work;
      case AuthRole.org: return Icons.business;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(12),
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Row(
            children: [
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: _accentColor.withAlpha(30),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(_icon, color: _accentColor),
              ),
              const SizedBox(width: AppSpacing.lg),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(role.label, style: AppTextStyles.subtitle2),
                    const SizedBox(height: AppSpacing.xxs),
                    Text(role.tagline, style: AppTextStyles.caption),
                  ],
                ),
              ),
              const Icon(Icons.chevron_right, color: ColorTokens.textSecondary),
            ],
          ),
        ),
      ),
    );
  }
}
