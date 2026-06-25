import 'package:flutter/material.dart';
import '../../../core/theme/color_tokens.dart';

class VoiceMessageWidget extends StatelessWidget {
  final double duration; // in seconds
  final bool isMine;

  const VoiceMessageWidget({
    super.key,
    required this.duration,
    this.isMine = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: isMine ? ColorTokens.primary : ColorTokens.surface,
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.play_arrow_rounded,
            color: isMine ? Colors.white : ColorTokens.primary,
            size: 20,
          ),
          const SizedBox(width: 8),
          Container(
            width: 80,
            height: 3,
            decoration: BoxDecoration(
              color: isMine ? Colors.white30 : ColorTokens.border,
              borderRadius: BorderRadius.circular(2),
            ),
            child: FractionallySizedBox(
              alignment: Alignment.centerLeft,
              widthFactor: 0.4,
              child: Container(
                decoration: BoxDecoration(
                  color: isMine ? Colors.white : ColorTokens.primary,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
          ),
          const SizedBox(width: 8),
          Text(
            '${duration.toStringAsFixed(0)}s',
            style: TextStyle(
              fontSize: 12,
              color: isMine ? Colors.white70 : ColorTokens.textSecondary,
            ),
          ),
        ],
      ),
    );
  }
}
