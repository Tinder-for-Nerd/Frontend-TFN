import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import type { FeedStory } from '../../types';

interface StoriesBarProps {
  stories: FeedStory[];
  onStoryClick: (storyId: string) => void;
}

export function StoriesBar({ stories, onStoryClick }: StoriesBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 200;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-1.5 shadow-md hover:bg-white hidden md:flex"
        aria-label="Scroll left"
      >
        <ChevronLeft size={16} className="text-gray-700" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto py-3 px-1 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative">
            <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-dashed border-gray-300 p-0.5">
              <div className="h-full w-full overflow-hidden rounded-full bg-gray-100">
                <img
                  src="https://ui-avatars.com/api/?name=You&background=2563EB&color=fff&size=200"
                  alt="Your story"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white shadow-sm">
              <Plus size={12} />
            </div>
          </div>
          <span className="text-xs text-gray-500 truncate w-16 text-center">Your Story</span>
        </div>

        {stories.map((story) => (
          <motion.button
            key={story.id}
            whileTap={{ scale: 0.9 }}
            onClick={() => onStoryClick(story.id)}
            className="flex flex-col items-center gap-1 shrink-0"
          >
            <div
              className={`h-16 w-16 overflow-hidden rounded-full p-0.5 ${
                story.viewed
                  ? 'border-2 border-gray-300'
                  : 'border-2 border-transparent bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600'
              }`}
            >
              <div className="h-full w-full overflow-hidden rounded-full bg-white">
                <img
                  src={story.user.avatar}
                  alt={story.user.name}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <span className={`text-xs truncate w-16 text-center ${
              story.viewed ? 'text-gray-400' : 'text-gray-700 font-medium'
            }`}>
              {story.user.username}
            </span>
          </motion.button>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 p-1.5 shadow-md hover:bg-white hidden md:flex"
        aria-label="Scroll right"
      >
        <ChevronRight size={16} className="text-gray-700" />
      </button>
    </div>
  );
}
