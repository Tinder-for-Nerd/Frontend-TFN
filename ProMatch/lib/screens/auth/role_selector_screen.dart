import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../data/app_seed_data.dart';
import '../../providers/auth_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/web_parity_widgets.dart';
import 'login_screen.dart';

class RoleSelectorScreen extends StatelessWidget {
  const RoleSelectorScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final authProvider = Provider.of<AuthProvider>(context, listen: false);

    return Scaffold(
      body: WebScaffoldBackground(
        child: SafeArea(
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
                        color: BrandColors.textInverse.withValues(alpha: 0.1),
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
                      'Tinder For Nerds',
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
                    color: BrandColors.textSecondary.withValues(alpha: 0.8),
                  ),
                ),
                const SizedBox(height: 36),

                Column(
                  children: roleCards.map((card) {
                    final accent = BrandColors.roleAccent(roleFromId(card.id));
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 20),
                      child: WebCard(
                        bold: true,
                        padding: EdgeInsets.zero,
                        child: InkWell(
                          onTap: () {
                            authProvider.selectRole(card.id);
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => LoginScreen(roleId: card.id),
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
                                  backgroundColor: accent.withValues(alpha: 0.1),
                                  child: Text(
                                    card.icon,
                                    style: const TextStyle(fontSize: 22),
                                  ),
                                ),
                                const SizedBox(width: 16),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        card.label,
                                        style: theme.textTheme.titleLarge?.copyWith(
                                          fontWeight: FontWeight.w800,
                                          color: BrandColors.textPrimary,
                                        ),
                                      ),
                                      const SizedBox(height: 4),
                                      Text(
                                        card.tagline,
                                        style: theme.textTheme.bodyMedium?.copyWith(
                                          fontWeight: FontWeight.w600,
                                          color: BrandColors.textPrimary,
                                        ),
                                      ),
                                      const SizedBox(height: 8),
                                      Text(
                                        card.description,
                                        style: theme.textTheme.bodyMedium?.copyWith(
                                          fontSize: 12,
                                          color: BrandColors.textSecondary.withValues(alpha: 0.6),
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
      ),
    );
  }
}
