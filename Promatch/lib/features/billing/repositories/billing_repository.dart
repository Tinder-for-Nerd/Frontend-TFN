import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/providers.dart';

class BillingRepository {
  final DioClient _client;

  BillingRepository(this._client);
}

final billingRepositoryProvider = Provider<BillingRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return BillingRepository(dioClient);
});

