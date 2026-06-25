import 'package:flutter/material.dart';
import '../../../core/theme/spacing.dart';
import '../../../shared/models/profile_model.dart';
import 'swipe_card.dart';

class SwipeDeck extends StatefulWidget {
  final List<ProfileModel> profiles;
  final Function(String profileId, bool liked) onSwipe;

  const SwipeDeck({
    super.key,
    required this.profiles,
    required this.onSwipe,
  });

  @override
  State<SwipeDeck> createState() => _SwipeDeckState();
}

class _SwipeDeckState extends State<SwipeDeck> with TickerProviderStateMixin {
  int _currentIndex = 0;
  late AnimationController _animationController;
  late Animation<double> _animation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 300),
    );
    _animation = CurvedAnimation(parent: _animationController, curve: Curves.easeOut);
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _handleSwipe(bool liked) {
    if (_currentIndex >= widget.profiles.length) return;
    widget.onSwipe(widget.profiles[_currentIndex].id, liked);
    setState(() => _currentIndex++);
  }

  @override
  Widget build(BuildContext context) {
    if (_currentIndex >= widget.profiles.length) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.check_circle_outline, size: 64, color: Colors.green),
            const SizedBox(height: AppSpacing.lg),
            Text('You\'ve seen everyone!', style: Theme.of(context).textTheme.titleLarge),
            const SizedBox(height: AppSpacing.md),
            ElevatedButton(
              onPressed: () => setState(() => _currentIndex = 0),
              child: const Text('Start Over'),
            ),
          ],
        ),
      );
    }

    return Column(
      children: [
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: SwipeCard(profile: widget.profiles[_currentIndex]),
          ),
        ),
        Padding(
          padding: const EdgeInsets.only(bottom: AppSpacing.xl),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              FloatingActionButton(
                heroTag: 'nope',
                backgroundColor: Colors.red.withAlpha(30),
                onPressed: () => _handleSwipe(false),
                child: const Icon(Icons.close, color: Colors.red),
              ),
              const SizedBox(width: AppSpacing.xxl),
              FloatingActionButton(
                heroTag: 'like',
                backgroundColor: Colors.green.withAlpha(30),
                onPressed: () => _handleSwipe(true),
                child: const Icon(Icons.favorite, color: Colors.green),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
