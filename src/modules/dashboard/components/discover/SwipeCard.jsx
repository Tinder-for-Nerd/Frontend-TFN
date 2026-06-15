import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { MapPin, X, Heart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, Badge } from '../../../../components/ui';
import { FitScore } from '../../../../components/fit/FitScore';
import { getDiscoverHeroImage } from './discoverUtils';

const EXIT_OFFSET = {
  connect: { x: 520, y: 0, rotate: 18 },
  pass: { x: -520, y: 0, rotate: -18 },
  super: { x: 0, y: -620, rotate: 0 },
};

export function SwipeCard({
  profile,
  profileIndex = 0,
  stackDepth = 0,
  isTop = false,
  exitAction = null,
  profileBase = '/profile',
  searchMode = false,
  onSwipeComplete,
  onPass,
  onConnect,
  onSuper,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-220, 220], [-14, 14]);
  const connectOpacity = useTransform(x, [20, 120], [0, 1]);
  const passOpacity = useTransform(x, [-120, -20], [1, 0]);
  const superOpacity = useTransform(y, [-120, -20], [1, 0]);

  useEffect(() => {
    if (!isTop || !exitAction) return undefined;

    const target = EXIT_OFFSET[exitAction];
    const controls = [
      animate(x, target.x, { type: 'spring', stiffness: 320, damping: 28 }),
      animate(y, target.y, { type: 'spring', stiffness: 320, damping: 28 }),
    ];

    Promise.all(controls).then(() => {
      onSwipeComplete?.(exitAction);
    });

    return undefined;
  }, [exitAction, isTop, onSwipeComplete, x, y]);

  const handleDragEnd = (_, info) => {
    if (!isTop || exitAction) return;

    if (info.offset.y < -100) {
      onSuper?.();
      return;
    }

    if (info.offset.x > 110) {
      onConnect?.();
      return;
    }

    if (info.offset.x < -110) {
      onPass?.();
    }
  };

  const heroImage = getDiscoverHeroImage(profile, profileIndex);
  const profileUrl = `${profileBase}/${profile.username}`;

  return (
    <motion.article
      className={`swipe-card${isTop ? ' swipe-card--top' : ''}`}
      style={{
        zIndex: 10 - stackDepth,
        x: isTop ? x : 0,
        y: isTop ? y : stackDepth * 10,
        rotate: isTop ? rotate : 0,
        scale: 1 - stackDepth * 0.04,
        opacity: 1 - stackDepth * 0.12,
      }}
      drag={isTop && !exitAction}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      whileTap={isTop ? { cursor: 'grabbing' } : undefined}
    >
      <div className="swipe-card__media">
        <img src={heroImage} alt="" className="swipe-card__image" loading="lazy" />
        <div className="swipe-card__vignette" aria-hidden="true" />
      </div>

      {isTop ? (
        <>
          <motion.div className="swipe-card__stamp swipe-card__stamp--connect" style={{ opacity: connectOpacity }}>
            CONNECT
          </motion.div>
          <motion.div className="swipe-card__stamp swipe-card__stamp--pass" style={{ opacity: passOpacity }}>
            PASS
          </motion.div>
          <motion.div className="swipe-card__stamp swipe-card__stamp--super" style={{ opacity: superOpacity }}>
            SUPER
          </motion.div>
        </>
      ) : null}

      <div className="swipe-card__body">
        <div className="swipe-card__fit-row">
          {searchMode ? (
            <span className="swipe-card__relevance">
              <strong>{profile.relevanceScore ?? profile.match ?? 0}%</strong>
              <em>Requirement match</em>
            </span>
          ) : (
            <FitScore profile={profile} compact showBars={false} />
          )}
        </div>

        <div className="swipe-card__header">
          <Avatar
            name={profile.name}
            src={profile.src}
            initials={profile.avatar}
            tone={profile.tone}
            size="md"
          />
          <div className="swipe-card__identity">
            <h3>{profile.name}</h3>
            <p>{profile.title}</p>
            <span className="swipe-card__location">
              <MapPin size={12} />
              {profile.location}
            </span>
          </div>
        </div>

        <p className="swipe-card__bio">{profile.headline || profile.bio}</p>

        <div className="swipe-card__meta">
          {searchMode && profile.audience ? (
            <Badge tone={profile.audience === 'Professional' ? 'teal' : 'muted'}>
              {profile.audience}
            </Badge>
          ) : null}
          <Badge tone="teal">{profile.intent}</Badge>
          <Badge tone="muted">{profile.domain}</Badge>
          <Badge tone="muted">{profile.commitment}</Badge>
        </div>

        <div className="swipe-card__skills">
          {profile.skills?.slice(0, 4).map((skill) => (
            <span key={skill} className="swipe-card__skill">
              {skill}
            </span>
          ))}
        </div>

        <Link to={profileUrl} className="swipe-card__profile-link">
          View full profile
        </Link>
      </div>

      {isTop ? (
        <div className="swipe-card__actions">
          <button type="button" className="swipe-card__action swipe-card__action--pass" onClick={onPass} aria-label="Pass">
            <X size={22} />
          </button>
          <button type="button" className="swipe-card__action swipe-card__action--super" onClick={onSuper} aria-label="Super connect">
            <Zap size={22} />
          </button>
          <button type="button" className="swipe-card__action swipe-card__action--connect" onClick={onConnect} aria-label="Connect">
            <Heart size={22} />
          </button>
        </div>
      ) : null}
    </motion.article>
  );
}
