import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/brand_button.dart';
import 'login_screen.dart';

class RoleSelectorScreen extends StatelessWidget {
  const RoleSelectorScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    final List<Map<String, dynamic>> roleCards = [
      {
        'id': 'student',
        'icon': '🎓',
        'label': 'Student',
        'tagline': 'Your next co-founder is one swipe away.',
        'description': 'Hackathons, side projects, early teams',
        'accent': BrandColors.studentAccent,
      },
      {
        'id': 'professional',
        'icon': '💼',
        'label': 'Professional',
        'tagline': 'Where serious builders find their technical co-founder.',
        'description': 'Co-founders, advisors, freelancers',
        'accent': BrandColors.proAccent,
      },
      {
        'id': 'organization',
        'icon': '🏢',
        'label': 'Organization',
        'tagline': "Your community's builder network, supercharged.",
        'description': 'Incubators, GDGs, startup clubs',
        'accent': BrandColors.orgAccent,
      },
    ];

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 40),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 20),
                // Brand Header
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: BrandColors.textInverse.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: const Icon(
                        Icons.bolt,
                        color: BrandColors.textInverse,
                        size: 28,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Text(
                      'ProMatch',
                      style: theme.textTheme.displayMedium?.copyWith(
                        fontSize: 28,
                        fontWeight: FontWeight.w800,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 36),
                
                // Greeting Titles
                Text(
                  'Join the builder network.',
                  style: theme.textTheme.displayMedium?.copyWith(
                    fontSize: 28,
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Select your identity to continue to the portal.',
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: BrandColors.textSecondary.withOpacity(0.8),
                  ),
                ),
                const SizedBox(height: 36),

                // Role cards
                Column(
                  children: roleCards.map((card) {
                    final accent = card['accent'] as Color;
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 20),
                      child: Container(
                        decoration: BoxDecoration(
                          color: BrandColors.surfaceMuted,
                          borderRadius: BrandRadii.smBorderRadius,
                          boxShadow: BrandShadows.sm,
                          border: Border.all(
                            color: BrandColors.borderSubtle,
                            width: 1.0,
                          ),
                        ),
                        child: InkWell(
                          onTap: () {
                            authProvider.selectRole(card['id'] as String);
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => LoginScreen(roleId: card['id'] as String),
                              ),
                            );
                          },
                          borderRadius: BrandRadii.smBorderRadius,
                          child: Padding(
                            padding: const EdgeInsets.all(20.0),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                CircleAvatar(
                                  radius: 26,
                                  backgroundColor: accent.withOpacity(0.1),
                                  child: Text(
                                    card['icon'] as String,
                                    style: const TextStyle(fontSize: 22),
                                  ),
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        card['label'] as String,
                                        style: theme.textTheme.titleLarge?.copyWith(
                                          fontWeight: FontWeight.w800,
                                          color: BrandColors.textPrimary,
                                        ),
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        card['tagline'] as String,
                                        style: theme.textTheme.bodyMedium?.copyWith(
                                          fontWeight: FontWeight.w600,
                                          color: BrandColors.textPrimary,
                                        ),
                                      ),
                                      const SizedBox(height: 8),
                                      Text(
                                        card['description'] as String,
                                        style: theme.textTheme.bodyMedium?.copyWith(
                                          fontSize: 12,
                                          color: BrandColors.textSecondary.withOpacity(0.6),
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(width: 8),
                                Container(
                                  padding: const EdgeInsets.all(4),
                                  decoration: BoxDecoration(
                                    color: BrandColors.surfaceInset,
                                    shape: BoxShape.circle,
                                  ),
                                  child: const Icon(
                                    Icons.chevron_right,
                                    color: BrandColors.textSecondary,
                                    size: 20,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                    );
                  }).toList(),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
