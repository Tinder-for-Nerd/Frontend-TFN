import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../models/match_result.dart';

class MatchModal extends StatelessWidget {
  final MatchResult match;
  final VoidCallback onDismiss;

  const MatchModal({
    super.key,
    required this.match,
    required this.onDismiss,
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: ColorTokens.overlay,
      child: Center(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.xl),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Icon(Icons.favorite, size: 80, color: Colors.red),
              const SizedBox(height: AppSpacing.lg),
              Text("It's a Match!", style: AppTextStyles.headline2.copyWith(color: Colors.white)),
              const SizedBox(height: AppSpacing.sm),
              Text(
                'You and ${match.name} liked each other',
                style: AppTextStyles.body1.copyWith(color: Colors.white70),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: AppSpacing.xxl),
              ElevatedButton(
                onPressed: () {
                  onDismiss();
                  context.push('/messages/new/${match.profileId}');
                },
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 48),
                ),
                child: const Text('Send a Message'),
              ),
              const SizedBox(height: AppSpacing.md),
              TextButton(
                onPressed: onDismiss,
                child: const Text('Keep Swiping', style: TextStyle(color: Colors.white70)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
