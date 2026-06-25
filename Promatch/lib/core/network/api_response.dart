class ApiResponse<T> {
  final bool success;
  final T? data;
  final String? message;
  final int? statusCode;

  const ApiResponse({
    required this.success,
    this.data,
    this.message,
    this.statusCode,
  });

  factory ApiResponse.fromJson(Map<String, dynamic> json, T Function(dynamic)? fromJsonT) {
    return ApiResponse(
      success: json['success'] as bool? ?? false,
      data: json['data'] != null && fromJsonT != null ? fromJsonT(json['data']) : null,
      message: json['message'] as String?,
      statusCode: json['statusCode'] as int?,
    );
  }
}

class PaginatedResponse<T> {
  final List<T> items;
  final int total;
  final int page;
  final int pageSize;
  final bool hasMore;

  const PaginatedResponse({
    required this.items,
    required this.total,
    required this.page,
    required this.pageSize,
    required this.hasMore,
  });

  factory PaginatedResponse.fromJson(
    Map<String, dynamic> json,
    T Function(dynamic) fromJsonT,
  ) {
    final data = json['data'] as Map<String, dynamic>?;
    final list = (data?['items'] as List<dynamic>?)?.map(fromJsonT).toList() ?? <T>[];
    return PaginatedResponse(
      items: list,
      total: data?['total'] as int? ?? 0,
      page: data?['page'] as int? ?? 1,
      pageSize: data?['pageSize'] as int? ?? 20,
      hasMore: data?['hasMore'] as bool? ?? false,
    );
  }
}
