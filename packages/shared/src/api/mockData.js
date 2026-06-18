export const mockUser = {
  id: 'me',
  name: 'Alex Builder',
  email: 'alex@promatch.dev',
  role: 'student',
  plan: 'free',
  avatar: 'AB',
};

export const mockProjects = [
  {
    id: 'project-ai-copilot',
    title: 'AI onboarding copilot',
    company: 'LaunchGrid',
    budget: '$2k - $4k',
    duration: '4 weeks',
    status: 'active',
    skills: ['React', 'Node', 'LLM'],
  },
  {
    id: 'project-data-dashboard',
    title: 'Analytics dashboard rebuild',
    company: 'SignalWorks',
    budget: '$5k - $8k',
    duration: '8 weeks',
    status: 'review',
    skills: ['Recharts', 'TypeScript', 'UX'],
  },
];

export const mockProfiles = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'Product Manager @ Grab',
    location: 'Singapore',
    avatar: 'SC',
    skills: ['Product', 'UX', 'React'],
    availability: 'Mentoring weekly',
    fitScore: {
      overall: 94,
      skill: 96,
      experience: 91,
      project: 93,
      availability: 95,
    },
  },
  {
    id: 'raj-patel',
    name: 'Raj Patel',
    title: 'Backend Engineer',
    location: 'Bengaluru',
    avatar: 'RP',
    skills: ['Python', 'Redis', 'Systems'],
    availability: 'Open to projects',
    fitScore: {
      overall: 88,
      skill: 90,
      experience: 86,
      project: 89,
      availability: 84,
    },
  },
];

export const mockConversations = [
  {
    id: 'sarah-chen',
    participant: mockProfiles[0],
    lastMessage: 'Happy to review the project brief.',
    unread: 2,
    online: true,
  },
  {
    id: 'raj-patel',
    participant: mockProfiles[1],
    lastMessage: 'I can help with the Redis queue design.',
    unread: 0,
    online: false,
  },
];

export const mockMessages = {
  'sarah-chen': [
    {
      id: 'm1',
      senderId: 'sarah-chen',
      text: 'Happy to review the project brief.',
      createdAt: new Date(Date.now() - 600000).toISOString(),
      read: true,
    },
  ],
  'raj-patel': [
    {
      id: 'm2',
      senderId: 'raj-patel',
      text: 'I can help with the Redis queue design.',
      createdAt: new Date(Date.now() - 1800000).toISOString(),
      read: true,
    },
  ],
};

export const mockNotifications = [
  {
    id: 'notif-match',
    type: 'match',
    title: 'New high-fit match',
    message: 'Sarah Chen is a 94% match for your goals.',
    read: false,
    createdAt: new Date().toISOString(),
  },
];
