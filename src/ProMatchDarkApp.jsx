import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { InstagramReelsFeed } from './components/common';
import {
  LoginPage,
  FeedPage,
  ProfilePage,
  MessagesPage,
  ConnectionsPage,
  CalendarPage,
  SettingsPage,
  NotificationsPage,
  AnalyticsPage,
  LandingPage,
  FeaturesPage,
  AboutPage,
  ContactPage,
} from './components/pages';
import './styles/promatch-dark.css';
import './styles/instagram-feed.css';
import './styles/messages.css';
import './styles/premium-messages.css';
import './styles/login.css';
import './styles/feed.css';
import './styles/profile.css';
import './styles/connections.css';
import './styles/calendar.css';
import './styles/settings.css';
import './styles/notifications.css';
import './styles/analytics.css';
import './styles/landing.css';
import './styles/features.css';
import './styles/about.css';
import './styles/contact.css';


const publicNav = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#process' },
  { label: 'For teams', href: '#teams' },
  { label: 'Pricing', href: '#pricing' },
];

const landingFeatures = [
  {
    icon: 'spark',
    eyebrow: 'AI Match',
    title: 'Rank by skills, domain, intent, and working style.',
    body: 'Embedding-aware signals keep the feed relevant as the network grows and the profile data gets richer.',
  },
  {
    icon: 'messages',
    eyebrow: 'Real-time Chat',
    title: 'Keep momentum high the moment a match lands.',
    body: 'Presence, typing states, and fast booking actions turn interest into a real conversation without friction.',
  },
  {
    icon: 'calendar',
    eyebrow: '1:1 Calls',
    title: 'Move from discovery to a scheduled call in one flow.',
    body: 'Availability, reminders, and notes live inside the product so people can actually follow through.',
  },
];

const landingSteps = [
  {
    step: '01',
    title: 'Sign up',
    body: 'OAuth in 30 seconds, then use onboarding to shape the first recommendations.',
  },
  {
    step: '02',
    title: 'Build profile',
    body: 'Add skills, domain, intent, commitment, and a short bio so the feed has real context.',
  },
  {
    step: '03',
    title: 'Discover',
    body: 'AI-ranked cards show the fit signals that matter most and keep the deck scannable.',
  },
  {
    step: '04',
    title: 'Connect',
    body: 'Open chat, book a call, or jump into an event while the match is still fresh.',
  },
];

const landingTestimonials = [
  {
    quote: 'It feels like a premium recruiting tool instead of another noisy social app.',
    name: 'Maya Chen',
    role: 'Founder',
  },
  {
    quote: 'The hierarchy is sharp, the feed is clear, and the matching story is easy to trust.',
    name: 'Andre Patel',
    role: 'Product Lead',
  },
  {
    quote: 'Every state feels deliberate. The UI does not waste attention.',
    name: 'Jordan Lee',
    role: 'Design Lead',
  },
];

const landingStats = [
  { value: '2,400+', label: 'Builders' },
  { value: '38', label: 'Cities' },
  { value: '91%', label: 'Match rate' },
  { value: '4.9/5', label: 'Rating' },
];

const pricingPlans = [
  {
    label: 'Free',
    price: '$0',
    body: 'Discover people, send messages, book a few calls, and join community events.',
  },
  {
    label: 'Pro',
    price: '$12/mo',
    body: 'Priority search, analytics, company profile, and richer pipeline management for serious operators.',
    featured: true,
  },
];

const onboardingSteps = [
  { id: 'step-1', label: 'Basic info' },
  { id: 'step-2', label: 'Skills and domain' },
  { id: 'step-3', label: 'Intent and goals' },
  { id: 'step-4', label: 'Preferences' },
];

const skillTags = ['React', 'Python', 'Product', 'Design', 'Sales', 'ML', 'System Design', 'Marketing', 'No-code', 'Research'];
const domainTags = ['FinTech', 'EdTech', 'HealthTech', 'DeepTech', 'Climate', 'E-commerce', 'SaaS', 'Consumer', 'Web3', 'Other'];
const intentTags = ['Co-founder', 'Tech collab', 'Advisor', 'Side project'];
const workStyleTags = ['Remote', 'In-person', 'Hybrid'];
const commitmentTags = ['Part-time', 'Full-time', 'Flexible'];
const socialTypes = ['LinkedIn', 'GitHub', 'Portfolio', 'Twitter'];

const studentNav = [
  { label: 'Home', to: '/student/home', icon: 'home' },
  { label: 'Discover', to: '/student/discover', icon: 'spark' },
  { label: 'My Connections', to: '/student/connections', icon: 'connections' },
  { label: 'Messages', to: '/student/messages', icon: 'messages', badge: '2' },
  { label: 'Events', to: '/student/events', icon: 'events' },
  { label: 'My Progress', to: '/student/progress', icon: 'chart' },
  { label: 'Profile', to: '/profile/me', icon: 'profile' },
  { label: 'Settings', to: '/settings', icon: 'settings' },
];

const proNav = [
  { label: 'Overview', to: '/pro/overview', icon: 'home' },
  { label: 'Discover', to: '/pro/discover', icon: 'spark' },
  { label: 'Network', to: '/pro/network', icon: 'connections' },
  { label: 'Inbox', to: '/pro/inbox', icon: 'messages', badge: '3' },
  { label: 'Calendar', to: '/pro/calendar', icon: 'calendar' },
  { label: 'Events', to: '/pro/events', icon: 'events' },
  { label: 'Analytics', to: '/pro/analytics', icon: 'chart' },
  { label: 'My Company', to: '/pro/company', icon: 'company' },
  { label: 'Settings', to: '/settings', icon: 'settings' },
];

const commandActions = [
  { group: 'Student', label: 'Open student home', to: '/student/home' },
  { group: 'Student', label: 'Open student discover', to: '/student/discover' },
  { group: 'Student', label: 'Open student messages', to: '/student/messages' },
  { group: 'Pro', label: 'Open pro overview', to: '/pro/overview' },
  { group: 'Pro', label: 'Open analytics', to: '/pro/analytics' },
  { group: 'Shared', label: 'Open profile', to: '/profile/me' },
  { group: 'Shared', label: 'Open notifications', to: '/notifications' },
  { group: 'Shared', label: 'Open settings', to: '/settings' },
  { group: 'Shared', label: 'Start onboarding', to: '/onboarding/step-1' },
];

const profiles = {
  me: {
    id: 'me',
    username: 'me',
    name: 'Alex Kumar',
    title: 'CS Student @ NTU',
    role: 'Student',
    audience: 'Student',
    domain: 'DeepTech',
    intent: 'Co-founder',
    commitment: 'Flexible',
    workStyle: 'Hybrid',
    location: 'Singapore',
    avatar: 'AK',
    tone: 'violet',
    match: 73,
    verified: false,
    bio: 'Building ML and front-end prototypes with a focus on practical learning, mentorship, and portfolio growth.',
    headline: 'Building ML and front-end projects in public.',
    skills: ['React', 'Python', 'SQL', 'ML'],
    goals: ['Find mentor', 'Book 1:1 sessions', 'Build portfolio projects'],
    why: ['Complete your social links', 'Book your first session', 'Attend an event'],
    mutuals: 5,
    responseRate: '94%',
    avgResponse: '2 hours',
    views: 124,
    sessions: 4,
    events: 3,
    companyStage: '',
    links: ['LinkedIn', 'GitHub', 'Portfolio'],
    cover: 'linear-gradient(135deg, rgba(14, 207, 191, 0.24), rgba(108, 92, 231, 0.18)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
  },
  sarah: {
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
    bio: 'Product leader with 7 years in consumer apps, open to mentoring students in PM and UX.',
    headline: 'Open to mentoring students in PM and UX.',
    skills: ['UX', 'Product', 'Agile', 'Roadmapping'],
    goals: ['Mentoring', 'Project reviews', 'Speaking opportunities'],
    why: ['Shared product signals', 'Fast response history', 'Evening availability'],
    mutuals: 6,
    responseRate: '94%',
    avgResponse: '2 hours',
    views: 188,
    sessions: 19,
    events: 6,
    companyStage: 'Series A',
    links: ['LinkedIn', 'Portfolio'],
    cover: 'linear-gradient(135deg, rgba(14, 207, 191, 0.22), rgba(14, 207, 191, 0.06)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
  },
  nora: {
    id: 'nora-khan',
    username: 'nora-khan',
    name: 'Nora Khan',
    title: 'UX Designer',
    role: 'Professional',
    audience: 'Professional',
    domain: 'Design',
    intent: 'Side project',
    commitment: 'Part-time',
    workStyle: 'Remote',
    location: 'Remote',
    avatar: 'NK',
    tone: 'rose',
    match: 96,
    verified: true,
    bio: 'Design lead who likes product reviews, portfolio feedback, and tasteful side projects.',
    headline: 'Open to collaborating on a portfolio project.',
    skills: ['Figma', 'React', 'Research', 'Brand'],
    goals: ['Portfolio swaps', 'Co-building', 'Mentoring'],
    why: ['Strong design overlap', 'High intent alignment', 'Similar pace'],
    mutuals: 3,
    responseRate: '91%',
    avgResponse: '3 hours',
    views: 112,
    sessions: 11,
    events: 4,
    companyStage: '',
    links: ['LinkedIn', 'Portfolio'],
    cover: 'linear-gradient(135deg, rgba(252, 114, 177, 0.22), rgba(108, 92, 231, 0.08)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
  },
  raj: {
    id: 'raj-patel',
    username: 'raj-patel',
    name: 'Raj Patel',
    title: 'Full-stack Engineer @ Stripe',
    role: 'Professional',
    audience: 'Professional',
    domain: 'Engineering',
    intent: 'Tech collab',
    commitment: 'Flexible',
    workStyle: 'Remote',
    location: 'Remote',
    avatar: 'RP',
    tone: 'violet',
    match: 91,
    verified: true,
    bio: 'Engineer who likes mentorship, project reviews, and helping people ship clean software faster.',
    headline: 'Looking for a design-savvy side-project collaborator.',
    skills: ['React', 'Node', 'System Design', 'Testing'],
    goals: ['Collaboration', 'Internship pipeline', 'Office hours'],
    why: ['Shared stack signals', 'Project momentum', 'Remote-friendly'],
    mutuals: 4,
    responseRate: '97%',
    avgResponse: '1 hour',
    views: 141,
    sessions: 14,
    events: 5,
    companyStage: '',
    links: ['LinkedIn', 'GitHub'],
    cover: 'linear-gradient(135deg, rgba(108, 92, 231, 0.22), rgba(14, 207, 191, 0.08)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
  },
  priya: {
    id: 'priya-khan',
    username: 'priya-khan',
    name: 'Priya Khan',
    title: 'ML Engineer @ FinPulse',
    role: 'Professional',
    audience: 'Professional',
    domain: 'FinTech',
    intent: 'Co-founder',
    commitment: 'Full-time',
    workStyle: 'Hybrid',
    location: 'Chennai',
    avatar: 'PK',
    tone: 'amber',
    match: 95,
    verified: true,
    bio: 'ML engineer who wants to build a fintech infrastructure product with a serious partner.',
    headline: 'Building credit scoring infrastructure and open to co-founding.',
    skills: ['Python', 'ML', 'Data', 'Finance'],
    goals: ['Co-founder', 'Technical partner', 'Advisor'],
    why: ['Same domain', 'High signal profile', 'Flexible availability'],
    mutuals: 8,
    responseRate: '90%',
    avgResponse: '2 hours',
    views: 203,
    sessions: 9,
    events: 7,
    companyStage: 'Seed',
    links: ['LinkedIn', 'Portfolio'],
    cover: 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(14, 207, 191, 0.08)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
  },
  liam: {
    id: 'liam-owen',
    username: 'liam-owen',
    name: 'Liam Owen',
    title: 'Data Scientist',
    role: 'Professional',
    audience: 'Professional',
    domain: 'DeepTech',
    intent: 'Advisor',
    commitment: 'Part-time',
    workStyle: 'Remote',
    location: 'London',
    avatar: 'LO',
    tone: 'teal',
    match: 89,
    verified: false,
    bio: 'Data scientist who mentors on interviews, ML projects, and building good habits.',
    headline: 'Available for mentoring and 1:1 reviews.',
    skills: ['Python', 'ML', 'Analytics', 'Research'],
    goals: ['Mentoring', 'Project reviews', 'Community talks'],
    why: ['Clear mentorship intent', 'Complementary skills', 'Remote-friendly'],
    mutuals: 2,
    responseRate: '92%',
    avgResponse: '4 hours',
    views: 98,
    sessions: 8,
    events: 3,
    companyStage: '',
    links: ['LinkedIn'],
    cover: 'linear-gradient(135deg, rgba(14, 207, 191, 0.18), rgba(108, 92, 231, 0.08)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
  },
  mei: {
    id: 'mei-lin',
    username: 'mei-lin',
    name: 'Mei Lin',
    title: 'Computer Science Student',
    role: 'Student',
    audience: 'Student',
    domain: 'Engineering',
    intent: 'Tech collab',
    commitment: 'Flexible',
    workStyle: 'Hybrid',
    location: 'Kuala Lumpur',
    avatar: 'ML',
    tone: 'rose',
    match: 88,
    verified: false,
    bio: 'Bootcamp grad and CS student building ML and front-end projects while applying for internships.',
    headline: 'Seeking internship guidance and product feedback.',
    skills: ['Python', 'React', 'SQL', 'ML'],
    goals: ['Find mentor', 'Book 1:1 sessions', 'Build portfolio projects'],
    why: ['Goal alignment', 'Complementary skills', 'High engagement'],
    mutuals: 1,
    responseRate: '89%',
    avgResponse: '3 hours',
    views: 67,
    sessions: 3,
    events: 2,
    companyStage: '',
    links: ['LinkedIn', 'GitHub'],
    cover: 'linear-gradient(135deg, rgba(252, 114, 177, 0.18), rgba(14, 207, 191, 0.06)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
  },
  david: {
    id: 'david-brooks',
    username: 'david-brooks',
    name: 'David Brooks',
    title: 'Marketing Lead @ Notion',
    role: 'Professional',
    audience: 'Professional',
    domain: 'Marketing',
    intent: 'Advisor',
    commitment: 'Flexible',
    workStyle: 'Hybrid',
    location: 'London',
    avatar: 'DB',
    tone: 'amber',
    match: 87,
    verified: true,
    bio: 'Growth marketer open to speaking, reviewing pitches, and helping people sharpen positioning.',
    headline: 'Happy to host talks on growth and storytelling.',
    skills: ['Growth', 'Content', 'Brand', 'Community'],
    goals: ['Mentoring', 'Speaking', 'Advising'],
    why: ['Speaking interest', 'Strong network', 'Growth domain'],
    mutuals: 4,
    responseRate: '95%',
    avgResponse: '2 hours',
    views: 140,
    sessions: 7,
    events: 5,
    companyStage: '',
    links: ['LinkedIn'],
    cover: 'linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(14, 207, 191, 0.06)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
  },
  ethan: {
    id: 'ethan-cho',
    username: 'ethan-cho',
    name: 'Ethan Cho',
    title: 'Founder @ ArcVector',
    role: 'Professional',
    audience: 'Professional',
    domain: 'SaaS',
    intent: 'Co-founder',
    commitment: 'Full-time',
    workStyle: 'Hybrid',
    location: 'Bangalore',
    avatar: 'EC',
    tone: 'violet',
    match: 92,
    verified: true,
    bio: 'Founder building a workflow automation product and looking for technical and design depth.',
    headline: 'Looking for a technical co-founder or specialist collaborators.',
    skills: ['Product', 'Operations', 'SaaS', 'Strategy'],
    goals: ['Co-founder', 'Hiring', 'Advising'],
    why: ['Founder intent', 'Stage overlap', 'High activity'],
    mutuals: 5,
    responseRate: '93%',
    avgResponse: '1 hour',
    views: 176,
    sessions: 12,
    events: 8,
    companyStage: 'Seed',
    links: ['LinkedIn', 'Website'],
    cover: 'linear-gradient(135deg, rgba(108, 92, 231, 0.2), rgba(245, 158, 11, 0.06)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
  },
};

const studentDiscoverProfiles = [profiles.sarah, profiles.raj, profiles.priya, profiles.liam, profiles.david, profiles.nora, profiles.mei];
const proDiscoverProfiles = [profiles.mei, profiles.nora, profiles.raj, profiles.priya, profiles.ethan, profiles.sarah, profiles.liam];

const studentConnections = {
  suggested: [profiles.nora, profiles.priya, profiles.raj],
  pendingReceived: [profiles.mei, profiles.liam],
  pendingSent: [profiles.sarah],
  connected: [profiles.sarah, profiles.raj],
  shortlisted: [profiles.priya, profiles.nora],
};

const studentThreads = [
  {
    id: 'sarah-chen',
    person: profiles.sarah,
    status: 'Online',
    unread: 2,
    last: 'Want to hop on a quick call next week?',
    time: '2m',
    messages: [
      { id: 1, from: 'them', body: 'Hey Alex, your portfolio looks strong.', time: '10:22' },
      { id: 2, from: 'me', body: 'Thanks. I would love feedback on PM skills.', time: '10:24' },
      { id: 3, from: 'them', body: 'Want to hop on a quick call next week?', time: '10:25' },
    ],
  },
  {
    id: 'raj-patel',
    person: profiles.raj,
    status: 'Typing',
    unread: 0,
    last: 'I can send a starter repo if you want.',
    time: '1h',
    messages: [
      { id: 1, from: 'them', body: 'Loved the ML project you shared.', time: '09:04' },
      { id: 2, from: 'me', body: 'Thanks, I am trying to turn it into a portfolio piece.', time: '09:07' },
      { id: 3, from: 'them', body: 'I can send a starter repo if you want.', time: '09:08' },
    ],
  },
  {
    id: 'mei-lin',
    person: profiles.mei,
    status: 'Offline',
    unread: 1,
    last: 'Can you review my resume this week?',
    time: 'Yesterday',
    messages: [
      { id: 1, from: 'them', body: 'Can you review my resume this week?', time: 'Yesterday' },
      { id: 2, from: 'me', body: 'Yes. Send the latest version and the target role.', time: 'Yesterday' },
    ],
  },
];

const proThreads = [
  {
    id: 'ethan-cho',
    person: profiles.ethan,
    status: 'Online',
    unread: 1,
    last: 'Could we talk about a co-founder profile?',
    time: '8m',
    messages: [
      { id: 1, from: 'me', body: 'Your product direction feels strong.', time: '10:10' },
      { id: 2, from: 'them', body: 'Could we talk about a co-founder profile?', time: '10:11' },
      { id: 3, from: 'me', body: 'Yes, I can share a few options and next steps.', time: '10:14' },
    ],
  },
  {
    id: 'sarah-chen',
    person: profiles.sarah,
    status: 'Last seen 2h ago',
    unread: 0,
    last: 'The workshop deck is ready for review.',
    time: '2h',
    messages: [
      { id: 1, from: 'them', body: 'The workshop deck is ready for review.', time: '08:40' },
      { id: 2, from: 'me', body: 'Great, I will review it before lunch.', time: '08:43' },
    ],
  },
  {
    id: 'priya-khan',
    person: profiles.priya,
    status: 'Online',
    unread: 2,
    last: 'The next session should include architecture notes.',
    time: '30m',
    messages: [
      { id: 1, from: 'them', body: 'The next session should include architecture notes.', time: '11:00' },
      { id: 2, from: 'me', body: 'Agreed. I will add them to the brief.', time: '11:04' },
    ],
  },
];

const sessions = [
  { id: 'intro', title: '30-min intro call', detail: 'Fast first meeting to get aligned', day: 'Tomorrow', time: '3:00 PM', mode: 'Video call' },
  { id: 'deep', title: '60-min deep dive', detail: 'Portfolio review and roadmap planning', day: 'Thu', time: '4:30 PM', mode: 'Video call' },
  { id: 'async', title: 'Async feedback', detail: 'Written notes and voice replies', day: 'Fri', time: 'All day', mode: 'Async' },
];

const availabilityWeeks = [
  { day: 'Mon', date: 21, slots: ['10:00 AM', '2:00 PM', '4:30 PM'] },
  { day: 'Tue', date: 22, slots: ['9:00 AM', '1:30 PM'] },
  { day: 'Wed', date: 23, slots: ['11:00 AM', '3:00 PM'] },
  { day: 'Thu', date: 24, slots: ['10:30 AM', '5:00 PM'] },
  { day: 'Fri', date: 25, slots: ['12:00 PM', '4:00 PM'] },
];

const events = [
  {
    id: 'career-night',
    title: 'Career Builders Demo Night',
    host: 'Sarah Chen',
    format: 'Virtual',
    domain: 'Product',
    date: 'Apr 24',
    time: '7:00 PM',
    attendees: 124,
    tags: ['Product', 'Mentoring', 'Networking'],
    summary: 'Student showcases, mentor feedback, and open networking rooms.',
    agenda: ['Opening note', 'Lightning talks', 'Mentor breakouts'],
  },
  {
    id: 'build-with-ai',
    title: 'Build With AI Workshop',
    host: 'Raj Patel',
    format: 'In-person',
    domain: 'Engineering',
    date: 'Apr 27',
    time: '6:30 PM',
    attendees: 86,
    tags: ['Engineering', 'ML', 'Workshops'],
    summary: 'Hands-on session with prompts, prototypes, and office hours.',
    agenda: ['Workshop intro', 'Live build', 'Office hours'],
  },
  {
    id: 'portfolio-lab',
    title: 'Portfolio Review Lab',
    host: 'Nora Khan',
    format: 'Virtual',
    domain: 'Design',
    date: 'Apr 29',
    time: '5:00 PM',
    attendees: 63,
    tags: ['Design', 'Feedback', 'Portfolio'],
    summary: 'Structured portfolio review with feedback from product and design leads.',
    agenda: ['Group review', 'Feedback notes', '1:1 follow-ups'],
  },
];

const notifications = [
  { id: 1, icon: 'connections', title: 'Alex M. accepted your connection request', meta: '2 hours ago', action: 'View profile', unread: true },
  { id: 2, icon: 'messages', title: 'Priya K. sent you a message', meta: '5 hours ago', action: 'Reply', unread: true },
  { id: 3, icon: 'events', title: 'AI Founders Meetup starts tomorrow', meta: '1 day ago', action: 'RSVP', unread: false },
  { id: 4, icon: 'chart', title: 'Your profile was viewed 8 times this week', meta: '2 days ago', action: 'Open analytics', unread: false },
  { id: 5, icon: 'calendar', title: 'Your session with Sarah is confirmed', meta: '3 days ago', action: 'Join calendar', unread: false },
];

const commandPaletteSections = [
  { title: 'Student', items: commandActions.filter((item) => item.group === 'Student') },
  { title: 'Pro', items: commandActions.filter((item) => item.group === 'Pro') },
  { title: 'Shared', items: commandActions.filter((item) => item.group === 'Shared') },
];

const settingsTabs = ['Profile', 'Account', 'Notifications', 'Privacy', 'Appearance', 'Billing', 'Danger Zone'];

function cx(...classes) {
  return classes.filter(Boolean).join(' ');
}

function initialsFromName(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function useLightThemeClass() {
  useLayoutEffect(() => {
    document.body.classList.add('pm-light-theme');
    return () => document.body.classList.remove('pm-light-theme');
  }, []);
}

function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', description);
    }

    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', '#f8f4ec');
    }
  }, [description, title]);
}

function Icon({ name, className = '' }) {
  const common = {
    className: cx('pm-icon', className),
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  };

  switch (name) {
    case 'home':
      return (
        <svg {...common}>
          <path d="M4 11.5 12 4l8 7.5" />
          <path d="M6 10.5V20h12v-9.5" />
        </svg>
      );
    case 'spark':
      return (
        <svg {...common}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
          <path d="M4 18l1.2 3.2L8 22l-2.8.8L4 26" />
        </svg>
      );
    case 'messages':
      return (
        <svg {...common}>
          <path d="M5 6h14v10H8l-3 3V6z" />
          <path d="M8 10h8" />
        </svg>
      );
    case 'calendar':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="3" />
          <path d="M8 3v4M16 3v4M4 10h16" />
        </svg>
      );
    case 'events':
      return (
        <svg {...common}>
          <path d="M4 8h16" />
          <path d="M7 4v4M17 4v4" />
          <path d="M5 6.5h14v13H5z" />
        </svg>
      );
    case 'connections':
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="2.5" />
          <circle cx="16" cy="8" r="2.5" />
          <circle cx="12" cy="16" r="2.5" />
          <path d="M9.8 9.2 11 12M14.2 9.2 13 12" />
        </svg>
      );
    case 'profile':
      return (
        <svg {...common}>
          <circle cx="12" cy="8.5" r="3.5" />
          <path d="M5 20c1.8-3.8 4.5-5.7 7-5.7s5.2 1.9 7 5.7" />
        </svg>
      );
    case 'settings':
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M4 12h2m12 0h2M12 4v2m0 12v2M6.6 6.6 8 8m8 0 1.4-1.4M6.6 17.4 8 16m8 0 1.4 1.4" />
        </svg>
      );
    case 'chart':
      return (
        <svg {...common}>
          <path d="M4 19h16" />
          <rect x="6" y="11" width="3" height="8" rx="1.2" />
          <rect x="11" y="8" width="3" height="11" rx="1.2" />
          <rect x="16" y="5" width="3" height="14" rx="1.2" />
        </svg>
      );
    case 'company':
      return (
        <svg {...common}>
          <path d="M4 20V6h8v14" />
          <path d="M12 20V10h8v10" />
          <path d="M7 9h2M7 13h2M7 17h2M15 13h2M15 17h2" />
        </svg>
      );

    case 'work':
      return (
        <svg {...common}><path d="M3 7h18a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/></svg>
      );
    case 'friends':
      return (
        <svg {...common}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      );
    case 'news':
      return (
        <svg {...common}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
      );
    case 'archive':
      return (
        <svg {...common}><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
      );
    case 'logout':
      return (
        <svg {...common}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      );
    case 'phone':
      return (
        <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.81 12.81 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      );
    case 'more':
      return (
        <svg {...common}><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
      );
    case 'play':
      return (
        <svg {...common}><polygon points="5 3 19 12 5 21 5 3"/></svg>
      );
    case 'attachment':
      return (
        <svg {...common}><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
      );
    case 'mic':
      return (
        <svg {...common}><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
      );
    case 'send':
      return (
        <svg {...common}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      );
    case 'close':
      return (
        <svg {...common}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      );
    case 'video':
      return (
        <svg {...common}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>
      );
    case 'file':
      return (
        <svg {...common}><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
      );
    case 'chevron-up':
      return (
        <svg {...common}><polyline points="18 15 12 9 6 15"/></svg>
      );
    case 'chevron-down':
      return (
        <svg {...common}><polyline points="6 9 12 15 18 9"/></svg>
      );
    case 'search':
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="5.5" />
          <path d="M20 20l-3.8-3.8" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...common}>
          <path d="M12 4a4 4 0 0 0-4 4v2.4c0 .9-.3 1.8-.8 2.5L6 14.4V16h12v-1.6l-1.2-2.5c-.5-.7-.8-1.6-.8-2.5V8a4 4 0 0 0-4-4z" />
          <path d="M10.5 18a1.5 1.5 0 0 0 3 0" />
        </svg>
      );
    case 'menu':
      return (
        <svg {...common}>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      );
    case 'plus':
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case 'chevron-right':
      return (
        <svg {...common}>
          <path d="m9 5 6 7-6 7" />
        </svg>
      );
    default:
      return null;
  }
}

function Button({ to, href, variant = 'primary', size = 'md', icon, className = '', type = 'button', children, ...props }) {
  const classes = cx('pm-button', `pm-button--${variant}`, `pm-button--${size}`, className);
  const content = (
    <>
      {icon ? <Icon name={icon} className="pm-button__icon" /> : null}
      <span>{children}</span>
    </>
  );

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a className={classes} href={href} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      {content}
    </button>
  );
}

function Badge({ tone = 'muted', className = '', children }) {
  return <span className={cx('pm-badge', `pm-badge--${tone}`, className)}>{children}</span>;
}

function Chip({ tone = 'muted', active = false, onClick, className = '', children }) {
  return (
    <button className={cx('pm-chip', `pm-chip--${tone}`, active && 'is-active', className)} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

function Avatar({ name, initials, size = 'md', tone = 'violet', online = false, className = '' }) {
  return (
    <span className={cx('pm-avatar', `pm-avatar--${size}`, `pm-avatar--${tone}`, className)}>
      <span>{initials || initialsFromName(name || 'PM')}</span>
      {online ? <span className="pm-avatar__dot" aria-hidden="true" /> : null}
    </span>
  );
}

function Brand({ compact = false, className = '', href = '/' }) {
  return (
    <Link className={cx('pm-brand', compact && 'is-compact', className)} to={href} aria-label="ProMatch home">
      <span className="pm-brand__mark" aria-hidden="true">
        PM
      </span>
      <span className="pm-brand__copy">
        <strong>ProMatch</strong>
        <span>Ambitious precision</span>
      </span>
    </Link>
  );
}

function SectionHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="pm-section-header">
      <div>
        {eyebrow ? <p className="pm-kicker">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="pm-section-header__actions">{actions}</div> : null}
    </div>
  );
}

function MatchArc({ value, size = 52, stroke = 6 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <svg className="pm-match-arc" viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
      <circle className="pm-match-arc__track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} />
      <circle
        className="pm-match-arc__progress"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
    </svg>
  );
}

function StatCard({ value, label, detail, spark = [], accent = 'teal', ring, className = '' }) {
  return (
    <article className={cx('pm-card pm-stat-card', className)}>
      <div className="pm-stat-card__head">
        <span>{label}</span>
        {ring ? <MatchArc value={ring} size={60} stroke={6} /> : null}
      </div>
      <strong className={`pm-stat-card__value pm-stat-card__value--${accent}`}>{value}</strong>
      {detail ? <p>{detail}</p> : null}
      {spark.length ? (
        <div className="pm-sparkline" aria-hidden="true">
          {spark.map((item, index) => (
            <span key={`${label}-${index}`} style={{ height: `${item}%` }} />
          ))}
        </div>
      ) : null}
    </article>
  );
}

function MiniProfileCard({ profile, compact = false, ctaLabel = 'Connect', secondaryLabel = 'Message', extraLink = '/profile/me' }) {
  return (
    <article className={cx('pm-card pm-match-card', compact && 'is-compact')}>
      <div className="pm-match-card__top">
        <div className="pm-match-card__score">
          <div className="pm-match-card__arc-wrap">
            <MatchArc value={profile.match} size={compact ? 46 : 58} stroke={6} />
            <span>{profile.match >= 90 ? 'Top Match' : `${profile.match}%`}</span>
          </div>
          <small>{profile.responseRate} response rate</small>
        </div>
        <button className="pm-icon-button" type="button" aria-label="Save profile">
          <span aria-hidden="true">♡</span>
        </button>
      </div>

      <div className="pm-match-card__identity">
        <Avatar name={profile.name} initials={profile.avatar} tone={profile.tone} size={compact ? 'lg' : 'xl'} online={profile.audience === 'Professional'} />
        <div>
          <div className="pm-match-card__name-row">
            <h3>{profile.name}</h3>
            {profile.verified ? <Badge tone="teal">Verified</Badge> : null}
          </div>
          <p className="pm-match-card__role">{profile.title}</p>
          <div className="pm-match-card__meta">
            <Badge tone="violet">{profile.domain}</Badge>
            <Badge tone="amber">{profile.intent}</Badge>
            <Badge tone="muted">{profile.workStyle}</Badge>
          </div>
        </div>
      </div>

      {!compact ? <p className="pm-match-card__bio">{profile.bio}</p> : null}

      <div className="pm-match-card__skills">
        {profile.skills.slice(0, compact ? 3 : 4).map((skill) => (
          <Badge tone={skill === 'React' ? 'violet' : skill === 'Python' || skill === 'ML' ? 'teal' : skill === 'Design' || skill === 'Figma' ? 'rose' : 'muted'} key={skill}>
            {skill}
          </Badge>
        ))}
      </div>

      {!compact ? (
        <div className="pm-match-card__why">
          <strong>Why this match?</strong>
          <p>{profile.why.join(' · ')}</p>
        </div>
      ) : null}

      <div className="pm-card-actions">
        <Button to={extraLink} variant="secondary" size="sm">
          View profile
        </Button>
        <Button to={profile.id === 'me' ? '/settings' : `/chat/${profile.username}`} variant="primary" size="sm">
          {ctaLabel}
        </Button>
        <Button to={profile.id === 'me' ? '/notifications' : '/bookings'} variant="ghost" size="sm">
          {secondaryLabel}
        </Button>
      </div>
    </article>
  );
}

function EventCard({ event, compact = false, variant = 'student' }) {
  return (
    <article className={cx('pm-card pm-event-card', compact && 'is-compact')}>
      <div className="pm-event-card__head">
        <Badge tone={event.format === 'Virtual' ? 'teal' : 'violet'}>{event.format}</Badge>
        <span className="pm-muted">{event.attendees} attending</span>
      </div>
      <h3>{event.title}</h3>
      <p>{event.summary}</p>
      <div className="pm-event-card__meta">
        <span>{event.host}</span>
        <span>{event.date}</span>
        <span>{event.time}</span>
      </div>
      <div className="pm-badge-row">
        {event.tags.map((tag) => (
          <Badge tone={tag === 'Design' ? 'rose' : tag === 'Engineering' || tag === 'ML' ? 'teal' : tag === 'Mentoring' ? 'violet' : 'amber'} key={tag}>
            {tag}
          </Badge>
        ))}
      </div>
      <div className="pm-card-actions">
        <Button to={`/${variant === 'pro' ? 'pro' : 'student'}/events/${event.id}`} variant="secondary" size="sm">
          Learn more
        </Button>
        <Button to={`/${variant === 'pro' ? 'pro' : 'student'}/events/${event.id}`} size="sm">
          RSVP
        </Button>
      </div>
    </article>
  );
}

function SessionCard({ session, active = false }) {
  return (
    <article className={cx('pm-card pm-session-card', active && 'is-active')}>
      <div className="pm-session-card__head">
        <div>
          <h3>{session.title}</h3>
          <p>{session.detail}</p>
        </div>
        {active ? <Badge tone="teal">Join soon</Badge> : <Badge tone="muted">Scheduled</Badge>}
      </div>
      <div className="pm-session-card__meta">
        <span>{session.day}</span>
        <span>{session.time}</span>
        <span>{session.mode}</span>
      </div>
      <div className="pm-card-actions">
        <Button variant="secondary" size="sm">Reschedule</Button>
        <Button size="sm">Join Call</Button>
      </div>
    </article>
  );
}

function ActivityItem({ icon, title, meta, unread = false }) {
  return (
    <div className={cx('pm-activity-item', unread && 'is-unread')}>
      <span className="pm-activity-item__icon">
        <Icon name={icon} />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{meta}</p>
      </div>
    </div>
  );
}

function CommandPalette({ open, onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  const queryLower = query.trim().toLowerCase();
  const results = commandActions.filter((item) => !queryLower || item.label.toLowerCase().includes(queryLower) || item.group.toLowerCase().includes(queryLower));

  return (
    <div className="pm-command-backdrop" onMouseDown={onClose}>
      <section className="pm-command-palette" onMouseDown={(event) => event.stopPropagation()} aria-modal="true" role="dialog" aria-label="Command palette">
        <div className="pm-command-palette__search">
          <Icon name="search" />
          <input autoFocus className="pm-input pm-input--ghost" placeholder="Search actions, pages, and shortcuts" type="search" value={query} onChange={(event) => setQuery(event.target.value)} />
          <kbd>Esc</kbd>
        </div>
        <div className="pm-command-palette__content">
          {commandPaletteSections.map((section) => {
            const filtered = section.items.filter((item) => results.includes(item));
            if (!filtered.length) {
              return null;
            }

            return (
              <div key={section.title} className="pm-command-section">
                <p>{section.title}</p>
                <div className="pm-command-list">
                  {filtered.map((item) => (
                    <button
                      className="pm-command-item"
                      key={item.to}
                      type="button"
                      onClick={() => {
                        onClose();
                        navigate(item.to);
                      }}
                    >
                      <span>{item.label}</span>
                      <small>{item.group}</small>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className={cx('pm-public-navbar', scrolled && 'is-scrolled')}>
      <Brand />

      <nav className="pm-public-navbar__links" aria-label="Primary">
        {publicNav.map((item) => (
          <a key={item.label} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="pm-public-navbar__actions">
        <Button to="/login" variant="ghost">
          Log in
        </Button>
        <Button to="/signup">Get started</Button>
        <button className="pm-icon-button pm-public-navbar__menu" type="button" aria-label="Open menu" onClick={() => setMenuOpen(true)}>
          <Icon name="menu" />
        </button>
      </div>

      {menuOpen ? (
        <div className="pm-public-menu" role="dialog" aria-modal="true">
          <div className="pm-public-menu__panel">
            <div className="pm-public-menu__head">
              <Brand compact />
              <button className="pm-icon-button" type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
                <Icon name="logout" />
              </button>
            </div>
            <nav>
              {publicNav.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="pm-public-menu__actions">
              <Button to="/login" variant="secondary" onClick={() => setMenuOpen(false)}>
                Log in
              </Button>
              <Button to="/signup" onClick={() => setMenuOpen(false)}>
                Get started
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="pm-public-footer">
      <div>
        <Brand compact />
        <p>ProMatch connects ambitious builders, founders, designers, and experts who want to create real work together.</p>
      </div>
      <div>
        <strong>Product</strong>
        <a href="#features">Features</a>
        <a href="#process">How it works</a>
        <a href="#pricing">Pricing</a>
      </div>
      <div>
        <strong>Company</strong>
        <a href="#teams">For teams</a>
        <a href="#proof">Proof</a>
        <a href="#faq">FAQ</a>
      </div>
      <div>
        <strong>Social</strong>
        <a href="/">LinkedIn</a>
        <a href="/">GitHub</a>
        <a href="/">Twitter</a>
      </div>
    </footer>
  );
}

function PublicShell({ children }) {
  return (
    <div className="pm-page pm-page--public">
      <div className="pm-page__glow pm-page__glow--one" />
      <div className="pm-page__glow pm-page__glow--two" />
      <div className="pm-page__grain" />
      <a className="pm-skip-link" href="#main">
        Skip to content
      </a>
      <PublicNavbar />
      {children}
      <PublicFooter />
    </div>
  );
}

function LandingHeroCard() {
  return (
    <div className="pm-card pm-hero-mockup">
      <div className="pm-hero-mockup__head">
        <Badge tone="teal">94% compatibility</Badge>
        <Badge tone="violet">AI recommendation</Badge>
      </div>
      <MiniProfileCard profile={profiles.sarah} compact ctaLabel="Connect" secondaryLabel="Save" extraLink="/profile/sarah-chen" />
      <p className="pm-hero-mockup__reason">Shared product signals, strong response history, and evening availability.</p>
    </div>
  );
}

function AuthPage({ mode }) {
  const isSignup = mode === 'signup';

  usePageMeta(
    `ProMatch | ${isSignup ? 'Sign up' : 'Log in'}`,
    'Log in or sign up to ProMatch and start finding co-founders, mentors, collaborators, and professionals faster.',
  );

  return (
    <div className="pm-auth-shell">
      <div className="pm-auth-shell__glow pm-auth-shell__glow--one" />
      <div className="pm-auth-shell__glow pm-auth-shell__glow--two" />
      <div className="pm-auth-shell__grain" />
      <a className="pm-skip-link" href="#main">
        Skip to content
      </a>

      <section className="pm-auth-hero">
        <Brand />
        <div className="pm-auth-hero__content">
          <p className="pm-kicker">Your next chapter starts with the right person.</p>
          <h1>{isSignup ? 'Create a profile that serious people want to meet.' : 'Pick up where your network left off.'}</h1>
          <p>ProMatch keeps the first step lightweight with Google and LinkedIn OAuth, then moves straight into a focused onboarding flow.</p>
        </div>
        <article className="pm-card pm-auth-hero__quote">
          <p>“It reads like a premium recruiting tool, not a dating app.”</p>
          <div>
            <strong>Maya Chen</strong>
            <span>Founder</span>
          </div>
        </article>
      </section>

      <section id="main" className="pm-auth-panel">
        <div className="pm-auth-panel__inner">
          <div>
            <p className="pm-kicker">Account access</p>
            <h2>{isSignup ? 'Create your account' : 'Welcome back'}</h2>
            <p className="pm-muted">Continue with Google or LinkedIn, or use your email to finish the flow.</p>
          </div>

          <div className="pm-auth-tabs">
            <Link className={cx('pm-auth-tab', !isSignup && 'is-active')} to="/login">
              Log in
            </Link>
            <Link className={cx('pm-auth-tab', isSignup && 'is-active')} to="/signup">
              Sign up
            </Link>
          </div>

          <div className="pm-oauth-grid">
            <button className="pm-oauth-button pm-oauth-button--google" type="button">
              <span className="pm-oauth-button__mark">G</span>
              <span>Continue with Google</span>
            </button>
            <button className="pm-oauth-button pm-oauth-button--linkedin" type="button">
              <span className="pm-oauth-button__mark">in</span>
              <span>Continue with LinkedIn</span>
            </button>
          </div>

          <div className="pm-divider">
            <span>or continue with email</span>
          </div>

          <form className="pm-form" onSubmit={(event) => event.preventDefault()}>
            {isSignup ? (
              <label className="pm-field">
                <span>Full name</span>
                <input className="pm-input" type="text" autoComplete="name" placeholder="Your name" required />
              </label>
            ) : null}

            <label className="pm-field">
              <span>Email</span>
              <input className="pm-input" type="email" autoComplete="email" placeholder="you@domain.com" required />
            </label>

            <label className="pm-field">
              <span>Password</span>
              <input className="pm-input" type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} placeholder="Enter your password" required />
            </label>

            <Button to={isSignup ? '/onboarding/step-1' : '/student/home'} className="pm-form__submit">
              {isSignup ? 'Continue to onboarding' : 'Continue to discover'}
            </Button>
          </form>

          <div className="pm-auth-panel__foot">
            <p>
              {isSignup ? 'Already have an account?' : 'New here?'} <Link to={isSignup ? '/login' : '/signup'}>{isSignup ? 'Switch to log in' : 'Switch to sign up'}</Link>
            </p>
            <div className="pm-auth-links">
              <a href="#faq">Privacy</a>
              <a href="#faq">Terms</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function OnboardingPage() {
  const { step = 'step-1' } = useParams();
  const navigate = useNavigate();
  const currentIndex = onboardingSteps.findIndex((item) => item.id === step);
  const isValidStep = currentIndex !== -1;

  const [role, setRole] = useState('student');
  const [name, setName] = useState('Alex Kumar');
  const [location, setLocation] = useState('Singapore');
  const [headline, setHeadline] = useState('ML Engineer building in FinTech');
  const [selectedSkills, setSelectedSkills] = useState(['React', 'Product']);
  const [selectedDomains, setSelectedDomains] = useState(['FinTech']);
  const [selectedIntents, setSelectedIntents] = useState(['Co-founder']);
  const [commitment, setCommitment] = useState('Flexible');
  const [workStyle, setWorkStyle] = useState('Hybrid');
  const [experience, setExperience] = useState(3);
  const [bio, setBio] = useState('Building ML and front-end projects with a focus on practical learning and portfolio growth.');
  const [preferredSkills, setPreferredSkills] = useState(['React', 'ML']);
  const [preferredDomains, setPreferredDomains] = useState(['FinTech']);
  const [socialType, setSocialType] = useState('LinkedIn');
  const [socialUrl, setSocialUrl] = useState('https://linkedin.com/in/');

  usePageMeta('ProMatch | Onboarding', 'Complete the four-step ProMatch onboarding flow and prepare your profile for discovery.');

  if (!isValidStep) {
    return <Navigate to="/onboarding/step-1" replace />;
  }

  const toggleValue = (current, setter, value) => {
    setter((items) => (items.includes(value) ? items.filter((item) => item !== value) : [...items, value]));
  };

  const nextStep = onboardingSteps[currentIndex + 1]?.id;
  const prevStep = onboardingSteps[currentIndex - 1]?.id;

  const finishRoute = role === 'student' ? '/student/home' : '/pro/overview';

  return (
    <div className="pm-onboarding-shell">
      <div className="pm-onboarding-shell__glow pm-onboarding-shell__glow--one" />
      <div className="pm-onboarding-shell__glow pm-onboarding-shell__glow--two" />
      <div className="pm-onboarding-shell__grain" />
      <header className="pm-onboarding-header">
        <Brand compact />
        <div className="pm-onboarding-header__progress">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Step {currentIndex + 1} of 4</span>
            <strong>{onboardingSteps[currentIndex].label}</strong>
          </div>
          <div className="pm-progress-bar" aria-hidden="true">
            <span style={{ width: `${((currentIndex + 1) / onboardingSteps.length) * 100}%` }} />
          </div>
        </div>
      </header>

      <main className="pm-onboarding-main">
        <aside className="pm-onboarding-preview pm-card">
          <p className="pm-kicker">Profile preview</p>
          <div className="pm-profile-preview">
            <Avatar name={name} initials="AK" tone="violet" size="xl" />
            <div>
              <strong>{name}</strong>
              <span>{role === 'student' ? 'Student profile' : 'Professional profile'}</span>
            </div>
          </div>
          <p className="pm-muted">{headline}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="pm-badge-row">
              {selectedSkills.slice(0, 4).map((item) => (
                <Badge tone="violet" key={item}>
                  {item}
                </Badge>
              ))}
            </div>
            <div className="pm-badge-row">
              {selectedDomains.slice(0, 2).map((item) => (
                <Badge tone="teal" key={item}>
                  {item}
                </Badge>
              ))}
            </div>
            <p className="pm-muted" style={{ margin: 0 }}>{bio}</p>
          </div>
        </aside>

        <section className="pm-card pm-onboarding-card">
          {step === 'step-1' ? (
            <>
              <SectionHeader eyebrow="Step 1 of 4" title="Let's set up your profile" description="This is how other builders will find you." />
              <div className="pm-upload-zone">
                <Avatar name={name} initials="AK" tone="teal" size="xl" />
                <div>
                  <strong>Upload photo</strong>
                  <p>Drag and drop or click to upload a profile image.</p>
                </div>
                <Button variant="secondary" size="sm">
                  Change
                </Button>
              </div>
              <div className="pm-form-grid">
                <label className="pm-field">
                  <span>Role</span>
                  <div className="pm-chip-row">
                    {['student', 'professional'].map((item) => (
                      <Chip key={item} tone="muted" active={role === item} onClick={() => setRole(item)}>
                        {item === 'student' ? 'Student' : 'Professional'}
                      </Chip>
                    ))}
                  </div>
                </label>
                <label className="pm-field">
                  <span>Full name</span>
                  <input className="pm-input" value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <label className="pm-field">
                  <span>City / location</span>
                  <input className="pm-input" value={location} onChange={(event) => setLocation(event.target.value)} />
                </label>
                <label className="pm-field">
                  <span>Headline</span>
                  <input className="pm-input" maxLength={80} value={headline} onChange={(event) => setHeadline(event.target.value)} />
                  <small>{headline.length}/80</small>
                </label>
              </div>
            </>
          ) : null}

          {step === 'step-2' ? (
            <>
              <SectionHeader eyebrow="Step 2 of 4" title="What do you bring to the table?" description="Add skills and domain so the matching feed can stay focused." />
              <div className="pm-chip-stack">
                <strong>Skills</strong>
                <div className="pm-chip-row">
                  {skillTags.map((item) => (
                    <Chip key={item} tone="muted" active={selectedSkills.includes(item)} onClick={() => toggleValue(selectedSkills, setSelectedSkills, item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="pm-chip-stack">
                <strong>Domain / industry</strong>
                <div className="pm-chip-row">
                  {domainTags.map((item) => (
                    <Chip key={item} tone="violet" active={selectedDomains.includes(item)} onClick={() => toggleValue(selectedDomains, setSelectedDomains, item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <label className="pm-field">
                <span>Experience</span>
                <input className="pm-input" min="0" max="10" type="range" value={experience} onChange={(event) => setExperience(Number(event.target.value))} />
                <small>{experience} years of experience</small>
              </label>
            </>
          ) : null}

          {step === 'step-3' ? (
            <>
              <SectionHeader eyebrow="Step 3 of 4" title="What are you looking for?" description="Tell us who and how you want to work with." />
              <div className="pm-choice-grid">
                {intentTags.map((item) => (
                  <button
                    className={cx('pm-choice-card', selectedIntents.includes(item) && 'is-active')}
                    key={item}
                    type="button"
                    onClick={() => toggleValue(selectedIntents, setSelectedIntents, item)}
                  >
                    <strong>{item}</strong>
                    <span>{item === 'Co-founder' ? 'Build a company' : item === 'Tech collab' ? 'Project partner' : item === 'Advisor' ? 'Mentor or guide' : 'Experiment together'}</span>
                  </button>
                ))}
              </div>
              <div className="pm-chip-stack">
                <strong>Commitment</strong>
                <div className="pm-chip-row">
                  {commitmentTags.map((item) => (
                    <Chip key={item} tone="amber" active={commitment === item} onClick={() => setCommitment(item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <label className="pm-field">
                <span>Bio</span>
                <textarea className="pm-textarea" maxLength={280} rows={4} value={bio} onChange={(event) => setBio(event.target.value)} />
                <small>{bio.length}/280</small>
              </label>
            </>
          ) : null}

          {step === 'step-4' ? (
            <>
              <SectionHeader eyebrow="Step 4 of 4" title="Who do you want to meet?" description="Set the last few filters that guide the recommendation feed." />
              <div className="pm-chip-stack">
                <strong>Preferred skills</strong>
                <div className="pm-chip-row">
                  {skillTags.map((item) => (
                    <Chip key={item} tone="teal" active={preferredSkills.includes(item)} onClick={() => toggleValue(preferredSkills, setPreferredSkills, item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="pm-chip-stack">
                <strong>Preferred domain</strong>
                <div className="pm-chip-row">
                  {domainTags.slice(0, 6).map((item) => (
                    <Chip key={item} tone="violet" active={preferredDomains.includes(item)} onClick={() => toggleValue(preferredDomains, setPreferredDomains, item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="pm-chip-stack">
                <strong>Work style</strong>
                <div className="pm-chip-row">
                  {workStyleTags.map((item) => (
                    <Chip key={item} tone="muted" active={workStyle === item} onClick={() => setWorkStyle(item)}>
                      {item}
                    </Chip>
                  ))}
                </div>
              </div>
              <div className="pm-form-grid pm-form-grid--compact">
                <label className="pm-field">
                  <span>Social link</span>
                  <select className="pm-input" value={socialType} onChange={(event) => setSocialType(event.target.value)}>
                    {socialTypes.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label className="pm-field">
                  <span>URL</span>
                  <input className="pm-input" value={socialUrl} onChange={(event) => setSocialUrl(event.target.value)} />
                </label>
              </div>
            </>
          ) : null}

          <div className="pm-form-actions">
            <Button to={prevStep ? `/onboarding/${prevStep}` : '/login'} variant="secondary">
              Back
            </Button>
            <Button
              to={nextStep ? `/onboarding/${nextStep}` : finishRoute}
              onClick={nextStep ? undefined : () => navigate(finishRoute)}
            >
              {nextStep ? 'Continue' : 'Finish and find matches'}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

function AppShell({ variant = 'student', title, subtitle, actions, children, className = '', hideTopbar = false }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = variant === 'pro' ? proNav : studentNav;
  const user = profiles.me;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      }

      if (event.key === 'Escape') {
        setPaletteOpen(false);
        setMobileOpen(false);
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || paletteOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen, paletteOpen]);

  return (
    <div className={cx('pm-app-shell', collapsed && 'is-collapsed', mobileOpen && 'is-drawer-open', className)}>
      <a className="pm-skip-link" href="#main">
        Skip to content
      </a>
      <aside className={cx('pm-sidebar', collapsed && 'is-collapsed')}>
        <div className="pm-sidebar__brand-row">
          <Brand compact={collapsed} />
          <button className="pm-icon-button pm-sidebar__toggle" type="button" aria-label="Collapse sidebar" onClick={() => setCollapsed((value) => !value)}>
            <Icon name={collapsed ? 'chevron-right' : 'menu'} />
          </button>
        </div>
        <nav className="pm-sidebar__nav" aria-label={`${variant} navigation`}>
          {navItems.map((item) => (
            <NavLink
              className={({ isActive }) => cx('pm-sidebar__link', isActive && 'is-active')}
              key={item.to}
              to={item.to}
              title={collapsed ? item.label : undefined}
              onClick={() => setMobileOpen(false)}
            >
              <span className="pm-sidebar__icon">
                <Icon name={item.icon} />
              </span>
              <span className="pm-sidebar__label">{item.label}</span>
              {item.badge ? <span className="pm-sidebar__badge">{item.badge}</span> : null}
            </NavLink>
          ))}
        </nav>
        <div className="pm-sidebar__footer">
          <Avatar name={user.name} initials={user.avatar} tone={user.tone} size="md" online />
          <div>
            <strong>{user.name}</strong>
            <span>{variant === 'pro' ? 'Professional' : 'Student'}</span>
          </div>
          <Button to="/settings" variant="ghost" size="sm">
            Settings
          </Button>
        </div>
      </aside>

      <div className="pm-app-shell__content">
        {!hideTopbar && (
        <header className="pm-topbar">
          <div className="pm-topbar__title">
            <button className="pm-icon-button pm-topbar__menu" type="button" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>
              <Icon name="menu" />
            </button>
            <div>
              <p className="pm-kicker">{title}</p>
              <span>{subtitle}</span>
            </div>
          </div>
          <button className="pm-search-trigger" type="button" onClick={() => setPaletteOpen(true)}>
            <Icon name="search" />
            <span>Search</span>
            <kbd>Cmd K</kbd>
          </button>
          <div className="pm-topbar__actions">
            <Link className="pm-topbar__bell" to="/notifications" aria-label="Notifications">
              <Icon name="bell" />
              <span>3</span>
            </Link>
            <details className="pm-profile-menu" open={profileMenuOpen} onToggle={(event) => setProfileMenuOpen(event.currentTarget.open)}>
              <summary>
                <Avatar name={user.name} initials={user.avatar} tone={user.tone} size="sm" online={false} />
              </summary>
              <div className="pm-profile-menu__panel">
                <Link to="/profile/me" onClick={() => setProfileMenuOpen(false)}>
                  View profile
                </Link>
                <Link to="/notifications" onClick={() => setProfileMenuOpen(false)}>
                  Notifications
                </Link>
                <Link to="/settings" onClick={() => setProfileMenuOpen(false)}>
                  Settings
                </Link>
                <Link to="/" onClick={() => setProfileMenuOpen(false)}>
                  Sign out
                </Link>
              </div>
            </details>
          </div>
        </header>
        )}

        <main id="main" className={cx('pm-main', hideTopbar && 'pm-main--no-topbar')}>
          {actions ? <div className="pm-main__actions">{actions}</div> : null}
          {children}
        </main>
      </div>

      {mobileOpen ? <button className="pm-app-shell__backdrop" type="button" aria-label="Close navigation" onClick={() => setMobileOpen(false)} /> : null}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}

function StudentHomePage() {
  usePageMeta('ProMatch | Student Home', 'Student dashboard overview with matches, activity, and profile growth signals.');

  return (
    <AppShell variant="student" title="Good morning, Alex" subtitle="You have 3 new match suggestions and 1 pending connection request." actions={<Button to="/student/discover">View matches</Button>}>
      <section className="pm-banner">
        <div>
          <p className="pm-kicker">Welcome back</p>
          <h1>Your ProMatch journey is moving.</h1>
          <p>Profile strength, fresh matches, and the next best action are all visible in one calm dashboard.</p>
        </div>
        <div className="pm-banner__actions">
          <Button to="/student/connections" variant="secondary">
            See request
          </Button>
          <Button to="/student/messages">Open inbox</Button>
        </div>
      </section>

      <section className="pm-stat-grid">
        <StatCard value="73%" label="Profile strength" detail="Complete your profile to raise match quality." ring={73} accent="teal" />
        <StatCard value="12" label="Matches today" detail="Fresh suggestions based on your latest activity." spark={[18, 32, 44, 38, 58, 64, 72]} accent="violet" />
        <StatCard value="5" label="Connections" detail="Builders you have already unlocked." spark={[22, 28, 24, 40, 48, 52, 60]} accent="amber" />
        <StatCard value="2" label="Events this week" detail="Community sessions worth joining." spark={[12, 20, 18, 24, 28, 34, 30]} accent="rose" />
      </section>

      <section className="pm-two-column">
        <div className="pm-panel">
          <SectionHeader eyebrow="Top matches" title="Your top matches today" description="These cards are ranked by the current fit signals on your profile." actions={<Button to="/student/discover" variant="ghost">See all</Button>} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[profiles.sarah, profiles.raj, profiles.mei].map((profile) => (
              <MiniProfileCard key={profile.id} profile={profile} compact ctaLabel="Connect" extraLink={`/profile/${profile.username}`} />
            ))}
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Activity" title="Recent activity" description="Keep track of connections, conversations, and event activity." />
          <div className="pm-activity-list">
            <ActivityItem icon="connections" title="Alex M. accepted your connection" meta="2h ago" unread />
            <ActivityItem icon="messages" title="New message from Priya K." meta="5h ago" unread />
            <ActivityItem icon="events" title="New event: AI Founders Meetup" meta="Yesterday" />
            <ActivityItem icon="chart" title="Your profile was viewed 8 times" meta="This week" />
          </div>
        </div>
      </section>

      <section className="pm-panel">
        <SectionHeader eyebrow="Checklist" title="Complete your profile to get better matches" description="Small profile actions unlock stronger recommendations." />
        <div className="pm-checklist">
          {[
            ['Add profile photo', true],
            ['Write your bio', true],
            ['Add skills', true],
            ['Add a social link', false],
            ['Book your first session', false],
            ['Attend an event', false],
          ].map(([label, done]) => (
            <div className={cx('pm-checklist__item', done && 'is-done')} key={label}>
              <span>{done ? '✓' : '○'}</span>
              <strong>{label}</strong>
              <Button variant="ghost" size="sm">
                {done ? 'Done' : 'Add'}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function DiscoverPage({ variant }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const profilesSource = variant === 'pro' ? proDiscoverProfiles : studentDiscoverProfiles;
  const SNAP_THRESHOLD = 0.3;
  const CONTAINER_HEIGHT = 600; // Fixed container height
  const SPRING_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  usePageMeta(
    variant === 'pro' ? 'ProMatch | Pro Discover' : 'ProMatch | Student Discover',
    'Swipe through AI-ranked discovery feed with instant loading and smooth transitions.',
  );

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientY);
    setDragDistance(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const distance = dragStart - currentY;
    setDragDistance(distance);
    setTranslateY(-distance);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = CONTAINER_HEIGHT * SNAP_THRESHOLD;
    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(profilesSource.length - 1, currentIndex + direction));
      setCurrentIndex(newIndex);
      setTranslateY(-(newIndex * CONTAINER_HEIGHT));
    } else {
      setTranslateY(-(currentIndex * CONTAINER_HEIGHT));
    }
    setDragDistance(0);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientY);
    setDragDistance(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const distance = dragStart - e.clientY;
    setDragDistance(distance);
    setTranslateY(-distance);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const threshold = CONTAINER_HEIGHT * SNAP_THRESHOLD;
    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(profilesSource.length - 1, currentIndex + direction));
      setCurrentIndex(newIndex);
      setTranslateY(-(newIndex * CONTAINER_HEIGHT));
    } else {
      setTranslateY(-(currentIndex * CONTAINER_HEIGHT));
    }
    setDragDistance(0);
  };

  const handleWheel = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Check if mouse is over the container
    const isOverContainer = e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!isOverContainer) return;
    
    // Prevent default scroll behavior
    e.preventDefault();
    
    // Clear any pending scroll timeouts
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Determine scroll direction (deltaY positive = scrolling down)
    const direction = e.deltaY > 0 ? 1 : -1;
    
    // Calculate new index
    const newIndex = Math.max(0, Math.min(profilesSource.length - 1, currentIndex + direction));
    
    // Update state
    setCurrentIndex(newIndex);
    setTranslateY(-(newIndex * CONTAINER_HEIGHT));
    
    // Debounce scroll to prevent too rapid scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 300);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add wheel listener with passive: false to allow preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex, profilesSource, CONTAINER_HEIGHT]);

  const snapProgress = Math.abs(dragDistance) / (CONTAINER_HEIGHT * SNAP_THRESHOLD);

  return (
    <AppShell
      variant={variant}
      title="Discover"
      subtitle="Swipe to explore"
    >
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            overflow: 'hidden',
            position: 'relative',
            height: `${CONTAINER_HEIGHT}px`,
            width: '100%',
            cursor: isDragging ? 'grabbing' : 'grab',
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            border: '1px solid rgba(15, 23, 42, 0.08)',
          }}
        >
          <div
            style={{
              transform: `translateY(${translateY}px)`,
              transition: isDragging ? 'none' : `transform 0.4s ${SPRING_EASING}`,
              height: `${(profilesSource?.length || 1) * CONTAINER_HEIGHT}px`,
              width: '100%',
            }}
          >
            {profilesSource && profilesSource.length > 0 ? (
              profilesSource.map((profile, index) => (
                <div
                  key={profile.id}
                  style={{
                    height: `${CONTAINER_HEIGHT}px`,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    boxSizing: 'border-box',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <MiniProfileCard profile={profile} extraLink={`/profile/${profile.username}`} />
                  </div>
                </div>
              ))
            ) : (
              <div style={{ height: `${CONTAINER_HEIGHT}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '18px' }}>
                No profiles available
              </div>
            )}
          </div>

          {isDragging && (
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                fontSize: '12px',
                padding: '6px 10px',
                borderRadius: '6px',
                background: snapProgress > 1 ? '#0ecfbf' : 'rgba(15, 23, 42, 0.1)',
                color: snapProgress > 1 ? 'white' : '#666',
              }}
            >
              {Math.round(snapProgress * 100)}%
            </div>
          )}
        </div>


      </div>
    </AppShell>
  );
}

function NetworkPage() {
  const [tab, setTab] = useState('all');

  usePageMeta('ProMatch | Pro Network', 'Professional network management with connection cards, domain groups, and pipeline tracking.');

  return (
    <AppShell variant="pro" title="Network" subtitle="Manage the relationships that matter most." actions={<Button to="/pro/inbox" variant="secondary">Open inbox</Button>}>
      <div className="pm-tab-row">
        {[
          ['all', 'All connections'],
          ['domain', 'By domain'],
          ['pipeline', 'Pipeline'],
          ['mutual', 'Mutual'],
          ['blocked', 'Blocked'],
        ].map(([id, label]) => (
          <button className={cx('pm-tab', tab === id && 'is-active')} key={id} type="button" onClick={() => setTab(id)}>
            {label}
          </button>
        ))}
      </div>

      {tab === 'all' ? (
        <section className="pm-card-grid">
          {[profiles.sarah, profiles.raj, profiles.priya, profiles.ethan].map((profile) => (
            <MiniProfileCard key={profile.id} profile={profile} compact ctaLabel="Message" secondaryLabel="Book call" extraLink={`/profile/${profile.username}`} />
          ))}
        </section>
      ) : null}

      {tab === 'domain' ? (
        <section className="pm-domain-grid">
          {['FinTech', 'Engineering', 'Product', 'Design'].map((domain) => (
            <article className="pm-card pm-domain-card" key={domain}>
              <SectionHeader eyebrow={domain} title={`${domain} connections`} description="Accordion-style groupings for a denser professional view." />
              <div className="pm-stack-list">
                <MiniProfileCard profile={domain === 'FinTech' ? profiles.priya : domain === 'Engineering' ? profiles.raj : domain === 'Product' ? profiles.sarah : profiles.nora} compact ctaLabel="Message" secondaryLabel="Book" extraLink={`/profile/${domain === 'FinTech' ? 'priya-khan' : domain === 'Engineering' ? 'raj-patel' : domain === 'Product' ? 'sarah-chen' : 'nora-khan'}`} />
              </div>
            </article>
          ))}
        </section>
      ) : null}

      {tab === 'pipeline' ? (
        <section className="pm-kanban">
          {[
            { label: 'Discovered', count: 12, profiles: [profiles.nora, profiles.priya] },
            { label: 'Reached out', count: 5, profiles: [profiles.raj] },
            { label: 'Session booked', count: 3, profiles: [profiles.sarah] },
            { label: 'Active partner', count: 8, profiles: [profiles.ethan] },
          ].map((column) => (
            <article className="pm-card pm-kanban-column" key={column.label}>
              <div className="pm-kanban-column__head">
                <strong>{column.label}</strong>
                <Badge tone="muted">{column.count}</Badge>
              </div>
              <div className="pm-stack-list">
                {column.profiles.map((profile) => (
                  <div className="pm-kanban-card" key={profile.id}>
                    <Avatar name={profile.name} initials={profile.avatar} tone={profile.tone} size="sm" />
                    <div>
                      <strong>{profile.name}</strong>
                      <span>{profile.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      ) : null}

      {tab === 'mutual' ? <section className="pm-card-grid"><MiniProfileCard profile={profiles.sarah} compact /><MiniProfileCard profile={profiles.priya} compact /></section> : null}
      {tab === 'blocked' ? <section className="pm-panel"><p>Blocked users can be searched and unblocked here once the account history grows.</p></section> : null}
    </AppShell>
  );
}

// MessagesPage removed - now imported from ./components/pages

function SessionsPage() {
  const [selectedDay, setSelectedDay] = useState(availabilityWeeks[0].date);
  const [selectedSlot, setSelectedSlot] = useState(availabilityWeeks[0].slots[0]);
  const selectedDayInfo = availabilityWeeks.find((day) => day.date === selectedDay) || availabilityWeeks[0];

  usePageMeta('ProMatch | Sessions', 'Student bookings and availability management for calls, feedback, and mentoring sessions.');

  return (
    <AppShell variant="student" title="Sessions" subtitle="Upcoming calls and your availability" actions={<Button to="/student/messages" variant="secondary">Back to messages</Button>}>
      <div className="pm-two-column pm-two-column--sessions">
        <section className="pm-panel">
          <SectionHeader eyebrow="Upcoming sessions" title="Your scheduled calls" description="Join, reschedule, or cancel without losing the conversation context." />
          <div className="pm-stack-list">
            {sessions.map((session, index) => (
              <SessionCard key={session.id} session={session} active={index === 0} />
            ))}
          </div>
        </section>

        <section className="pm-panel">
          <SectionHeader eyebrow="Availability" title="Set your availability" description="Click slots to signal when people can book with you." />
          <div className="pm-calendar-grid">
            {availabilityWeeks.map((day) => (
              <button className={cx('pm-day-card', selectedDay === day.date && 'is-active')} key={day.date} type="button" onClick={() => { setSelectedDay(day.date); setSelectedSlot(day.slots[0]); }}>
                <span>{day.day}</span>
                <strong>{day.date}</strong>
              </button>
            ))}
          </div>
          <div className="pm-slot-list">
            {selectedDayInfo.slots.map((slot) => (
              <button className={cx('pm-slot-card', selectedSlot === slot && 'is-active')} key={slot} type="button" onClick={() => setSelectedSlot(slot)}>
                {slot}
              </button>
            ))}
          </div>
          <div className="pm-card-actions">
            <Button variant="secondary">Set recurring slots</Button>
            <Button>Book a session</Button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function EventsPage({ variant }) {
  const { eventId } = useParams();
  const [filter, setFilter] = useState('All');
  const eventList = events.filter((event) => filter === 'All' || event.format === filter || event.domain === filter);
  const activeEvent = events.find((event) => event.id === eventId) || eventList[0] || events[0];

  usePageMeta(
    variant === 'pro' ? 'ProMatch | Pro Events' : 'ProMatch | Student Events',
    'Browse virtual and in-person events hosted by professionals and the community.',
  );

  return (
    <AppShell variant={variant} title="Events" subtitle={variant === 'pro' ? 'Community and founder events' : 'Student and community events'} actions={<Button variant="secondary">RSVP now</Button>}>
      <section className="pm-panel">
        <SectionHeader eyebrow="Featured" title={activeEvent.title} description={activeEvent.summary} />
        <div className="pm-featured-event">
          <div>
            <Badge tone={activeEvent.format === 'Virtual' ? 'teal' : 'violet'}>{activeEvent.format}</Badge>
            <div className="pm-featured-event__meta">
              <span>{activeEvent.date}</span>
              <span>{activeEvent.time}</span>
              <span>{activeEvent.attendees} attending</span>
            </div>
          </div>
          <div className="pm-card-actions">
            <Button variant="secondary">Save event</Button>
            <Button>RSVP now</Button>
          </div>
        </div>
      </section>

      <div className="pm-chip-row pm-chip-row--wide">
        {['All', 'Virtual', 'In-person', 'Product', 'Engineering', 'Design'].map((item) => (
          <Chip key={item} tone="muted" active={filter === item} onClick={() => setFilter(item)}>
            {item}
          </Chip>
        ))}
      </div>

      {eventId ? (
        <section className="pm-two-column pm-two-column--events">
          <div className="pm-panel">
            <SectionHeader eyebrow="Agenda" title="Event agenda" description="Each agenda item is designed to keep the session useful and easy to follow." />
            <ol className="pm-timeline">
              {activeEvent.agenda.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <div className="pm-panel">
            <SectionHeader eyebrow="Tags" title="Event context" description="A few clean tags help the right people show up." />
            <div className="pm-badge-row">
              {activeEvent.tags.map((tag) => (
                <Badge tone={tag === 'Design' ? 'rose' : tag === 'Engineering' || tag === 'ML' ? 'teal' : tag === 'Mentoring' ? 'violet' : 'amber'} key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
            <Button variant="secondary">Join calendar</Button>
          </div>
        </section>
      ) : null}

      <section className="pm-card-grid">
        {eventList.map((event) => (
          <EventCard key={event.id} event={event} variant={variant} />
        ))}
      </section>
    </AppShell>
  );
}

function StudentProgressPage() {
  usePageMeta('ProMatch | Student Progress', 'Track profile quality, activity growth, skill gaps, and your network progress.');

  return (
    <AppShell variant="student" title="My Progress" subtitle="See how your profile is growing over time" actions={<Button variant="secondary">Browse matches</Button>}>
      <section className="pm-panel pm-progress-hero">
        <SectionHeader eyebrow="Your ProMatch journey" title="Here's how you're growing as a builder" description="Visible progress gives people more confidence when they discover your profile." />
        <div className="pm-progress-hero__grid">
          <div className="pm-progress-ring-card">
            <MatchArc value={73} size={180} stroke={12} />
            <div>
              <strong>73 / 100</strong>
              <span>Profile score</span>
            </div>
          </div>
          <div className="pm-checklist pm-checklist--stacked">
            {[
              ['Profile photo added', true, '+10 pts'],
              ['Bio written', true, '+15 pts'],
              ['Skills added (5+)', true, '+20 pts'],
              ['Add LinkedIn link', false, '+10 pts'],
              ['First connection made', false, '+15 pts'],
              ['First session booked', false, '+20 pts'],
              ['Attend an event', false, '+10 pts'],
            ].map(([label, done, points]) => (
              <div className={cx('pm-checklist__item', done && 'is-done')} key={label}>
                <span>{done ? '✓' : '○'}</span>
                <strong>{label}</strong>
                <small>{points}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pm-stat-grid pm-stat-grid--progress">
        <StatCard value="28" label="Profile views" detail="Seven-day trend is improving." spark={[18, 14, 20, 30, 24, 34, 42]} accent="teal" />
        <StatCard value="5" label="Connections" detail="People you have unlocked so far." spark={[6, 8, 10, 16, 20, 22, 24]} accent="violet" />
        <StatCard value="12" label="Messages sent" detail="More activity means stronger signal." spark={[8, 10, 12, 14, 16, 20, 24]} accent="amber" />
        <StatCard value="1" label="Events attended" detail="One live event can improve match quality." spark={[4, 8, 8, 12, 16, 18, 20]} accent="rose" />
      </section>

      <section className="pm-two-column">
        <div className="pm-panel">
          <SectionHeader eyebrow="Match quality" title="Average match score of your top suggestions" description="A simple trendline keeps the improvement story visible." />
          <div className="pm-chart pm-chart--line">
            {[38, 48, 44, 58, 60, 64, 73].map((value, index) => (
              <span key={value} style={{ height: `${value}%`, animationDelay: `${index * 80}ms` }} />
            ))}
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Skill gaps" title="Skills in demand among your target connections" description="The most useful missing skill is often the easiest next move." />
          <div className="pm-skill-bars">
            {[
              ['Python', 80],
              ['System Design', 60],
              ['Product', 50],
            ].map(([label, value]) => (
              <div className="pm-skill-bar" key={label}>
                <span>{label}</span>
                <div>
                  <i style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function ProOverviewPage() {
  usePageMeta('ProMatch | Pro Overview', 'Professional dashboard overview with pipeline, inbox, matches, and schedule.');

  return (
    <AppShell variant="pro" title="Good morning, Priya" subtitle="Your professional pipeline looks active this week." actions={<Button variant="secondary">Share profile</Button>}>
      <section className="pm-banner">
        <div>
          <p className="pm-kicker">Overview</p>
          <h1>Good morning, Priya.</h1>
          <p>You have 3 priority match suggestions and 1 upcoming session this week.</p>
        </div>
        <div className="pm-banner__actions">
          <Button to="/pro/discover" variant="secondary">
            Invite to ProMatch
          </Button>
          <Button to="/pro/company">Share company</Button>
        </div>
      </section>

      <section className="pm-stat-grid pm-stat-grid--pro">
        <StatCard value="124" label="Profile views" detail="Up 14% vs last week." spark={[24, 28, 36, 42, 40, 48, 54]} accent="teal" />
        <StatCard value="38" label="Pipeline matches" detail="Waiting for your next action." spark={[10, 14, 18, 26, 30, 34, 38]} accent="violet" />
        <StatCard value="6" label="Sessions booked" detail="This month across calls and office hours." spark={[2, 4, 6, 8, 10, 12, 14]} accent="amber" />
        <StatCard value="94%" label="Response rate" detail="Reply speed is a major trust signal." ring={94} accent="teal" />
        <StatCard value="89/100" label="Match quality" detail="AI score based on profile fit." spark={[68, 70, 72, 78, 82, 84, 89]} accent="rose" />
      </section>

      <section className="pm-three-column">
        <div className="pm-panel">
          <SectionHeader eyebrow="Inbox" title="Recent threads" description="You can see the newest replies without leaving the overview." />
          <div className="pm-stack-list">
            {proThreads.slice(0, 3).map((thread) => (
              <button className="pm-thread-item is-static" key={thread.id} type="button">
                <Avatar name={thread.person.name} initials={thread.person.avatar} tone={thread.person.tone} size="sm" />
                <div>
                  <div className="pm-thread-item__head">
                    <strong>{thread.person.name}</strong>
                    <span>{thread.time}</span>
                  </div>
                  <p>{thread.last}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Priority matches" title="Today's top matches" description="Profiles sorted by AI score descending." />
          <div className="pm-stack-list">
            {[profiles.ethan, profiles.priya, profiles.sarah].map((profile) => (
              <MiniProfileCard key={profile.id} profile={profile} compact ctaLabel="Message" secondaryLabel="Book" extraLink={`/profile/${profile.username}`} />
            ))}
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="This week" title="Upcoming" description="Calls, events, and calendar context in one place." />
          <div className="pm-activity-list">
            <ActivityItem icon="calendar" title="Call with Rahul K." meta="Mon 27 · 2:00 PM" />
            <ActivityItem icon="events" title="AI Founders Meetup" meta="Wed 29 · 4:00 PM" />
            <ActivityItem icon="calendar" title="Call with Sneha M." meta="Thu 30 · 11:00 AM" />
          </div>
        </div>
      </section>

      <section className="pm-two-column">
        <div className="pm-panel">
          <SectionHeader eyebrow="Activity" title="Recent activity" description="Business-oriented events surface the next follow-up quickly." />
          <div className="pm-activity-list">
            <ActivityItem icon="messages" title="Priya K. responded to your message" meta="2h ago" unread />
            <ActivityItem icon="chart" title="Your profile rank improved to top 5% in FinTech" meta="This week" />
            <ActivityItem icon="connections" title="New mutual connection via Alex M." meta="Yesterday" />
            <ActivityItem icon="chart" title="8 people viewed your profile this week" meta="This week" />
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Pipeline" title="Connection pipeline" description="Track a simple movement from discovery to active partners." />
          <div className="pm-kanban pm-kanban--dense">
            {[
              { label: 'Discovered', count: 12, color: 'violet' },
              { label: 'Messaged', count: 5, color: 'teal' },
              { label: 'Session booked', count: 3, color: 'amber' },
              { label: 'Connected', count: 8, color: 'rose' },
            ].map((column) => (
              <article className="pm-kanban-column" key={column.label}>
                <div className="pm-kanban-column__head">
                  <strong>{column.label}</strong>
                  <Badge tone={column.color}>{column.count}</Badge>
                </div>
                <div className="pm-kanban-column__line" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function ProDiscoverPage() {
  return <DiscoverPage variant="pro" />;
}

function ProInboxPage() {
  return <MessagesPage variant="pro" />;
}

function ProCalendarPage() {
  const [monthView, setMonthView] = useState('monthly');

  usePageMeta('ProMatch | Calendar', 'Monthly and weekly calendar views for availability, sessions, and bookings.');

  return (
    <AppShell variant="pro" title="Calendar" subtitle="Availability and bookings for professional users" actions={<Button variant="secondary">Share availability</Button>}>
      <div className="pm-tab-row">
        {['monthly', 'weekly'].map((item) => (
          <button className={cx('pm-tab', monthView === item && 'is-active')} key={item} type="button" onClick={() => setMonthView(item)}>
            {item === 'monthly' ? 'Monthly view' : 'Weekly view'}
          </button>
        ))}
      </div>

      <div className="pm-two-column pm-two-column--calendar">
        <section className="pm-panel">
          <SectionHeader eyebrow="Calendar" title={monthView === 'monthly' ? 'Monthly view' : 'Weekly view'} description="A calendar-first layout makes it easy to keep a public schedule visible." />
          <div className="pm-calendar-board">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div className="pm-calendar-board__cell" key={day}>
                <span>{day}</span>
                <strong>{day === 'Thu' ? '2' : day === 'Mon' ? '1' : ''}</strong>
              </div>
            ))}
          </div>
        </section>
        <aside className="pm-panel">
          <SectionHeader eyebrow="Availability" title="Your availability" description="Control what is visible to connections and who can book you." />
          <div className="pm-stack-list">
            {sessions.map((session) => (
              <SessionCard key={session.id} session={session} active={session.id === 'intro'} />
            ))}
          </div>
          <Button variant="secondary">Set recurring slots</Button>
        </aside>
      </div>
    </AppShell>
  );
}

function ProAnalyticsPage() {
  usePageMeta('ProMatch | Analytics', 'Analytics, charts, and response metrics for professional users.');

  return (
    <AppShell variant="pro" title="Analytics" subtitle="Track the signals that shape your pipeline" actions={<Button variant="secondary">Export CSV</Button>}>
      <section className="pm-two-column pm-two-column--analytics">
        <div className="pm-panel">
          <SectionHeader eyebrow="Trends" title="Profile performance" description="Views vs connection requests over the last 30 days." />
          <div className="pm-chart pm-chart--area">
            {[30, 42, 36, 48, 52, 64, 60, 68, 74, 80, 78, 86].map((value, index) => (
              <span key={value} style={{ height: `${value}%`, animationDelay: `${index * 60}ms` }} />
            ))}
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Trends" title="Match quality trend" description="Weekly average AI match score across the last four weeks." />
          <div className="pm-chart pm-chart--bars">
            {[62, 70, 74, 81].map((value, index) => (
              <span key={value} style={{ height: `${value}%`, animationDelay: `${index * 60}ms` }} />
            ))}
          </div>
        </div>
      </section>

      <section className="pm-three-column">
        <div className="pm-panel">
          <SectionHeader eyebrow="Traffic" title="Where your views come from" />
          <div className="pm-donut-chart">
            <div className="pm-donut-chart__ring" />
            <div>
              <strong>45%</strong>
              <span>Feed discovery</span>
            </div>
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Matched skills" title="Top skills that got you matched" />
          <div className="pm-stack-list">
            {[
              ['Python', 18],
              ['System Design', 14],
              ['ML / AI', 11],
            ].map(([skill, count]) => (
              <div className="pm-skill-bar" key={skill}>
                <span>{skill}</span>
                <div>
                  <i style={{ width: `${count * 5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Response stats" title="Reply speed and booking stats" />
          <div className="pm-activity-list">
            <ActivityItem icon="messages" title="Sent messages" meta="24" />
            <ActivityItem icon="connections" title="Received replies" meta="22 - 91% reply rate" />
            <ActivityItem icon="calendar" title="Sessions booked" meta="6" />
          </div>
        </div>
      </section>
    </AppShell>
  );
}

function ProCompanyPage() {
  usePageMeta('ProMatch | Company', 'Create and edit a company profile with team, role, and skill requirements.');

  return (
    <AppShell variant="pro" title="Company" subtitle="Your startup page and needs profile" actions={<Button variant="secondary">Edit mode</Button>}>
      <section className="pm-panel">
        <div className="pm-company-header">
          <Avatar name="ArcVector" initials="AV" tone="violet" size="xl" />
          <div>
            <p className="pm-kicker">Company profile</p>
            <h1>ArcVector</h1>
            <p>Workflow automation for teams that want to move faster with less noise.</p>
          </div>
          <div className="pm-card-actions">
            <Button variant="secondary">Website</Button>
            <Button variant="secondary">LinkedIn</Button>
          </div>
        </div>
        <div className="pm-badge-row">
          <Badge tone="violet">Seed</Badge>
          <Badge tone="teal">FinTech</Badge>
          <Badge tone="amber">Hiring</Badge>
        </div>
      </section>

      <div className="pm-two-column pm-two-column--company">
        <div className="pm-panel">
          <SectionHeader eyebrow="Editable sections" title="About and what we're building" />
          <label className="pm-field">
            <span>About</span>
            <textarea className="pm-textarea" rows={4} defaultValue="ArcVector is building a workflow automation product for growing teams." />
          </label>
          <label className="pm-field">
            <span>What we're building</span>
            <textarea className="pm-textarea" rows={4} defaultValue="A faster way to automate repetitive work across tools, docs, and handoffs." />
          </label>
        </div>
        <div className="pm-panel">
          <SectionHeader eyebrow="Looking for" title="People who match what the company needs" />
          <div className="pm-chip-row">
            {['Technical co-founder', 'Product designer', 'ML engineer', 'Growth lead', 'Data engineer'].map((item) => (
              <Chip key={item} tone="teal" active>
                {item}
              </Chip>
            ))}
          </div>
          <div className="pm-stack-list">
            {[profiles.nora, profiles.priya, profiles.raj].map((profile) => (
              <MiniProfileCard key={profile.id} profile={profile} compact ctaLabel="Invite" secondaryLabel="Shortlist" extraLink={`/profile/${profile.username}`} />
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function SettingsPageOld() {
  const [tab, setTab] = useState('Profile');

  usePageMeta('ProMatch | Settings', 'Adjust profile, account, privacy, notifications, and billing settings.');

  const settingsContent = (
    <main id="main" className="pm-settings-layout">
        <aside className="pm-settings-nav pm-panel">
          {settingsTabs.map((item) => (
            <button className={cx('pm-settings-nav__item', tab === item && 'is-active')} key={item} type="button" onClick={() => setTab(item)}>
              {item}
            </button>
          ))}
        </aside>
        <section className="pm-settings-content pm-panel">
          {tab === 'Profile' ? (
            <>
              <SectionHeader eyebrow="Profile" title="Profile details" description="Auto-save the same fields used during onboarding." />
              <div className="pm-form-grid">
                <label className="pm-field">
                  <span>Full name</span>
                  <input className="pm-input" defaultValue={profiles.me.name} />
                </label>
                <label className="pm-field">
                  <span>Email</span>
                  <input className="pm-input" defaultValue="alex@pmatch.com" />
                </label>
                <label className="pm-field">
                  <span>Headline</span>
                  <input className="pm-input" defaultValue={profiles.me.headline} />
                </label>
              </div>
            </>
          ) : null}
          {tab === 'Account' ? (
            <>
              <SectionHeader eyebrow="Account" title="Account access" />
              <div className="pm-stack-list">
                <div className="pm-mini-stat"><span>Email</span><strong>alex@pmatch.com</strong></div>
                <div className="pm-mini-stat"><span>Password</span><strong>••••••••</strong></div>
                <div className="pm-mini-stat"><span>Connected accounts</span><strong>Google, LinkedIn</strong></div>
              </div>
            </>
          ) : null}
          {tab === 'Notifications' ? (
            <>
              <SectionHeader eyebrow="Notifications" title="Notification preferences" />
              <div className="pm-toggle-grid">
                {['New connection requests', 'New messages', 'Session reminders', 'Event reminders', 'Profile views', 'Weekly digest'].map((item) => (
                  <div className="pm-toggle-row" key={item}>
                    <span>{item}</span>
                    <div className="pm-toggle-row__controls">
                      <Badge tone="teal">Email</Badge>
                      <Badge tone="muted">In-app</Badge>
                      <Badge tone="violet">Push</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
          {tab === 'Privacy' ? (
            <>
              <SectionHeader eyebrow="Privacy" title="Profile visibility" />
              <div className="pm-card-actions">
                {['Public', 'Connections only', 'Hidden'].map((item) => (
                  <Chip key={item} tone="muted" active={item === 'Connections only'}>
                    {item}
                  </Chip>
                ))}
              </div>
              <div className="pm-stack-list">
                <div className="pm-mini-stat"><span>Show in discovery</span><strong>On</strong></div>
                <div className="pm-mini-stat"><span>Show online status</span><strong>Off</strong></div>
                <div className="pm-mini-stat"><span>Allowed messages</span><strong>Connections only</strong></div>
              </div>
            </>
          ) : null}
          {tab === 'Appearance' ? (
            <>
              <SectionHeader eyebrow="Appearance" title="Theme and motion" />
              <div className="pm-stack-list">
                <div className="pm-mini-stat"><span>Theme</span><strong>Dark</strong></div>
                <div className="pm-mini-stat"><span>Sidebar</span><strong>Compact rail</strong></div>
                <div className="pm-mini-stat"><span>Font size</span><strong>Default</strong></div>
              </div>
            </>
          ) : null}
          {tab === 'Billing' ? (
            <>
              <SectionHeader eyebrow="Billing" title="Current plan" />
              <div className="pm-stack-list">
                <div className="pm-mini-stat"><span>Plan</span><strong>Pro - $12/month</strong></div>
                <div className="pm-mini-stat"><span>Next billing</span><strong>Feb 28, 2025</strong></div>
              </div>
              <Button variant="secondary">Manage subscription</Button>
            </>
          ) : null}
          {tab === 'Danger Zone' ? (
            <>
              <SectionHeader eyebrow="Danger Zone" title="Irreversible account actions" />
              <div className="pm-card-actions">
                <Button variant="danger">Deactivate account</Button>
                <Button variant="danger">Delete account</Button>
              </div>
            </>
          ) : null}
        </section>
      </main>
    );

  return (
    <AppShell variant="student" title="Settings" subtitle="Manage your account and preferences">
      {settingsContent}
    </AppShell>
  );
}

function CallPage() {
  const { sessionId = 'sarah-chen' } = useParams();
  const profile = profiles[sessionId] || profiles.sarah;

  usePageMeta('ProMatch | Call room', 'Join a clean video call room with meeting controls and session context.');

  return (
    <div className="pm-call-page">
      <div className="pm-call-page__grain" />
      <a className="pm-skip-link" href="#main">
        Skip to content
      </a>
      <header className="pm-call-page__topbar">
        <Brand />
        <Button to={`/chat/${profile.username}`} variant="secondary">
          Back to chat
        </Button>
      </header>

      <main id="main" className="pm-call-room">
        <section className="pm-panel">
          <SectionHeader eyebrow="WebRTC room" title="Live call in progress" description="Mute, toggle camera, share screen, or end the session from one compact control bar." />
          <div className="pm-video-grid">
            <article className="pm-video-tile pm-video-tile--primary">
              <span>You</span>
              <Avatar name={profiles.me.name} initials={profiles.me.avatar} tone={profiles.me.tone} size="xl" />
            </article>
            <article className="pm-video-tile">
              <span>{profile.name}</span>
              <Avatar name={profile.name} initials={profile.avatar} tone={profile.tone} size="xl" />
            </article>
          </div>
          <div className="pm-call-controls">
            <button className="pm-control-button" type="button">Mute</button>
            <button className="pm-control-button" type="button">Camera</button>
            <button className="pm-control-button pm-control-button--danger" type="button">End</button>
            <button className="pm-control-button" type="button">Share</button>
          </div>
        </section>
      </main>
    </div>
  );
}

function LoginRoute() {
  return <LoginPage mode="login" />;
}

function SignupRoute() {
  return <LoginPage mode="signup" />;
}

function OnboardingRoot() {
  return <Navigate to="/onboarding/step-1" replace />;
}

function StudentHomeRoute() {
  return <StudentHomePage />;
}

function StudentDiscoverRoute() {
  return <DiscoverPage variant="student" />;
}

function StudentConnectionsRoute() {
  return <ConnectionsPage />;
}

function StudentMessagesRoute() {
  return <MessagesPage variant="student" />;
}

function StudentSessionsRoute() {
  return <SessionsPage />;
}

function StudentEventsRoute() {
  return <EventsPage variant="student" />;
}

function StudentProgressRoute() {
  return <StudentProgressPage />;
}

function ProOverviewRoute() {
  return <ProOverviewPage />;
}

function ProDiscoverRoute() {
  return <DiscoverPage variant="pro" />;
}

function ProNetworkRoute() {
  return <NetworkPage />;
}

function ProInboxRoute() {
  return <ProInboxPage />;
}

function ProCalendarRoute() {
  return <ProCalendarPage />;
}

function ProEventsRoute() {
  return <EventsPage variant="pro" />;
}

function ProAnalyticsRoute() {
  return <ProAnalyticsPage />;
}

function ProCompanyRoute() {
  return <ProCompanyPage />;
}

function LegacyChatRoute() {
  const { threadId } = useParams();
  return <Navigate to={`/student/messages/${threadId || 'sarah-chen'}`} replace />;
}

function LegacyBookingRoute() {
  return <Navigate to="/student/sessions" replace />;
}

function LegacyDiscoverRoute() {
  return <Navigate to="/student/discover" replace />;
}

function LegacyMatchesRoute() {
  return <Navigate to="/student/connections" replace />;
}

function LegacyEventsRoute() {
  const { eventId } = useParams();
  return <Navigate to={`/student/events/${eventId || 'career-night'}`} replace />;
}

function LegacyProfileRoute() {
  const { userId } = useParams();
  return <Navigate to={`/profile/${userId || 'me'}`} replace />;
}

function AppRoutes() {
  useLightThemeClass();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/signup" element={<SignupRoute />} />
        <Route path="/onboarding" element={<OnboardingRoot />} />
        <Route path="/onboarding/:step" element={<OnboardingPage />} />

        {/* Dashboard Pages */}
        <Route path="/dashboard/feed" element={<FeedPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/messages" element={<MessagesPage />} />
        <Route path="/dashboard/connections" element={<ConnectionsPage />} />
        <Route path="/dashboard/calendar" element={<CalendarPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
        <Route path="/dashboard/notifications" element={<NotificationsPage />} />
        <Route path="/dashboard/analytics" element={<AnalyticsPage />} />

        <Route path="/student" element={<Navigate to="/student/home" replace />} />
        <Route path="/student/home" element={<StudentHomeRoute />} />
        <Route path="/student/discover" element={<StudentDiscoverRoute />} />
        <Route path="/student/connections" element={<StudentConnectionsRoute />} />
        <Route path="/student/messages" element={<StudentMessagesRoute />} />
        <Route path="/student/messages/:threadId" element={<StudentMessagesRoute />} />
        <Route path="/student/sessions" element={<StudentSessionsRoute />} />
        <Route path="/student/events" element={<StudentEventsRoute />} />
        <Route path="/student/events/:eventId" element={<StudentEventsRoute />} />
        <Route path="/student/progress" element={<StudentProgressRoute />} />

        <Route path="/pro" element={<Navigate to="/pro/overview" replace />} />
        <Route path="/pro/overview" element={<ProOverviewRoute />} />
        <Route path="/pro/discover" element={<ProDiscoverRoute />} />
        <Route path="/pro/network" element={<ProNetworkRoute />} />
        <Route path="/pro/inbox" element={<ProInboxRoute />} />
        <Route path="/pro/inbox/:threadId" element={<ProInboxRoute />} />
        <Route path="/pro/calendar" element={<ProCalendarRoute />} />
        <Route path="/pro/events" element={<ProEventsRoute />} />
        <Route path="/pro/events/:eventId" element={<ProEventsRoute />} />
        <Route path="/pro/analytics" element={<ProAnalyticsRoute />} />
        <Route path="/pro/company" element={<ProCompanyRoute />} />

        <Route path="/feed" element={<Navigate to="/student/discover" replace />} />
        <Route path="/connections" element={<Navigate to="/student/connections" replace />} />
        <Route path="/messages" element={<Navigate to="/student/messages" replace />} />
        <Route path="/bookings" element={<Navigate to="/student/sessions" replace />} />
        <Route path="/events" element={<Navigate to="/student/events" replace />} />
        <Route path="/profile" element={<Navigate to="/profile/me" replace />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/call/:sessionId" element={<CallPage />} />

        <Route path="/discover" element={<LegacyDiscoverRoute />} />
        <Route path="/matches" element={<LegacyMatchesRoute />} />
        <Route path="/chat" element={<LegacyChatRoute />} />
        <Route path="/chat/:threadId" element={<LegacyChatRoute />} />
        <Route path="/booking" element={<LegacyBookingRoute />} />
        <Route path="/booking/:professionalId" element={<LegacyBookingRoute />} />
        <Route path="/events/:eventId" element={<LegacyEventsRoute />} />
        <Route path="/profile/:userId" element={<LegacyProfileRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default function ProMatchDarkApp() {
  return <AppRoutes />;
}
