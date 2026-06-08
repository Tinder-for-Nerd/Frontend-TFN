export const AUTH_ROLES = {
  student: {
    id: 'student',
    path: 'student',
    label: 'Student',
    icon: '🎓',
    accent: 'coral',
    tagline: 'Your next co-founder is one swipe away.',
    loginTitle: 'Welcome back, builder',
    loginSubtitle: 'Sign in to your student account',
    signupTitle: 'Join as a student',
    signupSubtitle: 'Start matching with builders on campus and beyond',
    signupLink: 'Join as a Student →',
    signupHref: '/signup/student',
    toggleLogin: '/login/student',
    dashboard: '/student/home',
    onboarding: '/onboarding/step-1?role=student',
    oauthOrder: ['google', 'linkedin'],
    tags: ['Hackathons', 'Side projects', 'Early teams'],
    description: 'Hackathons, side projects, early teams',
  },
  pro: {
    id: 'pro',
    path: 'professional',
    label: 'Professional',
    icon: '💼',
    accent: 'blue',
    tagline: 'Where serious builders find their technical co-founder.',
    loginTitle: 'Sign in as a Professional',
    loginSubtitle: 'Access your pipeline, matches, and session bookings',
    signupTitle: 'Join as a professional',
    signupSubtitle: 'Connect with vetted student builders and co-founders',
    signupLink: 'Join as a Professional →',
    signupHref: '/signup/professional',
    toggleLogin: '/login/professional',
    dashboard: '/pro/overview',
    onboarding: '/onboarding/step-1?role=professional',
    oauthOrder: ['linkedin', 'google'],
    tags: ['Co-founders', 'Advisors', 'Freelancers'],
    description: 'Co-founders, advisors, freelancers',
  },
  org: {
    id: 'org',
    path: 'organization',
    label: 'Organization',
    icon: '🏢',
    accent: 'gold',
    tagline: "Your community's builder network, supercharged.",
    loginTitle: 'Organization login',
    loginSubtitle: 'Manage cohorts, events, and community connections',
    signupTitle: 'Apply for organization access',
    signupSubtitle: 'Vetted accounts for GDGs, incubators, and clubs',
    signupLink: 'Apply for access →',
    signupHref: '/signup/organization',
    toggleLogin: '/login/organization',
    dashboard: '/org/dashboard',
    onboarding: '/onboarding/step-1?role=organization',
    oauthOrder: ['google'],
    tags: ['GDG Chapters', 'Incubators', 'Accelerators'],
    description: 'Incubators, GDGs, startup clubs',
    emailPlaceholder: 'name@gdgchennai.org',
  },
};

export const ROLE_SELECTOR_CARDS = [
  AUTH_ROLES.student,
  AUTH_ROLES.pro,
  AUTH_ROLES.org,
];

export function resolveAuthRole(input) {
  if (!input) return 'student';
  const value = String(input).toLowerCase();
  if (value === 'pro' || value === 'professional') return 'pro';
  if (value === 'org' || value === 'organization') return 'org';
  return 'student';
}

export function getRoleByPath(pathSegment) {
  return Object.values(AUTH_ROLES).find((role) => role.path === pathSegment) ?? AUTH_ROLES.student;
}

export function getDashboardForRole(roleId) {
  return AUTH_ROLES[resolveAuthRole(roleId)]?.dashboard ?? '/student/home';
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateLoginForm({ email, password, name, isSignup }) {
  const errors = {};

  if (!email) {
    errors.email = 'Enter your email address';
  } else if (!isValidEmail(email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!password) {
    errors.password = 'Enter your password';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (isSignup && !name?.trim()) {
    errors.name = 'Enter your full name';
  }

  return errors;
}
