/** Freelancer / startup platform mock data */

export const FIT_SCORE_DEFAULT = {
  overall: 87,
  skills: 92,
  experience: 78,
  projects: 85,
  availability: 90,
};

export function buildFitScore(profile) {
  const base = profile?.match ?? 80;
  return {
    overall: base,
    skills: Math.min(99, base + 5),
    experience: Math.max(60, base - 8),
    projects: Math.min(99, base + 2),
    availability: Math.max(55, base - 4),
  };
}

export const freelancerProjects = [
  { id: 'p1', title: 'FinTech MVP — React + ML', client: 'NovaPay', status: 'active', progress: 68, due: 'Apr 18' },
  { id: 'p2', title: 'Design system audit', client: 'Grab Labs', status: 'active', progress: 40, due: 'Apr 25' },
  { id: 'p3', title: 'API integration sprint', client: 'Stealth startup', status: 'review', progress: 92, due: 'Apr 10' },
];

export const matchAlerts = [
  { id: 'm1', name: 'Sarah Chen', score: 94, intent: 'Mentor', time: '2m ago' },
  { id: 'm2', name: 'Raj Patel', score: 88, intent: 'Co-founder', time: '1h ago' },
];

export const profileStrength = [
  { label: 'Skills listed', done: true },
  { label: 'Portfolio linked', done: true },
  { label: 'Availability set', done: false },
  { label: 'Pro plan active', done: false },
];

export const portfolioAnalysis = {
  github: 'github.com/alexkumar',
  score: 82,
  badge: 'Strong',
  breakdown: [
    { label: 'Code quality', value: 86 },
    { label: 'Activity', value: 78 },
    { label: 'Documentation', value: 74 },
    { label: 'Test coverage', value: 68 },
    { label: 'Collaboration', value: 88 },
  ],
  repos: [
    { name: 'fintech-ml-app', stars: 42, lang: 'Python' },
    { name: 'react-portfolio', stars: 18, lang: 'TypeScript' },
  ],
};

export const hiringPipeline = {
  columns: [
    { id: 'applied', title: 'Applied', color: 'muted' },
    { id: 'screening', title: 'Screening', color: 'blue' },
    { id: 'interview', title: 'Interview', color: 'violet' },
    { id: 'offer', title: 'Offer', color: 'teal' },
  ],
  cards: [
    { id: 'a1', columnId: 'applied', name: 'Alex Kumar', role: 'Full-stack', score: 91, applied: '2d ago' },
    { id: 'a2', columnId: 'applied', name: 'Priya Sharma', role: 'ML Engineer', score: 88, applied: '3d ago' },
    { id: 'a3', columnId: 'screening', name: 'Liam O\'Connor', role: 'Frontend', score: 85, applied: '5d ago' },
    { id: 'a4', columnId: 'interview', name: 'Nora Khan', role: 'Product', score: 93, applied: '1w ago' },
    { id: 'a5', columnId: 'offer', name: 'Ethan Cho', role: 'Founding Engineer', score: 96, applied: '2w ago' },
  ],
};

export const analyticsTrend = [
  { month: 'Jan', matchQuality: 72, responseRate: 65, skillDemand: 58 },
  { month: 'Feb', matchQuality: 78, responseRate: 70, skillDemand: 62 },
  { month: 'Mar', matchQuality: 84, responseRate: 74, skillDemand: 71 },
  { month: 'Apr', matchQuality: 88, responseRate: 79, skillDemand: 76 },
  { month: 'May', matchQuality: 91, responseRate: 82, skillDemand: 80 },
  { month: 'Jun', matchQuality: 94, responseRate: 86, skillDemand: 84 },
];

export const skillDemandData = [
  { skill: 'React', demand: 92 },
  { skill: 'Python', demand: 88 },
  { skill: 'ML', demand: 85 },
  { skill: 'Product', demand: 74 },
  { skill: 'UX', demand: 70 },
];

export const PRO_FEATURES = [
  'Unlimited AI matches',
  'Advanced FitScore breakdown',
  'Priority in discovery feed',
  'Portfolio analyzer',
  'Analytics dashboard',
];

export const FREELANCER_ONBOARDING_STEPS = [
  { id: 'step-1', label: 'Basic info' },
  { id: 'step-2', label: 'Skills' },
  { id: 'step-3', label: 'Portfolio' },
  { id: 'step-4', label: 'Availability' },
];

export const STARTUP_ONBOARDING_STEPS = [
  { id: 'step-1', label: 'Company info' },
  { id: 'step-2', label: 'First project' },
];
