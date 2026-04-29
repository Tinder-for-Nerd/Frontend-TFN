import React, { useState, useRef } from 'react';

export default function InstagramReelsFeed({ profiles, renderCard, onSnap }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const [dragOffset, setDragOffset] = useState(0);
  const isDragging = useRef(false);

  // Determine neighboring indices
  const prevIndex = currentIndex > 0 ? currentIndex - 1 : null;
  const nextIndex = currentIndex < profiles.length - 1 ? currentIndex + 1 : null;

  const handleTouchStart = (e) => {
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    // Prevent default scroll behavior
    if (e.cancelable) e.preventDefault();
    
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY.current;
    
    // Add physics resistance at the absolute boundaries
    if ((currentIndex === 0 && diff > 0) || (currentIndex === profiles.length - 1 && diff < 0)) {
       setDragOffset(diff * 0.15); // Stiffer spring at edge
    } else {
       setDragOffset(diff);
    }
  };

  const snapTo = (newIndex) => {
    setCurrentIndex(newIndex);
    if (onSnap) onSnap(newIndex);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    // 15% threshold represents physical swipe intent
    const threshold = window.innerHeight * 0.15;
    
    if (dragOffset < -threshold && nextIndex !== null) {
      snapTo(currentIndex + 1);
    } else if (dragOffset > threshold && prevIndex !== null) {
      snapTo(currentIndex - 1);
    }
    setDragOffset(0);
  };
  
  // Also support desktop wheel events
  const handleWheel = (e) => {
    if (isDragging.current) return;
    
    // Simple debounce/threshold for trackpad hyper-scroll
    if (e.deltaY > 30 && nextIndex !== null) {
      isDragging.current = true;
      snapTo(currentIndex + 1);
      setTimeout(() => isDragging.current = false, 500);
    } else if (e.deltaY < -30 && prevIndex !== null) {
      isDragging.current = true;
      snapTo(currentIndex - 1);
      setTimeout(() => isDragging.current = false, 500);
    }
  };

  return (
    <div 
      className="pm-reels-viewport" 
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ 
        overflow: 'hidden', 
        height: 'calc(100vh - 160px)', 
        maxHeight: '900px',
        position: 'relative',
        borderRadius: 24,
        touchAction: 'none' // Crucial for preventing mobile browser scroll interception
      }}
    >
      <div 
        className="pm-reels-track"
        style={{
          height: '100%',
          width: '100%',
          transform: `translateY(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
          transition: isDragging.current ? 'none' : 'transform 0.5s cubic-bezier(0.32, 1.25, 0.32, 1)' // Spring physics!
        }}
      >
        {profiles.map((profile, i) => {
          // The Magic "Pool of 3" technique
          // We only render the component if it's currently focused, or exactly 1 adjacent.
          const isVisible = Math.abs(i - currentIndex) <= 1;
          return (
            <div 
              key={profile.id} 
              className="pm-reels-item"
              style={{
                height: '100%', 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                padding: '0 0 20px 0'
              }}
            >
              {isVisible ? renderCard(profile, i === currentIndex) : <div style={{ height: '100%', width: '100%' }} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
