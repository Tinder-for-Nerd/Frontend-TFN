import 'package:dio/dio.dart';
import 'api_exceptions.dart';

class ErrorInterceptor extends Interceptor {
  @override
  void onError(DioException err, ErrorInterceptorHandler handler) {
    final exception = _handleError(err);
    handler.reject(DioException(
      requestOptions: err.requestOptions,
      response: err.response,
      error: exception,
      type: err.type,
    ));
  }

  ApiException _handleError(DioException error) {
    switch (error.type) {
      case DioExceptionType.connectionTimeout:
      case DioExceptionType.sendTimeout:
      case DioExceptionType.receiveTimeout:
        return const TimeoutException();
      case DioExceptionType.connectionError:
        return const NetworkException();
      case DioExceptionType.badResponse:
        return _handleStatusCode(error.response?.statusCode, error.response?.data);
      default:
        return ApiException(message: error.message ?? 'Unknown error');
    }
  }

  ApiException _handleStatusCode(int? statusCode, dynamic data) {
    final message = data is Map ? data['message'] as String? : null;
    switch (statusCode) {
      case 400:
        return ApiException(message: message ?? 'Bad request', statusCode: 400);
      case 401:
        return UnauthorizedException(message: message ?? 'Unauthorized');
      case 403:
        return ApiException(message: message ?? 'Forbidden', statusCode: 403);
      case 404:
        return NotFoundException(message: message ?? 'Not found');
      case 409:
        return ApiException(message: message ?? 'Conflict', statusCode: 409);
      case 422:
        return ApiException(message: message ?? 'Validation error', statusCode: 422);
      case 500:
        return ServerException(message: message ?? 'Server error');
      default:
        return ApiException(message: message ?? 'Unknown error', statusCode: statusCode);
    }
  }
}
