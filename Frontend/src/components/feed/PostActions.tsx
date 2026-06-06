import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Send, Bookmark, BookmarkCheck, Eye } from 'lucide-react';

interface PostActionsProps {
  postId: string;
  isLiked: boolean;
  isSaved: boolean;
  likesCount: number;
  commentsCount: number;
  viewCount?: number;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onSave: (postId: string) => void;
}

export function PostActions({
  postId,
  isLiked,
  isSaved,
  likesCount,
  commentsCount,
  viewCount,
  onLike,
  onComment,
  onShare,
  onSave,
}: PostActionsProps) {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [showHeartBurst, setShowHeartBurst] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    onLike(postId);
    if (!liked) {
      setShowHeartBurst(true);
      setTimeout(() => setShowHeartBurst(false), 600);
    }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSaved(!saved);
    onSave(postId);
  };

  const handleComment = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment(postId);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(postId);
  };

  return (
    <div className="relative px-4 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={handleLike} className="group relative">
            <motion.div
              animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Heart
                size={24}
                className={`transition-colors ${
                  liked
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-700 group-hover:text-gray-500'
                }`}
              />
            </motion.div>
            {showHeartBurst && (
              <motion.div
                initial={{ opacity: 1, scale: 0 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 0.6 }}
                className="absolute -inset-2 flex items-center justify-center"
              >
                <Heart size={36} className="fill-red-500 text-red-500" />
              </motion.div>
            )}
          </button>

          <button onClick={handleComment} className="group">
            <MessageCircle
              size={24}
              className="text-gray-700 group-hover:text-gray-500 transition-colors"
            />
          </button>

          <button onClick={handleShare} className="group">
            <Send
              size={24}
              className="text-gray-700 group-hover:text-gray-500 transition-colors"
            />
          </button>
        </div>

        <button onClick={handleSave} className="group">
          {saved ? (
            <BookmarkCheck size={24} className="fill-yellow-500 text-yellow-500 transition-colors" />
          ) : (
            <Bookmark
              size={24}
              className="text-gray-700 group-hover:text-gray-500 transition-colors"
            />
          )}
        </button>
      </div>

      <div className="mt-1 flex items-center gap-3 text-sm font-semibold text-gray-900">
        <span>{likesCount.toLocaleString()} likes</span>
        {viewCount !== undefined && (
          <span className="flex items-center gap-1 text-xs font-normal text-gray-400">
            <Eye size={14} />
            {viewCount.toLocaleString()}
          </span>
        )}
      </div>

      <button
        onClick={handleComment}
        className="mt-0.5 text-xs text-gray-400 hover:text-gray-500 transition-colors"
      >
        View all {commentsCount} comments
      </button>
    </div>
  );
}
