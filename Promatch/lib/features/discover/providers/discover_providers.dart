import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../shared/models/profile_model.dart';
import '../../../core/network/providers.dart';
import '../models/discover_filter.dart';
import '../repositories/discover_repository.dart';

final discoverRepositoryProvider = Provider<DiscoverRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return DiscoverRepository(dioClient);
});

final discoverFilterProvider = StateProvider<DiscoverFilter>((ref) => const DiscoverFilter());

final profilesProvider = FutureProvider<List<ProfileModel>>((ref) async {
  final filter = ref.watch(discoverFilterProvider);
  final repo = ref.watch(discoverRepositoryProvider);
  return repo.getProfiles(filter: filter);
});
