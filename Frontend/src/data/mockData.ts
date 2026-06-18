// Types
export interface Founder {
  id: string;
  name: string;
  title: string;
  company: string;
  location: string;
  avatar: string;
  bio: string;
  skills: string[];
  lookingFor: string[];
  availability: 'open' | 'busy' | 'mentoring';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
  attendees: number;
  host: string;
  hostRole: string;
  tags: string[];
  type: 'workshop' | 'networking' | 'talk' | 'panel';
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar: string;
  quote: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

// Keep existing data exports for backward compatibility
export const founders: Founder[] = [
  {
    id: 'f1',
    name: 'Aisha Kapoor',
    title: 'Co-Founder & CEO',
    company: 'Neuralink AI',
    location: 'San Francisco, CA',
    avatar: '',
    bio: 'Building the next generation of AI-powered developer tools. Previously led ML infra at Stripe.',
    skills: ['AI/ML', 'Python', 'Go', 'Product Strategy', 'Fundraising'],
    lookingFor: ['Technical Co-founder', 'Angel Investors', 'ML Engineers'],
    availability: 'open',
  },
  {
    id: 'f2',
    name: 'Marcus Chen',
    title: 'Founder & CTO',
    company: 'StreamVerse',
    location: 'Austin, TX',
    avatar: '',
    bio: 'Real-time streaming infrastructure for interactive experiences. Ex-Twitch infrastructure team.',
    skills: ['Rust', 'Distributed Systems', 'WebRTC', 'Kubernetes', 'System Design'],
    lookingFor: ['Co-founder (Biz)', 'Design Partner', 'Series A Lead'],
    availability: 'mentoring',
  },
  {
    id: 'f3',
    name: 'Priya Patel',
    title: 'CEO',
    company: 'GreenGrid Analytics',
    location: 'Denver, CO',
    avatar: '',
    bio: 'Climate tech startup helping enterprises measure and reduce their carbon footprint with ML.',
    skills: ['Climate Tech', 'Data Science', 'SaaS', 'Public Policy', 'JavaScript'],
    lookingFor: ['Enterprise Pilot Customers', 'CTO', 'Climate Investors'],
    availability: 'open',
  },
  {
    id: 'f4',
    name: 'James Okonkwo',
    title: 'Founder',
    company: 'AfriConnect',
    location: 'Lagos, Nigeria',
    avatar: '',
    bio: 'Building the largest B2B marketplace for African artisans and global retailers.',
    skills: ['Marketplace', 'Supply Chain', 'React', 'Node.js', 'BD'],
    lookingFor: ['US-based Co-founder', 'Impact Investors', 'Supply Chain Lead'],
    availability: 'open',
  },
  {
    id: 'f5',
    name: 'Elena Vasquez',
    title: 'Co-Founder & CPO',
    company: 'HealthBridge',
    location: 'New York, NY',
    avatar: '',
    bio: 'Telehealth platform connecting underserved communities with specialist doctors. YC S23.',
    skills: ['Product Design', 'Healthcare', 'React Native', 'User Research', 'Growth'],
    lookingFor: ['Engineering Lead', 'Hospital Partners', 'Series A Investors'],
    availability: 'mentoring',
  },
  {
    id: 'f6',
    name: 'Raj Singh',
    title: 'Founder & CEO',
    company: 'DevLore',
    location: 'Bangalore, India',
    avatar: '',
    bio: 'AI-driven code review platform used by 500+ engineering teams. Profit since month 8.',
    skills: ['DevTools', 'NLP', 'TypeScript', 'Developer Relations', 'Bootstrapping'],
    lookingFor: ['US Market Lead', 'Strategic Partners', 'Senior Engineers'],
    availability: 'open',
  },
];

export const events: Event[] = [
  {
    id: 'e1',
    title: 'Founder AMA: Fundraising in 2026',
    date: 'Jun 12, 2026',
    time: '12:00 PM EST',
    description: 'Live Q&A with VCs who have deployed over $200M in seed-stage SaaS this year.',
    attendees: 342,
    host: 'Sarah Blumenthal',
    hostRole: 'Partner, Collective Ventures',
    tags: ['Fundraising', 'SaaS', 'Seed Stage'],
    type: 'talk',
  },
  {
    id: 'e2',
    title: 'Building AI-Native Products',
    date: 'Jun 18, 2026',
    time: '2:00 PM EST',
    description: 'Hands-on workshop on integrating LLMs into production applications.',
    attendees: 189,
    host: 'David Park',
    hostRole: 'AI Lead, Vercel',
    tags: ['AI/ML', 'LLMs', 'Workshop'],
    type: 'workshop',
  },
  {
    id: 'e3',
    title: 'Remote Founder Mixer',
    date: 'Jun 24, 2026',
    time: '7:00 PM EST',
    description: 'Speed networking for distributed startup teams. Meet your next co-founder or advisor.',
    attendees: 521,
    host: 'SkillSynth Community',
    hostRole: 'Events Team',
    tags: ['Networking', 'Remote', 'Co-founder Matching'],
    type: 'networking',
  },
  {
    id: 'e4',
    title: 'Hiring & Culture in Early-Stage Startups',
    date: 'Jul 2, 2026',
    time: '1:00 PM EST',
    description: 'Panel discussion with founders who scaled from 2 to 50+ employees.',
    attendees: 267,
    host: 'Maya Torres',
    hostRole: 'CEO, CultureFirst',
    tags: ['Hiring', 'Culture', 'Scaling'],
    type: 'panel',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Tom Greer',
    title: 'Founder & CEO',
    company: 'Ping Studio',
    avatar: '',
    quote: 'SkillSynth connected me with my technical co-founder within two weeks. The skill-matching algorithm is uncanny.',
  },
  {
    id: 't2',
    name: 'Lina Zhou',
    title: 'CTO',
    company: 'Botanica AI',
    avatar: '',
    quote: "I've mentored a dozen founders through SkillSynth this year. The platform makes it effortless to find founders who are actually ready for mentorship.",
  },
  {
    id: 't3',
    name: 'Carlos Mendez',
    title: 'Angel Investor',
    company: 'Mendez Capital',
    avatar: '',
    quote: 'As an investor, SkillSynth has become my deal-flow source. The quality of founders and the transparency of their profiles saves me weeks of screening.',
  },
];

export const features: Feature[] = [
  {
    id: 'g1',
    icon: 'Users',
    title: 'Founder Matching',
    description: 'Smart compatibility engine pairs you with co-founders, mentors, and team members whose skills and vision align with yours.',
  },
  {
    id: 'g2',
    icon: 'Calendar',
    title: 'Mentorship Booking',
    description: 'Browse experienced operators and book 1:1 sessions directly. Calendly-style scheduling built right in.',
  },
  {
    id: 'g3',
    icon: 'Sparkles',
    title: 'Skill Synergy',
    description: 'Upload your stack and we surface complementary skill gaps you need to fill — with people who fill them.',
  },
  {
    id: 'g4',
    icon: 'MessageSquare',
    title: 'Founder DMs',
    description: 'Private messaging workspace designed for async founder conversations. Share decks, code snippets, and feedback.',
  },
  {
    id: 'g5',
    icon: 'MapPin',
    title: 'Event Discovery',
    description: 'Curated events — virtual and IRL — from pitch nights to technical deep-dives. RSVP and meet the community.',
  },
  {
    id: 'g6',
    icon: 'GitBranch',
    title: 'Profile README',
    description: 'Markdown-powered founder profiles with embedded GitHub stats, pitch decks, and live demo links.',
  },
];

// ============ NEW MOCK DATA FOR FULL APPLICATION ============

import type {
  AuthUser,
  Profile,
  DiscoveryProfile,
  Conversation,
  Message,
  Mentor,
  Booking,
  AppEvent,
  AppNotification,
  DashboardAnalytics,
  UserRole,
} from '../types';

export const mockUsers: AuthUser[] = [
  { id: 'u1', email: 'admin123@gmail.com', name: 'Alex Johnson', role: 'admin' as UserRole, avatar: '' },
  { id: 'u2', email: 'sarah@example.com', name: 'Sarah Chen', role: 'professional' as UserRole, avatar: '' },
  { id: 'u3', email: 'mike@example.com', name: 'Mike Torres', role: 'student' as UserRole, avatar: '' },
  { id: 'u4', email: 'emma@example.com', name: 'Emma Wilson', role: 'professional' as UserRole, avatar: '' },
  { id: 'u5', email: 'james@example.com', name: 'James Park', role: 'student' as UserRole, avatar: '' },
];

export const mockProfiles: Record<string, Profile> = {
  u1: {
    id: 'p1',
    userId: 'u1',
    name: 'Alex Johnson',
    role: 'Admin',
    title: 'Platform Administrator',
    company: 'Tinder For Nerds',
    location: 'San Francisco, CA',
    avatar: '',
    bio: 'Building the future of professional networking. Passionate about connecting talent with opportunity.',
    skills: ['Product Management', 'Leadership', 'Strategy', 'Full-Stack Development'],
    interests: ['AI/ML', 'EdTech', 'Startups', 'Mentorship'],
    lookingFor: ['Beta Testers', 'Partners', 'Feedback'],
    experience: 8,
    rating: 4.8,
    reviews: [],
    stats: { views: 0, matches: 0, bookings: 0, connections: 0 },
    availability: 'open',
    education: 'Stanford University',
  },
  u2: {
    id: 'p2',
    userId: 'u2',
    name: 'Sarah Chen',
    role: 'Professional',
    title: 'Senior Product Designer',
    company: 'DesignLabs Inc.',
    location: 'New York, NY',
    avatar: '',
    bio: 'Designing products that make a difference. 7+ years in UX/UI design for B2B SaaS platforms.',
    skills: ['Product Design', 'UX Research', 'Figma', 'Design Systems', 'Prototyping'],
    interests: ['Design', 'Tech', 'Art', 'Photography'],
    lookingFor: ['Mentorship', 'Networking', 'Job Opportunities'],
    experience: 7,
    rating: 4.6,
    reviews: [
      { id: 'r1', userId: 'u3', userName: 'Mike Torres', rating: 5, text: 'Amazing mentor! Helped me restructure my portfolio.', date: '2026-05-20' },
      { id: 'r2', userId: 'u5', userName: 'James Park', rating: 4, text: 'Great insights on design systems.', date: '2026-05-15' },
    ],
    stats: { views: 245, matches: 18, bookings: 12, connections: 89 },
    availability: 'mentoring',
    projects: [
      { id: 'pr1', title: 'SaaS Dashboard Redesign', description: 'Complete redesign of analytics dashboard improving user engagement by 40%', technologies: ['Figma', 'React', 'D3.js'], link: 'https://example.com/project1' },
      { id: 'pr2', title: 'Design System Kit', description: 'Comprehensive design system with 200+ components', technologies: ['Figma', 'Storybook', 'CSS'], link: 'https://example.com/project2' },
    ],
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/sarahchen' },
      { platform: 'twitter', url: 'https://twitter.com/sarahchen' },
    ],
  },
  u3: {
    id: 'p3',
    userId: 'u3',
    name: 'Mike Torres',
    role: 'Student',
    title: 'CS Student',
    company: 'MIT',
    location: 'Boston, MA',
    avatar: '',
    bio: 'Computer Science student passionate about machine learning and full-stack development.',
    skills: ['Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning'],
    interests: ['AI/ML', 'Open Source', 'Hackathons', 'Gaming'],
    lookingFor: ['Internships', 'Mentorship', 'Study Groups'],
    experience: 2,
    rating: 4.2,
    reviews: [
      { id: 'r3', userId: 'u2', userName: 'Sarah Chen', rating: 5, text: 'Quick learner, great attitude!', date: '2026-05-10' },
    ],
    stats: { views: 120, matches: 8, bookings: 5, connections: 34 },
    availability: 'open',
    education: 'MIT, B.S. Computer Science',
    projects: [
      { id: 'pr3', title: 'AI Study Buddy', description: 'An AI-powered study companion using GPT-4', technologies: ['Python', 'FastAPI', 'React', 'OpenAI'], link: 'https://github.com/miketorres/ai-study-buddy' },
    ],
  },
  u4: {
    id: 'p4',
    userId: 'u4',
    name: 'Emma Wilson',
    role: 'Professional',
    title: 'Engineering Manager',
    company: 'TechCorp',
    location: 'Seattle, WA',
    avatar: '',
    bio: 'Engineering leader with 10+ years building scalable distributed systems. Previously at Amazon and Microsoft.',
    skills: ['System Design', 'Kubernetes', 'Go', 'Java', 'Team Leadership'],
    interests: ['Distributed Systems', 'Cloud Computing', 'Hiking', 'Reading'],
    lookingFor: ['Speaking Opportunities', 'Mentoring', 'Consulting'],
    experience: 12,
    rating: 4.9,
    reviews: [
      { id: 'r4', userId: 'u3', userName: 'Mike Torres', rating: 5, text: 'Best engineering mentor I have ever had!', date: '2026-04-28' },
    ],
    stats: { views: 456, matches: 32, bookings: 25, connections: 210 },
    availability: 'mentoring',
    projects: [
      { id: 'pr4', title: 'Distributed Cache System', description: 'High-performance caching layer handling 1M+ req/s', technologies: ['Go', 'Redis', 'Kubernetes', 'gRPC'] },
    ],
    socialLinks: [
      { platform: 'linkedin', url: 'https://linkedin.com/in/emmawilson' },
      { platform: 'github', url: 'https://github.com/emmawilson' },
    ],
  },
  u5: {
    id: 'p5',
    userId: 'u5',
    name: 'James Park',
    role: 'Student',
    title: 'Graduate Student',
    company: 'UC Berkeley',
    location: 'Berkeley, CA',
    avatar: '',
    bio: 'M.S. Data Science student. Research focus on NLP and recommendation systems.',
    skills: ['Python', 'R', 'TensorFlow', 'SQL', 'Data Visualization'],
    interests: ['Data Science', 'NLP', 'Music', 'Chess'],
    lookingFor: ['Research Collaboration', 'Internships', 'Mentorship'],
    experience: 1,
    rating: 4.0,
    reviews: [],
    stats: { views: 67, matches: 5, bookings: 3, connections: 22 },
    availability: 'open',
    education: 'UC Berkeley, M.S. Data Science',
  },
};

export const mockDiscoveryProfiles: DiscoveryProfile[] = [
  { id: 'd1', name: 'Sophia Williams', role: 'Professional', title: 'ML Engineer', company: 'Google AI', location: 'Mountain View, CA', avatar: '', bio: 'Working on large language models and AI safety research.', skills: ['Machine Learning', 'Python', 'TensorFlow', 'NLP'], interests: ['AI/ML', 'Research', 'Chess'], matchScore: 92, availability: 'open' },
  { id: 'd2', name: 'Daniel Kim', role: 'Student', title: 'PhD Candidate', company: 'Stanford', location: 'Stanford, CA', avatar: '', bio: 'PhD in Computer Vision. Looking for industry collaboration.', skills: ['Computer Vision', 'PyTorch', 'C++', 'Mathematics'], interests: ['AI/ML', 'Photography', 'Travel'], matchScore: 88, availability: 'mentoring' },
  { id: 'd3', name: 'Olivia Martinez', role: 'Professional', title: 'Product Manager', company: 'Stripe', location: 'San Francisco, CA', avatar: '', bio: 'Building fintech products for the next billion users.', skills: ['Product Strategy', 'Fintech', 'Analytics', 'User Research'], interests: ['Fintech', 'Yoga', 'Cooking'], matchScore: 75, availability: 'open' },
  { id: 'd4', name: 'Noah Brown', role: 'Professional', title: 'DevOps Lead', company: 'Netflix', location: 'Los Angeles, CA', avatar: '', bio: 'Infrastructure and reliability engineering at scale.', skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'], interests: ['Cloud', 'Gaming', 'Music'], matchScore: 70, availability: 'busy' },
  { id: 'd5', name: 'Ava Taylor', role: 'Student', title: 'Undergraduate Researcher', company: 'Carnegie Mellon', location: 'Pittsburgh, PA', avatar: '', bio: 'Researching human-computer interaction and accessibility.', skills: ['UI/UX', 'JavaScript', 'Python', 'Research Methods'], interests: ['Design', 'Accessibility', 'Art'], matchScore: 85, availability: 'open' },
  { id: 'd6', name: 'Liam Anderson', role: 'Professional', title: 'CTO', company: 'DataFlow Systems', location: 'Austin, TX', avatar: '', bio: 'Built data infrastructure used by 500+ enterprises.', skills: ['Data Engineering', 'Apache Spark', 'Go', 'Architecture'], interests: ['Big Data', 'Startups', 'Running'], matchScore: 65, availability: 'mentoring' },
  { id: 'd7', name: 'Isabella Garcia', role: 'Professional', title: 'Marketing Director', company: 'HubSpot', location: 'Denver, CO', avatar: '', bio: 'Growth marketing and brand strategy for B2B SaaS.', skills: ['Growth Marketing', 'SEO', 'Content Strategy', 'Analytics'], interests: ['Marketing', 'SaaS', 'Hiking'], matchScore: 60, availability: 'open' },
  { id: 'd8', name: 'Ethan Lee', role: 'Student', title: 'Bootcamp Grad', company: 'Freelance', location: 'Chicago, IL', avatar: '', bio: 'Full-stack developer seeking first role in tech.', skills: ['React', 'Node.js', 'MongoDB', 'CSS'], interests: ['Web Dev', 'Open Source', 'Basketball'], matchScore: 78, availability: 'open' },
  { id: 'd9', name: 'Mia Robinson', role: 'Professional', title: 'Data Scientist', company: 'Spotify', location: 'New York, NY', avatar: '', bio: 'Personalization algorithms for 400M+ users.', skills: ['Python', 'SQL', 'A/B Testing', 'Statistics'], interests: ['Music', 'Data Science', 'Travel'], matchScore: 82, availability: 'open' },
  { id: 'd10', name: 'Lucas White', role: 'Professional', title: 'Tech Lead', company: 'Meta', location: 'Menlo Park, CA', avatar: '', bio: 'Leading mobile infrastructure team. Ex-Instagram.', skills: ['Mobile Dev', 'Kotlin', 'Swift', 'System Design'], interests: ['Mobile', 'Photography', 'Coffee'], matchScore: 55, availability: 'busy' },
];

export const mockConversations: Conversation[] = [
  { id: 'c1', participants: ['u1', 'u2'], unreadCount: 2, updatedAt: '2026-06-05T10:30:00Z' },
  { id: 'c2', participants: ['u1', 'u3'], unreadCount: 0, updatedAt: '2026-06-04T15:20:00Z' },
  { id: 'c3', participants: ['u1', 'u4'], unreadCount: 1, updatedAt: '2026-06-05T09:00:00Z' },
  { id: 'c4', participants: ['u1', 'u5'], unreadCount: 0, updatedAt: '2026-06-03T11:45:00Z' },
];

export const mockMessages: Record<string, Message[]> = {
  c1: [
    { id: 'm1', conversationId: 'c1', senderId: 'u2', text: 'Hey Alex! I saw your profile and would love to connect.', timestamp: '2026-06-05T10:00:00Z', read: true },
    { id: 'm2', conversationId: 'c1', senderId: 'u1', text: 'Hi Sarah! Thanks for reaching out. I checked your work too — impressive portfolio!', timestamp: '2026-06-05T10:05:00Z', read: true },
    { id: 'm3', conversationId: 'c1', senderId: 'u2', text: 'Thank you! I was wondering if you have time for a coffee chat this week?', timestamp: '2026-06-05T10:15:00Z', read: true },
    { id: 'm4', conversationId: 'c1', senderId: 'u1', text: 'Absolutely! How does Thursday afternoon sound?', timestamp: '2026-06-05T10:20:00Z', read: false },
    { id: 'm5', conversationId: 'c1', senderId: 'u2', text: 'Thursday works great! How about 2pm?', timestamp: '2026-06-05T10:30:00Z', read: false },
  ],
  c2: [
    { id: 'm6', conversationId: 'c2', senderId: 'u1', text: 'Hey Mike, great connecting at the event last week!', timestamp: '2026-06-04T14:00:00Z', read: true },
    { id: 'm7', conversationId: 'c2', senderId: 'u3', text: 'Yeah, it was awesome! Loved your talk on platform building.', timestamp: '2026-06-04T14:30:00Z', read: true },
    { id: 'm8', conversationId: 'c2', senderId: 'u1', text: 'Thanks! Let me know if you want to discuss the internship opportunity.', timestamp: '2026-06-04T15:20:00Z', read: true },
  ],
  c3: [
    { id: 'm9', conversationId: 'c3', senderId: 'u4', text: 'Hi Alex, I am interested in being a mentor on the platform.', timestamp: '2026-06-05T08:30:00Z', read: true },
    { id: 'm10', conversationId: 'c3', senderId: 'u1', text: 'That is great news Emma! We would love to have you.', timestamp: '2026-06-05T08:45:00Z', read: true },
    { id: 'm11', conversationId: 'c3', senderId: 'u4', text: 'I have availability for mock interviews and mentorship sessions.', timestamp: '2026-06-05T09:00:00Z', read: false },
  ],
  c4: [
    { id: 'm12', conversationId: 'c4', senderId: 'u5', text: 'Hello! I am interested in the data science mentorship program.', timestamp: '2026-06-03T11:00:00Z', read: true },
    { id: 'm13', conversationId: 'c4', senderId: 'u1', text: 'Hi James! We have several mentors who specialize in data science.', timestamp: '2026-06-03T11:30:00Z', read: true },
    { id: 'm14', conversationId: 'c4', senderId: 'u5', text: 'Can you introduce me to someone working in NLP?', timestamp: '2026-06-03T11:45:00Z', read: true },
  ],
};

export const mockMentors: Mentor[] = [
  { id: 'm1', name: 'Emma Wilson', title: 'Engineering Manager', company: 'TechCorp', avatar: '', rating: 4.9, experience: 12, price: 150, availability: ['Mon', 'Wed', 'Fri'], sessionTypes: ['mentorship', 'mock_interview', 'resume_review'], bio: 'Engineering leader with experience at Amazon and Microsoft.', skills: ['System Design', 'Kubernetes', 'Go', 'Leadership'] },
  { id: 'm2', name: 'Sarah Chen', title: 'Senior Product Designer', company: 'DesignLabs Inc.', avatar: '', rating: 4.6, experience: 7, price: 120, availability: ['Tue', 'Thu', 'Sat'], sessionTypes: ['coffee_chat', 'mentorship', 'resume_review'], bio: 'Designing products that make a difference. 7+ years in UX/UI.', skills: ['Product Design', 'UX Research', 'Figma', 'Design Systems'] },
  { id: 'm3', name: 'Daniel Kim', title: 'PhD Candidate', company: 'Stanford', avatar: '', rating: 4.5, experience: 4, price: 80, availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], sessionTypes: ['coffee_chat', 'mentorship'], bio: 'PhD in Computer Vision. Happy to discuss grad school and research.', skills: ['Computer Vision', 'PyTorch', 'C++', 'Research'] },
  { id: 'm4', name: 'Liam Anderson', title: 'CTO', company: 'DataFlow Systems', avatar: '', rating: 4.8, experience: 15, price: 200, availability: ['Wed', 'Fri'], sessionTypes: ['mentorship', 'mock_interview', 'webinar'], bio: 'Built data infrastructure used by 500+ enterprises.', skills: ['Data Engineering', 'Apache Spark', 'Go', 'Architecture'] },
  { id: 'm5', name: 'Sophia Williams', title: 'ML Engineer', company: 'Google AI', avatar: '', rating: 4.7, experience: 6, price: 130, availability: ['Tue', 'Thu'], sessionTypes: ['coffee_chat', 'mentorship', 'mock_interview'], bio: 'Working on large language models and AI safety research.', skills: ['Machine Learning', 'Python', 'TensorFlow', 'NLP'] },
  { id: 'm6', name: 'Mia Robinson', title: 'Data Scientist', company: 'Spotify', avatar: '', rating: 4.4, experience: 5, price: 100, availability: ['Mon', 'Wed', 'Fri'], sessionTypes: ['coffee_chat', 'mentorship', 'resume_review'], bio: 'Personalization algorithms for 400M+ users.', skills: ['Python', 'SQL', 'A/B Testing', 'Statistics'] },
];

export const mockBookings: Booking[] = [
  { id: 'b1', mentorId: 'm1', userId: 'u1', sessionType: 'mentorship', date: '2026-06-10', time: '14:00', duration: 60, price: 150, status: 'confirmed', createdAt: '2026-06-05T10:00:00Z' },
  { id: 'b2', mentorId: 'm2', userId: 'u1', sessionType: 'coffee_chat', date: '2026-06-12', time: '11:00', duration: 30, price: 0, status: 'pending', createdAt: '2026-06-05T12:00:00Z' },
  { id: 'b3', mentorId: 'm5', userId: 'u1', sessionType: 'mock_interview', date: '2026-06-08', time: '16:00', duration: 60, price: 130, status: 'confirmed', createdAt: '2026-06-01T09:00:00Z' },
];

export const mockAppEvents: AppEvent[] = [
  { id: 'ev1', title: 'AI Hackathon 2026', description: 'Build something amazing with AI in 48 hours. Prizes worth $10,000!', date: '2026-07-15', time: '09:00', location: 'San Francisco, CA', type: 'hackathon', mode: 'offline', capacity: 200, attendees: 156, host: 'Tinder For Nerds', hostRole: 'Platform', tags: ['AI', 'Hackathon', 'ML'], status: 'approved' },
  { id: 'ev2', title: 'Product Design Workshop', description: 'Learn design thinking and prototyping from industry experts.', date: '2026-06-20', time: '14:00', location: 'Online', type: 'workshop', mode: 'online', capacity: 100, attendees: 78, host: 'Sarah Chen', hostRole: 'Senior Product Designer', tags: ['Design', 'Workshop', 'Figma'], status: 'approved' },
  { id: 'ev3', title: 'Tech Talk: Scaling Microservices', description: 'Learn how Netflix scales its microservices architecture.', date: '2026-06-25', time: '18:00', location: 'Online', type: 'talk', mode: 'online', capacity: 500, attendees: 234, host: 'Noah Brown', hostRole: 'DevOps Lead, Netflix', tags: ['Microservices', 'DevOps', 'Scaling'], status: 'approved' },
  { id: 'ev4', title: 'Networking Mixer - SF Bay Area', description: 'Connect with professionals in the Bay Area tech scene.', date: '2026-07-01', time: '19:00', location: 'San Francisco, CA', type: 'networking', mode: 'offline', capacity: 150, attendees: 89, host: 'Tinder For Nerds', hostRole: 'Events Team', tags: ['Networking', 'Bay Area'], status: 'approved' },
  { id: 'ev5', title: 'Data Science Webinar: NLP Trends', description: 'Latest trends in natural language processing and LLMs.', date: '2026-06-28', time: '15:00', location: 'Online', type: 'webinar', mode: 'online', capacity: 300, attendees: 145, host: 'Mia Robinson', hostRole: 'Data Scientist, Spotify', tags: ['Data Science', 'NLP', 'Webinar'], status: 'pending' },
  { id: 'ev6', title: 'Startup Pitch Night', description: 'Early-stage startups pitch to a panel of investors.', date: '2026-07-10', time: '18:30', location: 'Austin, TX', type: 'talk', mode: 'offline', capacity: 100, attendees: 67, host: 'Liam Anderson', hostRole: 'CTO, DataFlow Systems', tags: ['Startups', 'Pitching', 'Investors'], status: 'approved' },
];

export const mockNotifications: AppNotification[] = [
  { id: 'n1', userId: 'u1', type: 'match', title: 'New Match!', description: 'You matched with Sophia Williams. Send a message to start the conversation!', read: false, createdAt: '2026-06-05T11:00:00Z', link: '/messages' },
  { id: 'n2', userId: 'u1', type: 'message', title: 'New Message', description: 'Sarah Chen sent you a message.', read: false, createdAt: '2026-06-05T10:30:00Z', link: '/messages' },
  { id: 'n3', userId: 'u1', type: 'booking', title: 'Booking Confirmed', description: 'Your mock interview session with Sophia Williams is confirmed for June 8th.', read: true, createdAt: '2026-06-04T16:00:00Z', link: '/sessions' },
  { id: 'n4', userId: 'u1', type: 'event', title: 'Event Reminder', description: 'AI Hackathon 2026 starts in 3 days!', read: false, createdAt: '2026-06-05T09:00:00Z', link: '/events' },
  { id: 'n5', userId: 'u1', type: 'session', title: 'Session Completed', description: 'Your mentorship session with Emma Wilson was completed. Leave a review!', read: true, createdAt: '2026-06-03T14:00:00Z', link: '/sessions' },
  { id: 'n6', userId: 'u1', type: 'match', title: 'New Match!', description: 'You matched with Daniel Kim. You share 88% compatibility!', read: false, createdAt: '2026-06-05T08:00:00Z', link: '/messages' },
];

export const mockDashboardData: DashboardAnalytics = {
  profileViews: 1456,
  matches: 89,
  bookings: 34,
  rating: 4.7,
  matchGrowth: [
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 18 },
    { month: 'Mar', count: 25 },
    { month: 'Apr', count: 22 },
    { month: 'May', count: 30 },
    { month: 'Jun', count: 35 },
  ],
  sessionRevenue: [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1800 },
    { month: 'Mar', revenue: 2400 },
    { month: 'Apr', revenue: 2000 },
    { month: 'May', revenue: 3200 },
    { month: 'Jun', revenue: 3800 },
  ],
  profileVisits: [
    { month: 'Jan', visits: 200 },
    { month: 'Feb', visits: 350 },
    { month: 'Mar', visits: 420 },
    { month: 'Apr', visits: 380 },
    { month: 'May', visits: 520 },
    { month: 'Jun', visits: 600 },
  ],
};

export const allUsers = [
  { id: 'u1', name: 'Alex Johnson', email: 'admin123@gmail.com', role: 'admin' as const, status: 'active' as const, joined: '2026-01-15', reports: 0 },
  { id: 'u2', name: 'Sarah Chen', email: 'sarah@example.com', role: 'professional' as const, status: 'active' as const, joined: '2026-02-20', reports: 0 },
  { id: 'u3', name: 'Mike Torres', email: 'mike@example.com', role: 'student' as const, status: 'active' as const, joined: '2026-03-10', reports: 1 },
  { id: 'u4', name: 'Emma Wilson', email: 'emma@example.com', role: 'professional' as const, status: 'active' as const, joined: '2026-01-05', reports: 0 },
  { id: 'u5', name: 'James Park', email: 'james@example.com', role: 'student' as const, status: 'suspended' as const, joined: '2026-04-01', reports: 3 },
  { id: 'u6', name: 'Sophia Williams', email: 'sophia@example.com', role: 'professional' as const, status: 'active' as const, joined: '2026-02-14', reports: 0 },
  { id: 'u7', name: 'Daniel Kim', email: 'daniel@example.com', role: 'student' as const, status: 'active' as const, joined: '2026-03-22', reports: 0 },
  { id: 'u8', name: 'Olivia Martinez', email: 'olivia@example.com', role: 'professional' as const, status: 'active' as const, joined: '2026-01-30', reports: 1 },
];

export const adminNotifications = [
  { id: 'an1', type: 'event_approval' as const, title: 'Event Approval Needed', description: 'Data Science Webinar: NLP Trends requires approval.', date: '2026-06-05T10:00:00Z' },
  { id: 'an2', type: 'report' as const, title: 'User Reported', description: 'James Park has been reported 3 times for spam.', date: '2026-06-04T15:30:00Z' },
  { id: 'an3', type: 'new_user' as const, title: 'New User Registered', description: 'Olivia Martinez joined as a Professional.', date: '2026-06-03T09:20:00Z' },
];
