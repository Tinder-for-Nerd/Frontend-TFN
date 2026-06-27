import 'package:flutter/material.dart';
import '../data/app_seed_data.dart';
import '../models/profile_model.dart';

class SwipeProvider with ChangeNotifier {
  final List<ProfileModel> _allProfiles = seedProfiles;

  String _filterDomain = 'All';
  String _filterIntent = 'All';
  int _currentIndex = 0;

  String get filterDomain => _filterDomain;
  String get filterIntent => _filterIntent;
  int get currentIndex => _currentIndex;

  List<ProfileModel> get filteredProfiles {
    return _allProfiles.where((profile) {
      final matchesDomain = _filterDomain == 'All' || profile.domain == _filterDomain;
      final matchesIntent = _filterIntent == 'All' || profile.intent == _filterIntent;
      return matchesDomain && matchesIntent;
    }).toList();
  }

  bool get hasRemaining => _currentIndex < filteredProfiles.length;
  
  ProfileModel? get currentProfile =>
      hasRemaining ? filteredProfiles[_currentIndex] : null;

  int get remainingCount => filteredProfiles.length - _currentIndex;

  void setFilters({required String domain, required String intent}) {
    _filterDomain = domain;
    _filterIntent = intent;
    _currentIndex = 0; // Reset index when filters change
    notifyListeners();
  }

  void swipeLeft() {
    if (hasRemaining) {
      _currentIndex++;
      notifyListeners();
    }
  }

  void swipeRight() {
    if (hasRemaining) {
      _currentIndex++;
      notifyListeners();
    }
  }

  void swipeUp() {
    if (hasRemaining) {
      _currentIndex++;
      notifyListeners();
    }
  }

  void resetDeck() {
    _currentIndex = 0;
    notifyListeners();
  }
}
