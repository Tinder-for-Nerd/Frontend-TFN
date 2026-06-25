import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/providers.dart';

class EventsRepository {
  final DioClient _client;

  EventsRepository(this._client);
}

final eventsRepositoryProvider = Provider<EventsRepository>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return EventsRepository(dioClient);
});

