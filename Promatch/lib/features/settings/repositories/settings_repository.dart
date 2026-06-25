import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/providers.dart';

class SettingsRepository {
  final DioClient _client;

  SettingsRepository(this._client);
}

final settingsRepositoryProvider = Provider<SettingsRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return SettingsRepository(dioClient);
});

