import 'package:dio/dio.dart';
import '../storage/session_manager.dart';

class AuthInterceptor extends Interceptor {
  final SessionManager _sessionManager = SessionManager();

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final token = await _sessionManager.getToken();
    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }
    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      await _sessionManager.clearSession();
    }
    handler.next(err);
  }
}
