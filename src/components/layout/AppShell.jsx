import { useEffect, useMemo, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { cx } from '../../utils/helpers';
import { Icon, Avatar } from '../ui';
import { Brand } from '../common/Brand';
import { CommandPalette } from '../common/CommandPalette';
import { proNav, studentNav } from '../../data/mockData';
import { profiles } from '../../constants/profiles';

export function AppShell({
  children,
  title = 'Tinder for Nerds',
  subtitle,
  variant = 'student',
  actions,
  hideTopbar = false,
  className = '',
  loading = false,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const navItems = variant === 'pro' ? proNav : studentNav;
  const user = profiles.me;

  const { mainNav, footerNav } = useMemo(() => {
    const footerLabels = new Set(['Settings', 'Support']);

    return {
      mainNav: navItems.filter((item) => !footerLabels.has(item.label)),
      footerNav: navItems.filter((item) => footerLabels.has(item.label)),
    };
  }, [navItems]);

  const bottomNav = useMemo(() => {
    if (variant !== 'student') return [];
    const pick = new Map(
      ['Home', 'Discover', 'Messages', 'Events', 'Settings'].map((label) => [label, true])
    );
    const items = navItems.filter((item) => pick.has(item.label));
    // Ensure stable order
    const order = ['Home', 'Discover', 'Messages', 'Events', 'Settings'];
    items.sort((a, b) => order.indexOf(a.label) - order.indexOf(b.label));
    return items;
  }, [navItems, variant]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      }

      if (event.key === 'Escape') {
        setPaletteOpen(false);
        setMobileOpen(false);
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const originalOverflow = window.getComputedStyle(document.body).overflow;
    const shouldLockScroll = mobileOpen || paletteOpen;

    if (shouldLockScroll) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [mobileOpen, paletteOpen]);

  const closeAllOverlays = () => {
    setMobileOpen(false);
    setPaletteOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <div
      className={cx(
        'pm-app-shell',
        collapsed && 'is-collapsed',
        mobileOpen && 'is-drawer-open',
        className
      )}
    >
      <a className="pm-skip-link" href="#main">
        Skip to content
      </a>

      <aside className={cx('pm-sidebar', collapsed && 'is-collapsed')}>
        <div className="pm-sidebar__brand-row">
          <Brand compact={collapsed} />
          <button
            className="pm-icon-button pm-sidebar__toggle"
            type="button"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onClick={() => setCollapsed((value) => !value)}
          >
            <Icon name={collapsed ? 'chevron-right' : 'menu'} />
          </button>
        </div>

        <div className="pm-sidebar__content">
          <nav className="pm-sidebar__nav" aria-label="Main navigation">
            {!collapsed && <div className="pm-sidebar__group-label">Dashboard</div>}

            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx('pm-sidebar__link', isActive && 'is-active')
                }
                title={collapsed ? item.label : undefined}
                onClick={() => setMobileOpen(false)}
              >
                <span className="pm-sidebar__icon">
                  <Icon name={item.icon} />
                </span>
                <span className="pm-sidebar__label">{item.label}</span>
                {item.badge ? (
                  <span className="pm-sidebar__badge">{item.badge}</span>
                ) : null}
              </NavLink>
            ))}
          </nav>

          <nav
            className="pm-sidebar__nav pm-sidebar__nav--footer"
            aria-label="Secondary navigation"
          >
            {!collapsed && <div className="pm-sidebar__group-label">Account</div>}

            {footerNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cx('pm-sidebar__link', isActive && 'is-active')
                }
                title={collapsed ? item.label : undefined}
                onClick={() => setMobileOpen(false)}
              >
                <span className="pm-sidebar__icon">
                  <Icon name={item.icon} />
                </span>
                <span className="pm-sidebar__label">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <Link to="/profile/me" className="pm-sidebar__user">
          <Avatar
            name={user.name}
            src={user.src}
            initials={user.avatar}
            tone={user.tone}
            size="md"
            online
          />
          {!collapsed && (
            <div className="pm-sidebar__user-info">
              <strong>{user.name}</strong>
              <span>{variant === 'pro' ? 'Pro Member' : 'Student'}</span>
            </div>
          )}
        </Link>
      </aside>

      <div className="pm-app-shell__content">
        {!hideTopbar && (
          <header className="pm-topbar">
            <div className="pm-topbar__title">
              <button
                className="pm-icon-button pm-topbar__menu"
                type="button"
                aria-label="Open navigation"
                onClick={() => setMobileOpen(true)}
              >
                <Icon name="menu" />
              </button>

              <div>
                <p className="pm-kicker">{title}</p>
                {subtitle ? <span>{subtitle}</span> : null}
              </div>
            </div>

            <button
              className="pm-search-trigger"
              type="button"
              onClick={() => setPaletteOpen(true)}
              aria-label="Open command palette"
            >
              <Icon name="search" />
              <span>Search for matches, skills...</span>
              <kbd>Cmd K</kbd>
            </button>

            <div className="pm-topbar__actions">
              <button
                className="pm-topbar__action pm-topbar__action--search"
                type="button"
                onClick={() => setPaletteOpen(true)}
                aria-label="Search"
              >
                <Icon name="search" />
              </button>

              <Link
                className="pm-topbar__action"
                to={variant === 'pro' ? '/pro/network' : '/student/connections'}
                aria-label="Connections"
              >
                <Icon name="connections" />
              </Link>

              <Link
                className="pm-topbar__bell"
                to="/notifications"
                aria-label="Notifications"
              >
                <Icon name="bell" />
                <span className="pm-notification-count">3</span>
              </Link>

              <details
                className="pm-profile-menu"
                open={profileMenuOpen}
                onToggle={(event) =>
                  setProfileMenuOpen(event.currentTarget.open)
                }
              >
                <summary aria-label="Open profile menu">
                  <Avatar
                    name={user.name}
                    src={user.src}
                    initials={user.avatar}
                    tone={user.tone}
                    size="sm"
                    online={false}
                  />
                </summary>

                <div className="pm-profile-menu__panel">
                  <Link to="/profile/me" onClick={() => setProfileMenuOpen(false)}>
                    View profile
                  </Link>
                  <Link
                    to={variant === 'pro' ? '/pro/settings' : '/student/settings'}
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr className="pm-divider" />
                  <Link to="/logout" onClick={() => setProfileMenuOpen(false)} className="is-logout">
                    Log out
                  </Link>
                </div>
              </details>
            </div>
          </header>
        )}

        <main
          id="main"
          className={cx(
            'pm-main',
            hideTopbar && 'pm-main--no-topbar',
            loading && 'is-loading'
          )}
        >
          {loading ? (
            <div className="pm-skeleton-container">
              <div className="pm-skeleton pm-skeleton--banner" />
              <div className="pm-skeleton-grid">
                <div className="pm-skeleton pm-skeleton--card" />
                <div className="pm-skeleton pm-skeleton--card" />
                <div className="pm-skeleton pm-skeleton--card" />
                <div className="pm-skeleton pm-skeleton--card" />
              </div>
            </div>
          ) : (
            <>
              {actions ? <div className="pm-main__actions">{actions}</div> : null}
              {children}
            </>
          )}
        </main>
      </div>

      {variant === 'student' ? (
        <nav className="pm-bottom-nav" aria-label="Student navigation">
          {bottomNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => cx('pm-bottom-nav__item', isActive && 'is-active')}
              onClick={() => setMobileOpen(false)}
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      ) : (
        <button
          className="pm-fab"
          type="button"
          onClick={() => navigate('/student/messages')}
          title="Quick message"
          aria-label="New message"
        >
          <Icon name="messages" size={24} />
        </button>
      )}

      {mobileOpen ? (
        <button
          className="pm-app-shell__backdrop"
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
