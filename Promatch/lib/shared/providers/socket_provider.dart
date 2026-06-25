import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../core/services/socket_service.dart';
import '../../core/storage/session_manager.dart';

final socketServiceProvider = Provider<SocketService>((ref) {
  return SocketService();
});

final socketConnectionProvider = FutureProvider<void>((ref) async {
  final sessionManager = SessionManager();
  final token = await sessionManager.getToken();
  if (token != null) {
    final socketService = ref.read(socketServiceProvider);
    await socketService.connect(token);
  }
});
