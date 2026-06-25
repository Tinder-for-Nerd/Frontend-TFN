import 'package:flutter/material.dart';
import '../theme/color_tokens.dart';
import '../theme/text_styles.dart';
import '../theme/spacing.dart';

class PmErrorWidget extends StatelessWidget {
  final String message;
  final VoidCallback? onRetry;

  const PmErrorWidget({
    super.key,
    required this.message,
    this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.xxl),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.error_outline, size: 64, color: ColorTokens.error.withAlpha(150)),
            const SizedBox(height: AppSpacing.lg),
            Text('Something went wrong', style: AppTextStyles.subtitle2),
            const SizedBox(height: AppSpacing.sm),
            Text(message, style: AppTextStyles.body2.copyWith(color: ColorTokens.textSecondary), textAlign: TextAlign.center),
            if (onRetry != null) ...[
              const SizedBox(height: AppSpacing.xl),
              ElevatedButton.icon(
                onPressed: onRetry,
                icon: const Icon(Icons.refresh),
                label: const Text('Try Again'),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
