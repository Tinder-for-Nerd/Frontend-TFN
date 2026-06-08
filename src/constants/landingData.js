export const publicNav = [
  { label: 'Features', href: '#features' },
  { label: 'For teams', href: '#teams' },
  { label: 'Pricing', href: '#pricing' },
];

export const landingFeatures = [
  {
    icon: 'spark',
    title: 'AI-Guided Matching',
    description: 'We don\'t just match resumes to keywords. Our AI learns your working style and matches you with peers who actually complement your goals.',
  },
  {
    icon: 'chart',
    title: 'Actionable Progress',
    description: 'Track your growth over time. Visualize the value you\'re getting from your matches and measure your momentum in real-time.',
  },
  {
    icon: 'calendar',
    title: 'Effortless Sessions',
    description: 'No more back-and-forth scheduling. Set your availability, find mutual time slots, and sync straight to your calendar.',
  },
  {
    icon: 'events',
    title: 'Curated Micro-Events',
    description: 'Drop into hyper-focused, small-group sessions. High signal, low noise. Meet people who care about exactly what you care about.',
  },
];

export const landingTestimonials = [
  {
    quote: "I've met more impactful collaborators here in two weeks than I did in two years of traditional networking events.",
    author: 'Sarah Chen',
    role: 'Senior Product Designer',
  },
  {
    quote: "Finally, a platform that cuts out the noise. The quality of conversations I've had here is consistently incredible.",
    author: 'Raj Patel',
    role: 'Engineering Lead',
  },
  {
    quote: "It actually feels like it understands my professional context. It's not just matching titles, it's matching intent.",
    author: 'Elena Rodriguez',
    role: 'Founder',
  },
];

export const pricingPlans = [
  {
    name: 'Student',
    price: '$0',
    description: 'Everything you need to kickstart your network.',
    features: ['3 AI matches per week', 'Basic chat history', 'Join community events', 'Public profile'],
    cta: 'Start for free',
  },
  {
    name: 'Professional',
    price: '$12',
    period: '/month',
    featured: true,
    description: 'For ambitious builders looking to scale their impact.',
    features: ['Unlimited AI matches', 'Advanced search filters', 'Priority event access', 'Session scheduling', 'Search visibility boost'],
    cta: 'Start free trial',
  },
  {
    name: 'Teams',
    price: '$49',
    period: '/seat/mo',
    description: 'Build an internal network of excellence.',
    features: ['Everything in Pro', 'Internal matching', 'Admin dashboard', 'Custom onboarding', 'Dedicated success manager'],
    cta: 'Contact sales',
  },
];

export const faqItems = [
  {
    question: 'How exactly does the AI matching work?',
    answer: 'Our algorithm considers your stated goals, your background, and your behavioral data on the platform to find people where a mutual connection drives value for both sides. We optimize for intent rather than just shared keywords.',
  },
  {
    question: 'Can I switch from a Student account to a Professional account later?',
    answer: 'Absolutely. Many of our users transition seamlessly once they land their first major role. Your profile history, connections, and progress will carry over untouched.',
  },
  {
    question: 'How are events structured?',
    answer: 'Events are capped at smaller, manageable group sizes (usually under 20) and are hyper-focused on specific challenges or domains. This ensures high-signal conversations and actual networking, not just passive listening.',
  },
  {
    question: 'Is my data private from my employer?',
    answer: 'Yes. Unless you are specifically on a sponsored Teams plan (which requires your explicit consent to join), your interactions, matches, and messages are completely private and decoupled from any corporate oversight.',
  },
];
