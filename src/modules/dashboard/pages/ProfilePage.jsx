import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Icon } from '../../../components/ui';
import { profiles as allProfiles } from '../../../data/mockData';
import '../../../styles/profile.css';

export function ProfilePage() {
  const { username = 'me' } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const initialProfile = useMemo(() => {
    const candidates = Object.values(allProfiles ?? {});
    const found = candidates.find((p) => p?.username === username);
    return found ?? allProfiles?.me ?? candidates[0] ?? null;
  }, [username]);

  const [profile, setProfile] = useState(() => initialProfile);

  // Keep UI in sync when switching between /profile/:username routes.
  useEffect(() => {
    setProfile(initialProfile);
    setIsEditing(false);
    setActiveTab('overview');
  }, [initialProfile]);

  const isMe = (profile?.username ?? 'me') === 'me';

  const primaryActions = isMe ? (
    <div className="pm-gh-actions">
      <Button variant="secondary" size="sm" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Save changes' : 'Edit profile'}
      </Button>
      <Button variant="secondary" size="sm">
        <Icon name="more" size={16} />
      </Button>
    </div>
  ) : (
    <div className="pm-gh-actions">
      <Button
        to={`/student/sessions?with=${encodeURIComponent(profile?.username ?? username)}`}
        variant="primary"
        size="sm"
      >
        Schedule meeting
      </Button>
      <Button to="/student/messages" variant="secondary" size="sm">
        Message
      </Button>
      <Button variant="secondary" size="sm" aria-label="More actions">
        <Icon name="more" size={16} />
      </Button>
    </div>
  );

  return (
    <AppShell
      variant="student"
      title={profile?.name ?? 'Profile'}
      subtitle={isMe ? 'Your profile' : 'Profile'}
      actions={null}
    >
      <div className="pm-profile-page">
        <div className="pm-gh-profile">
          <aside className="pm-gh-sidebar" aria-label="Profile sidebar">
            <div className="pm-gh-avatar">
              <div
                className="pm-gh-avatar__img"
                style={
                  profile?.src
                    ? {
                        backgroundImage: `url(${profile.src})`,
                      }
                    : undefined
                }
                aria-label={profile?.name ?? 'Profile photo'}
              >
                {!profile?.src ? (profile?.avatar ?? 'ME') : null}
              </div>
            </div>

            <div className="pm-gh-identity">
              <h1 className="pm-gh-name">{profile?.name ?? 'Profile'}</h1>
              <div className="pm-gh-username">@{profile?.username ?? 'me'}</div>
              <div className="pm-gh-role">{profile?.title || profile?.role || 'Member'}</div>
            </div>

            <div className="pm-gh-bio">
              {isEditing ? (
                <textarea
                  value={profile.bio ?? ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="pm-gh-bio__textarea"
                />
              ) : (
                <p>{profile?.bio ?? 'No bio yet.'}</p>
              )}
            </div>

            <div className="pm-gh-sidebar__actions">{primaryActions}</div>

            <div className="pm-gh-meta" aria-label="Profile meta">
              <div className="pm-gh-meta__row">
                <Icon name="connections" size={16} />
                <span>{profile?.mutuals ?? 0} mutual connections</span>
              </div>
              <div className="pm-gh-meta__row">
                <Icon name="chart" size={16} />
                <span>{profile?.views ?? 0} profile views</span>
              </div>
              <div className="pm-gh-meta__row">
                <Icon name="calendar" size={16} />
                <span>{profile?.avgResponse ?? '—'} avg response</span>
              </div>
            </div>
          </aside>

          <main className="pm-gh-main" aria-label="Profile main">
            <nav className="pm-gh-tabs" aria-label="Profile tabs">
              <button
                className={activeTab === 'overview' ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveTab('overview')}
              >
                <Icon name="home" size={16} /> Overview
              </button>
              <button
                className={activeTab === 'repos' ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveTab('repos')}
              >
                <Icon name="spark" size={16} /> Repositories
              </button>
              <button
                className={activeTab === 'activity' ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveTab('activity')}
              >
                <Icon name="chart" size={16} /> Activity
              </button>
            </nav>

            {activeTab === 'overview' ? (
              <div className="pm-gh-section">
                <section className="pm-gh-card" aria-label="Highlights">
                  <header className="pm-gh-card__head">
                    <h2>Highlights</h2>
                    {profile?.verified ? (
                      <Badge tone="teal" variant="soft">
                        Verified
                      </Badge>
                    ) : null}
                  </header>
                  <div className="pm-gh-grid">
                    <div className="pm-gh-kv">
                      <span>Domain</span>
                      <strong>{profile?.domain ?? '-'}</strong>
                    </div>
                    <div className="pm-gh-kv">
                      <span>Intent</span>
                      <strong>{profile?.intent ?? '-'}</strong>
                    </div>
                    <div className="pm-gh-kv">
                      <span>Commitment</span>
                      <strong>{profile?.commitment ?? '-'}</strong>
                    </div>
                  </div>
                </section>

                <section className="pm-gh-card" aria-label="Skills">
                  <header className="pm-gh-card__head">
                    <h2>Skills</h2>
                  </header>
                  <div className="pm-gh-tags">
                    {(profile?.skills ?? []).slice(0, 12).map((skill) => (
                      <span key={skill} className="pm-gh-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="pm-gh-card" aria-label="Contributions">
                  <header className="pm-gh-card__head">
                    <h2>Contributions</h2>
                    <span className="pm-gh-muted">Last 12 months</span>
                  </header>
                  <ContributionHeatmap seed={profile?.username ?? 'me'} />
                </section>
              </div>
            ) : null}

            {activeTab === 'repos' ? (
              <div className="pm-gh-section">
                <section className="pm-gh-card" aria-label="Repositories">
                  <header className="pm-gh-card__head">
                    <h2>Repositories</h2>
                    <span className="pm-gh-muted">Sample projects</span>
                  </header>
                  <div className="pm-gh-repo-list">
                    {(
                      [
                        { name: 'collab-matcher', meta: 'React · Vite', desc: 'Discover and connect with builders.' },
                        { name: 'session-booking', meta: 'UI · Scheduling', desc: 'Booking and billing flow prototypes.' },
                        { name: 'feed-ui', meta: 'Design system', desc: 'LinkedIn-like feed components.' },
                      ]
                    ).map((repo) => (
                      <div key={repo.name} className="pm-gh-repo">
                        <div>
                          <strong>{repo.name}</strong>
                          <p>{repo.desc}</p>
                        </div>
                        <span className="pm-gh-repo__meta">{repo.meta}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            ) : null}

            {activeTab === 'activity' ? (
              <div className="pm-gh-section">
                <section className="pm-gh-card" aria-label="Activity">
                  <header className="pm-gh-card__head">
                    <h2>Recent activity</h2>
                    <span className="pm-gh-muted">This is a mock timeline for now.</span>
                  </header>
                  <div className="pm-gh-activity">
                    <div className="pm-gh-activity__item">
                      <Icon name="spark" size={16} />
                      <span>Updated skills and profile headline</span>
                      <span className="pm-gh-muted">2d</span>
                    </div>
                    <div className="pm-gh-activity__item">
                      <Icon name="messages" size={16} />
                      <span>Started a new conversation</span>
                      <span className="pm-gh-muted">4d</span>
                    </div>
                    <div className="pm-gh-activity__item">
                      <Icon name="events" size={16} />
                      <span>RSVP’d to an event</span>
                      <span className="pm-gh-muted">1w</span>
                    </div>
                  </div>
                </section>
              </div>
            ) : null}
          </main>
        </div>
      </div>
    </AppShell>
  );
}

function ContributionHeatmap({ seed }) {
  const cells = useMemo(() => {
    let value = 7;
    const result = [];
    for (let i = 0; i < 7 * 18; i += 1) {
      // tiny deterministic-ish generator so each user looks consistent
      value = (value * 1103515245 + (seed?.charCodeAt?.(i % seed.length) ?? 13) + 12345) % 2147483647;
      const level = value % 5;
      result.push(level);
    }
    return result;
  }, [seed]);

  return (
    <div className="pm-gh-heatmap" role="img" aria-label="Contributions heatmap">
      {cells.map((level, idx) => (
        <span key={idx} className={`pm-gh-heat pm-gh-heat--${level}`} />
      ))}
    </div>
  );
}
