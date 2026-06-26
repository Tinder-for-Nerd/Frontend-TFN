class ProfileModel {
  final String id;
  final String username;
  final String name;
  final String title;
  final String role;
  final String audience;
  final String domain;
  final String intent;
  final String commitment;
  final String workStyle;
  final String location;
  final String avatar;
  final String? src;
  final String tone;
  final int match;
  final bool verified;
  final String bio;
  final String headline;
  final List<String> skills;
  final List<String> goals;
  final List<String> why;
  final int mutuals;
  final String responseRate;
  final String avgResponse;
  final int views;
  final int sessions;
  final int events;

  ProfileModel({
    required this.id,
    required this.username,
    required this.name,
    required this.title,
    required this.role,
    required this.audience,
    required this.domain,
    required this.intent,
    required this.commitment,
    required this.workStyle,
    required this.location,
    required this.avatar,
    this.src,
    required this.tone,
    required this.match,
    required this.verified,
    required this.bio,
    required this.headline,
    required this.skills,
    required this.goals,
    required this.why,
    this.mutuals = 0,
    this.responseRate = '90%',
    this.avgResponse = '1 day',
    this.views = 0,
    this.sessions = 0,
    this.events = 0,
  });

  factory ProfileModel.fromJson(Map<String, dynamic> json) {
    return ProfileModel(
      id: json['id'] as String,
      username: json['username'] as String? ?? json['id'] as String,
      name: json['name'] as String,
      title: json['title'] as String? ?? '',
      role: json['role'] as String? ?? 'Student',
      audience: json['audience'] as String? ?? 'Student',
      domain: json['domain'] as String? ?? 'Other',
      intent: json['intent'] as String? ?? 'Side project',
      commitment: json['commitment'] as String? ?? 'Flexible',
      workStyle: json['workStyle'] as String? ?? 'Hybrid',
      location: json['location'] as String? ?? 'Singapore',
      avatar: json['avatar'] as String? ?? (json['name'] as String).substring(0, 2).toUpperCase(),
      src: json['src'] as String?,
      tone: json['tone'] as String? ?? 'teal',
      match: json['match'] as int? ?? 50,
      verified: json['verified'] as bool? ?? false,
      bio: json['bio'] as String? ?? '',
      headline: json['headline'] as String? ?? '',
      skills: List<String>.from(json['skills'] as List? ?? []),
      goals: List<String>.from(json['goals'] as List? ?? []),
      why: List<String>.from(json['why'] as List? ?? []),
      mutuals: json['mutuals'] as int? ?? 0,
      responseRate: json['responseRate'] as String? ?? '90%',
      avgResponse: json['avgResponse'] as String? ?? '1 day',
      views: json['views'] as int? ?? 0,
      sessions: json['sessions'] as int? ?? 0,
      events: json['events'] as int? ?? 0,
    );
  }
}
