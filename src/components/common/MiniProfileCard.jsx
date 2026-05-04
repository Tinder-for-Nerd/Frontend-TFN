import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Icon } from '../ui';

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
      className="pm-card"
      role="link"
      tabIndex={0}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      aria-label={`Open ${profile?.name ?? 'profile'}`}
      style={{
      display: 'flex', 
      flexDirection: 'column', 
      gap: '20px', 
      background: 'var(--surface-container-low)',
      border: '1px solid var(--outline-variant)',
      borderRadius: '24px',
      padding: '24px',
      width: '100%',
      boxSizing: 'border-box'
    }}
    >
      {/* 1. Identity Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', width: '100%' }}>
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Avatar 
            name={profile.name} 
            src={profile.avatar_url}
            initials={profile.avatar} 
            tone={profile.tone} 
            size="lg" 
          />
          {profile.verified && (
            <div style={{ 
              position: 'absolute', 
              bottom: '-2px', 
              right: '-2px', 
              background: 'var(--primary)', 
              color: 'white', 
              borderRadius: '50%', 
              width: '18px', 
              height: '18px', 
              display: 'grid', 
              placeItems: 'center', 
              border: '2px solid var(--surface-container-low)',
              zIndex: 2
            }}>
              <Icon name="spark" size={10} />
            </div>
          )}
        </div>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--on-surface)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {profile.name}
            </h3>
            {profile.status === 'Online' && (
              <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', flexShrink: 0 }} />
            )}
          </div>
          <p style={{ margin: '4px 0 0', fontSize: '0.9rem', color: 'var(--on-surface-variant)', opacity: 0.8 }}>
            {profile.title}
          </p>
        </div>

        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1 }}>
            {profile.match}%
          </span>
          <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', opacity: 0.5 }}>Fit</span>
        </div>
      </div>

      {/* 2. Body Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <p style={{ margin: 0, fontSize: '1rem', fontWeight: 500, lineHeight: 1.5, color: 'var(--on-surface)' }}>
          {profile.headline}
        </p>
        
        <div style={{ 
          padding: '16px', 
          background: 'var(--surface-container-lowest)', 
          borderRadius: '16px', 
          display: 'flex', 
          gap: '12px',
          border: '1px solid var(--outline-variant)'
        }}>
          <Icon name="spark" size={16} style={{ color: 'var(--primary)', marginTop: '2px', flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--on-surface)' }}>
            <strong style={{ color: 'var(--primary)' }}>Why this match?</strong> Both focused on {profile.skills[0]} and {profile.domain || 'Tech'}.
            {profile.match > 90 ? " Exceptional alignment with your recent goals." : " Strong overlap in core competencies."}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {profile.skills.slice(0, 3).map((skill) => (
            <span key={skill} style={{ 
              padding: '4px 12px', 
              background: 'var(--surface-container-high)', 
              color: 'var(--on-surface)', 
              borderRadius: '20px', 
              fontSize: '0.75rem', 
              fontWeight: 600,
              border: '1px solid var(--outline-variant)',
              position: 'static' // FORCE STATIC
            }}>
              {skill}
            </span>
          ))}
          {profile.skills.length > 3 && (
            <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--on-surface-variant)', alignSelf: 'center' }}>
              +{profile.skills.length - 3}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
          <div className="pm-avatar-stack">
            {[1, 2, 3].map(i => (
              <div 
                key={i} 
                className="pm-avatar-stack-item" 
                style={{ 
                  background: `var(--surface-container-high)`, 
                  zIndex: 4 - i,
                  backgroundImage: `url(https://i.pravatar.cc/100?u=${profile.id + i})`,
                  backgroundSize: 'cover',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid var(--surface-container-low)',
                  marginLeft: i > 1 ? '-8px' : '0'
                }} 
              />
            ))}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--on-surface-variant)', fontWeight: 500 }}>
            12 mutual connections
          </span>
        </div>
      </div>

      {/* 3. Actions (Conditional) */}
      {!hideActions && (
        <div style={{ display: 'grid', gap: '12px', marginTop: '8px' }}>
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
          <div style={{ display: 'flex', gap: '8px' }}>
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
