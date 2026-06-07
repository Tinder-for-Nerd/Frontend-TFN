import { Outlet, useLocation } from 'react-router-dom';
import { SiteNav } from './SiteNav';

export function RootLayout() {
  const { pathname } = useLocation();
  const isOnboarding = pathname.startsWith('/onboarding');
  const isCall = pathname.startsWith('/call');
  const isAuth = pathname === '/login'
    || pathname.startsWith('/login/')
    || pathname.startsWith('/signup/');

  const rootClass = [
    'site-root',
    isOnboarding && 'site-root--onboarding',
    isCall && 'site-root--call',
    isAuth && 'site-root--auth',
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
