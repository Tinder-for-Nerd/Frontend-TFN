import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Icon } from '../ui';
import '../../styles/mini-profile-card.css';

export function MiniProfileCard({ 
  profile, 
  compact = false, 
  ctaLabel = 'Connect', 
  secondaryLabel = 'Message', 
  extraLink = '/profile/me',
  hideActions = false,
  onCta,
  ctaDisabled = false,
}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (!extraLink) return;
    navigate(extraLink);
  };

  const handleCardClick = (event) => {
    // Don't hijack clicks on interactive elements inside the card.
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest('button, a, input, textarea, select, label')) return;
    handleNavigate();
  };

  const handleCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNavigate();
    }
  };

  return (
    <article
      className="pm-card pm-mini-profile"
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      aria-label={`Open ${profile?.name ?? 'profile'}`}
    >
      {/* 1. Identity Header */}
      <div className="pm-mini-profile__head">
        <div className="pm-mini-profile__avatar-wrap">
          <Avatar 
            name={profile.name} 
            src={profile.src || profile.avatar_url}
            initials={profile.avatar} 
            tone={profile.tone} 
            size="lg" 
          />
          {profile.verified && (
            <div className="pm-mini-profile__verified">
              <Icon name="spark" size={10} />
            </div>
          )}
        </div>
        
        <div className="pm-mini-profile__who">
          <div className="pm-mini-profile__name-row">
            <h3 className="pm-mini-profile__name">
              {profile.name}
            </h3>
            {profile.status === 'Online' && (
              <div className="pm-mini-profile__online" aria-label="Online" />
            )}
          </div>
          <p className="pm-mini-profile__title">{profile.title}</p>
        </div>

        <div className="pm-mini-profile__fit">
          <span className="pm-mini-profile__fit-value">
            {profile.match}%
          </span>
          <span className="pm-mini-profile__fit-label">Fit</span>
        </div>
      </div>

      {/* 2. Body Content */}
      <div className="pm-mini-profile__body">
        <p className="pm-mini-profile__headline">{profile.headline}</p>
        
        <div className="pm-mini-profile__why">
          <Icon name="spark" size={16} className="pm-mini-profile__why-icon" />
          <p>
            <strong>Why this match?</strong> Both focused on {profile.skills[0]} and {profile.domain || 'Tech'}.
            {profile.match > 90 ? " Exceptional alignment with your recent goals." : " Strong overlap in core competencies."}
          </p>
        </div>

        <div className="pm-mini-profile__skills">
          {profile.skills.slice(0, 3).map((skill) => (
            <span key={skill} className="pm-mini-profile__skill">
              {skill}
            </span>
          ))}
          {profile.skills.length > 3 && (
            <span className="pm-mini-profile__skill-more">
              +{profile.skills.length - 3}
            </span>
          )}
        </div>

        <div className="pm-mini-profile__mutuals">
          <div className="pm-avatar-stack">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className="pm-avatar-stack-item" 
                style={{
                  zIndex: 4 - i,
                  backgroundImage: `url(https://i.pravatar.cc/100?u=${profile.id + i})`,
                }}
              />
            ))}
          </div>
          <span>12 mutual connections</span>
        </div>
      </div>

      {/* 3. Actions (Conditional) */}
      {!hideActions && (
        <div className="pm-mini-profile__actions">
          {onCta ? (
            <Button
              variant="primary"
              className="pm-btn-full"
              onClick={(event) => {
                event.stopPropagation();
                onCta();
              }}
              disabled={ctaDisabled}
            >
              {ctaLabel}
            </Button>
          ) : (
            <Button
              to={extraLink}
              variant="primary"
              className="pm-btn-full"
              disabled={ctaDisabled}
            >
              {ctaLabel}
            </Button>
          )}
          <div className="pm-mini-profile__row-actions">
            <Button variant="secondary" icon="messages" style={{ flex: 1 }} />
            <Button variant="secondary" icon="calendar" style={{ flex: 1 }} />
            <Button to={extraLink} variant="ghost" style={{ flex: 1 }}>
              <Icon name="chevron-right" />
            </Button>
          </div>
        </div>
      )}
    </article>
  );
}
