import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/providers.dart';

class ProfileRepository {
  final DioClient _client;

  ProfileRepository(this._client);
}

final profileRepositoryProvider = Provider<ProfileRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return ProfileRepository(dioClient);
});

