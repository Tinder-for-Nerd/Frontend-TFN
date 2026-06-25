import 'package:dio/dio.dart';

class MockInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) {
    if (options.path.contains('/mock')) {
      handler.resolve(Response(
        requestOptions: options,
        statusCode: 200,
        data: _getMockData(options.path),
      ));
    } else {
      handler.next(options);
    }
  }

  Map<String, dynamic> _getMockData(String path) {
    return {'success': true, 'message': 'Mock response'};
  }
}
