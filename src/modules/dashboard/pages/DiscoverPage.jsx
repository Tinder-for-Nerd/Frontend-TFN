import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, Users } from 'lucide-react';
import { AppShell } from '../../../components/layout';
import { Button } from '../../../components/ui';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { studentDiscoverProfiles, proDiscoverProfiles } from '../../../data/mockData';
import {
  DiscoverFilters,
  MatchModal,
  SwipeStack,
  EMPTY_DISCOVER_FILTERS,
  filterDiscoverProfiles,
  preloadDiscoverImages,
  shouldMatchOnConnect,
} from '../components/discover';
import '../../../styles/discover.css';

export function DiscoverPage({ variant = 'student' }) {
  const defaultProfiles = variant === 'pro' ? proDiscoverProfiles : studentDiscoverProfiles;

  const profileBase = variant === 'pro' ? '/pro/profile' : '/profile';
  const messagesPath = variant === 'pro' ? '/pro/inbox' : '/student/messages';

  const [filters, setFilters] = useState(EMPTY_DISCOVER_FILTERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchProfile, setMatchProfile] = useState(null);

  const filteredProfiles = useMemo(
    () => filterDiscoverProfiles(defaultProfiles, filters),
    [defaultProfiles, filters],
  );

  const remainingCount = Math.max(filteredProfiles.length - currentIndex, 0);
  const hasProfiles = remainingCount > 0;

  usePageMeta(
    variant === 'pro' ? 'Tinder For Nerds | Pro Discover' : 'Tinder For Nerds | Discover Matches',
    'Swipe through skill-first matches with filters and spring animations.',
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    preloadDiscoverImages(filteredProfiles, currentIndex, 6);
  }, [filteredProfiles, currentIndex]);

  const handleFilterChange = useCallback((patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setCurrentIndex(0);
  }, []);

  const handlePass = useCallback(() => {}, []);

  const handleConnect = useCallback(() => {
    const profile = filteredProfiles[currentIndex];
    if (profile && shouldMatchOnConnect(profile, false)) {
      setMatchProfile(profile);
    }
  }, [currentIndex, filteredProfiles]);

  const handleSuper = useCallback(() => {
    const profile = filteredProfiles[currentIndex];
    if (profile) {
      setMatchProfile(profile);
    }
  }, [currentIndex, filteredProfiles]);

  const handleSwipeComplete = useCallback(() => {
    setCurrentIndex((index) => index + 1);
  }, []);

  const handleReset = useCallback(() => {
    setFilters(EMPTY_DISCOVER_FILTERS);
    setCurrentIndex(0);
    setMatchProfile(null);
  }, []);

  return (
    <AppShell variant={variant} hideTopbar className="pm-app-shell--discover-page">
      <div className="discover">
        <header className="discover__header">
          <div>
            <h1 className="discover__title">Discover</h1>
            <p className="discover__subtitle">
              {hasProfiles
                ? `${remainingCount} profile${remainingCount === 1 ? '' : 's'} in your queue`
                : 'Adjust filters or reset to see more matches'}
            </p>
          </div>
          <Button variant="secondary" size="sm" className="discover__reset-btn" onClick={handleReset}>
            <RefreshCw size={16} />
            Reset
          </Button>
        </header>

        <div className="discover__layout">
          <DiscoverFilters
            filters={filters}
            onChange={handleFilterChange}
            className="discover__filters"
          />

          <div className="discover__stage">
            {hasProfiles ? (
              <SwipeStack
                profiles={filteredProfiles}
                currentIndex={currentIndex}
                profileBase={profileBase}
                onPass={handlePass}
                onConnect={handleConnect}
                onSuper={handleSuper}
                onSwipeComplete={handleSwipeComplete}
              />
            ) : (
              <div className="discover__empty">
                <div className="discover__empty-icon">
                  <Users size={40} />
                </div>
                <h2>No more profiles</h2>
                <p>
                  You&apos;ve seen everyone matching your filters. Try broadening your search or
                  start over.
                </p>
                <Button variant="primary" onClick={handleReset}>
                  <RefreshCw size={16} />
                  Start over
                </Button>
              </div>
            )}
          </div>
        </div>

        <MatchModal
          isOpen={Boolean(matchProfile)}
          matchProfile={matchProfile}
          messagesPath={messagesPath}
          onClose={() => setMatchProfile(null)}
        />
      </div>
    </AppShell>
  );
}
