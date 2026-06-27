import 'package:flutter/material.dart';
import '../theme/brand_theme.dart';

class WebScaffoldBackground extends StatelessWidget {
  final Widget child;

  const WebScaffoldBackground({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return DecoratedBox(
      decoration: const BoxDecoration(
        color: BrandColors.surfaceStrong,
      ),
      child: Stack(
        children: [
          Positioned.fill(
            child: CustomPaint(painter: _GridPainter()),
          ),
          child,
        ],
      ),
    );
  }
}

class _GridPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = BrandColors.navy.withValues(alpha: 0.045)
      ..strokeWidth = 1;
    const gap = 32.0;
    for (double x = 0; x < size.width; x += gap) {
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), paint);
    }
    for (double y = 0; y < size.height; y += gap) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

class WebCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final bool bold;
  final Color color;
  final BorderRadius? borderRadius;

  const WebCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(18),
    this.bold = false,
    this.color = BrandColors.surfaceMuted,
    this.borderRadius,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: padding,
      decoration: BoxDecoration(
        color: color,
        borderRadius: borderRadius ?? BrandRadii.mdBorderRadius,
        border: Border.all(
          color: bold ? BrandColors.boldBorder : BrandColors.borderDefault,
          width: bold ? 3 : 1,
        ),
        boxShadow: bold ? BrandShadows.bold : BrandShadows.sm,
      ),
      child: child,
    );
  }
}

class WebAvatar extends StatelessWidget {
  final String initials;
  final BrandRole role;
  final double radius;

  const WebAvatar({
    super.key,
    required this.initials,
    this.role = BrandRole.student,
    this.radius = 22,
  });

  @override
  Widget build(BuildContext context) {
    final accent = BrandColors.roleAccent(role);
    return CircleAvatar(
      radius: radius,
      backgroundColor: accent.withValues(alpha: 0.12),
      child: Text(
        initials,
        style: TextStyle(
          color: accent,
          fontWeight: FontWeight.w900,
          fontSize: radius * 0.52,
        ),
      ),
    );
  }
}

class WebSegmentedControl extends StatelessWidget {
  final List<String> options;
  final String selected;
  final ValueChanged<String> onChanged;

  const WebSegmentedControl({
    super.key,
    required this.options,
    required this.selected,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: BrandColors.surfaceMuted,
        borderRadius: BrandRadii.smBorderRadius,
        border: Border.all(color: BrandColors.boldBorder, width: 3),
        boxShadow: BrandShadows.bold,
      ),
      child: ClipRRect(
        borderRadius: BrandRadii.smBorderRadius,
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            for (var index = 0; index < options.length; index++)
              _SegmentButton(
                label: options[index],
                selected: selected == options[index],
                showDivider: index != options.length - 1,
                onTap: () => onChanged(options[index]),
              ),
          ],
        ),
      ),
    );
  }
}

class _SegmentButton extends StatelessWidget {
  final String label;
  final bool selected;
  final bool showDivider;
  final VoidCallback onTap;

  const _SegmentButton({
    required this.label,
    required this.selected,
    required this.showDivider,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 11),
        decoration: BoxDecoration(
          color: selected ? const Color(0xFFEAF4FF) : BrandColors.surfaceMuted,
          border: Border(
            right: showDivider
                ? const BorderSide(color: BrandColors.boldBorder, width: 2)
                : BorderSide.none,
          ),
        ),
        child: Text(
          label,
          style: Theme.of(context).textTheme.labelLarge?.copyWith(
                color: selected ? BrandColors.primary : BrandColors.textPrimary,
                fontWeight: FontWeight.w800,
              ),
        ),
      ),
    );
  }
}

class WebSearchField extends StatelessWidget {
  final String hintText;
  final ValueChanged<String>? onChanged;

  const WebSearchField({
    super.key,
    required this.hintText,
    this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14),
      decoration: BoxDecoration(
        color: BrandColors.surfaceMuted,
        borderRadius: BrandRadii.smBorderRadius,
        border: Border.all(color: BrandColors.boldBorder, width: 3),
        boxShadow: BrandShadows.bold,
      ),
      child: TextField(
        onChanged: onChanged,
        decoration: InputDecoration(
          border: InputBorder.none,
          icon: const Icon(Icons.search, color: BrandColors.textSecondary),
          hintText: hintText,
          hintStyle: Theme.of(context).textTheme.bodyMedium,
        ),
      ),
    );
  }
}

class FitScoreBars extends StatelessWidget {
  final int score;

  const FitScoreBars({super.key, required this.score});

  @override
  Widget build(BuildContext context) {
    final rows = {
      'Skill': score,
      'Domain': (score - 6).clamp(0, 100),
      'Project': (score - 10).clamp(0, 100),
      'Availability': (score - 3).clamp(0, 100),
    };
    return Column(
      children: rows.entries.map((entry) {
        return Padding(
          padding: const EdgeInsets.only(bottom: 8),
          child: Row(
            children: [
              SizedBox(
                width: 82,
                child: Text(entry.key, style: Theme.of(context).textTheme.labelSmall),
              ),
              Expanded(
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(99),
                  child: LinearProgressIndicator(
                    minHeight: 8,
                    value: entry.value / 100,
                    backgroundColor: BrandColors.surfaceInset,
                    color: BrandColors.primary,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              Text('${entry.value}%', style: Theme.of(context).textTheme.labelSmall),
            ],
          ),
        );
      }).toList(),
    );
  }
}
