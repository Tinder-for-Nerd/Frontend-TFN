import { AUTH_ROLES, resolveAuthRole } from '../modules/auth/authConfig';

const WORKSPACE_KEY = 'pm_workspace';

export const PUBLIC_MARKETING_PATHS = ['/', '/features', '/about', '/contact'];

export function isPublicMarketingPath(pathname) {
  return PUBLIC_MARKETING_PATHS.includes(pathname) || pathname.startsWith('/preview/');
}

export function persistWorkspace(workspace) {
  if (typeof window !== 'undefined' && (workspace === 'pro' || workspace === 'student' || workspace === 'org')) {
    sessionStorage.setItem(WORKSPACE_KEY, workspace);
  }
}

/** Navbar workspace is tied to the account — not the current URL path. */
export function resolveWorkspace(user) {
  if (user?.role === 'pro' || user?.role === 'student' || user?.role === 'org') {
    return user.role;
  }

  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem(WORKSPACE_KEY);
    if (stored === 'pro' || stored === 'student' || stored === 'org') {
      return stored;
    }
  }

  return 'student';
}

export function getPublicNavLinks() {
  return [
    { label: 'Features', href: '/features' },
    { label: 'Discover', href: '/preview/discover' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Log in', href: '/login' },
  ];
}

export function getStudentNavLinks() {
  return [
    { label: 'Home', href: '/student/home' },
    { label: 'Discover', href: '/student/discover' },
    { label: 'Messages', href: '/student/messages' },
    { label: 'Connections', href: '/student/connections' },
    { label: 'Events', href: '/student/events' },
    { label: 'Settings', href: '/student/settings', activePrefix: '/student/settings' },
  ];
}

export function getProNavLinks() {
  return [
    { label: 'Overview', href: '/pro/overview', activePrefix: '/pro/overview' },
    { label: 'Discover', href: '/pro/discover', activePrefix: '/pro/discover' },
    { label: 'Inbox', href: '/pro/inbox', activePrefix: '/pro/inbox' },
    { label: 'Analytics', href: '/pro/analytics', activePrefix: '/pro/analytics' },
    { label: 'Hiring', href: '/startup/hiring', activePrefix: '/startup' },
    { label: 'Settings', href: '/pro/settings', activePrefix: '/pro/settings' },
  ];
}

export function getOrgNavLinks() {
  return [
    { label: 'Dashboard', href: '/org/dashboard', activePrefix: '/org/dashboard' },
    { label: 'Events', href: '/org/events', activePrefix: '/org/events' },
    { label: 'Settings', href: '/org/settings', activePrefix: '/org/settings' },
  ];
}

export function isNavLinkActive(link, pathname, defaultActive) {
  if (link.activePrefix) {
    return pathname === link.href || pathname.startsWith(`${link.activePrefix}/`) || pathname === link.activePrefix;
  }
  return defaultActive;
}

export function getDashboardForRole(roleId) {
  return AUTH_ROLES[resolveAuthRole(roleId)]?.dashboard ?? '/student/home';
}

function withoutDiscoverLinks(links) {
  return links.filter(
    (link) => link.label !== 'Discover' && !link.href.includes('/discover')
  );
}

function applyPublicNavOverrides(config, pathname) {
  if (!config.links) {
    return config;
  }

  if (PUBLIC_MARKETING_PATHS.includes(pathname)) {
    return {
      ...config,
      links: withoutDiscoverLinks(config.links),
    };
  }

  return config;
}

function getPublicNavConfig(pathname, isAuthenticated, user) {
  const workspace = resolveWorkspace(user);
  const dashboard = getDashboardForRole(workspace);

  return applyPublicNavOverrides(
    {
      hidden: false,
      variant: 'public',
      logoTo: '/',
      ctaLabel: isAuthenticated ? 'Open dashboard' : 'Get Started',
      ctaTo: isAuthenticated ? dashboard : '/login',
      links: getPublicNavLinks(),
    },
    pathname
  );
}

export function resolveSiteNav(location, isAuthenticated, user) {
  const workspace = resolveWorkspace(user);
  const isPro = workspace === 'pro';
  const isOnboarding = location.pathname.startsWith('/onboarding');
  const isCall = location.pathname.startsWith('/call');

  if (isOnboarding || isCall) {
    return { hidden: true };
  }

  if (isPublicMarketingPath(location.pathname)) {
    return getPublicNavConfig(location.pathname, isAuthenticated, user);
  }

  if (isAuthenticated && workspace === 'org') {
    return {
      hidden: false,
      variant: 'app',
      logoTo: '/org/dashboard',
      profileHref: '/profile/me',
      notificationsHref: '/notifications',
      links: getOrgNavLinks(),
    };
  }

  if (isAuthenticated && isPro) {
    return {
      hidden: false,
      variant: 'app',
      logoTo: '/pro/overview',
      profileHref: '/profile/me',
      notificationsHref: '/notifications',
      links: getProNavLinks(),
    };
  }

  if (isAuthenticated) {
    return {
      hidden: false,
      variant: 'app',
      logoTo: '/student/home',
      profileHref: '/profile/me',
      notificationsHref: '/notifications',
      links: getStudentNavLinks(),
    };
  }

  return getPublicNavConfig(location.pathname, isAuthenticated, user);
}
