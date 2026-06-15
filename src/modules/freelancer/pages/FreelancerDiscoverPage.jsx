import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import { Button } from '../../../components/ui';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { FitScore } from '../../../components/fit/FitScore';
import {
  DiscoverFilters,
  SwipeStack,
  MatchModal,
  EMPTY_DISCOVER_FILTERS,
  filterDiscoverProfiles,
  shouldMatchOnConnect,
} from '../../dashboard/components/discover';
import { studentDiscoverProfiles } from '../../../data/mockData';
import '../../../styles/discover.css';

export function FreelancerDiscoverPage() {
  const [filters, setFilters] = useState(EMPTY_DISCOVER_FILTERS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchProfile, setMatchProfile] = useState(null);

  const filtered = useMemo(() => filterDiscoverProfiles(studentDiscoverProfiles, filters), [filters]);
  const current = filtered[currentIndex];
  const remaining = Math.max(filtered.length - currentIndex, 0);

  usePageMeta('Discover freelancers | Tinder for Nerds', 'AI-ranked discovery feed with FitScore.');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleFilterChange = useCallback((patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
    setCurrentIndex(0);
  }, []);

  const handleConnect = useCallback(() => {
    const profile = filtered[currentIndex];
    if (profile && shouldMatchOnConnect(profile, false)) setMatchProfile(profile);
  }, [currentIndex, filtered]);

  const handleSuper = useCallback(() => {
    const profile = filtered[currentIndex];
    if (profile) setMatchProfile(profile);
  }, [currentIndex, filtered]);

  return (
    <AppShell variant="student" hideTopbar className="pm-app-shell--discover-page">
      <div className="discover discover--freelancer">
        <header className="discover__header">
          <div>
            <h1 className="discover__title">AI-ranked feed</h1>
            <p className="discover__subtitle">{remaining} matches · sorted by FitScore</p>
          </div>
          <Button variant="secondary" size="sm" to="/freelancer/dashboard">Dashboard</Button>
        </header>

        <div className="discover__layout discover__layout--feed">
          <DiscoverFilters filters={filters} onChange={handleFilterChange} className="discover__filters" />

          <div className="discover__stage discover__stage--split">
            {current ? (
              <>
                <div className="discover__fit-panel">
                  <FitScore profile={current} showBars />
                  <Link to={`/freelancer/profile/${current.username}`} className="discover__profile-link">
                    View full profile →
                  </Link>
                </div>
                <SwipeStack
                  profiles={filtered}
                  currentIndex={currentIndex}
                  profileBase="/freelancer/profile"
                  onConnect={handleConnect}
                  onSuper={handleSuper}
                  onPass={() => {}}
                  onSwipeComplete={() => setCurrentIndex((i) => i + 1)}
                />
              </>
            ) : (
              <div className="discover__empty">
                <h2>No more matches</h2>
                <p>Adjust filters or check back later.</p>
                <Button variant="primary" onClick={() => { setFilters(EMPTY_DISCOVER_FILTERS); setCurrentIndex(0); }}>Reset filters</Button>
              </div>
            )}
          </div>
        </div>

        <MatchModal isOpen={Boolean(matchProfile)} matchProfile={matchProfile} messagesPath="/student/messages" onClose={() => setMatchProfile(null)} />
      </div>
    </AppShell>
  );
}
