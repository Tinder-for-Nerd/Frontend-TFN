import 'dart:math';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../models/profile_model.dart';
import '../../providers/auth_provider.dart';
import '../../providers/chat_provider.dart';
import '../../providers/swipe_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/brand_button.dart';
import '../../widgets/swipe_card.dart';

class DiscoverScreen extends StatefulWidget {
  const DiscoverScreen({Key? key}) : super(key: key);

  @override
  State<DiscoverScreen> createState() => _DiscoverScreenState();
}

class _DiscoverScreenState extends State<DiscoverScreen> with TickerProviderStateMixin {
  Offset _dragOffset = Offset.zero;
  bool _isDragging = false;
  late AnimationController _springController;
  late Animation<Offset> _springAnimation;

  @override
  void initState() {
    super.initState();
    _springController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );
    _springAnimation = Tween<Offset>(
      begin: Offset.zero,
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _springController,
      curve: Curves.easeOutBack,
    ));
  }

  @override
  void dispose() {
    _springController.dispose();
    super.dispose();
  }

  void _springBack() {
    _springAnimation = Tween<Offset>(
      begin: _dragOffset,
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _springController,
      curve: Curves.easeOutBack,
    ));
    _springController.reset();
    _springController.forward().then((_) {
      setState(() {
        _dragOffset = Offset.zero;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final swipeProvider = Provider.of<SwipeProvider>(context);
    final authProvider = Provider.of<AuthProvider>(context);
    
    final role = authProvider.currentRole;
    Color roleAccent = BrandColors.textInverse;
    if (role == 'student') {
      roleAccent = BrandColors.studentAccent;
    } else if (role == 'pro') {
      roleAccent = BrandColors.proAccent;
    } else if (role == 'org') {
      roleAccent = BrandColors.orgAccent;
    }

    final hasProfiles = swipeProvider.hasRemaining;
    final currentProfile = swipeProvider.currentProfile;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 20.0),
      child: Column(
        children: [
          // Filter Row
          _buildFilterBar(swipeProvider),
          const SizedBox(height: 16),
          
          // Cards Stage
          Expanded(
            child: hasProfiles
                ? LayoutBuilder(
                    builder: (context, constraints) {
                      final cardWidth = constraints.maxWidth;
                      final cardHeight = constraints.maxHeight;

                      // Calculating drag effects
                      final double rotateAngle = (_dragOffset.dx / cardWidth) * (pi / 12);

                      return Stack(
                        clipBehavior: Clip.none,
                        alignment: Alignment.center,
                        children: [
                          // Underneath Card Preview (asymmetric offset layer)
                          if (swipeProvider.remainingCount > 1)
                            Transform.translate(
                              offset: const Offset(4, 12),
                              child: Transform.rotate(
                                angle: -0.02,
                                child: Opacity(
                                  opacity: 0.8,
                                  child: SwipeCard(
                                    profile: swipeProvider.filteredProfiles[swipeProvider.currentIndex + 1],
                                  ),
                                ),
                              ),
                            ),
                          
                          // Top Active Card
                          GestureDetector(
                            onPanStart: (_) {
                              setState(() {
                                _isDragging = true;
                                _springController.stop();
                              });
                            },
                            onPanUpdate: (details) {
                              setState(() {
                                _dragOffset += details.delta;
                              });
                            },
                            onPanEnd: (details) {
                              setState(() {
                                _isDragging = false;
                              });
                              
                              final dx = _dragOffset.dx;
                              final dy = _dragOffset.dy;

                              if (dx > cardWidth * 0.35) {
                                // Swipe Right - Connect
                                _triggerMatchTransition(swipeProvider, currentProfile, true);
                              } else if (dx < -cardWidth * 0.35) {
                                // Swipe Left - Pass
                                swipeProvider.swipeLeft();
                                setState(() {
                                  _dragOffset = Offset.zero;
                                });
                              } else if (dy < -cardHeight * 0.25) {
                                // Swipe Up - Super Connect
                                _triggerMatchTransition(swipeProvider, currentProfile, false);
                              } else {
                                _springBack();
                              }
                            },
                            child: AnimatedBuilder(
                              animation: _springAnimation,
                              builder: (context, child) {
                                final currentOffset = _isDragging ? _dragOffset : _springAnimation.value;
                                return Transform.translate(
                                  offset: currentOffset,
                                  child: Transform.rotate(
                                    angle: rotateAngle,
                                    child: child,
                                  ),
                                );
                              },
                              child: SwipeCard(profile: currentProfile!),
                            ),
                          ),
                          
                          // Floating Drag Direction indicators
                          if (_dragOffset.dx.abs() > 40)
                            Positioned(
                              top: 40,
                              left: _dragOffset.dx > 0 ? 30 : null,
                              right: _dragOffset.dx < 0 ? 30 : null,
                              child: Transform.rotate(
                                angle: _dragOffset.dx > 0 ? -0.15 : 0.15,
                                child: Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                                  decoration: BoxDecoration(
                                    border: Border.all(
                                      color: _dragOffset.dx > 0 ? BrandColors.success : BrandColors.error,
                                      width: 3.0,
                                    ),
                                    borderRadius: BorderRadius.circular(8),
                                  ),
                                  child: Text(
                                    _dragOffset.dx > 0 ? 'CONNECT' : 'PASS',
                                    style: TextStyle(
                                      color: _dragOffset.dx > 0 ? BrandColors.success : BrandColors.error,
                                      fontWeight: FontWeight.w900,
                                      fontSize: 20,
                                      letterSpacing: 1.0,
                                    ),
                                  ),
                                ),
                              ),
                            ),
                        ],
                      );
                    },
                  )
                : _buildEmptyState(swipeProvider),
          ),
          const SizedBox(height: 16),
          
          // Action Buttons Bar
          if (hasProfiles)
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                _buildRoundButton(
                  icon: Icons.close,
                  color: BrandColors.error,
                  onPressed: () {
                    swipeProvider.swipeLeft();
                  },
                ),
                const SizedBox(width: 24),
                _buildRoundButton(
                  icon: Icons.star,
                  color: BrandColors.tertiary,
                  size: 54,
                  onPressed: () {
                    _triggerMatchTransition(swipeProvider, currentProfile!, false);
                  },
                ),
                const SizedBox(width: 24),
                _buildRoundButton(
                  icon: Icons.flash_on,
                  color: roleAccent,
                  onPressed: () {
                    _triggerMatchTransition(swipeProvider, currentProfile!, true);
                  },
                ),
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildFilterBar(SwipeProvider swipeProvider) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      decoration: BoxDecoration(
        color: BrandColors.surfaceMuted,
        borderRadius: BrandRadii.smBorderRadius,
        border: Border.all(color: BrandColors.borderSubtle),
        boxShadow: BrandShadows.sm,
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              const Icon(Icons.tune, color: BrandColors.textSecondary, size: 18),
              const SizedBox(width: 8),
              Text(
                'Filters:',
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  color: BrandColors.textPrimary,
                  fontSize: 12,
                ),
              ),
            ],
          ),
          DropdownButton<String>(
            value: swipeProvider.filterDomain,
            underline: Container(),
            style: const TextStyle(fontWeight: FontWeight.w700, color: BrandColors.textInverse, fontSize: 13),
            items: ['All', 'FinTech', 'DeepTech', 'Climate', 'SaaS', 'EdTech'].map((domain) {
              return DropdownMenuItem(value: domain, child: Text(domain));
            }).toList(),
            onChanged: (val) {
              swipeProvider.setFilters(domain: val!, intent: swipeProvider.filterIntent);
            },
          ),
          DropdownButton<String>(
            value: swipeProvider.filterIntent,
            underline: Container(),
            style: const TextStyle(fontWeight: FontWeight.w700, color: BrandColors.textInverse, fontSize: 13),
            items: ['All', 'Co-founder', 'Advisor', 'Side project'].map((intent) {
              return DropdownMenuItem(value: intent, child: Text(intent));
            }).toList(),
            onChanged: (val) {
              swipeProvider.setFilters(domain: swipeProvider.filterDomain, intent: val!);
            },
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState(SwipeProvider swipeProvider) {
    return Center(
      child: Container(
        padding: const EdgeInsets.all(32),
        decoration: BoxDecoration(
          color: BrandColors.surfaceMuted,
          borderRadius: BrandRadii.lgBorderRadius,
          boxShadow: BrandShadows.sm,
          border: Border.all(color: BrandColors.borderSubtle),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: BrandColors.textInverse.withOpacity(0.1),
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.people_outline, color: BrandColors.textInverse, size: 48),
            ),
            const SizedBox(height: 24),
            Text(
              'No more profiles.',
              style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontWeight: FontWeight.w800,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              'Adjust your domain/intent filters or reset the stack to keep swiping.',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 24),
            BrandButton(
              text: 'Refresh Queue',
              icon: Icons.refresh,
              onPressed: () {
                swipeProvider.resetDeck();
              },
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildRoundButton({
    required IconData icon,
    required Color color,
    required VoidCallback onPressed,
    double size = 48,
  }) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: BrandColors.surfaceMuted,
        shape: BoxShape.circle,
        boxShadow: BrandShadows.sm,
        border: Border.all(
          color: BrandColors.borderDefault,
          width: 1.0,
        ),
      ),
      child: IconButton(
        icon: Icon(icon, color: color, size: size * 0.45),
        onPressed: onPressed,
      ),
    );
  }

  void _triggerMatchTransition(SwipeProvider swipeProvider, ProfileModel profile, bool isRight) {
    // Add connection to ChatProvider instantly
    Provider.of<ChatProvider>(context, listen: false).addConnectionAsThread(profile);
    
    // Animate swipe off-screen
    final screenWidth = MediaQuery.of(context).size.width;
    _springAnimation = Tween<Offset>(
      begin: _dragOffset,
      end: Offset(isRight ? screenWidth * 1.2 : -screenWidth * 1.2, 0),
    ).animate(CurvedAnimation(
      parent: _springController,
      curve: Curves.easeOut,
    ));
    _springController.reset();
    _springController.forward().then((_) {
      swipeProvider.swipeRight();
      setState(() {
        _dragOffset = Offset.zero;
      });
      // Show Match Dialog modal overlay
      _showMatchDialog(profile);
    });
  }

  void _showMatchDialog(ProfileModel matchedProfile) {
    final theme = Theme.of(context);
    final authProvider = Provider.of<AuthProvider>(context, listen: false);
    final currentUser = authProvider.currentUser;

    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) {
        return Dialog(
          insetPadding: const EdgeInsets.symmetric(horizontal: 20),
          shape: RoundedRectangleBorder(borderRadius: BrandRadii.lgBorderRadius),
          child: Padding(
            padding: const EdgeInsets.all(28.0),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  '🔥',
                  style: TextStyle(fontSize: 48),
                ),
                const SizedBox(height: 12),
                Text(
                  'It\'s a Match!',
                  style: theme.textTheme.displayMedium?.copyWith(
                    color: BrandColors.textInverse,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'You and ${matchedProfile.name} connected.',
                  textAlign: TextAlign.center,
                  style: theme.textTheme.bodyMedium,
                ),
                const SizedBox(height: 28),
                
                // Side by side Avatars
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircleAvatar(
                      radius: 36,
                      backgroundColor: BrandColors.textInverse.withOpacity(0.12),
                      child: Text(
                        currentUser?.avatar ?? 'ME',
                        style: theme.textTheme.titleLarge?.copyWith(
                          color: BrandColors.textInverse,
                          fontSize: 24,
                        ),
                      ),
                    ),
                    const SizedBox(width: 16),
                    const Icon(
                      Icons.favorite,
                      color: BrandColors.studentAccent,
                      size: 32,
                    ),
                    const SizedBox(width: 16),
                    CircleAvatar(
                      radius: 36,
                      backgroundColor: BrandColors.textInverse.withOpacity(0.12),
                      child: Text(
                        matchedProfile.avatar,
                        style: theme.textTheme.titleLarge?.copyWith(
                          color: BrandColors.textInverse,
                          fontSize: 24,
                        ),
                      ),
                    ),
                  ],
                ),
                
                const SizedBox(height: 36),
                
                // Actions
                BrandButton(
                  text: 'Open Chat',
                  icon: Icons.chat,
                  fullWidth: true,
                  onPressed: () {
                    Navigator.pop(context); // Close dialog
                    // We will keep swiping, or the user can navigate to the chat tab
                  },
                ),
                const SizedBox(height: 12),
                BrandButton(
                  text: 'Keep Discovering',
                  variant: BrandButtonVariant.secondary,
                  fullWidth: true,
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
