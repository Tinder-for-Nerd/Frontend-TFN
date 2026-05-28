import { useEffect, useState, useRef, useMemo } from 'react';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { MiniProfileCard } from '../../../components/common';
import { Button, Badge, Icon } from '../../../components/ui';
import { studentDiscoverProfiles, proDiscoverProfiles } from '../../../data/mockData';
import '../../../styles/discover.css';

export function DiscoverPage({ variant }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const [touchPhase, setTouchPhase] = useState('IDLE'); // IDLE, TOUCH_START, TOUCH_MOVE, SNAP_ANIMATING, SPRING_ANIMATING, SNAP_DOWN, SNAP_UP
  const [snapProgress, setSnapProgress] = useState(0); // 0 to 100 % to threshold
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(() => window.innerHeight);
  const containerRef = useRef(null);
  const lastScrollTime = useRef(0);

  const profilesSource = variant === 'pro' ? proDiscoverProfiles : studentDiscoverProfiles;
  const profileBase = variant === 'pro' ? '/pro/profile' : '/profile';
  
  const SNAP_THRESHOLD = 0.3;
  const SPRING_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  const isMobile = viewportWidth <= 640;
  const CONTAINER_HEIGHT = isMobile
    ? Math.min(600, Math.max(520, viewportHeight - 152))
    : 600;

  usePageMeta(
    variant === 'pro' ? 'Tinder for Nerds | Pro Discover' : 'Tinder for Nerds | Student Discover',
    'Swipe through AI-ranked discovery feed with instant loading and smooth transitions.',
  );

  // Programmatically manage body/html scroll lock for reliable SPA navigation without hard refreshes
  useEffect(() => {
    document.documentElement.classList.add('pm-discover-page-active');
    document.body.classList.add('pm-discover-page-active');

    return () => {
      document.documentElement.classList.remove('pm-discover-page-active');
      document.body.classList.remove('pm-discover-page-active');
    };
  }, []);

  // Sync translation offset when resizing or changing active card index
  useEffect(() => {
    if (!isDragging) {
      setTranslateY(-(currentIndex * CONTAINER_HEIGHT));
    }
  }, [currentIndex, CONTAINER_HEIGHT, isDragging]);

  // Keyboard snapping (Arrow Keys navigation)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const newIndex = Math.min(profilesSource.length - 1, currentIndex + 1);
        if (newIndex !== currentIndex) {
          setTouchPhase('SNAP_DOWN');
          setCurrentIndex(newIndex);
          setTimeout(() => setTouchPhase('IDLE'), 400);
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const newIndex = Math.max(0, currentIndex - 1);
        if (newIndex !== currentIndex) {
          setTouchPhase('SNAP_UP');
          setCurrentIndex(newIndex);
          setTimeout(() => setTouchPhase('IDLE'), 400);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, profilesSource, CONTAINER_HEIGHT]);

  // Touch handlers (drag smooth tracking without jumps)
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setTouchPhase('TOUCH_START');
    setDragStart(e.touches[0].clientY);
    setDragDistance(0);
    setSnapProgress(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const distance = dragStart - currentY;
    setDragDistance(distance);
    setTouchPhase('TOUCH_MOVE');

    const baseOffset = -(currentIndex * CONTAINER_HEIGHT);
    setTranslateY(baseOffset - distance);

    const threshold = CONTAINER_HEIGHT * SNAP_THRESHOLD;
    const progress = Math.min(100, Math.round((Math.abs(distance) / threshold) * 100));
    setSnapProgress(progress);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = CONTAINER_HEIGHT * SNAP_THRESHOLD;
    
    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(profilesSource.length - 1, currentIndex + direction));
      setTouchPhase(newIndex !== currentIndex ? 'SNAP_ANIMATING' : 'SPRING_ANIMATING');
      setCurrentIndex(newIndex);
    } else {
      setTouchPhase('SPRING_ANIMATING');
      setTranslateY(-(currentIndex * CONTAINER_HEIGHT));
    }
    
    setDragDistance(0);
    setSnapProgress(0);
    setTimeout(() => setTouchPhase('IDLE'), 400);
  };

  // Mouse drag handlers (identical scroll physics for desktop)
  const handleMouseDown = (e) => {
    // Only capture left click
    if (e.button !== 0) return;
    setIsDragging(true);
    setTouchPhase('TOUCH_START');
    setDragStart(e.clientY);
    setDragDistance(0);
    setSnapProgress(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const distance = dragStart - e.clientY;
    setDragDistance(distance);
    setTouchPhase('TOUCH_MOVE');

    const baseOffset = -(currentIndex * CONTAINER_HEIGHT);
    setTranslateY(baseOffset - distance);

    const threshold = CONTAINER_HEIGHT * SNAP_THRESHOLD;
    const progress = Math.min(100, Math.round((Math.abs(distance) / threshold) * 100));
    setSnapProgress(progress);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = CONTAINER_HEIGHT * SNAP_THRESHOLD;

    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(profilesSource.length - 1, currentIndex + direction));
      setTouchPhase(newIndex !== currentIndex ? 'SNAP_ANIMATING' : 'SPRING_ANIMATING');
      setCurrentIndex(newIndex);
    } else {
      setTouchPhase('SPRING_ANIMATING');
      setTranslateY(-(currentIndex * CONTAINER_HEIGHT));
    }

    setDragDistance(0);
    setSnapProgress(0);
    setTimeout(() => setTouchPhase('IDLE'), 400);
  };

  // Mouse wheel scroll snapping support
  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 800) return; // Debounce fast swipes

    const deltaY = e.deltaY;
    if (Math.abs(deltaY) < 15) return; // Ignore micro-scrolls

    const direction = deltaY > 0 ? 1 : -1;
    const newIndex = Math.max(0, Math.min(profilesSource.length - 1, currentIndex + direction));

    if (newIndex !== currentIndex) {
      lastScrollTime.current = now;
      setTouchPhase(direction > 0 ? 'SNAP_DOWN' : 'SNAP_UP');
      setCurrentIndex(newIndex);
      setTimeout(() => setTouchPhase('IDLE'), 400);
    }
  };

  return (
    <AppShell
      variant={variant}
      title="Discover"
      subtitle="Swipe to explore"
      className="pm-app-shell--discover"
    >
      <div className="pm-discover">
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={handleWheel}
          className={`pm-discover__stack ${isDragging ? 'is-dragging' : ''}`}
          style={{ height: `${CONTAINER_HEIGHT}px` }}
        >
          <div
            className="pm-discover__rail"
            style={{
              transform: `translateY(${translateY}px)`,
              transition: isDragging ? 'none' : `transform 0.4s ${SPRING_EASING}`,
              height: `${(profilesSource?.length || 1) * CONTAINER_HEIGHT}px`,
            }}
          >
            {profilesSource && profilesSource.length > 0 ? (
              profilesSource.map((profile, index) => (
                <div
                  key={profile.id}
                  className="pm-discover__cell"
                  style={{ height: `${CONTAINER_HEIGHT}px` }}
                >
                  <div className="pm-discover__card">
                    <MiniProfileCard
                      profile={profile}
                      extraLink={`${profileBase}/${profile.username}`}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="pm-discover__empty" style={{ height: `${CONTAINER_HEIGHT}px` }}>
                No profiles available
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
