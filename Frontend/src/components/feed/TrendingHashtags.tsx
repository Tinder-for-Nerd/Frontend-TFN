import { TrendingUp } from 'lucide-react';
import type { TrendingHashtag } from '../../types';

interface TrendingHashtagsProps {
  hashtags: TrendingHashtag[];
}

export function TrendingHashtags({ hashtags }: TrendingHashtagsProps) {
  return (
    <div className="px-4 py-3">
      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
        <TrendingUp size={14} />
        Trending Tags
      </h3>
      <div className="space-y-2">
        {hashtags.map((tag) => (
          <div key={tag.tag} className="flex items-center justify-between group cursor-pointer">
            <span className="text-sm text-blue-500 group-hover:text-blue-700 transition-colors">
              #{tag.tag}
            </span>
            <span className="text-xs text-gray-400">
              {tag.postsCount.toLocaleString()} posts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
