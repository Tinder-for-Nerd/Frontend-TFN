import { useCallback, useMemo, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Bell, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../ui/Avatar';
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

  return (
    <header className={`site-header site-header--${variant}`}>
      <div className="site-header__inner">
        <Link className="site-header__brand" to={logoTo} onClick={closeMobile}>
          ProMatch
        </Link>

        <nav
          className={`site-header__nav ${mobileOpen ? 'is-open' : ''}`}
          aria-label="Primary navigation"
        >
          {links.map((link) => (
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
          ))}
          {isAppNav ? (
            <div className="site-header__mobile-actions">
              <NavLink
                to={notificationsHref}
                className={({ isActive }) =>
                  `site-header__icon-btn${isActive ? ' is-active' : ''}`
                }
                aria-label="Notifications"
                onClick={closeMobile}
              >
                <Bell size={20} />
              </NavLink>
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
          ) : null}
          {!isAppNav && ctaTo ? (
            <Link className="site-header__cta site-header__cta--mobile" to={ctaTo} onClick={closeMobile}>
              {ctaLabel}
            </Link>
          ) : null}
        </nav>

        <div className="site-header__actions">
          {isAppNav ? (
            <>
              <NavLink
                to={notificationsHref}
                className={({ isActive }) =>
                  `site-header__icon-btn${isActive ? ' is-active' : ''}`
                }
                aria-label="Notifications"
                onClick={closeMobile}
              >
                <Bell size={20} />
              </NavLink>
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
            </>
          ) : (
            <Link className="site-header__cta" to={ctaTo}>
              {ctaLabel}
            </Link>
          )}
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
