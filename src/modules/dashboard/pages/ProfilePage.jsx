import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import { Button, Badge, Icon } from '../../../components/ui';
import { profiles as allProfiles, events as allEvents } from '../../../data/mockData';
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

  const workingFor = useMemo(() => {
    const title = profile?.title ?? '';
    const at = title.split('@')[1]?.trim();
    if (at) return at;
    return profile?.companyStage ? `Startup (${profile.companyStage})` : profile?.domain ?? '';
  }, [profile]);

  const meetingsOrganized = useMemo(() => {
    const hostName = profile?.name;
    if (!hostName) return [];
    return (allEvents ?? []).filter((event) => event?.host === hostName).slice(0, 4);
  }, [profile]);

  const posts = useMemo(() => {
    const author = profile ?? allProfiles?.me;
    const base = [
      {
        id: 'p1',
        content: 'Sharing a quick update: building a clean scheduling + billing flow for mentorship sessions.',
        timestamp: '2d',
        likes: 18,
        comments: 4,
      },
      {
        id: 'p2',
        content: 'Looking for collaborators on a hackathon project. If you are into React + product thinking, let’s connect.',
        timestamp: '5d',
        likes: 34,
        comments: 9,
      },
      {
        id: 'p3',
        content: 'Just shipped a LinkedIn-style feed UI in our student dashboard. Next: better profile pages.',
        timestamp: '1w',
        likes: 51,
        comments: 13,
      },
    ];
    return base.map((item) => ({ ...item, author }));
  }, [profile]);

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

            <section className="pm-gh-card pm-gh-sidecard" aria-label="Currently working for">
              <header className="pm-gh-card__head">
                <h2>Currently working for</h2>
              </header>
              <div className="pm-gh-sidecard__body">
                <div className="pm-gh-sidecard__row">
                  <Icon name="company" size={16} />
                  <span>{workingFor || '—'}</span>
                </div>
              </div>
            </section>

            <section className="pm-gh-card pm-gh-sidecard" aria-label="Meetings organized">
              <header className="pm-gh-card__head">
                <h2>Meetings organized</h2>
                <span className="pm-gh-muted">{profile?.events ?? meetingsOrganized.length}</span>
              </header>
              <div className="pm-gh-sidecard__body">
                {meetingsOrganized.length ? (
                  <div className="pm-gh-side-list">
                    {meetingsOrganized.map((event) => (
                      <div key={event.id} className="pm-gh-side-item">
                        <strong>{event.title}</strong>
                        <span className="pm-gh-muted">
                          {event.date} · {event.time}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="pm-gh-muted">No organized meetings yet.</div>
                )}
              </div>
            </section>
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
                className={activeTab === 'posts' ? 'is-active' : ''}
                type="button"
                onClick={() => setActiveTab('posts')}
              >
                <Icon name="messages" size={16} /> Posts
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
                  <div className="pm-gh-inline-meta" aria-label="Organization">
                    <Icon name="company" size={16} />
                    <span>
                      <strong>Organization:</strong> {workingFor || '—'}
                    </span>
                  </div>
                </section>
              </div>
            ) : null}

            {activeTab === 'posts' ? (
              <div className="pm-gh-section">
                <section className="pm-gh-card" aria-label="Posts">
                  <header className="pm-gh-card__head">
                    <h2>Posts</h2>
                    <span className="pm-gh-muted">Recent updates</span>
                  </header>
                  <div className="pm-gh-post-list">
                    {posts.map((post) => (
                      <article key={post.id} className="pm-gh-post">
                        <header className="pm-gh-post__head">
                          <div className="pm-gh-post__who">
                            <div
                              className="pm-gh-post__avatar"
                              style={
                                post.author?.src
                                  ? { backgroundImage: `url(${post.author.src})` }
                                  : undefined
                              }
                              aria-hidden="true"
                            >
                              {!post.author?.src ? (post.author?.avatar ?? 'ME') : null}
                            </div>
                            <div className="pm-gh-post__meta">
                              <strong>{post.author?.name ?? 'Member'}</strong>
                              <span className="pm-gh-muted">{post.timestamp}</span>
                            </div>
                          </div>
                          <button className="pm-icon-button" type="button" aria-label="Post options">
                            <Icon name="more" size={18} />
                          </button>
                        </header>
                        <div className="pm-gh-post__body">{post.content}</div>
                        <footer className="pm-gh-post__footer">
                          <span className="pm-gh-post__pill">
                            <Icon name="thumbs-up" size={14} /> {post.likes}
                          </span>
                          <span className="pm-gh-post__pill">
                            <Icon name="message-circle" size={14} /> {post.comments}
                          </span>
                          <span className="pm-gh-post__pill pm-gh-post__pill--end">
                            <Icon name="send" size={14} /> Share
                          </span>
                        </footer>
                      </article>
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
