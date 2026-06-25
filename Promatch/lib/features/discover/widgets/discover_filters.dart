import 'package:flutter/material.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../models/discover_filter.dart';

class DiscoverFilters extends StatefulWidget {
  final Function(DiscoverFilter) onApply;

  const DiscoverFilters({super.key, required this.onApply});

  @override
  State<DiscoverFilters> createState() => _DiscoverFiltersState();
}

class _DiscoverFiltersState extends State<DiscoverFilters> {
  String? _domain;
  String? _intent;
  String? _commitment;
  final List<String> _selectedSkills = [];

  final _domains = ['Web Dev', 'AI/ML', 'Mobile', 'Data Science', 'DevOps', 'Blockchain', 'Design'];
  final _intents = ['Co-founder', 'Freelance', 'Mentor', 'Networking', 'Hiring'];
  final _commitments = ['Full-time', 'Part-time', 'Contract', 'Flexible'];

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(AppSpacing.xl),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Text('Filters', style: AppTextStyles.subtitle1),
          const SizedBox(height: AppSpacing.xl),
          Text('Domain', style: AppTextStyles.label),
          const SizedBox(height: AppSpacing.sm),
          Wrap(
            spacing: AppSpacing.sm,
            runSpacing: AppSpacing.sm,
            children: _domains.map((d) => _FilterChip(
              label: d,
              selected: _domain == d,
              onTap: () => setState(() => _domain = _domain == d ? null : d),
            )).toList(),
          ),
          const SizedBox(height: AppSpacing.lg),
          Text('Intent', style: AppTextStyles.label),
          const SizedBox(height: AppSpacing.sm),
          Wrap(
            spacing: AppSpacing.sm,
            runSpacing: AppSpacing.sm,
            children: _intents.map((i) => _FilterChip(
              label: i,
              selected: _intent == i,
              onTap: () => setState(() => _intent = _intent == i ? null : i),
            )).toList(),
          ),
          const SizedBox(height: AppSpacing.lg),
          Text('Commitment', style: AppTextStyles.label),
          const SizedBox(height: AppSpacing.sm),
          Wrap(
            spacing: AppSpacing.sm,
            runSpacing: AppSpacing.sm,
            children: _commitments.map((c) => _FilterChip(
              label: c,
              selected: _commitment == c,
              onTap: () => setState(() => _commitment = _commitment == c ? null : c),
            )).toList(),
          ),
          const SizedBox(height: AppSpacing.xxl),
          ElevatedButton(
            onPressed: () {
              widget.onApply(DiscoverFilter(
                domain: _domain,
                intent: _intent,
                commitment: _commitment,
                skills: _selectedSkills.isEmpty ? null : _selectedSkills,
              ));
            },
            child: const Text('Apply Filters'),
          ),
        ],
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final bool selected;
  final VoidCallback onTap;

  const _FilterChip({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: selected ? ColorTokens.primary.withAlpha(20) : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: selected ? ColorTokens.primary : ColorTokens.border),
        ),
        child: Text(
          label,
          style: AppTextStyles.caption.copyWith(
            color: selected ? ColorTokens.primary : ColorTokens.textSecondary,
            fontWeight: selected ? FontWeight.w600 : FontWeight.w400,
          ),
        ),
      ),
    );
  }
}
