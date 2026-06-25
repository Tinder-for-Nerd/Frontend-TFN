import 'package:flutter/material.dart';
import '../theme/color_tokens.dart';

class PmButton extends StatelessWidget {
  final String label;
  final VoidCallback? onPressed;
  final IconData? icon;
  final bool isLoading;
  final bool expanded;
  final ButtonVariant variant;

  const PmButton({
    super.key,
    required this.label,
    this.onPressed,
    this.icon,
    this.isLoading = false,
    this.expanded = true,
    this.variant = ButtonVariant.primary,
  });

  @override
  Widget build(BuildContext context) {
    final style = switch (variant) {
      ButtonVariant.primary => ElevatedButton.styleFrom(
        backgroundColor: ColorTokens.primary,
        foregroundColor: Colors.white,
      ),
      ButtonVariant.secondary => ElevatedButton.styleFrom(
        backgroundColor: ColorTokens.surface,
        foregroundColor: ColorTokens.textPrimary,
      ),
      ButtonVariant.outlined => OutlinedButton.styleFrom(
        foregroundColor: ColorTokens.primary,
      ),
      ButtonVariant.text => TextButton.styleFrom(
        foregroundColor: ColorTokens.primary,
      ),
    };

    final child = isLoading
        ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2))
        : Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) ...[
                Icon(icon, size: 18),
                const SizedBox(width: 8),
              ],
              Text(label),
            ],
          );

    final button = switch (variant) {
      ButtonVariant.primary || ButtonVariant.secondary => ElevatedButton(
        onPressed: isLoading ? null : onPressed,
        style: style,
        child: child,
      ),
      ButtonVariant.outlined => OutlinedButton(
        onPressed: isLoading ? null : onPressed,
        style: style,
        child: child,
      ),
      ButtonVariant.text => TextButton(
        onPressed: isLoading ? null : onPressed,
        style: style,
        child: child,
      ),
    };

    if (expanded) {
      return SizedBox(width: double.infinity, child: button);
    }
    return button;
  }
}

enum ButtonVariant { primary, secondary, outlined, text }
