// publicNav.js – public-site navigation (landing, marketing pages)
export const publicNav = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#process' },
  { label: 'For teams', href: '#teams' },
  { label: 'Pricing', href: '#pricing' },
];

// Landing page content
export const landingFeatures = [
  {
    icon: 'spark',
    eyebrow: 'AI Match',
    title: 'Rank by skills, domain, intent, and working style.',
    body:
      'Embedding-aware signals keep the feed relevant as the network grows and the profile data gets richer.',
  },
  {
    icon: 'messages',
    eyebrow: 'Real-time chat',
    title: 'Keep momentum high the moment a match lands.',
    body:
      'Presence, typing states, and fast booking actions turn interest into a real conversation without friction.',
  },
  {
    icon: 'calendar',
    eyebrow: '1:1 calls',
    title: 'Move from discovery to a scheduled call in one flow.',
    body:
      'Availability, reminders, and notes live inside the product so people can actually follow through.',
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
    body:
      'Add skills, domain, intent, commitment, and a short bio so the feed has real context.',
  },
  {
    step: '03',
    title: 'Discover',
    body:
      'AI-ranked cards show the fit signals that matter most and keep the deck scannable.',
  },
  {
    step: '04',
    title: 'Connect',
    body:
      'Open chat, book a call, or jump into an event while the match is still fresh.',
  },
];

export const landingTestimonials = [
  {
    quote:
      'It feels like a premium recruiting tool instead of another noisy social app.',
    name: 'Maya Chen',
    role: 'Founder',
  },
  {
    quote:
      'The hierarchy is sharp, the feed is clear, and the matching story is easy to trust.',
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

// Pricing
export const pricingPlans = [
  {
    label: 'Free',
    price: '$0',
    body:
      'Discover people, send messages, book a few calls, and join community events.',
  },
  {
    label: 'Pro',
    price: '$12/mo',
    body:
      'Priority search, analytics, company profile, and richer pipeline management for serious operators.',
    featured: true,
  },
];

// Onboarding
export const onboardingSteps = [
  { id: 'step-1', label: 'Basic info' },
  { id: 'step-2', label: 'Skills and domain' },
  { id: 'step-3', label: 'Intent and goals' },
  { id: 'step-4', label: 'Preferences' },
];

// Skill & tagging vocabulary
export const skillTags = [
  'React',
  'Python',
  'Product',
  'Design',
  'Sales',
  'ML',
  'System Design',
  'Marketing',
  'No-code',
  'Research',
];

export const domainTags = [
  'FinTech',
  'EdTech',
  'HealthTech',
  'DeepTech',
  'Climate',
  'E-commerce',
  'SaaS',
  'Consumer',
  'Web3',
  'Other',
];

export const intentTags = ['Co-founder', 'Tech collab', 'Advisor', 'Side project'];

export const workStyleTags = ['Remote', 'In-person', 'Hybrid'];
export const commitmentTags = ['Part-time', 'Full-time', 'Flexible'];

export const socialTypes = ['LinkedIn', 'GitHub', 'Portfolio', 'Twitter'];

// Navigation configs
export const studentNav = [
  { label: 'Home', to: '/student/home', icon: 'home' },
  { label: 'Discover', to: '/student/discover', icon: 'spark' },
  { label: 'Messages', to: '/student/messages', icon: 'messages', badge: '2' },
  { label: 'Events', to: '/student/events', icon: 'events' },
  { label: 'My Progress', to: '/student/progress', icon: 'chart' },
  { label: 'Settings', to: '/settings', icon: 'settings' },
];

export const proNav = [
  { label: 'Overview', to: '/pro/overview', icon: 'home' },
  { label: 'Discover', to: '/pro/discover', icon: 'spark' },
  { label: 'Inbox', to: '/pro/inbox', icon: 'messages', badge: '3' },
  { label: 'Calendar', to: '/pro/calendar', icon: 'calendar' },
  { label: 'Events', to: '/pro/events', icon: 'events' },
  { label: 'Analytics', to: '/pro/analytics', icon: 'chart' },
  { label: 'My Company', to: '/pro/company', icon: 'company' },
  { label: 'Settings', to: '/settings', icon: 'settings' },
];

// Command palette
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

export const commandPaletteSections = [
  {
    title: 'Student',
    items: commandActions.filter((item) => item.group === 'Student'),
  },
  {
    title: 'Pro',
    items: commandActions.filter((item) => item.group === 'Pro'),
  },
  {
    title: 'Shared',
    items: commandActions.filter((item) => item.group === 'Shared'),
  },
];

// Profiles
export const profiles = {
  me: {
    id: 'me',
    username: 'me',
    name: 'Alex Kumar',
    title: 'Student & ML Engineer | FinTech Builder',
    role: 'Student & ML Engineer',
    audience: 'Student',
    domain: 'FinTech',
    intent: 'Co-founder',
    commitment: 'Flexible',
    workStyle: 'Hybrid',
    location: 'Singapore | Open to remote opportunities',
    avatar: 'AK',
    src: '/src/assets/alex-kumar.png',
    tone: 'teal',
    match: 73,
    verified: false,
    bio:
      'Developing ML-powered FinTech apps to solve real-world problems. Passionate about building projects, collaborating with peers, and scaling solutions.',
    headline: 'Driving FinTech innovation with ML & front-end expertise',
    skills: ['ML', 'FinTech', 'Front-End', 'Python', 'React'],
    goals: ['Find mentor', 'Book 1:1 sessions', 'Build portfolio projects'],
    why: [
      'Complete your social links',
      'Book your first session',
      'Attend an event',
    ],
    mutuals: 5,
    responseRate: '94%',
    avgResponse: '2 hours',
    views: 124,
    sessions: 4,
    events: 3,
    companyStage: '',
    links: ['LinkedIn', 'GitHub', 'Portfolio'],
    cover:
      'linear-gradient(135deg, rgba(14, 207, 191, 0.24), rgba(108, 92, 231, 0.18)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
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
    bio:
      'Product leader with 7 years in consumer apps, open to mentoring students in PM and UX.',
    headline: 'Open to mentoring students in PM and UX.',
    skills: ['UX', 'Product', 'Agile', 'Roadmapping'],
    goals: ['Mentoring', 'Project reviews', 'Speaking opportunities'],
    why: [
      'Shared product signals',
      'Fast response history',
      'Evening availability',
    ],
    mutuals: 6,
    responseRate: '94%',
    avgResponse: '2 hours',
    views: 188,
    sessions: 19,
    events: 6,
    companyStage: 'Series A',
    links: ['LinkedIn', 'Portfolio'],
    cover:
      'linear-gradient(135deg, rgba(14, 207, 191, 0.22), rgba(14, 207, 191, 0.06)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
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
    bio:
      'Design lead who likes product reviews, portfolio feedback, and tasteful side projects.',
    headline: 'Open to collaborating on a portfolio project.',
    skills: ['Figma', 'React', 'Research', 'Brand'],
    goals: ['Portfolio swaps', 'Co-building', 'Mentoring'],
    why: [
      'Strong design overlap',
      'High intent alignment',
      'Similar pace',
    ],
    mutuals: 3,
    responseRate: '91%',
    avgResponse: '3 hours',
    views: 112,
    sessions: 11,
    events: 4,
    companyStage: '',
    links: ['LinkedIn', 'Portfolio'],
    cover:
      'linear-gradient(135deg, rgba(252, 114, 177, 0.22), rgba(108, 92, 231, 0.08)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
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
    bio:
      'Engineer who likes mentorship, project reviews, and helping people ship clean software faster.',
    headline: 'Looking for a design-savvy side-project collaborator.',
    skills: ['React', 'Node', 'System Design', 'Testing'],
    goals: ['Collaboration', 'Internship pipeline', 'Office hours'],
    why: [
      'Shared stack signals',
      'Project momentum',
      'Remote-friendly',
    ],
    mutuals: 4,
    responseRate: '97%',
    avgResponse: '1 hour',
    views: 141,
    sessions: 14,
    events: 5,
    companyStage: '',
    links: ['LinkedIn', 'GitHub'],
    cover:
      'linear-gradient(135deg, rgba(108, 92, 231, 0.22), rgba(14, 207, 191, 0.08)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
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
    bio:
      'ML engineer who wants to build a fintech infrastructure product with a serious partner.',
    headline: 'Building credit scoring infrastructure and open to co-founding.',
    skills: ['Python', 'ML', 'Data', 'Finance'],
    goals: ['Co-founder', 'Technical partner', 'Advisor'],
    why: [
      'Same domain',
      'High signal profile',
      'Flexible availability',
    ],
    mutuals: 8,
    responseRate: '90%',
    avgResponse: '2 hours',
    views: 203,
    sessions: 9,
    events: 7,
    companyStage: 'Seed',
    links: ['LinkedIn', 'Portfolio'],
    cover:
      'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(14, 207, 191, 0.08)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
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
    bio:
      'Data scientist who mentors on interviews, ML projects, and building good habits.',
    headline: 'Available for mentoring and 1:1 reviews.',
    skills: ['Python', 'ML', 'Analytics', 'Research'],
    goals: ['Mentoring', 'Project reviews', 'Community talks'],
    why: [
      'Clear mentorship intent',
      'Complementary skills',
      'Remote-friendly',
    ],
    mutuals: 2,
    responseRate: '92%',
    avgResponse: '4 hours',
    views: 98,
    sessions: 8,
    events: 3,
    companyStage: '',
    links: ['LinkedIn'],
    cover:
      'linear-gradient(135deg, rgba(14, 207, 191, 0.18), rgba(108, 92, 231, 0.08)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
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
    bio:
      'Bootcamp grad and CS student building ML and front-end projects while applying for internships.',
    headline: 'Seeking internship guidance and product feedback.',
    skills: ['Python', 'React', 'SQL', 'ML'],
    goals: ['Find mentor', 'Book 1:1 sessions', 'Build portfolio projects'],
    why: [
      'Goal alignment',
      'Complementary skills',
      'High engagement',
    ],
    mutuals: 1,
    responseRate: '89%',
    avgResponse: '3 hours',
    views: 67,
    sessions: 3,
    events: 2,
    companyStage: '',
    links: ['LinkedIn', 'GitHub'],
    cover:
      'linear-gradient(135deg, rgba(252, 114, 177, 0.18), rgba(14, 207, 191, 0.06)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
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
    bio:
      'Growth marketer open to speaking, reviewing pitches, and helping people sharpen positioning.',
    headline: 'Happy to host talks on growth and storytelling.',
    skills: ['Growth', 'Content', 'Brand', 'Community'],
    goals: ['Mentoring', 'Speaking', 'Advising'],
    why: [
      'Speaking interest',
      'Strong network',
      'Growth domain',
    ],
    mutuals: 4,
    responseRate: '95%',
    avgResponse: '2 hours',
    views: 140,
    sessions: 7,
    events: 5,
    companyStage: '',
    links: ['LinkedIn'],
    cover:
      'linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(14, 207, 191, 0.06)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
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
    bio:
      'Founder building a workflow automation product and looking for technical and design depth.',
    headline: 'Looking for a technical co-founder or specialist collaborators.',
    skills: ['Product', 'Operations', 'SaaS', 'Strategy'],
    goals: ['Co-founder', 'Hiring', 'Advising'],
    why: [
      'Founder intent',
      'Stage overlap',
      'High activity',
    ],
    mutuals: 5,
    responseRate: '93%',
    avgResponse: '1 hour',
    views: 176,
    sessions: 12,
    events: 8,
    companyStage: 'Seed',
    links: ['LinkedIn', 'Website'],
    cover:
      'linear-gradient(135deg, rgba(108, 92, 231, 0.2), rgba(245, 158, 11, 0.06)), linear-gradient(180deg, rgba(17, 17, 17, 0.98), rgba(8, 8, 8, 0.92))',
  },
};

// Discovery / feeds
export const studentDiscoverProfiles = [
  profiles.sarah,
  profiles.raj,
  profiles.priya,
  profiles.liam,
  profiles.david,
  profiles.nora,
  profiles.mei,
];

export const proDiscoverProfiles = [
  profiles.mei,
  profiles.nora,
  profiles.raj,
  profiles.priya,
  profiles.ethan,
  profiles.sarah,
  profiles.liam,
];

// Connections (student context)
export const studentConnections = {
  suggested: [profiles.nora, profiles.priya, profiles.raj],
  pendingReceived: [profiles.mei, profiles.liam],
  pendingSent: [profiles.sarah],
  connected: [profiles.sarah, profiles.raj],
  shortlisted: [profiles.priya, profiles.nora],
};

// Messaging threads
export const studentThreads = [
  {
    id: 'sarah-chen',
    person: profiles.sarah,
    status: 'Online',
    unread: 2,
    last: 'Want to hop on a quick call next week?',
    time: '2m',
    messages: [
      {
        id: 1,
        from: 'them',
        body: 'Hey Alex, your portfolio looks strong.',
        time: '10:22',
      },
      {
        id: 2,
        from: 'me',
        body: 'Thanks. I would love feedback on PM skills.',
        time: '10:24',
      },
      {
        id: 3,
        from: 'them',
        body: 'Want to hop on a quick call next week?',
        time: '10:25',
      },
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
      {
        id: 1,
        from: 'them',
        body: 'Loved the ML project you shared.',
        time: '09:04',
      },
      {
        id: 2,
        from: 'me',
        body: 'Thanks, I am trying to turn it into a portfolio piece.',
        time: '09:07',
      },
      {
        id: 3,
        from: 'them',
        body: 'I can send a starter repo if you want.',
        time: '09:08',
      },
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
      {
        id: 1,
        from: 'them',
        body: 'Can you review my resume this week?',
        time: 'Yesterday',
      },
      {
        id: 2,
        from: 'me',
        body:
          'Yes. Send the latest version and the target role.',
        time: 'Yesterday',
      },
    ],
  },
];

export const proThreads = [
  {
    id: 'ethan-cho',
    person: profiles.ethan,
    status: 'Online',
    unread: 1,
    last: 'Could we talk about a co-founder profile?',
    time: '8m',
    messages: [
      {
        id: 1,
        from: 'me',
        body: 'Your product direction feels strong.',
        time: '10:10',
      },
      {
        id: 2,
        from: 'them',
        body: 'Could we talk about a co-founder profile?',
        time: '10:11',
      },
      {
        id: 3,
        from: 'me',
        body:
          'Yes, I can share a few options and next steps.',
        time: '10:14',
      },
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
      {
        id: 1,
        from: 'them',
        body: 'The workshop deck is ready for review.',
        time: '08:40',
      },
      {
        id: 2,
        from: 'me',
        body: 'Great, I will review it before lunch.',
        time: '08:43',
      },
    ],
  },
  {
    id: 'priya-khan',
    person: profiles.priya,
    status: 'Online',
    unread: 2,
    last:
      'The next session should include architecture notes.',
    time: '30m',
    messages: [
      {
        id: 1,
        from: 'them',
        body:
          'The next session should include architecture notes.',
        time: '11:00',
      },
      {
        id: 2,
        from: 'me',
        body: 'Agreed. I will add them to the brief.',
        time: '11:04',
      },
    ],
  },
];

// Calendar / sessions
export const sessions = [
  {
    id: 'intro',
    title: '30-min intro call',
    detail: 'Fast first meeting to get aligned',
    day: 'Tomorrow',
    time: '3:00 PM',
    mode: 'Video call',
  },
  {
    id: 'deep',
    title: '60-min deep dive',
    detail: 'Portfolio review and roadmap planning',
    day: 'Thu',
    time: '4:30 PM',
    mode: 'Video call',
  },
  {
    id: 'async',
    title: 'Async feedback',
    detail: 'Written notes and voice replies',
    day: 'Fri',
    time: 'All day',
    mode: 'Async',
  },
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
    summary:
      'Student showcases, mentor feedback, and open networking rooms.',
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
    summary:
      'Hands-on session with prompts, prototypes, and office hours.',
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
    summary:
      'Structured portfolio review with feedback from product and design leads.',
    agenda: ['Group review', 'Feedback notes', '1:1 follow-ups'],
  },
];

// Notifications
export const notifications = [
  {
    id: 1,
    icon: 'connections',
    title: 'Alex M. accepted your connection request',
    meta: '2 hours ago',
    action: 'View profile',
    unread: true,
  },
  {
    id: 2,
    icon: 'messages',
    title: 'Priya K. sent you a message',
    meta: '5 hours ago',
    action: 'Reply',
    unread: true,
  },
  {
    id: 3,
    icon: 'events',
    title: 'AI Founders Meetup starts tomorrow',
    meta: '1 day ago',
    action: 'RSVP',
    unread: false,
  },
  {
    id: 4,
    icon: 'chart',
    title: 'Your profile was viewed 8 times this week',
    meta: '2 days ago',
    action: 'Open analytics',
    unread: false,
  },
  {
    id: 5,
    icon: 'calendar',
    title: 'Your session with Sarah is confirmed',
    meta: '3 days ago',
    action: 'Join calendar',
    unread: false,
  },
];

// Command palette config (already computed from commandActions)
export const settingsTabs = [
  'Profile',
  'Account',
  'Notifications',
  'Privacy',
  'Appearance',
  'Billing',
  'Danger Zone',
];
