import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../../../shared/models/profile_model.dart';

class SwipeCard extends StatelessWidget {
  final ProfileModel profile;

  const SwipeCard({super.key, required this.profile});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(
            flex: 3,
            child: ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
              child: profile.avatar != null
                  ? CachedNetworkImage(
                      imageUrl: profile.avatar!,
                      fit: BoxFit.cover,
                      placeholder: (_, __) => Container(color: ColorTokens.shimmerBase),
                      errorWidget: (_, __, ___) => _placeholderAvatar(),
                    )
                  : _placeholderAvatar(),
            ),
          ),
          Expanded(
            flex: 2,
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: Text(profile.name, style: AppTextStyles.subtitle1),
                      ),
                      if (profile.verified)
                        const Icon(Icons.verified, color: ColorTokens.primary, size: 20),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.xxs),
                  Text(profile.title, style: AppTextStyles.body2.copyWith(color: ColorTokens.textSecondary)),
                  const SizedBox(height: AppSpacing.sm),
                  Row(
                    children: [
                      _MatchBadge(score: profile.match),
                      const SizedBox(width: AppSpacing.sm),
                      Icon(Icons.location_on_outlined, size: 14, color: ColorTokens.textSecondary),
                      const SizedBox(width: 2),
                      Text(profile.location, style: AppTextStyles.caption),
                    ],
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    profile.bio,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: AppTextStyles.body2.copyWith(color: ColorTokens.textSecondary),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Wrap(
                    spacing: AppSpacing.xs,
                    runSpacing: AppSpacing.xs,
                    children: profile.skills.take(3).map((skill) {
                      return Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: ColorTokens.primary.withAlpha(20),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(skill, style: AppTextStyles.caption.copyWith(color: ColorTokens.primary)),
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _placeholderAvatar() {
    return Container(
      color: ColorTokens.shimmerBase,
      child: Center(
        child: Icon(Icons.person, size: 80, color: ColorTokens.textSecondary.withAlpha(100)),
      ),
    );
  }
}

class _MatchBadge extends StatelessWidget {
  final int score;

  const _MatchBadge({required this.score});

  Color get _color {
    if (score >= 90) return Colors.green;
    if (score >= 70) return Colors.orange;
    return Colors.grey;
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
      decoration: BoxDecoration(
        color: _color.withAlpha(30),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Icon(Icons.favorite, size: 12, color: Colors.red),
          const SizedBox(width: 4),
          Text('${score}%', style: AppTextStyles.caption.copyWith(color: _color, fontWeight: FontWeight.w600)),
        ],
      ),
    );
  }
}
