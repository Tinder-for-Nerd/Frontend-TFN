import { useState } from 'react';
import { InstagramReelsFeed } from '../common';
import { Button } from '../ui';
import '../../styles/feed.css';

export function FeedPage() {
  const [filters, setFilters] = useState({ skill: '', intent: '' });

  return (
    <div className="pm-feed-page">
      <header className="pm-feed-header">
        <h1 className="pm-feed-header__title">Discover</h1>
        <div className="pm-feed-filters">
          <input
            type="text"
            placeholder="Search skills..."
            className="pm-feed-filters__input"
            value={filters.skill}
            onChange={(e) => setFilters({ ...filters, skill: e.target.value })}
          />
        </div>
      </header>

      <div className="pm-feed-container">
        <InstagramReelsFeed />
      </div>

      <footer className="pm-feed-footer">
        <Button variant="secondary" size="md">
          Skip
        </Button>
        <Button variant="primary" size="md">
          Match
        </Button>
      </footer>
    </div>
  );
}
