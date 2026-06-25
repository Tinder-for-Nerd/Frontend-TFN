import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/providers.dart';

class ConnectionsRepository {
  final DioClient _client;

  ConnectionsRepository(this._client);
}

final connectionsRepositoryProvider = Provider<ConnectionsRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return ConnectionsRepository(dioClient);
});

