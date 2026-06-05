export interface Founder {
  id: string
  name: string
  title: string
  company: string
  location: string
  avatar: string
  bio: string
  skills: string[]
  lookingFor: string[]
  availability: 'open' | 'busy' | 'mentoring'
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  description: string
  attendees: number
  host: string
  hostRole: string
  tags: string[]
  type: 'workshop' | 'networking' | 'talk' | 'panel'
}

export interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  avatar: string
  quote: string
}

export interface Feature {
  id: string
  icon: string
  title: string
  description: string
}

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
]

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
]

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Tom Greer',
    title: 'Founder & CEO',
    company: 'Ping Studio',
    avatar: '',
    quote:
      'SkillSynth connected me with my technical co-founder within two weeks. The skill-matching algorithm is uncanny — it found someone whose experience complemented mine perfectly.',
  },
  {
    id: 't2',
    name: 'Lina Zhou',
    title: 'CTO',
    company: 'Botanica AI',
    avatar: '',
    quote:
      "I've mentored a dozen founders through SkillSynth this year. The platform makes it effortless to find founders who are actually ready for mentorship, not just looking for handouts.",
  },
  {
    id: 't3',
    name: 'Carlos Mendez',
    title: 'Angel Investor',
    company: 'Mendez Capital',
    avatar: '',
    quote:
      'As an investor, SkillSynth has become my deal-flow source. The quality of founders and the transparency of their profiles saves me weeks of screening.',
  },
]

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
]
