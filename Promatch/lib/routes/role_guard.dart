import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../core/storage/session_manager.dart';

class RoleGuard {
  static final SessionManager _sessionManager = SessionManager();

  static Future<String?> guard(List<String> allowedRoles) async {
    final role = await _sessionManager.getRole();
    if (role == null || !allowedRoles.contains(role)) {
      return '/';
    }
    return null;
  }

  static Future<String?> studentOnly(BuildContext context, GoRouterState state) {
    return guard(['student']);
  }

  static Future<String?> proOnly(BuildContext context, GoRouterState state) {
    return guard(['pro']);
  }

  static Future<String?> orgOnly(BuildContext context, GoRouterState state) {
    return guard(['org']);
  }

  static Future<String?> studentOrPro(BuildContext context, GoRouterState state) {
    return guard(['student', 'pro']);
  }
}
