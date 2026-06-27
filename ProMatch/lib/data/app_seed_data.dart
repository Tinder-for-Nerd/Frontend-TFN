import 'dart:typed_data';

import '../models/message_model.dart';
import '../models/profile_model.dart';
import '../theme/brand_theme.dart';

class LandingFeatureSeed {
  final String eyebrow;
  final String title;
  final String body;

  const LandingFeatureSeed({
    required this.eyebrow,
    required this.title,
    required this.body,
  });
}

class LandingStepSeed {
  final String step;
  final String title;
  final String body;

  const LandingStepSeed({
    required this.step,
    required this.title,
    required this.body,
  });
}

class RoleCardSeed {
  final String id;
  final String icon;
  final String label;
  final String tagline;
  final String description;

  const RoleCardSeed({
    required this.id,
    required this.icon,
    required this.label,
    required this.tagline,
    required this.description,
  });
}

class FeedItem {
  final String authorName;
  final String authorTitle;
  final String avatarInitials;
  final String content;
  final List<String> tags;
  final String timeAgo;
  final int likes;
  final bool isVerified;
  final String? documentName;
  final Uint8List? imageBytes;

  const FeedItem({
    required this.authorName,
    required this.authorTitle,
    required this.avatarInitials,
    required this.content,
    required this.tags,
    required this.timeAgo,
    required this.likes,
    this.isVerified = false,
    this.documentName,
    this.imageBytes,
  });
}

const landingFeatures = [
  LandingFeatureSeed(
    eyebrow: 'AI Match',
    title: 'Rank by skills, domain, intent, and working style.',
    body: 'Embedding-aware signals keep the feed relevant as the network grows and profile data gets richer.',
  ),
  LandingFeatureSeed(
    eyebrow: 'Real-time chat',
    title: 'Keep momentum high the moment a match lands.',
    body: 'Presence, typing states, and fast booking actions turn interest into a real conversation.',
  ),
  LandingFeatureSeed(
    eyebrow: '1:1 calls',
    title: 'Move from discovery to a scheduled call in one flow.',
    body: 'Availability, reminders, and notes live inside the product so people can follow through.',
  ),
];

const landingSteps = [
  LandingStepSeed(step: '01', title: 'Sign up', body: 'OAuth-style entry in seconds, then choose your builder identity.'),
  LandingStepSeed(step: '02', title: 'Build profile', body: 'Add skills, domain, intent, commitment, and a sharp bio.'),
  LandingStepSeed(step: '03', title: 'Discover', body: 'AI-ranked cards show the fit signals that matter most.'),
  LandingStepSeed(step: '04', title: 'Connect', body: 'Open chat, book a call, or jump into an event while the match is fresh.'),
];

const roleCards = [
  RoleCardSeed(
    id: 'student',
    icon: '🎓',
    label: 'Student',
    tagline: 'Your next co-founder is one swipe away.',
    description: 'Hackathons, side projects, early teams',
  ),
  RoleCardSeed(
    id: 'professional',
    icon: '💼',
    label: 'Professional',
    tagline: 'Where serious builders find their technical co-founder.',
    description: 'Co-founders, advisors, freelancers',
  ),
  RoleCardSeed(
    id: 'organization',
    icon: '🏢',
    label: 'Organization',
    tagline: "Your community's builder network, supercharged.",
    description: 'Incubators, GDGs, startup clubs',
  ),
];

final seedProfiles = [
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
    bio: 'Ex-founder helping early-stage student teams scale product roadmaps, validate customer discovery, and tighten launch plans.',
    headline: 'Vetting product ideas and scaling user acquisition channels',
    skills: ['Product', 'UX Research', 'Growth Strategy', 'FinTech'],
    goals: ['Mentor student teams', 'Advise tech co-founders'],
    why: ['Proven PM track record', 'Available for 1:1 sessions'],
    mutuals: 8,
    responseRate: '98%',
    avgResponse: '1 hour',
    views: 1240,
    sessions: 18,
    events: 6,
  ),
  ProfileModel(
    id: 'raj-patel',
    username: 'raj-patel',
    name: 'Raj Patel',
    title: 'Full-stack Engineer @ Stripe',
    role: 'Professional',
    audience: 'Professional',
    domain: 'Engineering',
    intent: 'Tech collab',
    commitment: 'Part-time',
    workStyle: 'Remote',
    location: 'Bengaluru',
    avatar: 'RP',
    tone: 'blue',
    match: 91,
    verified: true,
    bio: 'Full-stack engineer building payment infrastructure and mentoring builders on scalable React, Node, and API design.',
    headline: 'Can help turn early product ideas into production-ready systems',
    skills: ['React', 'NodeJS', 'API Design', 'System Design'],
    goals: ['Advise MVP teams', 'Review architecture'],
    why: ['Strong platform experience', 'Fast technical feedback'],
    mutuals: 11,
    responseRate: '95%',
    avgResponse: '2 hours',
    views: 980,
    sessions: 14,
    events: 4,
  ),
  ProfileModel(
    id: 'mei-lin',
    username: 'mei-lin',
    name: 'Mei Lin',
    title: 'Computer Science Student',
    role: 'Student',
    audience: 'Student',
    domain: 'Design',
    intent: 'Side project',
    commitment: 'Flexible',
    workStyle: 'Hybrid',
    location: 'Singapore',
    avatar: 'ML',
    tone: 'rose',
    match: 88,
    verified: false,
    bio: 'Design-minded CS student building education tools with thoughtful UX, polished visual systems, and fast Flutter prototypes.',
    headline: 'Designing high-impact educational products with engineers',
    skills: ['Flutter', 'Figma', 'UI/UX Design', 'Firebase'],
    goals: ['Find frontend partners', 'Ship an EdTech MVP'],
    why: ['Strong portfolio', 'Available for weekend builds'],
    mutuals: 6,
    responseRate: '92%',
    avgResponse: '4 hours',
    views: 640,
    sessions: 5,
    events: 2,
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
    match: 86,
    verified: false,
    bio: 'Building containerized cloud microservices and developer tooling. Looking for an ML or frontend partner for a new platform.',
    headline: 'Kubernetes specialist looking for a frontend partner',
    skills: ['Go', 'Kubernetes', 'Docker', 'System Design'],
    goals: ['Build a startup team', 'Join hackathons'],
    why: ['GitHub contributor', 'Top hackathon finisher'],
    mutuals: 3,
    responseRate: '91%',
    avgResponse: '4 hours',
  ),
  ProfileModel(
    id: 'priya-sharma',
    username: 'priya-sharma',
    name: 'Priya Sharma',
    title: 'Full-stack Developer @ NTU',
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
    bio: 'React and Node developer researching Solidity smart contracts, micro-payments, and fintech tooling for student founders.',
    headline: 'Solidity developer looking for Web3 collabs',
    skills: ['React', 'NodeJS', 'Solidity', 'Web3'],
    goals: ['Join Web3 hackathon', 'Build blockchain widgets'],
    why: ['Won NTU Web3 Hackathon', 'Active repository builder'],
    mutuals: 6,
    responseRate: '95%',
    avgResponse: '2 hours',
  ),
];

final seedCurrentUsers = {
  'student': ProfileModel(
    id: 'me',
    username: 'alex-kumar',
    name: 'Alex Kumar',
    title: 'Student & ML Engineer | FinTech Builder',
    role: 'Student',
    audience: 'Student',
    domain: 'FinTech',
    intent: 'Co-founder',
    commitment: 'Flexible',
    workStyle: 'Hybrid',
    location: 'Singapore',
    avatar: 'AK',
    tone: 'teal',
    match: 100,
    verified: false,
    bio: 'Developing ML-powered FinTech apps and looking for mentors, collaborators, and early startup teammates.',
    headline: 'Building the future of developer networks',
    skills: ['ML', 'FinTech', 'Python', 'React'],
    goals: ['Find mentor', 'Book sessions', 'Build teams'],
    why: ['Complete your profile', 'Book a session', 'Join a cohort'],
    views: 846,
    sessions: 7,
    events: 3,
  ),
  'pro': ProfileModel(
    id: 'me',
    username: 'maya-chen',
    name: 'Maya Chen',
    title: 'Senior Architect | Startup Advisor',
    role: 'Professional',
    audience: 'Professional',
    domain: 'DeepTech',
    intent: 'Advisor',
    commitment: 'Flexible',
    workStyle: 'Remote',
    location: 'Singapore',
    avatar: 'MC',
    tone: 'blue',
    match: 100,
    verified: true,
    bio: 'Advising early-stage technical teams on architecture, product velocity, hiring, and investor-ready execution.',
    headline: 'Helping serious builders turn prototypes into companies',
    skills: ['System Design', 'ML', 'Strategy', 'Hiring'],
    goals: ['Find teams to mentor', 'Host expert sessions'],
    why: ['Verified advisor', 'Strong operator network'],
    views: 1530,
    sessions: 24,
    events: 8,
  ),
  'org': ProfileModel(
    id: 'me',
    username: 'tfnerds-labs',
    name: 'TFN Labs',
    title: 'Accelerator Community',
    role: 'Organization',
    audience: 'Organization',
    domain: 'SaaS',
    intent: 'Community',
    commitment: 'Flexible',
    workStyle: 'Hybrid',
    location: 'Global',
    avatar: 'TL',
    tone: 'amber',
    match: 100,
    verified: true,
    bio: 'Running builder cohorts, demo nights, mentor matching, and startup collaboration spaces for technical founders.',
    headline: 'A community layer for ambitious builders',
    skills: ['Events', 'Mentorship', 'Hiring', 'Community'],
    goals: ['Grow cohorts', 'Support founders'],
    why: ['Verified organization', 'Active startup network'],
    views: 2240,
    sessions: 32,
    events: 14,
  ),
};

const feedItems = [
  FeedItem(
    authorName: 'Sarah Chen',
    authorTitle: 'Product Manager @ Grab',
    avatarInitials: 'SC',
    content: 'I am advising three new student startups this quarter. If your team needs roadmap guidance or customer discovery feedback, book a quick 1:1.',
    tags: ['#Product', '#Growth', '#FinTech', '#Mentorship'],
    timeAgo: '2h ago',
    likes: 24,
    isVerified: true,
  ),
  FeedItem(
    authorName: 'Raj Patel',
    authorTitle: 'Full-stack Engineer @ Stripe',
    avatarInitials: 'RP',
    content: 'Starter repo is ready: auth, API contracts, analytics events, and a clean dashboard shell. Useful for anyone shipping a hackathon MVP this week.',
    tags: ['#React', '#Node', '#APIs', '#MVP'],
    timeAgo: '5h ago',
    likes: 31,
    isVerified: true,
  ),
  FeedItem(
    authorName: 'Mei Lin',
    authorTitle: 'Computer Science Student',
    avatarInitials: 'ML',
    content: 'Testing a new education product flow with bold segmented controls and fit-score feedback. Looking for two engineers to review the prototype.',
    tags: ['#Flutter', '#Design', '#EdTech', '#UX'],
    timeAgo: '1d ago',
    likes: 42,
  ),
];

List<ChatThread> buildSeedThreads() {
  final now = DateTime.now();
  final sarah = seedProfiles.firstWhere((profile) => profile.id == 'sarah-chen');
  final raj = seedProfiles.firstWhere((profile) => profile.id == 'raj-patel');
  final mei = seedProfiles.firstWhere((profile) => profile.id == 'mei-lin');

  return [
    ChatThread(
      id: sarah.id,
      participant: sarah,
      unreadCount: 0,
      messages: [
        Message(id: 's1', senderId: 'me', text: 'Hey Sarah, could you review my FinTech MVP roadmap?', timestamp: now.subtract(const Duration(hours: 2)), isRead: true),
        Message(id: 's2', senderId: sarah.id, text: 'Want to hop on a quick call next week?', timestamp: now.subtract(const Duration(minutes: 2))),
      ],
    ),
    ChatThread(
      id: raj.id,
      participant: raj,
      unreadCount: 0,
      messages: [
        Message(id: 'r1', senderId: raj.id, text: 'I can send a starter repo if you want.', timestamp: now.subtract(const Duration(hours: 1))),
      ],
    ),
    ChatThread(
      id: mei.id,
      participant: mei,
      unreadCount: 1,
      messages: [
        Message(id: 'm1', senderId: mei.id, text: 'Can you review my resume this week?', timestamp: now.subtract(const Duration(days: 1))),
      ],
    ),
  ];
}

BrandRole roleFromId(String role) {
  final normalized = role.toLowerCase();
  if (normalized == 'pro' || normalized == 'professional') return BrandRole.pro;
  if (normalized == 'org' || normalized == 'organization') return BrandRole.org;
  return BrandRole.student;
}
