import 'package:flutter/material.dart';
import '../models/profile_model.dart';
import '../theme/brand_theme.dart';
import 'web_parity_widgets.dart';

class SwipeCard extends StatelessWidget {
  final ProfileModel profile;

  const SwipeCard({
    super.key,
    required this.profile,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final isStudent = profile.role.toLowerCase() == 'student';
    final roleAccent = isStudent
        ? BrandColors.studentAccent
        : (profile.role.toLowerCase() == 'professional' || profile.role.toLowerCase() == 'pro'
            ? BrandColors.proAccent
            : BrandColors.orgAccent);

    return SizedBox.expand(
      child: WebCard(
        bold: true,
        padding: EdgeInsets.zero,
        child: ClipRRect(
        borderRadius: BrandRadii.lgBorderRadius,
        child: Stack(
          children: [
            // Top Accent Linear Bar
            Positioned(
              top: 0,
              left: 0,
              right: 0,
              child: Container(
                height: 6,
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [roleAccent, roleAccent.withValues(alpha: 0.5)],
                  ),
                ),
              ),
            ),
            
            // Card Content
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 20, 20, 16),
              child: SingleChildScrollView(
                physics: const BouncingScrollPhysics(),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                  const SizedBox(height: 12),
                  // Match Rating Badge & Role Pill
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: BrandColors.textInverse.withValues(alpha: 0.08),
                          borderRadius: BrandRadii.fullBorderRadius,
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.bolt, size: 14, color: BrandColors.textInverse),
                            const SizedBox(width: 4),
                            Text(
                              '${profile.match}% Match',
                              style: theme.textTheme.labelSmall?.copyWith(
                                color: BrandColors.textInverse,
                                fontWeight: FontWeight.w700,
                              ),
                            ),
                          ],
                        ),
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                        decoration: BoxDecoration(
                          color: roleAccent.withValues(alpha: 0.08),
                          borderRadius: BrandRadii.fullBorderRadius,
                        ),
                        child: Text(
                          profile.role.toUpperCase(),
                          style: theme.textTheme.labelSmall?.copyWith(
                            color: roleAccent,
                            fontWeight: FontWeight.w800,
                            fontSize: 10,
                            letterSpacing: 0.5,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),

                  // Avatar & Title Headers
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      CircleAvatar(
                        radius: 28,
                        backgroundColor: roleAccent.withValues(alpha: 0.12),
                        child: Text(
                          profile.avatar,
                          style: theme.textTheme.titleLarge?.copyWith(
                            color: roleAccent,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                Text(
                                  profile.name,
                                  style: theme.textTheme.titleLarge?.copyWith(
                                    fontWeight: FontWeight.w800,
                                  ),
                                ),
                                if (profile.verified) ...[
                                  const SizedBox(width: 6),
                                  const Icon(
                                    Icons.verified,
                                    size: 16,
                                    color: BrandColors.textInverse,
                                  ),
                                ],
                              ],
                            ),
                            const SizedBox(height: 4),
                            Text(
                              profile.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: theme.textTheme.bodyMedium?.copyWith(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                  
                  const SizedBox(height: 24),
                  
                  // Metadata Columns (Domain / Intent / Commitment)
                  Container(
                    padding: const EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: BrandColors.surfaceInset,
                      borderRadius: BrandRadii.smBorderRadius,
                    ),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _buildMetaItem(theme, 'DOMAIN', profile.domain),
                        Container(width: 1, height: 28, color: BrandColors.borderDefault),
                        _buildMetaItem(theme, 'INTENT', profile.intent),
                        Container(width: 1, height: 28, color: BrandColors.borderDefault),
                        _buildMetaItem(theme, 'COMMITMENT', profile.commitment),
                      ],
                    ),
                  ),

                  const SizedBox(height: 20),

                  // Bio Section
                  Text(
                    'About Me',
                    style: theme.textTheme.labelLarge?.copyWith(
                      fontWeight: FontWeight.w800,
                      color: BrandColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 8),
                    Text(
                      profile.bio,
                      maxLines: 4,
                      overflow: TextOverflow.ellipsis,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        height: 1.35,
                        fontSize: 13,
                      ),
                    ),
                  
                  const SizedBox(height: 12),

                  // Skills Title & Chips
                  FitScoreBars(score: profile.match),
                  const SizedBox(height: 12),

                  // Skills Title & Chips
                  Text(
                    'Expertise & Skills',
                    style: theme.textTheme.labelLarge?.copyWith(
                      fontWeight: FontWeight.w800,
                      color: BrandColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: profile.skills.map((skill) {
                      return Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                        decoration: BoxDecoration(
                          color: BrandColors.borderSubtle,
                          borderRadius: BorderRadius.circular(6),
                          border: Border.all(
                            color: BrandColors.borderDefault,
                            width: 0.8,
                          ),
                        ),
                        child: Text(
                          skill,
                          style: theme.textTheme.bodyMedium?.copyWith(
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                            color: BrandColors.textSecondary,
                          ),
                        ),
                      );
                    }).toList(),
                  ),
                  ],
                ),
              ),
            ),
          ],
        ),
        ),
      ),
    );
  }

  Widget _buildMetaItem(ThemeData theme, String label, String value) {
    return Column(
      children: [
        Text(
          label,
          style: theme.textTheme.labelSmall?.copyWith(
            fontSize: 9,
            fontWeight: FontWeight.w800,
            letterSpacing: 0.5,
            color: BrandColors.textSecondary.withValues(alpha: 0.6),
          ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: theme.textTheme.labelLarge?.copyWith(
            fontSize: 12,
            fontWeight: FontWeight.w700,
            color: BrandColors.textPrimary,
          ),
        ),
      ],
    );
  }
}
