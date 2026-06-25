import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/providers.dart';

class SessionsRepository {
  final DioClient _client;

  SessionsRepository(this._client);
}

final sessionsRepositoryProvider = Provider<SessionsRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return SessionsRepository(dioClient);
});

