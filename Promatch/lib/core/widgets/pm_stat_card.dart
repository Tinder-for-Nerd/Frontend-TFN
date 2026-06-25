import 'package:flutter/material.dart';
import '../theme/color_tokens.dart';
import '../theme/text_styles.dart';
import '../theme/spacing.dart';

class PmStatCard extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;
  final Color? color;
  final String? change;

  const PmStatCard({
    super.key,
    required this.label,
    required this.value,
    required this.icon,
    this.color,
    this.change,
  });

  @override
  Widget build(BuildContext context) {
    final statColor = color ?? ColorTokens.primary;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  width: 36, height: 36,
                  decoration: BoxDecoration(
                    color: statColor.withAlpha(25),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Icon(icon, color: statColor, size: 18),
                ),
                const Spacer(),
                if (change != null)
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                    decoration: BoxDecoration(
                      color: (change!.startsWith('+') ? ColorTokens.success : ColorTokens.error).withAlpha(25),
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      change!,
                      style: AppTextStyles.caption.copyWith(
                        color: change!.startsWith('+') ? ColorTokens.success : ColorTokens.error,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: AppSpacing.md),
            Text(value, style: AppTextStyles.headline2),
            const SizedBox(height: AppSpacing.xxs),
            Text(label, style: AppTextStyles.caption.copyWith(color: ColorTokens.textSecondary)),
          ],
        ),
      ),
    );
  }
}
