export type UserRole = 'student' | 'professional' | 'admin';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Profile {
  id: string;
  userId: string;
  name: string;
  role: string;
  title?: string;
  company?: string;
  location: string;
  avatar?: string;
  bio: string;
  skills: string[];
  interests: string[];
  lookingFor: string[];
  experience: number;
  rating: number;
  reviews: Review[];
  stats: ProfileStats;
  availability: 'open' | 'busy' | 'mentoring';
  education?: string;
  projects?: Project[];
  socialLinks?: SocialLink[];
}

export interface ProfileStats {
  views: number;
  matches: number;
  bookings: number;
  connections: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  date: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  technologies: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface DiscoveryProfile {
  id: string;
  name: string;
  role: string;
  title?: string;
  company?: string;
  location: string;
  avatar?: string;
  bio: string;
  skills: string[];
  interests: string[];
  matchScore: number;
  availability: 'open' | 'busy' | 'mentoring';
}

export interface MatchAction {
  type: 'like' | 'pass' | 'superlike';
  userId: string;
  timestamp: string;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  matchedAt: string;
  mutual: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  type?: 'text' | 'session_request' | 'session_confirmed';
  sessionData?: SessionRequest;
}

export interface SessionRequest {
  sessionType: SessionType;
  date: string;
  time: string;
  duration: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export type SessionType = 'coffee_chat' | 'mentorship' | 'resume_review' | 'mock_interview' | 'webinar';

export interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
  rating: number;
  experience: number;
  price: number;
  availability: string[];
  sessionTypes: SessionType[];
  bio: string;
  skills: string[];
}

export interface Booking {
  id: string;
  mentorId: string;
  userId: string;
  sessionType: SessionType;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface AppEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location?: string;
  type: EventType;
  mode: 'online' | 'offline';
  banner?: string;
  capacity: number;
  attendees: number;
  host: string;
  hostRole: string;
  tags: string[];
  status: 'pending' | 'approved' | 'rejected';
  price?: number;
}

export type EventType = 'hackathon' | 'talk' | 'webinar' | 'workshop' | 'networking' | 'panel';

export interface AppNotification {
  id: string;
  userId: string;
  type: 'match' | 'message' | 'booking' | 'event' | 'session';
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface DashboardAnalytics {
  profileViews: number;
  matches: number;
  bookings: number;
  rating: number;
  matchGrowth: { month: string; count: number }[];
  sessionRevenue: { month: string; revenue: number }[];
  profileVisits: { month: string; visits: number }[];
}

export interface SettingsData {
  account: {
    name: string;
    email: string;
    avatar?: string;
  };
  privacy: {
    showProfile: boolean;
    showOnlineStatus: boolean;
    showLocation: boolean;
  };
  notifications: {
    matches: boolean;
    messages: boolean;
    bookings: boolean;
    events: boolean;
    marketing: boolean;
  };
  discovery: {
    location: string;
    radius: number;
    ageRange: [number, number];
    intent: string[];
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: number;
  };
}
