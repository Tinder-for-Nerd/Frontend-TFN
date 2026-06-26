import 'package:flutter/material.dart';
import '../models/profile_model.dart';

class SwipeProvider with ChangeNotifier {
  final List<ProfileModel> _allProfiles = [
    ProfileModel(
      id: 'sarah-chen',
      username: 'sarah-chen',
      name: 'Sarah Chen',
      title: 'Product Manager @ Grab',
      role: 'Professional',
      audience: 'Professional',
      domain: 'Product',
      intent: 'Advisor',
      commitment: 'Flexible',
      workStyle: 'Hybrid',
      location: 'Singapore',
      avatar: 'SC',
      tone: 'teal',
      match: 94,
      verified: true,
      bio: 'Ex-founder. Helping early-stage student teams scale their product roadmaps. Specializing in fintech, product growth, and customer discovery.',
      headline: 'Vetting product ideas and scaling user acquisition channels',
      skills: ['Product', 'UX Research', 'Growth Strategy', 'FinTech'],
      goals: ['Mentor student teams', 'Advise tech co-founders'],
      why: ['Proven PM track record', 'Available for 1:1 sessions'],
      mutuals: 8,
      responseRate: '98%',
      avgResponse: '1 hour',
    ),
    ProfileModel(
      id: 'marcus-goh',
      username: 'marcus-goh',
      name: 'Marcus Goh',
      title: 'CS Undergrad @ NUS | Go Developer',
      role: 'Student',
      audience: 'Student',
      domain: 'DeepTech',
      intent: 'Co-founder',
      commitment: 'Full-time',
      workStyle: 'In-person',
      location: 'Singapore',
      avatar: 'MG',
      tone: 'coral',
      match: 89,
      verified: false,
      bio: 'Building containerized cloud microservices. Love hackathons and building developer tools. Looking for an ML/Frontend partner to start a new project.',
      headline: 'Kubernetes specialist looking for a frontend partner',
      skills: ['Go', 'Kubernetes', 'Docker', 'System Design'],
      goals: ['Build a startup team', 'Participate in Hackathons'],
      why: ['GitHub active contributor', 'Top 5 in NUS Hackathon'],
      mutuals: 3,
      responseRate: '91%',
      avgResponse: '4 hours',
    ),
    ProfileModel(
      id: 'elena-rostova',
      username: 'elena-rostova',
      name: 'Elena Rostova',
      title: 'Design Intern @ Canva | Figma Expert',
      role: 'Student',
      audience: 'Student',
      domain: 'EdTech',
      intent: 'Side project',
      commitment: 'Flexible',
      workStyle: 'Remote',
      location: 'Remote | London',
      avatar: 'ER',
      tone: 'rose',
      match: 85,
      verified: false,
      bio: 'Crafting premium interactive interfaces. Excited about educational platforms, glassmorphism designs, and smooth motion graphics.',
      headline: 'Designing high-impact educational visual assets',
      skills: ['Figma', 'UI/UX Design', 'Design Systems', 'Animation'],
      goals: ['Find side projects', 'Connect with frontend devs'],
      why: ['Premium portfolio check', 'Available for quick designs'],
      mutuals: 12,
      responseRate: '100%',
      avgResponse: '30 mins',
    ),
    ProfileModel(
      id: 'david-miller',
      username: 'david-miller',
      name: 'David Miller',
      title: 'Senior Machine Learning Scientist',
      role: 'Professional',
      audience: 'Professional',
      domain: 'FinTech',
      intent: 'Co-founder',
      commitment: 'Full-time',
      workStyle: 'Remote',
      location: 'San Francisco',
      avatar: 'DM',
      tone: 'blue',
      match: 91,
      verified: true,
      bio: 'Ex-Google Brain researcher. Interested in building the core infrastructure for decentralized AI. Looking for technical software engineers.',
      headline: 'Accelerating AI infrastructure scaling projects',
      skills: ['ML', 'PyTorch', 'System Architecture', 'SaaS'],
      goals: ['Find technical co-founder', 'Launch SaaS product'],
      why: ['10+ publications in ML', 'Series-A backed advisor'],
      mutuals: 14,
      responseRate: '88%',
      avgResponse: '12 hours',
    ),
    ProfileModel(
      id: 'priya-sharma',
      username: 'priya-sharma',
      name: 'Priya Sharma',
      title: 'Full-Stack Developer @ NTU',
      role: 'Student',
      audience: 'Student',
      domain: 'FinTech',
      intent: 'Tech collab',
      commitment: 'Part-time',
      workStyle: 'Hybrid',
      location: 'Singapore',
      avatar: 'PS',
      tone: 'teal',
      match: 82,
      verified: false,
      bio: 'React and Node developer working in cryptocurrency spaces. Active researcher in Solidity smart contracts and micro-payment applications.',
      headline: 'Solidity developer looking for web3 collabs',
      skills: ['React', 'NodeJS', 'Solidity', 'Web3'],
      goals: ['Join Web3 hackathon', 'Build blockchain widgets'],
      why: ['Won NTU Web3 Hackathon', 'Active repository builder'],
      mutuals: 6,
      responseRate: '95%',
      avgResponse: '2 hours',
    ),
  ];

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
