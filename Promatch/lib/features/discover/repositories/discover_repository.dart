import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/dio_client.dart';
import '../../../core/network/providers.dart';
import '../../../shared/models/profile_model.dart';
import '../models/discover_filter.dart';
import '../models/match_result.dart';

class DiscoverRepository {
  final DioClient _client;

  DiscoverRepository(this._client);

  Future<List<ProfileModel>> getProfiles({DiscoverFilter? filter}) async {
    try {
      final response = await _client.get('/discover', queryParameters: filter?.toQueryParams());
      final data = response.data as Map<String, dynamic>;
      return (data['data'] as List)
          .map((e) => ProfileModel.fromJson(e as Map<String, dynamic>))
          .toList();
    } catch (_) {
      return _mockProfiles();
    }
  }

  Future<MatchResult> swipe(String profileId, bool liked) async {
    try {
      final response = await _client.post('/discover/swipe', data: {
        'profileId': profileId,
        'liked': liked,
      });
      return MatchResult.fromJson((response.data as Map<String, dynamic>)['data'] as Map<String, dynamic>);
    } catch (_) {
      return MatchResult(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        profileId: profileId,
        name: 'Matched!',
        title: 'You have a new match',
        avatar: '',
        matchScore: 95,
        skills: [],
      );
    }
  }

  List<ProfileModel> _mockProfiles() {
    return [
      ProfileModel(
        id: '1', username: 'sarah.chen', name: 'Sarah Chen', title: 'Full-Stack Developer',
        role: 'pro', audience: 'tech', domain: 'Web Dev', intent: 'Co-founder',
        commitment: 'Full-time', workStyle: 'Remote', location: 'San Francisco, CA',
        tone: 'Professional', match: 95, verified: true,
        bio: 'Building the future of edtech. Looking for a technical co-founder.',
        headline: 'Full-Stack Developer | Ex-Google | AI Enthusiast',
        skills: ['React', 'Python', 'TypeScript', 'Node.js'],
        goals: ['Build a startup', 'Find co-founder'],
        why: ['Technical synergy', 'Shared vision'],
        mutuals: 12, views: 234, sessions: 8, events: 3,
        links: ['https://linkedin.com/in/sarahchen'],
        cover: '', avatar: 'https://i.pravatar.cc/150?img=1',
      ),
      ProfileModel(
        id: '2', username: 'alex.rivera', name: 'Alex Rivera', title: 'ML Engineer',
        role: 'pro', audience: 'tech', domain: 'AI/ML', intent: 'Co-founder',
        commitment: 'Part-time', workStyle: 'Hybrid', location: 'New York, NY',
        tone: 'Casual', match: 88, verified: true,
        bio: 'Turned my side project into a YC startup. Now looking for my next adventure.',
        headline: 'ML Engineer | YC Alum | NLP Specialist',
        skills: ['PyTorch', 'TensorFlow', 'NLP', 'Rust', 'Go'],
        goals: ['Scale AI product', 'Find technical partner'],
        why: ['Complementary skills', 'Industry experience'],
        mutuals: 8, views: 156, sessions: 4, events: 2,
        links: ['https://linkedin.com/in/alexrivera'],
        cover: '', avatar: 'https://i.pravatar.cc/150?img=3',
      ),
    ];
  }
}
