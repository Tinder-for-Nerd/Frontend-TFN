import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/providers.dart';

class FeedRepository {
  final DioClient _client;

  FeedRepository(this._client);
}

final feedRepositoryProvider = Provider<FeedRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return FeedRepository(dioClient);
});

