import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';
import '../../providers/chat_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/brand_button.dart';
import '../chat/chat_detail_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final authProvider = Provider.of<AuthProvider>(context);
    final chatProvider = Provider.of<ChatProvider>(context);

    final user = authProvider.currentUser;
    final role = authProvider.currentRole;
    
    Color roleAccent = BrandColors.textInverse;
    if (role == 'student') {
      roleAccent = BrandColors.studentAccent;
    } else if (role == 'pro') {
      roleAccent = BrandColors.proAccent;
    } else if (role == 'org') {
      roleAccent = BrandColors.orgAccent;
    }

    final threads = chatProvider.threads;

    return Scaffold(
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // User Header Profile Card
            Container(
              width: double.infinity,
              decoration: BoxDecoration(
                color: BrandColors.surfaceMuted,
                borderRadius: BrandRadii.mdBorderRadius,
                boxShadow: BrandShadows.sm,
                border: Border.all(color: BrandColors.borderSubtle),
              ),
              child: Padding(
                padding: const EdgeInsets.all(24.0),
                child: Column(
                  children: [
                    CircleAvatar(
                      radius: 40,
                      backgroundColor: roleAccent.withOpacity(0.12),
                      child: Text(
                        user?.avatar ?? 'ME',
                        style: TextStyle(
                          color: roleAccent,
                          fontWeight: FontWeight.w900,
                          fontSize: 32,
                        ),
                      ),
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
                            color: BrandColors.textSecondary.withOpacity(0.8),
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
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: BrandColors.surfaceMuted,
                borderRadius: BrandRadii.smBorderRadius,
                border: Border.all(color: BrandColors.borderSubtle),
              ),
              child: Text(
                user?.bio ?? 'No biography written yet.',
                style: theme.textTheme.bodyMedium?.copyWith(
                  height: 1.4,
                ),
              ),
            ),

            const SizedBox(height: 28),

            // Matched Connections Grid
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'My Connections (${threads.length})',
                  style: theme.textTheme.titleLarge?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const Icon(Icons.bolt, color: BrandColors.textInverse, size: 20),
              ],
            ),
            const SizedBox(height: 12),
            
            if (threads.isEmpty)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  color: BrandColors.surfaceMuted,
                  borderRadius: BrandRadii.smBorderRadius,
                  border: Border.all(color: BrandColors.borderSubtle),
                ),
                child: const Text(
                  'No connections made yet. Keep swiping on the Discover tab!',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: BrandColors.textSecondary),
                ),
              )
            else
              GridView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 1.1,
                ),
                itemCount: threads.length,
                itemBuilder: (context, index) {
                  final participant = threads[index].participant;
                  
                  return Container(
                    decoration: BoxDecoration(
                      color: BrandColors.surfaceMuted,
                      borderRadius: BrandRadii.smBorderRadius,
                      border: Border.all(color: BrandColors.borderSubtle),
                      boxShadow: BrandShadows.sm,
                    ),
                    child: InkWell(
                      onTap: () {
                        // Open direct thread chat detail
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => ChatDetailScreen(threadId: threads[index].id),
                          ),
                        );
                      },
                      borderRadius: BrandRadii.smBorderRadius,
                      child: Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            CircleAvatar(
                              radius: 20,
                              backgroundColor: BrandColors.textInverse.withOpacity(0.08),
                              child: Text(
                                participant.avatar,
                                style: const TextStyle(
                                  color: BrandColors.textInverse,
                                  fontWeight: FontWeight.w800,
                                  fontSize: 14,
                                ),
                              ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              participant.name,
                              style: theme.textTheme.labelLarge?.copyWith(
                                fontSize: 13,
                                fontWeight: FontWeight.w800,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              participant.title,
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontSize: 10,
                                color: BrandColors.textSecondary.withOpacity(0.6),
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  );
                },
              ),
              
            const SizedBox(height: 36),
            
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
            color: BrandColors.textSecondary.withOpacity(0.6),
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
