import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../models/match_result.dart';
import '../repositories/discover_repository.dart';
import 'discover_providers.dart';

class SwipeState {
  final List<String> likedIds;
  final List<String> dislikedIds;
  final MatchResult? lastMatch;
  final bool isLoading;

  const SwipeState({
    this.likedIds = const [],
    this.dislikedIds = const [],
    this.lastMatch,
    this.isLoading = false,
  });

  SwipeState copyWith({
    List<String>? likedIds,
    List<String>? dislikedIds,
    MatchResult? lastMatch,
    bool? isLoading,
  }) {
    return SwipeState(
      likedIds: likedIds ?? this.likedIds,
      dislikedIds: dislikedIds ?? this.dislikedIds,
      lastMatch: lastMatch,
      isLoading: isLoading ?? this.isLoading,
    );
  }
}

class SwipeNotifier extends StateNotifier<SwipeState> {
  final DiscoverRepository _repository;

  SwipeNotifier(this._repository) : super(const SwipeState());

  Future<void> swipe(String profileId, bool liked) async {
    state = state.copyWith(isLoading: true);
    try {
      final match = await _repository.swipe(profileId, liked);
      state = state.copyWith(
        likedIds: liked ? [...state.likedIds, profileId] : state.likedIds,
        dislikedIds: !liked ? [...state.dislikedIds, profileId] : state.dislikedIds,
        lastMatch: match,
        isLoading: false,
      );
    } catch (_) {
      state = state.copyWith(isLoading: false);
    }
  }

  void clearLastMatch() {
    state = state.copyWith(lastMatch: null);
  }
}

final swipeProvider = StateNotifierProvider<SwipeNotifier, SwipeState>((ref) {
  final repo = ref.watch(discoverRepositoryProvider);
  return SwipeNotifier(repo);
});
