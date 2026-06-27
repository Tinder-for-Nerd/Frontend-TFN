import 'dart:math';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../data/app_seed_data.dart';
import '../../models/profile_model.dart';
import '../../providers/auth_provider.dart';
import '../../providers/chat_provider.dart';
import '../../providers/swipe_provider.dart';
import '../../theme/brand_theme.dart';
import '../../widgets/brand_button.dart';
import '../../widgets/swipe_card.dart';
import '../../widgets/web_parity_widgets.dart';
import '../profile/public_profile_screen.dart';

class DiscoverScreen extends StatefulWidget {
  const DiscoverScreen({super.key});

  @override
  State<DiscoverScreen> createState() => _DiscoverScreenState();
}

class _DiscoverScreenState extends State<DiscoverScreen> with TickerProviderStateMixin {
  final TextEditingController _domainController = TextEditingController();
  final TextEditingController _skillsController = TextEditingController();
  final TextEditingController _intentController = TextEditingController();
  final TextEditingController _locationController = TextEditingController();
  final TextEditingController _notesController = TextEditingController();
  Offset _dragOffset = Offset.zero;
  bool _isDragging = false;
  String _professionalType = '';
  String _commitment = '';
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
    _domainController.dispose();
    _skillsController.dispose();
    _intentController.dispose();
    _locationController.dispose();
    _notesController.dispose();
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
    final roleAccent = BrandColors.roleAccent(roleFromId(role));

    final hasProfiles = swipeProvider.hasRemaining;
    final currentProfile = swipeProvider.currentProfile;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16.0, vertical: 12.0),
      child: Column(
        children: [
          _buildDiscoverToolbar(swipeProvider),
          const SizedBox(height: 10),
          
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
                            onTap: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) => PublicProfileScreen(profile: currentProfile),
                                ),
                              );
                            },
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
          const SizedBox(height: 10),
          
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
                const SizedBox(width: 18),
                _buildRoundButton(
                  icon: Icons.star,
                  color: BrandColors.tertiary,
                  size: 50,
                  onPressed: () {
                    _triggerMatchTransition(swipeProvider, currentProfile!, false);
                  },
                ),
                const SizedBox(width: 18),
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

  Widget _buildDiscoverToolbar(SwipeProvider swipeProvider) {
    return WebCard(
      bold: true,
      padding: const EdgeInsets.all(14),
      child: Row(
        children: [
          const Icon(Icons.people_alt_outlined, color: BrandColors.textSecondary, size: 20),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Discover builders',
                  style: Theme.of(context).textTheme.labelLarge?.copyWith(
                    color: BrandColors.textPrimary,
                    fontWeight: FontWeight.w900,
                  ),
                ),
                Text(
                  'AI-ranked profiles based on your skills and intent.',
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                  style: Theme.of(context).textTheme.labelSmall,
                ),
              ],
            ),
          ),
          const SizedBox(width: 10),
          ElevatedButton.icon(
            onPressed: () => _showProfessionalSearchForm(swipeProvider),
            icon: const Icon(Icons.bolt, size: 16),
            label: const Text('Discover more'),
            style: ElevatedButton.styleFrom(
              backgroundColor: BrandColors.primary,
              foregroundColor: Colors.white,
              elevation: 0,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              shape: RoundedRectangleBorder(
                borderRadius: BrandRadii.smBorderRadius,
                side: const BorderSide(color: BrandColors.boldBorder, width: 2),
              ),
            ),
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
                color: BrandColors.textInverse.withValues(alpha: 0.1),
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
              'Tap Discover more to refresh the stack and keep swiping.',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(height: 24),
            BrandButton(
              text: 'Discover more',
              icon: Icons.bolt,
              onPressed: () {
                _showProfessionalSearchForm(swipeProvider);
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showProfessionalSearchForm(SwipeProvider swipeProvider) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      showDragHandle: true,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return StatefulBuilder(
          builder: (context, setSheetState) {
            return Padding(
              padding: EdgeInsets.only(
                left: 20,
                right: 20,
                bottom: MediaQuery.of(context).viewInsets.bottom + 20,
              ),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'What type of professional do you need?',
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'Fill details to find people with specific skills across the platform.',
                      style: Theme.of(context).textTheme.bodyMedium,
                    ),
                    const SizedBox(height: 16),
                    _SearchDropdown(
                      label: 'Professional type *',
                      value: _professionalType,
                      items: const ['Student builder', 'Professional mentor', 'Designer', 'Engineer', 'Founder'],
                      onChanged: (value) => setSheetState(() => _professionalType = value ?? ''),
                    ),
                    _SearchField(label: 'Domain', hint: 'e.g. FinTech, HealthTech', controller: _domainController),
                    _SearchField(label: 'Skills needed', hint: 'e.g. React, Python, UX', controller: _skillsController),
                    _SearchField(label: 'Intent / goal', hint: 'e.g. Hackathon teammate, mentor', controller: _intentController),
                    _SearchField(label: 'Location', hint: 'e.g. Singapore, Remote', controller: _locationController),
                    _SearchDropdown(
                      label: 'Commitment',
                      value: _commitment,
                      items: const ['Any commitment', 'Flexible', 'Part-time', 'Full-time', 'Remote only'],
                      onChanged: (value) => setSheetState(() => _commitment = value ?? ''),
                    ),
                    _SearchField(label: 'Additional notes', hint: 'Anything else we should match on?', controller: _notesController, maxLines: 3),
                    const SizedBox(height: 16),
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton(
                            onPressed: () => Navigator.pop(context),
                            style: OutlinedButton.styleFrom(
                              foregroundColor: BrandColors.textPrimary,
                              side: const BorderSide(color: BrandColors.boldBorder, width: 2),
                              shape: RoundedRectangleBorder(borderRadius: BrandRadii.smBorderRadius),
                            ),
                            child: const Text('Cancel'),
                          ),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: () {
                              if (_professionalType.isEmpty) {
                                ScaffoldMessenger.of(context).showSnackBar(
                                  const SnackBar(
                                    content: Text('Select the type of professional you need.'),
                                    behavior: SnackBarBehavior.floating,
                                  ),
                                );
                                return;
                              }
                              final domain = _domainController.text.trim();
                              final intent = _intentController.text.trim();
                              swipeProvider.setFilters(
                                domain: domain.isEmpty ? 'All' : domain,
                                intent: intent.isEmpty ? 'All' : intent,
                              );
                              swipeProvider.resetDeck();
                              setState(() => _dragOffset = Offset.zero);
                              Navigator.pop(context);
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text('Searching for $_professionalType with ${_skillsController.text.trim().isEmpty ? 'matching' : _skillsController.text.trim()} skills.'),
                                  behavior: SnackBarBehavior.floating,
                                ),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              backgroundColor: BrandColors.primary,
                              foregroundColor: Colors.white,
                              side: const BorderSide(color: BrandColors.boldBorder, width: 2),
                              shape: RoundedRectangleBorder(borderRadius: BrandRadii.smBorderRadius),
                            ),
                            child: const Text('Search all accounts'),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildRoundButton({
    required IconData icon,
    required Color color,
    required VoidCallback onPressed,
    double size = 44,
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
                      backgroundColor: BrandColors.textInverse.withValues(alpha: 0.12),
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
                      backgroundColor: BrandColors.textInverse.withValues(alpha: 0.12),
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

class _SearchField extends StatelessWidget {
  const _SearchField({
    required this.label,
    required this.hint,
    required this.controller,
    this.maxLines = 1,
  });

  final String label;
  final String hint;
  final TextEditingController controller;
  final int maxLines;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: Theme.of(context).textTheme.labelLarge?.copyWith(fontWeight: FontWeight.w900)),
          const SizedBox(height: 6),
          TextField(
            controller: controller,
            maxLines: maxLines,
            decoration: InputDecoration(
              hintText: hint,
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(
                borderRadius: BrandRadii.smBorderRadius,
                borderSide: const BorderSide(color: BrandColors.boldBorder, width: 2),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BrandRadii.smBorderRadius,
                borderSide: const BorderSide(color: BrandColors.boldBorder, width: 2),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BrandRadii.smBorderRadius,
                borderSide: const BorderSide(color: BrandColors.primary, width: 2),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _SearchDropdown extends StatelessWidget {
  const _SearchDropdown({
    required this.label,
    required this.value,
    required this.items,
    required this.onChanged,
  });

  final String label;
  final String value;
  final List<String> items;
  final ValueChanged<String?> onChanged;

  @override
  Widget build(BuildContext context) {
    final values = ['', ...items];
    final selected = values.contains(value) ? value : '';
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(label, style: Theme.of(context).textTheme.labelLarge?.copyWith(fontWeight: FontWeight.w900)),
          const SizedBox(height: 6),
          DropdownButtonFormField<String>(
            initialValue: selected,
            items: values.map((item) {
              return DropdownMenuItem(
                value: item,
                child: Text(item.isEmpty ? 'Select...' : item),
              );
            }).toList(),
            onChanged: onChanged,
            decoration: InputDecoration(
              filled: true,
              fillColor: Colors.white,
              border: OutlineInputBorder(
                borderRadius: BrandRadii.smBorderRadius,
                borderSide: const BorderSide(color: BrandColors.boldBorder, width: 2),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BrandRadii.smBorderRadius,
                borderSide: const BorderSide(color: BrandColors.boldBorder, width: 2),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BrandRadii.smBorderRadius,
                borderSide: const BorderSide(color: BrandColors.primary, width: 2),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
