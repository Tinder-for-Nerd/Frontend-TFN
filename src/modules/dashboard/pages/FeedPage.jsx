import { useState } from 'react';
import { InstagramReelsFeed } from '../../../components/common';
import { Button } from '../../../components/ui';
import '../../../styles/feed.css';

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
        <InstagramReelsFeed
          profiles={[
            { id: 1, name: 'Maya Chen', role: 'Founder @ TechStart', bio: 'Building the next generation of developer tools.' },
            { id: 2, name: 'Andre Patel', role: 'Product Lead @ Innovate', bio: 'Looking for a technical co-founder.' }
          ]}
          renderCard={(profile) => (
            <div className="pm-card" style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}>
              <div className="pm-avatar" style={{ width: '80px', height: '80px', fontSize: '2rem', marginBottom: '1rem', background: 'var(--brand-teal)', color: '#fff' }}>{profile.name.charAt(0)}</div>
              <h2>{profile.name}</h2>
              <p className="pm-text-secondary" style={{ marginBottom: '1rem' }}>{profile.role}</p>
              <p>{profile.bio}</p>
            </div>
          )}
        />
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
