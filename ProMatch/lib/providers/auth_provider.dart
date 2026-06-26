import 'package:flutter/material.dart';
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
    _currentUser = ProfileModel(
      id: 'me',
      username: 'me',
      name: name.isNotEmpty ? name : 'Alex Kumar',
      title: _currentRole == 'student'
          ? 'Student & ML Engineer | FinTech Builder'
          : (_currentRole == 'pro'
              ? 'Senior Architect | Startup Advisor'
              : 'Accelerator Director'),
      role: _currentRole == 'student' ? 'Student' : (_currentRole == 'pro' ? 'Professional' : 'Organization'),
      audience: _currentRole == 'student' ? 'Student' : (_currentRole == 'pro' ? 'Professional' : 'Organization'),
      domain: _currentRole == 'student' ? 'FinTech' : (_currentRole == 'pro' ? 'DeepTech' : 'SaaS'),
      intent: _currentRole == 'student' ? 'Co-founder' : 'Advisor',
      commitment: 'Flexible',
      workStyle: 'Hybrid',
      location: 'Singapore',
      avatar: name.isNotEmpty ? name.substring(0, 2).toUpperCase() : 'AK',
      tone: _currentRole == 'student' ? 'teal' : (_currentRole == 'pro' ? 'blue' : 'amber'),
      match: 100,
      verified: _currentRole == 'pro' || _currentRole == 'org',
      bio: _currentRole == 'student'
          ? 'Developing ML-powered FinTech apps to solve real-world problems.'
          : 'Advising early stage developers and building tech architectures.',
      headline: 'Building the future of developer networks',
      skills: _currentRole == 'student' ? ['ML', 'FinTech', 'Python', 'React'] : ['System Design', 'ML', 'Strategy'],
      goals: ['Find mentor', 'Book sessions', 'Build teams'],
      why: ['Complete your profile', 'Book a session', 'Join a cohort'],
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
