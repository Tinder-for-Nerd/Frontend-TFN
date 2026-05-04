import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell } from '../../../components/layout';
import { Button, Badge } from '../../../components/ui';
import { profiles as allProfiles } from '../../../data/mockData';
import '../../../styles/profile.css';

export function ProfilePage() {
  const { username = 'me' } = useParams();
  const [isEditing, setIsEditing] = useState(false);

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
  }, [initialProfile]);

  const isMe = (profile?.username ?? 'me') === 'me';

  const profileActions = (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => setIsEditing(!isEditing)}
      disabled={!isMe}
    >
      {isEditing ? 'Save changes' : 'Edit profile'}
    </Button>
  );

  return (
    <AppShell
      variant="student"
      title={profile?.name ?? 'Profile'}
      subtitle={isMe ? 'Manage how you appear to potential collaborators.' : 'Profile details'}
      actions={isMe ? profileActions : null}
    >
      <div className="pm-profile-page">
        <header className="pm-profile-header">
          <div>
            <h1 className="pm-profile-header__title">Profile details</h1>
            <p>{isMe ? 'Keep your skills, intent, and availability up to date.' : 'Connect and collaborate.'}</p>
          </div>
        </header>

        <div className="pm-profile-card">
          <div className="pm-profile-avatar-section">
            <div
              className="pm-profile-avatar"
              style={
                profile?.src
                  ? {
                      backgroundImage: `url(${profile.src})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : undefined
              }
            >
              {!profile?.src ? (profile?.avatar ?? 'ME') : null}
            </div>
            <h2 className="pm-profile-name">{profile.name}</h2>
            <p className="pm-profile-role">{profile.title || profile.role}</p>
          </div>

          <div className="pm-profile-bio">
            {isEditing ? (
              <textarea
                value={profile.bio ?? ''}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="pm-profile-bio__textarea"
              />
            ) : (
              <p>{profile.bio ?? 'No bio yet.'}</p>
            )}
          </div>

          <div className="pm-profile-section">
            <h3 className="pm-profile-section__title">Skills</h3>
            <div className="pm-profile-tags">
              {(profile.skills ?? []).map((skill) => (
                <Badge key={skill} tone="teal">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="pm-profile-grid">
            <div className="pm-profile-field">
              <label>Domain</label>
              <p>{profile.domain ?? '-'}</p>
            </div>
            <div className="pm-profile-field">
              <label>Intent</label>
              <p>{profile.intent ?? '-'}</p>
            </div>
            <div className="pm-profile-field">
              <label>Commitment</label>
              <p>{profile.commitment ?? '-'}</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
