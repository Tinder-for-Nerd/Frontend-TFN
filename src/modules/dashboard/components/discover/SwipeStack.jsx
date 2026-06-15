import { useEffect, useState } from 'react';
import { SwipeCard } from './SwipeCard';
import { preloadDiscoverImages } from './discoverUtils';

const STACK_SIZE = 3;
const PRELOAD_BATCH = 6;

export function SwipeStack({
  profiles,
  currentIndex,
  profileBase,
  searchMode = false,
  onSwipeComplete,
  onPass,
  onConnect,
  onSuper,
}) {
  const [pendingAction, setPendingAction] = useState(null);
  const stackProfiles = profiles.slice(currentIndex, currentIndex + STACK_SIZE);

  useEffect(() => {
    preloadDiscoverImages(profiles, currentIndex, PRELOAD_BATCH);
  }, [profiles, currentIndex]);

  const handleComplete = (action) => {
    setPendingAction(null);

    if (action === 'pass') onPass?.();
    else if (action === 'connect') onConnect?.();
    else if (action === 'super') onSuper?.();

    onSwipeComplete?.(action);
  };

  const trigger = (action) => {
    if (pendingAction) return;
    setPendingAction(action);
  };

  if (!stackProfiles.length) {
    return null;
  }

  return (
    <div className="swipe-stack" aria-live="polite">
      {stackProfiles
        .map((profile, offset) => ({
          profile,
          offset,
          isTop: offset === 0,
        }))
        .reverse()
        .map(({ profile, offset, isTop }) => (
          <SwipeCard
            key={profile.id}
            profile={profile}
            profileIndex={currentIndex + offset}
            stackDepth={offset}
            isTop={isTop}
            exitAction={isTop ? pendingAction : null}
            profileBase={profileBase}
            searchMode={searchMode}
            onSwipeComplete={handleComplete}
            onPass={() => trigger('pass')}
            onConnect={() => trigger('connect')}
            onSuper={() => trigger('super')}
          />
        ))}
    </div>
  );
}
