import { useEffect, useState } from 'react';
import { cx } from '../../utils/helpers';
import { CommandPalette } from '../common/CommandPalette';
import GridDistortion from '../ui/GridDistortion';
import lightTechBg from '../../assets/light-tech-background.png';

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
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setPaletteOpen(true);
      }

      if (event.key === 'Escape') {
        setPaletteOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showActionsBar = !hideTopbar && actions;

  return (
    <div
      className={cx(
        'pm-app-shell',
        `pm-app-shell--${variant}`,
        className
      )}
    >
      <div className="pm-shell-art" aria-hidden="true">
        <GridDistortion
          imageSrc={lightTechBg}
          grid={12}
          mouse={0.07}
          strength={0.1}
          relaxation={0.92}
          className="pm-shell-art__canvas"
        />
      </div>

      <a className="pm-skip-link" href="#main">
        Skip to content
      </a>

      <div className="pm-app-shell__content">
        {showActionsBar ? (
          <div className="pm-page-header pm-page-header--actions-only">
            <div className="pm-page-header__actions">{actions}</div>
          </div>
        ) : null}

        <main
          id="main"
          className={cx(
            'pm-main',
            !showActionsBar && 'pm-main--no-topbar',
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
            children
          )}
        </main>
      </div>

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
