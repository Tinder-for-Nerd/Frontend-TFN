import 'package:flutter/material.dart';
import '../theme/brand_theme.dart';

enum BrandButtonVariant { primary, secondary, ghost, roleAccent }

class BrandButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;
  final BrandButtonVariant variant;
  final Color? roleColor;
  final IconData? icon;
  final bool fullWidth;

  const BrandButton({
    Key? key,
    required this.text,
    required this.onPressed,
    this.variant = BrandButtonVariant.primary,
    this.roleColor,
    this.icon,
    this.fullWidth = false,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    Widget buttonContent = Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        if (icon != null) ...[
          Icon(icon, size: 18, color: _getTextColor(theme)),
          const SizedBox(width: 8),
        ],
        Text(
          text,
          style: theme.textTheme.labelLarge?.copyWith(
            color: _getTextColor(theme),
            fontWeight: FontWeight.w700,
          ),
        ),
      ],
    );

    Decoration? decoration;
    Color? buttonColor;

    if (variant == BrandButtonVariant.primary) {
      decoration = const BoxDecoration(
        gradient: LinearGradient(
          colors: [BrandColors.textInverse, BrandColors.textInverseContainer],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BrandRadii.smBorderRadius,
      );
    } else if (variant == BrandButtonVariant.roleAccent) {
      final accent = roleColor ?? BrandColors.textInverse;
      decoration = BoxDecoration(
        gradient: LinearGradient(
          colors: [accent, accent.withOpacity(0.8)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BrandRadii.smBorderRadius,
      );
    } else if (variant == BrandButtonVariant.secondary) {
      buttonColor = BrandColors.surfaceInset;
    }

    Widget child = Container(
      width: fullWidth ? double.infinity : null,
      decoration: decoration,
      child: buttonColor != null || decoration != null
          ? Material(
              color: buttonColor ?? Colors.transparent,
              borderRadius: BrandRadii.smBorderRadius,
              child: InkWell(
                onTap: onPressed,
                borderRadius: BrandRadii.smBorderRadius,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
                  child: buttonContent,
                ),
              ),
            )
          : TextButton(
              onPressed: onPressed,
              style: TextButton.styleFrom(
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                shape: RoundedRectangleBorder(borderRadius: BrandRadii.smBorderRadius),
              ),
              child: buttonContent,
            ),
    );

    return child;
  }

  Color _getTextColor(ThemeData theme) {
    switch (variant) {
      case BrandButtonVariant.primary:
      case BrandButtonVariant.roleAccent:
        return Colors.white;
      case BrandButtonVariant.secondary:
        return BrandColors.textPrimary;
      case BrandButtonVariant.ghost:
        return BrandColors.textInverse;
    }
  }
}
