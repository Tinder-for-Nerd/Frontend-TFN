import 'package:flutter/material.dart';
import '../data/app_seed_data.dart';
import '../models/profile_model.dart';

class AuthProvider with ChangeNotifier {
  ProfileModel? _currentUser;
  String _currentRole = 'student'; // 'student', 'pro', 'org'
  bool _isAuthenticated = false;
  bool _isOnboarded = false;

  ProfileModel? get currentUser => _currentUser;
  String get currentRole => _currentRole;
  bool get isAuthenticated => _isAuthenticated;
  bool get isOnboarded => _isOnboarded;

  void selectRole(String role) {
    if (role == 'student' || role == 'professional' || role == 'organization') {
      // Normalizing role name
      if (role == 'professional') {
        _currentRole = 'pro';
      } else if (role == 'organization') {
        _currentRole = 'org';
      } else {
        _currentRole = 'student';
      }
      notifyListeners();
    }
  }

  void login(String email, String name) {
    final seededUser = seedCurrentUsers[_currentRole] ?? seedCurrentUsers['student']!;
    final displayName = name.trim().isNotEmpty ? name.trim() : seededUser.name;
    _currentUser = ProfileModel(
      id: seededUser.id,
      username: seededUser.username,
      name: displayName,
      title: seededUser.title,
      role: seededUser.role,
      audience: seededUser.audience,
      domain: seededUser.domain,
      intent: seededUser.intent,
      commitment: seededUser.commitment,
      workStyle: seededUser.workStyle,
      location: seededUser.location,
      avatar: displayName
          .split(' ')
          .where((part) => part.isNotEmpty)
          .take(2)
          .map((part) => part[0])
          .join()
          .toUpperCase(),
      tone: seededUser.tone,
      match: seededUser.match,
      verified: seededUser.verified,
      bio: seededUser.bio,
      headline: seededUser.headline,
      skills: seededUser.skills,
      goals: seededUser.goals,
      why: seededUser.why,
      views: seededUser.views,
      sessions: seededUser.sessions,
      events: seededUser.events,
    );
    _isAuthenticated = true;
    _isOnboarded = false; // Need onboarding
    notifyListeners();
  }

  void completeOnboarding() {
    _isOnboarded = true;
    notifyListeners();
  }

  void logout() {
    _currentUser = null;
    _isAuthenticated = false;
    _isOnboarded = false;
    notifyListeners();
  }
}
