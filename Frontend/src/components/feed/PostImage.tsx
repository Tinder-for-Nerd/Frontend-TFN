import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface PostImageProps {
  images: string[];
  onDoubleTapLike: () => void;
}

export function PostImage({ images, onDoubleTapLike }: PostImageProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showHeart, setShowHeart] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const lastTap = useRef(0);

  const isCarousel = images.length > 1;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentImage < images.length - 1) {
        setCurrentImage(currentImage + 1);
      } else if (diff < 0 && currentImage > 0) {
        setCurrentImage(currentImage - 1);
      }
    }
  };

  const handleClick = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setShowHeart(true);
      onDoubleTapLike();
      setTimeout(() => setShowHeart(false), 600);
    }
    lastTap.current = now;
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && currentImage > 0) {
      setCurrentImage(currentImage - 1);
    } else if (e.key === 'ArrowRight' && currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    }
  };

  return (
    <div
      className="relative w-full bg-gray-100 select-none"
      style={{ aspectRatio: '1/1' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="img"
      aria-label="Post image"
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt={`Post image ${currentImage + 1}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </AnimatePresence>

      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Heart size={100} className="fill-white text-white drop-shadow-2xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {isCarousel && (
        <>
          {currentImage > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentImage(currentImage - 1); }}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md hover:bg-white transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} className="text-gray-800" />
            </button>
          )}
          {currentImage < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentImage(currentImage + 1); }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-md hover:bg-white transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={18} className="text-gray-800" />
            </button>
          )}

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrentImage(i); }}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentImage ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
