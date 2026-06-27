import 'dart:ui';
import 'package:flutter/material.dart';
import '../theme/brand_theme.dart';

class GlassBox extends StatelessWidget {
  final Widget child;
  final double blur;
  final BorderRadius? borderRadius;
  final Color? color;
  final double borderOpacity;

  const GlassBox({
    super.key,
    required this.child,
    this.blur = 16.0,
    this.borderRadius,
    this.color,
    this.borderOpacity = 0.15,
  });

  @override
  Widget build(BuildContext context) {
    final effectiveRadius = borderRadius ?? BrandRadii.mdBorderRadius;
    
    return ClipRRect(
      borderRadius: effectiveRadius,
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: blur, sigmaY: blur),
        child: Container(
          decoration: BoxDecoration(
            color: color ?? BrandColors.bgSurfaceLow,
            borderRadius: effectiveRadius,
            border: Border.all(
              color: Colors.white.withValues(alpha: borderOpacity),
              width: 1.0,
            ),
          ),
          child: child,
        ),
      ),
    );
  }
}
