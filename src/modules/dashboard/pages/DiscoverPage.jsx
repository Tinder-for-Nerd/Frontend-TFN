import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  Check,
  ChevronDown,
  Eye,
  Share2,
  Star,
  UserPlus,
} from 'lucide-react';
import { AppShell } from '../../../components/layout';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { studentDiscoverProfiles, proDiscoverProfiles } from '../../../data/mockData';
import '../../../styles/discover.css';

const DISCOVER_HERO_IMAGES = {
  'sarah-chen':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAoQsTnJIwgXT82h5a69umEvR7HIrpy482IPVd1i6Lg0DKgQ9tU8Vr7aaGRADnE3sFDKpCjIUvsLtLi7PLKoWaqv4JKAh9Ln8qQpzkmZ0l4x_PbEes2Lfmayr5kOjmP4Q2QZp8yZnl5FbDGTabGgspuKSYEb8VZiA7Lk_Riev7lgJXactor1bcxFnes0PHo-Zgt4M_qqScmL3_CRk-7TwoWgM6EaDAJI9fhWXov8SUBtKdfZqm-kmbuEudVu79JmskjC3knCGoQTRU',
  'raj-patel':
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC7nCvaUZxHMcf_ekpIzkMUCu0pPyW9OQCoPlL6D0vYNWdf6lddcWYtamarXHcwpL5qGVbsOX9GOUAs12j3IfIE5tcmguzcYPGSL7-XWRhQ3qbF4WcigebhXdmi4I5tVyMPY9dLvPkLQNe0S5Gz4o2YCpIcVHaKVfJeDkhs8OzU40WfTKfULItmxa7OO7gMEEJeQcNmF4eRMS75I2ow1sgLYzdniwXLRLkjkBRuezWkTDFKbG7dhfUrHBwDUK8jkgjNtGHiDJF8FsM',
  'nora-khan':
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
  'priya-sharma':
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80',
  'liam-oconnor':
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
};

const FALLBACK_HERO_IMAGES = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80',
];

function getHeroImage(profile, index) {
  return (
    DISCOVER_HERO_IMAGES[profile.username] ||
    profile.src ||
    FALLBACK_HERO_IMAGES[index % FALLBACK_HERO_IMAGES.length]
  );
}

function ReelAction({
  label,
  icon: IconComponent,
  primary = false,
  sent = false,
  filled = false,
  onClick,
  to,
}) {
  const className = [
    'reel-action',
    primary && 'reel-action--primary',
    sent && 'reel-action--sent',
  ]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="reel-action__icon">
        <IconComponent size={20} fill={filled ? 'currentColor' : 'none'} />
      </span>
      <span className="reel-action__label">{label}</span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className} onClick={onClick} disabled={sent && primary}>
      {content}
    </button>
  );
}

export function DiscoverPage({ variant = 'student' }) {
  const profilesSource = variant === 'pro' ? proDiscoverProfiles : studentDiscoverProfiles;
  const profileBase = variant === 'pro' ? '/pro/profile' : '/profile';

  const [savedIds, setSavedIds] = useState(() => new Set());
  const [connectedIds, setConnectedIds] = useState(() => new Set());
  const [activeIndex, setActiveIndex] = useState(0);
  const reelsRef = useRef(null);
  const reelRefs = useRef([]);

  usePageMeta(
    variant === 'pro' ? 'ProMatch | Pro Discover' : 'ProMatch | Discover Matches',
    'Swipe through skill-first matches with vertical reel discovery.',
  );

  useEffect(() => {
    const container = reelsRef.current;
    if (!container) return undefined;

    const handleScroll = () => {
      const { scrollTop, clientHeight } = container;
      const index = Math.round(scrollTop / clientHeight);
      setActiveIndex(Math.max(0, Math.min(profilesSource.length - 1, index)));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [profilesSource.length]);

  const scrollToReel = useCallback((index) => {
    const container = reelsRef.current;
    if (!container) return;
    container.scrollTo({ top: index * container.clientHeight, behavior: 'smooth' });
    setActiveIndex(index);
  }, []);

  const toggleSave = useCallback((profileId) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(profileId)) next.delete(profileId);
      else next.add(profileId);
      return next;
    });
  }, []);

  const handleConnect = useCallback((profileId) => {
    setConnectedIds((prev) => new Set(prev).add(profileId));
  }, []);

  return (
    <AppShell
      variant={variant}
      hideTopbar
      className="pm-app-shell--discover-page"
    >
      <div className="discover">
        <div ref={reelsRef} className="discover__reels no-scrollbar">
          {profilesSource.map((profile, index) => {
            const isSaved = savedIds.has(profile.id);
            const isConnected = connectedIds.has(profile.id);
            const profileUrl = `${profileBase}/${profile.username}`;

            return (
              <section
                key={profile.id}
                className="reel"
                ref={(node) => {
                  reelRefs.current[index] = node;
                }}
              >
                <div className="reel__media">
                  <img
                    src={getHeroImage(profile, index)}
                    alt=""
                    className="reel__image"
                  />
                </div>
                <div className="reel__vignette" aria-hidden="true" />

                <div className="reel__content">
                  <div className="reel__info">
                    <div className="reel__score">
                      <Star size={12} fill="currentColor" />
                      <span>{profile.match} Skill Score</span>
                    </div>

                    <div className="reel__name-row">
                      <h2 className="reel__name">{profile.name}</h2>
                      <span className="reel__intent">{profile.intent}</span>
                    </div>

                    <p className="reel__title">{profile.title}</p>
                    <p className="reel__bio">{profile.headline || profile.bio}</p>

                    <ul className="reel__tags">
                      {profile.skills.slice(0, 3).map((skill) => (
                        <li key={skill} className="reel__tag">
                          #{skill.replace(/\s+/g, '')}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="reel__actions">
                    <ReelAction
                      label={isConnected ? 'Sent' : 'Connect'}
                      icon={isConnected ? Check : UserPlus}
                      primary
                      sent={isConnected}
                      onClick={() => handleConnect(profile.id)}
                    />
                    <ReelAction label="Profile" icon={Eye} to={profileUrl} />
                    <ReelAction label="Share" icon={Share2} />
                    <ReelAction
                      label="Save"
                      icon={Bookmark}
                      filled={isSaved}
                      onClick={() => toggleSave(profile.id)}
                    />
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="progress-dots" aria-label="Reel progress">
          {profilesSource.map((profile, index) => (
            <button
              key={profile.id}
              type="button"
              className={`progress-dot${index === activeIndex ? ' progress-dot--active' : ''}`}
              aria-label={`Go to match ${index + 1}`}
              onClick={() => scrollToReel(index)}
            />
          ))}
        </div>

        {activeIndex < profilesSource.length - 1 ? (
          <div className="discover__scroll-hint" aria-hidden="true">
            <span>Swipe up for next match</span>
            <ChevronDown size={14} />
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
