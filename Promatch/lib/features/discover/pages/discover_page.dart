import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/theme/color_tokens.dart';
import '../../../core/theme/text_styles.dart';
import '../../../core/theme/spacing.dart';
import '../../../core/utils/string_utils.dart';
import '../providers/discover_providers.dart';
import '../providers/swipe_provider.dart';
import '../widgets/swipe_card.dart';
import '../widgets/swipe_deck.dart';
import '../widgets/discover_filters.dart';
import '../widgets/match_modal.dart';

class DiscoverPage extends ConsumerWidget {
  final String variant;

  const DiscoverPage({super.key, this.variant = 'default'});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final profilesAsync = ref.watch(profilesProvider);
    final swipeState = ref.watch(swipeProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Discover'),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () => _showFilters(context, ref),
          ),
        ],
      ),
      body: Stack(
        children: [
          profilesAsync.when(
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (err, _) => Center(child: Text('Error: $err')),
            data: (profiles) {
              if (profiles.isEmpty) {
                return Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.explore_outlined, size: 64, color: ColorTokens.textSecondary),
                      const SizedBox(height: AppSpacing.lg),
                      Text('No profiles found', style: AppTextStyles.subtitle2),
                      const SizedBox(height: AppSpacing.sm),
                      Text('Try adjusting your filters', style: AppTextStyles.caption),
                    ],
                  ),
                );
              }
              return SwipeDeck(
                profiles: profiles,
                onSwipe: (profileId, liked) {
                  ref.read(swipeProvider.notifier).swipe(profileId, liked);
                },
              );
            },
          ),
          if (swipeState.lastMatch != null)
            MatchModal(
              match: swipeState.lastMatch!,
              onDismiss: () => ref.read(swipeProvider.notifier).clearLastMatch(),
            ),
        ],
      ),
    );
  }

  void _showFilters(BuildContext context, WidgetRef ref) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => DiscoverFilters(
        onApply: (filter) {
          ref.read(discoverFilterProvider.notifier).state = filter;
          Navigator.pop(context);
        },
      ),
    );
  }
}
