import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/providers.dart';

class AnalyticsRepository {
  final DioClient _client;

  AnalyticsRepository(this._client);
}

final analyticsRepositoryProvider = Provider<AnalyticsRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return AnalyticsRepository(dioClient);
});

