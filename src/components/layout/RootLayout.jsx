import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { SiteNav } from './SiteNav';
import { isPublicMarketingPath } from '../../config/navigation';

export function RootLayout() {
  const { pathname } = useLocation();
  const isOnboarding = pathname.startsWith('/onboarding');
  const isCall = pathname.startsWith('/call');
  const isLanding = pathname === '/';
  const isAuth = pathname === '/login'
    || pathname.startsWith('/login/')
    || pathname.startsWith('/signup/');
  const isPublicMarketing = isPublicMarketingPath(pathname);

  useEffect(() => {
    document.documentElement.classList.toggle('pm-auth-route', isAuth);
    return () => document.documentElement.classList.remove('pm-auth-route');
  }, [isAuth]);

  const rootClass = [
    'site-root',
    isOnboarding && 'site-root--onboarding',
    isCall && 'site-root--call',
    isLanding && 'site-root--landing',
    isAuth && 'site-root--auth',
    isPublicMarketing && 'site-root--public-marketing',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClass}>
      {!isAuth ? <SiteNav /> : null}
      <div className="site-root__content">
        <Outlet />
      </div>
    </div>
  );
}
