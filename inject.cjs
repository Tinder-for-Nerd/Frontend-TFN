const fs = require('fs');

const code = fs.readFileSync('src/ProMatchDarkApp.jsx', 'utf8');
const startStr = '{/* Instagram-style Scrollable Feed */}';
const targetStart = code.indexOf(startStr);
const endStr = '{/* Empty state */}';
const targetEnd = code.indexOf(endStr, targetStart);

if (targetStart > -1 && targetEnd > -1) {
  const replacement = `        {/* Instagram-style VPooled Reels Feed */}
        {sortedFiltered.length > 0 ? (
          <InstagramReelsFeed 
            profiles={sortedFiltered}
            renderCard={(profile, isFocused) => (
              <article className={\`pm-feed-card \${isFocused ? 'is-focused' : ''}\`}>
                <div
                  className="pm-feed-card__cover"
                  onClick={() => navigate(\`/profile/\${profile.username}\`)}
                  role="link"
                  tabIndex={0}
                  aria-label={\`View \${profile.name}'s profile\`}
                  onKeyDown={(e) => { if (e.key === 'Enter') navigate(\`/profile/\${profile.username}\`); }}
                >
                  <div className="pm-feed-card__cover-bg" style={{ background: profile.cover }} />
                  <div className="pm-feed-card__overlay" />
                  <div className="pm-match-badge">
                    <strong>{profile.match}%</strong>
                    <span>Match</span>
                  </div>
                  <div className="pm-feed-cover-info">
                    <Avatar name={profile.name} initials={profile.avatar} tone={profile.tone} size="md" />
                    <div>
                      <h3>{profile.name}</h3>
                      <p className="pm-subtitle">{profile.title}</p>
                      {profile.verified && <span className="pm-verified-badge">✓ Verified</span>}
                    </div>
                  </div>
                </div>
                <div className="pm-feed-card__content">
                  <div className="pm-feed-stats-inline">
                    <div className="pm-stat-mini">
                      <strong>{profile.mutuals}</strong>
                      <span>Mutuals</span>
                    </div>
                    <div className="pm-stat-mini">
                      <strong>{profile.responseRate}</strong>
                      <span>Response</span>
                    </div>
                    <div className="pm-stat-mini">
                      <strong>{profile.sessions}</strong>
                      <span>Sessions</span>
                    </div>
                  </div>
                  <p className="pm-feed-bio">{profile.bio}</p>
                  <div className="pm-feed-skills">
                    {profile.skills.map((skill) => (
                      <span className="pm-feed-skill-tag" key={skill}>{skill}</span>
                    ))}
                  </div>
                  <div className="pm-why-match-inline">
                    <p className="pm-why-label">Why this match?</p>
                    <div className="pm-badge-row">
                      {profile.why.map((item) => (
                        <Badge tone="teal" key={item}>
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="pm-feed-actions">
                    <Button to={\`/\${variant === 'pro' ? 'pro' : 'student'}/messages/\${profile.username}\`} className="pm-action-primary" icon="messages">
                      Connect
                    </Button>
                    <Button to={\`/profile/\${profile.username}\`} variant="secondary" className="pm-action-secondary" icon="profile">
                      View profile
                    </Button>
                  </div>
                </div>
              </article>
            )}
          />
        ) : null}

`;
  fs.writeFileSync('src/ProMatchDarkApp.jsx', code.substring(0, targetStart) + replacement + code.substring(targetEnd));
  console.log('Success');
} else {
  console.log('Failed');
}
