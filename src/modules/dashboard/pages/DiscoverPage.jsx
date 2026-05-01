import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { usePageMeta } from '../../../hooks/usePageMeta';
import { AppShell } from '../../../components/layout';
import { MiniProfileCard } from '../../../components/common';
import { Button, Badge } from '../../../components/ui';
import { studentDiscoverProfiles, proDiscoverProfiles } from '../../../data/mockData';

export function DiscoverPage({ variant }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);
  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const profilesSource = variant === 'pro' ? proDiscoverProfiles : studentDiscoverProfiles;
  const SNAP_THRESHOLD = 0.3;
  const CONTAINER_HEIGHT = 600; // Fixed container height
  const SPRING_EASING = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

  usePageMeta(
    variant === 'pro' ? 'ProMatch | Pro Discover' : 'ProMatch | Student Discover',
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

  const handleWheel = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    // Check if mouse is over the container
    const isOverContainer = e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!isOverContainer) return;
    
    // Prevent default scroll behavior
    e.preventDefault();
    
    // Clear any pending scroll timeouts
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Determine scroll direction (deltaY positive = scrolling down)
    const direction = e.deltaY > 0 ? 1 : -1;
    
    // Calculate new index
    const newIndex = Math.max(0, Math.min(profilesSource.length - 1, currentIndex + direction));
    
    // Update state
    setCurrentIndex(newIndex);
    setTranslateY(-(newIndex * CONTAINER_HEIGHT));
    
    // Debounce scroll to prevent too rapid scrolling
    scrollTimeoutRef.current = setTimeout(() => {
      scrollTimeoutRef.current = null;
    }, 300);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Add wheel listener with passive: false to allow preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, [currentIndex, profilesSource, CONTAINER_HEIGHT]);

  const snapProgress = Math.abs(dragDistance) / (CONTAINER_HEIGHT * SNAP_THRESHOLD);

  return (
    <AppShell
      variant={variant}
      title="Discover"
      subtitle="Swipe to explore"
    >
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px' }}>
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            overflow: 'hidden',
            position: 'relative',
            height: `${CONTAINER_HEIGHT}px`,
            width: '100%',
            cursor: isDragging ? 'grabbing' : 'grab',
            backgroundColor: '#f9f9f9',
            borderRadius: '12px',
            border: '1px solid rgba(15, 23, 42, 0.08)',
          }}
        >
          <div
            style={{
              transform: `translateY(${translateY}px)`,
              transition: isDragging ? 'none' : `transform 0.4s ${SPRING_EASING}`,
              height: `${(profilesSource?.length || 1) * CONTAINER_HEIGHT}px`,
              width: '100%',
            }}
          >
            {profilesSource && profilesSource.length > 0 ? (
              profilesSource.map((profile, index) => (
                <div
                  key={profile.id}
                  style={{
                    height: `${CONTAINER_HEIGHT}px`,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                    boxSizing: 'border-box',
                    backgroundColor: '#ffffff',
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <MiniProfileCard profile={profile} extraLink={`/profile/${profile.username}`} />
                  </div>
                </div>
              ))
            ) : (
              <div style={{ height: `${CONTAINER_HEIGHT}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '18px' }}>
                No profiles available
              </div>
            )}
          </div>

          {isDragging && (
            <div
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                fontSize: '12px',
                padding: '6px 10px',
                borderRadius: '6px',
                background: snapProgress > 1 ? '#0ecfbf' : 'rgba(15, 23, 42, 0.1)',
                color: snapProgress > 1 ? 'white' : '#666',
              }}
            >
              {Math.round(snapProgress * 100)}%
            </div>
          )}
        </div>


      </div>
    </AppShell>
  );
}