import { useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Play } from 'lucide-react';
import type { FeedStory } from '../../types';

interface StoryViewerProps {
  stories: FeedStory[];
  activeIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  onMarkViewed: (index: number) => void;
}

export function StoryViewer({ stories, activeIndex, onNext, onPrev, onClose, onMarkViewed }: StoryViewerProps) {
  const story = stories[activeIndex];

  useEffect(() => {
    if (!story) return;
    onMarkViewed(activeIndex);
  }, [activeIndex, story, onMarkViewed]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      else if (e.key === 'ArrowLeft') onPrev();
      else if (e.key === 'Escape') onClose();
    },
    [onNext, onPrev, onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!story) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      >
        <div className="relative h-full w-full max-w-lg">
          <div className="absolute top-0 left-0 right-0 z-10 p-4">
            <div className="flex gap-1 mb-3">
              {stories.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 flex-1 rounded-full transition-colors ${
                    i <= activeIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white">
                  <img
                    src={story.user.avatar}
                    alt={story.user.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-sm font-semibold text-white">{story.user.name}</span>
                <span className="text-xs text-white/70">
                  {new Date(story.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-white hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>

          <div
            className="flex h-full w-full items-center justify-center"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              if (x < rect.width / 3) onPrev();
              else if (x > (rect.width * 2) / 3) onNext();
            }}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${story.image})`,
                backgroundColor: '#1a1a2e',
              }}
            />
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4">
            <button
              onClick={onPrev}
              disabled={activeIndex === 0}
              className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm disabled:opacity-30 hover:bg-white/30 transition-all"
            >
              <Play size={18} className="rotate-180" />
            </button>
            <button
              onClick={onNext}
              disabled={activeIndex === stories.length - 1}
              className="rounded-full bg-white/20 p-2 text-white backdrop-blur-sm disabled:opacity-30 hover:bg-white/30 transition-all"
            >
              <Play size={18} />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
