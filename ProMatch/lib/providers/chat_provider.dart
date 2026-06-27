import 'dart:async';
import 'package:flutter/material.dart';
import '../data/app_seed_data.dart';
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
    _threads.addAll(buildSeedThreads());
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
              text: 'We are connected. Let\'s build something together.',
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
              text: 'Awesome, that sounds great. Let\'s book a call session to flesh this out further.',
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
