import { useCallback, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
import { NotificationCenter } from '../notifications/NotificationCenter';
import { profiles } from '../../data/mockData';
import { isNavLinkActive, resolveSiteNav } from '../../config/navigation';

function getProfileInitials(user) {
  const name = user?.name || profiles.me.name;
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function PublicNavLinks({ links, location, mobileOpen, closeMobile }) {
  return links.map((link) => (
    <NavLink
      key={`${link.label}-${link.href}`}
      to={link.href}
      end={!link.activePrefix}
      className={({ isActive }) =>
        isNavLinkActive(link, location.pathname, isActive) ? 'is-active' : undefined
      }
      onClick={closeMobile}
    >
      {link.label}
    </NavLink>
  ));
}

function AppNavLinks({ links, location, closeMobile }) {
  return links.map((link) => (
    <NavLink
      key={`${link.label}-${link.href}`}
      to={link.href}
      end={!link.activePrefix}
      className={({ isActive }) =>
        `site-header__link${isNavLinkActive(link, location.pathname, isActive) ? ' is-active' : ''}`
      }
      onClick={closeMobile}
    >
      {link.label}
    </NavLink>
  ));
}

export function SiteNav() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const config = resolveSiteNav(location, isAuthenticated, user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const profileInitials = useMemo(() => getProfileInitials(user), [user]);
  const profileImage = profiles.me.src;

  if (config.hidden) {
    return null;
  }

  const { variant, links, logoTo, ctaLabel, ctaTo, profileHref, notificationsHref } = config;
  const isAppNav = variant === 'app';

  if (!isAppNav) {
    return (
      <header className="taskly-nav site-header site-header--public">
        <div className="taskly-nav__inner">
          <Link className="taskly-brand" to={logoTo} onClick={closeMobile}>
            Tinder for Nerds
          </Link>

          <nav
            className={`taskly-nav__links ${mobileOpen ? 'is-open' : ''}`}
            aria-label="Primary navigation"
          >
            <PublicNavLinks
              links={links}
              location={location}
              mobileOpen={mobileOpen}
              closeMobile={closeMobile}
            />
            <Link className="taskly-nav__enter" to={ctaTo} onClick={closeMobile}>
              {ctaLabel}
            </Link>
          </nav>

          <div className="taskly-nav__actions">
            <Link className="taskly-signup" to={ctaTo}>
              {ctaLabel}
            </Link>
            <button
              type="button"
              className="taskly-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`site-header site-header--${variant}`}>
      <div className="site-header__inner">
        <Link className="site-header__brand" to={logoTo} onClick={closeMobile}>
          Tinder For Nerds
        </Link>

        <nav
          className={`site-header__nav ${mobileOpen ? 'is-open' : ''}`}
          aria-label="Primary navigation"
        >
          <AppNavLinks links={links} location={location} closeMobile={closeMobile} />
          <div className="site-header__mobile-actions">
            <NotificationCenter href={notificationsHref} />
            <NavLink
              to={profileHref}
              className={({ isActive }) =>
                `site-header__profile-btn${isActive || location.pathname.startsWith('/profile') ? ' is-active' : ''}`
              }
              aria-label="Your profile"
              onClick={closeMobile}
            >
              <Avatar
                name={user?.name || profiles.me.name}
                initials={profileInitials}
                src={profileImage}
                size="sm"
                tone="teal"
              />
            </NavLink>
          </div>
        </nav>

        <div className="site-header__actions">
          <NotificationCenter href={notificationsHref} />
          <NavLink
            to={profileHref}
            className={({ isActive }) =>
              `site-header__profile-btn${isActive || location.pathname.startsWith('/profile') ? ' is-active' : ''}`
            }
            aria-label="Your profile"
            onClick={closeMobile}
          >
            <Avatar
              name={user?.name || profiles.me.name}
              initials={profileInitials}
              src={profileImage}
              size="sm"
              tone="teal"
            />
          </NavLink>
          <button
            type="button"
            className="site-header__menu"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
