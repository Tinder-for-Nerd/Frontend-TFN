import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../data/app_seed_data.dart';
import '../../providers/auth_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/brand_button.dart';
import '../../widgets/web_parity_widgets.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final authProvider = Provider.of<AuthProvider>(context);

    final user = authProvider.currentUser;
    final role = authProvider.currentRole;
    
    final roleType = roleFromId(role);

    return Scaffold(
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // User Header Profile Card
            WebCard(
              bold: true,
              child: Padding(
                padding: EdgeInsets.zero,
                child: Column(
                  children: [
                    WebAvatar(
                      initials: user?.avatar ?? 'ME',
                      role: roleType,
                      radius: 40,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      user?.name ?? 'Alex Kumar',
                      style: theme.textTheme.displayMedium?.copyWith(
                        fontSize: 22,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      user?.title ?? 'Student & ML Engineer',
                      textAlign: TextAlign.center,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const Icon(Icons.location_on_outlined, size: 14, color: BrandColors.textSecondary),
                        const SizedBox(width: 4),
                        Text(
                          user?.location ?? 'Singapore',
                          style: TextStyle(
                            fontSize: 12,
                            color: BrandColors.textSecondary.withValues(alpha: 0.8),
                          ),
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 20),
                    
                    // Profile details strip
                    Container(
                      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 16),
                      decoration: BoxDecoration(
                        color: BrandColors.surfaceInset,
                        borderRadius: BrandRadii.smBorderRadius,
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _buildDetailStat(theme, 'DOMAIN', user?.domain ?? 'FinTech'),
                          Container(width: 1, height: 20, color: BrandColors.borderDefault),
                          _buildDetailStat(theme, 'INTENT', user?.intent ?? 'Co-founder'),
                          Container(width: 1, height: 20, color: BrandColors.borderDefault),
                          _buildDetailStat(theme, 'COMMIT', user?.commitment ?? 'Flexible'),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),
            
            const SizedBox(height: 24),
            
            // Bio Section
            Text(
              'Biography',
              style: theme.textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 10),
            WebCard(
              bold: true,
              child: Text(
                user?.bio ?? 'No biography written yet.',
                style: theme.textTheme.bodyMedium?.copyWith(
                  height: 1.4,
                ),
              ),
            ),

            const SizedBox(height: 28),

            const SizedBox(height: 28),
            
            // Logout Action
            BrandButton(
              text: 'Sign Out Account',
              variant: BrandButtonVariant.secondary,
              fullWidth: true,
              onPressed: () {
                authProvider.logout();
                Navigator.pushReplacementNamed(context, '/');
              },
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailStat(ThemeData theme, String label, String value) {
    return Column(
      children: [
        Text(
          label,
          style: theme.textTheme.labelSmall?.copyWith(
            fontSize: 8,
            fontWeight: FontWeight.w800,
            color: BrandColors.textSecondary.withValues(alpha: 0.6),
          ),
        ),
        const SizedBox(height: 2),
        Text(
          value,
          style: theme.textTheme.labelLarge?.copyWith(
            fontSize: 11,
            fontWeight: FontWeight.w700,
            color: BrandColors.textPrimary,
          ),
        ),
      ],
    );
  }
}
