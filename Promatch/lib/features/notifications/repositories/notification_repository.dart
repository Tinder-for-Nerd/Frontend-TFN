import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/providers.dart';

class NotificationRepository {
  final DioClient _client;

  NotificationRepository(this._client);
}

final notificationRepositoryProvider = Provider<NotificationRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return NotificationRepository(dioClient);
});

