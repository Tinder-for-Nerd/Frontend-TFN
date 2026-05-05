import { useState, useRef } from 'react';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { MiniProfileCard } from '../../../components/common';
import { Button, Badge } from '../../../components/ui';
import { studentDiscoverProfiles, proDiscoverProfiles } from '../../../data/mockData';
import '../../../styles/discover.css';

export function DiscoverPage({ variant }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const containerRef = useRef(null);

  const profilesSource = variant === 'pro' ? proDiscoverProfiles : studentDiscoverProfiles;
  const profileBase = variant === 'pro' ? '/pro/profile' : '/profile';
  const SNAP_THRESHOLD = 0.3;
  const CONTAINER_HEIGHT = 600; // Fixed container height
  const SPRING_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  usePageMeta(
    variant === 'pro' ? 'Tinder for Nerds | Pro Discover' : 'Tinder for Nerds | Student Discover',
    'Swipe through AI-ranked discovery feed with instant loading and smooth transitions.',
  );

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientY);
    setDragDistance(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const distance = dragStart - currentY;
    setDragDistance(distance);
    setTranslateY(-distance);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const threshold = CONTAINER_HEIGHT * SNAP_THRESHOLD;
    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(profilesSource.length - 1, currentIndex + direction));
      setCurrentIndex(newIndex);
      setTranslateY(-(newIndex * CONTAINER_HEIGHT));
    } else {
      setTranslateY(-(currentIndex * CONTAINER_HEIGHT));
    }
    setDragDistance(0);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart(e.clientY);
    setDragDistance(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const distance = dragStart - e.clientY;
    setDragDistance(distance);
    setTranslateY(-distance);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const threshold = CONTAINER_HEIGHT * SNAP_THRESHOLD;
    if (Math.abs(dragDistance) > threshold) {
      const direction = dragDistance > 0 ? 1 : -1;
      const newIndex = Math.max(0, Math.min(profilesSource.length - 1, currentIndex + direction));
      setCurrentIndex(newIndex);
      setTranslateY(-(newIndex * CONTAINER_HEIGHT));
    } else {
      setTranslateY(-(currentIndex * CONTAINER_HEIGHT));
    }
    setDragDistance(0);
  };

  return (
    <AppShell
      variant={variant}
      title="Discover"
      subtitle="Swipe to explore"
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
