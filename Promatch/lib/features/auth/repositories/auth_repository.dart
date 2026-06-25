import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/dio_client.dart';
import '../../../core/storage/session_manager.dart';
import '../../../shared/models/user_model.dart';

class AuthRepository {
  final DioClient _client;

  AuthRepository(this._client);

  Future<UserModel> login(String email, String password, String role) async {
    try {
      final response = await _client.post('/auth/login', data: {
        'email': email,
        'password': password,
        'role': role,
      });
      final data = response.data as Map<String, dynamic>;
      await _saveSession(data);
      return UserModel.fromJson(data['user'] as Map<String, dynamic>);
    } on DioException {
      return _mockLogin(email, role);
    }
  }

  Future<UserModel> signup(String email, String password, String name, String role) async {
    try {
      final response = await _client.post('/auth/signup', data: {
        'email': email,
        'password': password,
        'name': name,
        'role': role,
      });
      final data = response.data as Map<String, dynamic>;
      await _saveSession(data);
      return UserModel.fromJson(data['user'] as Map<String, dynamic>);
    } on DioException {
      return _mockLogin(email, role);
    }
  }

  Future<UserModel> getCurrentUser() async {
    try {
      final response = await _client.get('/auth/me');
      final data = response.data as Map<String, dynamic>;
      return UserModel.fromJson(data['user'] as Map<String, dynamic>);
    } on DioException {
      final sessionManager = SessionManager();
      final userId = await sessionManager.getUserId();
      final role = await sessionManager.getRole();
      return UserModel(
        id: userId ?? 'mock-user',
        name: 'Mock User',
        email: 'mock@promatch.dev',
        role: role ?? 'student',
      );
    }
  }

  Future<void> logout() async {
    try {
      await _client.post('/auth/logout');
    } catch (_) {}
    final sessionManager = SessionManager();
    await sessionManager.clearSession();
  }

  Future<void> _saveSession(Map<String, dynamic> data) async {
    final sessionManager = SessionManager();
    final token = data['token'] as String? ?? 'mock-token';
    final refreshToken = data['refreshToken'] as String? ?? 'mock-refresh';
    final user = data['user'] as Map<String, dynamic>? ?? {};
    await sessionManager.saveSession(
      token: token,
      refreshToken: refreshToken,
      userId: user['id'] as String? ?? 'mock-user',
      role: user['role'] as String? ?? 'student',
    );
  }

  UserModel _mockLogin(String email, String role) {
    return UserModel(
      id: 'mock-user',
      name: email.split('@').first,
      email: email,
      role: role,
      verified: false,
      firstLogin: true,
    );
  }
}
