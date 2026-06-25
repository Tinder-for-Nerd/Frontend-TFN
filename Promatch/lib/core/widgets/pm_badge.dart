import 'package:flutter/material.dart';
import '../theme/color_tokens.dart';
import '../theme/text_styles.dart';

class PmBadge extends StatelessWidget {
  final String label;
  final Color? color;
  final bool outlined;
  final VoidCallback? onRemove;

  const PmBadge({
    super.key,
    required this.label,
    this.color,
    this.outlined = false,
    this.onRemove,
  });

  @override
  Widget build(BuildContext context) {
    final bgColor = color ?? ColorTokens.primary;
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: outlined ? Colors.transparent : bgColor.withAlpha(25),
        borderRadius: BorderRadius.circular(16),
        border: outlined ? Border.all(color: bgColor.withAlpha(77)) : null,
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            label,
            style: AppTextStyles.caption.copyWith(
              color: outlined ? bgColor : bgColor,
              fontWeight: FontWeight.w500,
            ),
          ),
          if (onRemove != null) ...[
            const SizedBox(width: 4),
            GestureDetector(
              onTap: onRemove,
              child: Icon(Icons.close, size: 14, color: bgColor),
            ),
          ],
        ],
      ),
    );
  }
}
