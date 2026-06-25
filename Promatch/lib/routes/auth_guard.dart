import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../core/storage/session_manager.dart';

class AuthGuard {
  static final SessionManager _sessionManager = SessionManager();

  static Future<String?> redirect(BuildContext context, GoRouterState state) async {
    final isLoggedIn = await _sessionManager.isLoggedIn();
    final isAuthRoute = state.matchedLocation.startsWith('/login') ||
        state.matchedLocation.startsWith('/signup') ||
        state.matchedLocation == '/';
    final isPublicRoute = state.matchedLocation.startsWith('/features') ||
        state.matchedLocation.startsWith('/about') ||
        state.matchedLocation.startsWith('/contact');

    if (!isLoggedIn && !isAuthRoute && !isPublicRoute) {
      return '/login';
    }

    if (isLoggedIn && isAuthRoute) {
      final role = await _sessionManager.getRole();
      if (role != null) {
        switch (role) {
          case 'student':
            return '/student/home';
          case 'pro':
            return '/pro/overview';
          case 'org':
            return '/org/dashboard';
        }
      }
    }

    return null;
  }
}
