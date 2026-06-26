import 'dart:async';
import 'package:flutter/material.dart';
import '../models/profile_model.dart';
import '../models/message_model.dart';

class ScheduledSession {
  final String id;
  final String date;
  final String time;
  final String topic;
  final ProfileModel participant;

  ScheduledSession({
    required this.id,
    required this.date,
    required this.time,
    required this.topic,
    required this.participant,
  });
}

class ChatProvider with ChangeNotifier {
  final List<ChatThread> _threads = [];
  final List<ScheduledSession> _sessions = [];

  List<ChatThread> get threads => _threads;
  List<ScheduledSession> get sessions => _sessions;

  ChatProvider() {
    _initializeMockThreads();
  }

  void _initializeMockThreads() {
    final sarah = ProfileModel(
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
      bio: 'Ex-founder. Helping early-stage student teams scale their product roadmaps.',
      headline: 'Vetting product ideas and scaling user acquisition channels',
      skills: ['Product', 'UX Research', 'Growth Strategy'],
      goals: ['Mentor student teams', 'Advise tech co-founders'],
      why: ['Proven PM track record', 'Available for 1:1 sessions'],
    );

    final marcus = ProfileModel(
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
      bio: 'Building containerized cloud microservices.',
      headline: 'Kubernetes specialist looking for a frontend partner',
      skills: ['Go', 'Kubernetes', 'Docker'],
      goals: ['Build a startup team'],
      why: ['Top 5 in NUS Hackathon'],
    );

    _threads.addAll([
      ChatThread(
        id: 'sarah-chen',
        participant: sarah,
        unreadCount: 1,
        messages: [
          Message(
            id: 'm1',
            senderId: 'me',
            text: 'Hey Sarah! Loved your profile. Would love to get some product guidance on my FinTech MVP.',
            timestamp: DateTime.now().subtract(const Duration(hours: 2)),
          ),
          Message(
            id: 'm2',
            senderId: 'sarah-chen',
            text: 'Hi Alex! Sure, your project looks really interesting. Let\'s schedule a call this week!',
            timestamp: DateTime.now().subtract(const Duration(hours: 1)),
          ),
        ],
      ),
      ChatThread(
        id: 'marcus-goh',
        participant: marcus,
        unreadCount: 0,
        messages: [
          Message(
            id: 'm3',
            senderId: 'marcus-goh',
            text: 'Hey man, you up for the NUS Hackathon next month? Still looking for an ML lead.',
            timestamp: DateTime.now().subtract(const Duration(days: 1)),
          ),
          Message(
            id: 'm4',
            senderId: 'me',
            text: 'Hey Marcus! Absolutely, ML is my focus. Let\'s sync up details.',
            timestamp: DateTime.now().subtract(const Duration(hours: 20)),
          ),
        ],
      )
    ]);
  }

  ChatThread? getThread(String id) {
    try {
      return _threads.firstWhere((t) => t.id == id);
    } catch (_) {
      return null;
    }
  }

  void markAsRead(String threadId) {
    final index = _threads.indexWhere((t) => t.id == threadId);
    if (index != -1) {
      _threads[index] = _threads[index].copyWith(unreadCount: 0);
      notifyListeners();
    }
  }

  void sendMessage(String threadId, String text) {
    final threadIndex = _threads.indexWhere((t) => t.id == threadId);
    if (threadIndex != -1) {
      final updatedMessages = List<Message>.from(_threads[threadIndex].messages)
        ..add(Message(
          id: DateTime.now().toString(),
          senderId: 'me',
          text: text,
          timestamp: DateTime.now(),
          isRead: true,
        ));
      
      _threads[threadIndex] = _threads[threadIndex].copyWith(messages: updatedMessages);
      notifyListeners();
      
      // Simulate reply trigger
      _triggerSimulatedReply(threadId);
    }
  }

  void addConnectionAsThread(ProfileModel profile) {
    final exists = _threads.any((t) => t.id == profile.id);
    if (!exists) {
      _threads.insert(
        0,
        ChatThread(
          id: profile.id,
          participant: profile,
          messages: [
            Message(
              id: 'init',
              senderId: profile.id,
              text: 'We are connected! Let\'s build something together.',
              timestamp: DateTime.now(),
            )
          ],
          unreadCount: 1,
        ),
      );
      notifyListeners();
    }
  }

  void bookSession(String date, String time, String topic, ProfileModel participant) {
    final session = ScheduledSession(
      id: DateTime.now().toString(),
      date: date,
      time: time,
      topic: topic,
      participant: participant,
    );
    _sessions.add(session);
    notifyListeners();
  }

  void _triggerSimulatedReply(String threadId) {
    Timer(const Duration(milliseconds: 1500), () {
      final index = _threads.indexWhere((t) => t.id == threadId);
      if (index != -1) {
        _threads[index] = _threads[index].copyWith(isTyping: true);
        notifyListeners();
      }
      
      Timer(const Duration(milliseconds: 1800), () {
        final replyIndex = _threads.indexWhere((t) => t.id == threadId);
        if (replyIndex != -1) {
          final participant = _threads[replyIndex].participant;
          final updatedMessages = List<Message>.from(_threads[replyIndex].messages)
            ..add(Message(
              id: DateTime.now().toString(),
              senderId: participant.id,
              text: 'Awesome, that sounds great. Let\'s book a call session to flesh this out further! 🚀',
              timestamp: DateTime.now(),
            ));
          _threads[replyIndex] = _threads[replyIndex].copyWith(
            messages: updatedMessages,
            isTyping: false,
            unreadCount: _threads[replyIndex].unreadCount + 1,
          );
          notifyListeners();
        }
      });
    });
  }
}
