// Navigation
export const publicNav = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#process' },
  { label: 'For teams', href: '#teams' },
  { label: 'Pricing', href: '#pricing' },
];

export const studentNav = [
  { label: 'Home', to: '/student/home', icon: 'home' },
  { label: 'Discover', to: '/student/discover', icon: 'spark' },
  { label: 'Messages', to: '/student/messages', icon: 'messages', badge: '2' },
  { label: 'Events', to: '/student/events', icon: 'events' },
  { label: 'My Progress', to: '/student/progress', icon: 'chart' },
  { label: 'Profile', to: '/profile/me', icon: 'profile' },
  { label: 'Settings', to: '/settings', icon: 'settings' },
];

export const proNav = [
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

// Landing Page Content
export const landingFeatures = [
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

export const landingSteps = [
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

export const landingTestimonials = [
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

export const landingStats = [
  { value: '2,400+', label: 'Builders' },
  { value: '38', label: 'Cities' },
  { value: '91%', label: 'Match rate' },
  { value: '4.9/5', label: 'Rating' },
];

export const pricingPlans = [
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

export const onboardingSteps = [
  { id: 'step-1', label: 'Basic info' },
  { id: 'step-2', label: 'Skills and domain' },
  { id: 'step-3', label: 'Intent and goals' },
  { id: 'step-4', label: 'Preferences' },
];

// Tags
export const skillTags = ['React', 'Python', 'Product', 'Design', 'Sales', 'ML', 'System Design', 'Marketing', 'No-code', 'Research'];
export const domainTags = ['FinTech', 'EdTech', 'HealthTech', 'DeepTech', 'Climate', 'E-commerce', 'SaaS', 'Consumer', 'Web3', 'Other'];
export const intentTags = ['Co-founder', 'Tech collab', 'Advisor', 'Side project'];
export const workStyleTags = ['Remote', 'In-person', 'Hybrid'];
export const commitmentTags = ['Part-time', 'Full-time', 'Flexible'];
export const socialTypes = ['LinkedIn', 'GitHub', 'Portfolio', 'Twitter'];

export const commandActions = [
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

export const settingsTabs = ['Profile', 'Account', 'Notifications', 'Privacy', 'Appearance', 'Billing', 'Danger Zone'];

// Session and Availability
export const sessions = [
  { id: 'intro', title: '30-min intro call', detail: 'Fast first meeting to get aligned', day: 'Tomorrow', time: '3:00 PM', mode: 'Video call' },
  { id: 'deep', title: '60-min deep dive', detail: 'Portfolio review and roadmap planning', day: 'Thu', time: '4:30 PM', mode: 'Video call' },
  { id: 'async', title: 'Async feedback', detail: 'Written notes and voice replies', day: 'Fri', time: 'All day', mode: 'Async' },
];

export const availabilityWeeks = [
  { day: 'Mon', date: 21, slots: ['10:00 AM', '2:00 PM', '4:30 PM'] },
  { day: 'Tue', date: 22, slots: ['9:00 AM', '1:30 PM'] },
  { day: 'Wed', date: 23, slots: ['11:00 AM', '3:00 PM'] },
  { day: 'Thu', date: 24, slots: ['10:30 AM', '5:00 PM'] },
  { day: 'Fri', date: 25, slots: ['12:00 PM', '4:00 PM'] },
];

// Events
export const events = [
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

// Notifications
export const notifications = [
  { id: 1, icon: 'connections', title: 'Alex M. accepted your connection request', meta: '2 hours ago', action: 'View profile', unread: true },
  { id: 2, icon: 'messages', title: 'Priya K. sent you a message', meta: '5 hours ago', action: 'Reply', unread: true },
  { id: 3, icon: 'events', title: 'AI Founders Meetup starts tomorrow', meta: '1 day ago', action: 'RSVP', unread: false },
  { id: 4, icon: 'chart', title: 'Your profile was viewed 8 times this week', meta: '2 days ago', action: 'Open analytics', unread: false },
  { id: 5, icon: 'calendar', title: 'Your session with Sarah is confirmed', meta: '3 days ago', action: 'Join calendar', unread: false },
];
