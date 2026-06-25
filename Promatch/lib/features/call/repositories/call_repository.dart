import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/providers.dart';

class CallRepository {
  final DioClient _client;

  CallRepository(this._client);
}

final callRepositoryProvider = Provider<CallRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return CallRepository(dioClient);
});

