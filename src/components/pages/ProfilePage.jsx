import { useState } from 'react';
import { Button, Badge } from '../ui';
import '../../styles/profile.css';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Alex Chen',
    role: 'Product Designer',
    bio: 'Building tools for creators',
    skills: ['UI Design', 'UX Research', 'Figma'],
    domain: 'Design',
    intent: 'Co-founder',
    commitment: 'Full-time',
  });

  return (
    <div className="pm-profile-page">
      <header className="pm-profile-header">
        <h1 className="pm-profile-header__title">Profile</h1>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </header>

      <div className="pm-profile-card">
        <div className="pm-profile-avatar-section">
          <div className="pm-profile-avatar">AC</div>
          <h2 className="pm-profile-name">{profile.name}</h2>
          <p className="pm-profile-role">{profile.role}</p>
        </div>

        <div className="pm-profile-bio">
          {isEditing ? (
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="pm-profile-bio__textarea"
            />
          ) : (
            <p>{profile.bio}</p>
          )}
        </div>

        <div className="pm-profile-section">
          <h3 className="pm-profile-section__title">Skills</h3>
          <div className="pm-profile-tags">
            {profile.skills.map((skill) => (
              <Badge key={skill} tone="teal">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="pm-profile-grid">
          <div className="pm-profile-field">
            <label>Domain</label>
            <p>{profile.domain}</p>
          </div>
          <div className="pm-profile-field">
            <label>Intent</label>
            <p>{profile.intent}</p>
          </div>
          <div className="pm-profile-field">
            <label>Commitment</label>
            <p>{profile.commitment}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
