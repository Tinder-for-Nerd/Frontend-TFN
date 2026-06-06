import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Send, MessageCircle } from 'lucide-react';
import type { FeedPost, FeedComment } from '../../types';
import { getTimeAgo } from '../../lib/utils';

interface CommentsSheetProps {
  post: FeedPost | null;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (postId: string, text: string) => void;
  onLikeComment: (postId: string, commentId: string) => void;
}

export function CommentsSheet({ post, isOpen, onClose, onAddComment, onLikeComment }: CommentsSheetProps) {
  const [commentText, setCommentText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText('');
  };

  const emojis = ['😊', '😂', '❤️', '🔥', '👍', '🎉', '💯', '✨', '🚀', '💪', '🙌', '👏', '🤩', '😍', '🥺', '💡'];

  const renderComment = (comment: FeedComment, postId: string, isReply = false) => (
    <div key={comment.id} className={`flex gap-3 ${isReply ? 'ml-10 mt-3' : 'mb-4'}`}>
      <div className="shrink-0">
        <div className="h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-gray-400 to-gray-500">
          <img src={comment.user.avatar} alt={comment.user.name} className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-gray-900">{comment.user.username}</span>
          <span className="text-xs text-gray-400">{getTimeAgo(comment.timestamp)}</span>
        </div>
        <p className="mt-0.5 text-sm text-gray-800">{comment.text}</p>
        <div className="mt-1 flex items-center gap-4">
          <button
            onClick={() => onLikeComment(postId, comment.id)}
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600"
          >
            <Heart
              size={12}
              className={comment.isLiked ? 'fill-red-500 text-red-500' : ''}
            />
            {comment.likesCount > 0 && <span>{comment.likesCount}</span>}
          </button>
          <button className="text-xs font-semibold text-gray-400 hover:text-gray-600">Reply</button>
        </div>
        {comment.replies.map((reply) => renderComment(reply, postId, true))}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && post && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 flex h-[80vh] flex-col rounded-t-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h3 className="text-base font-semibold text-gray-900">Comments</h3>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto px-4 pt-4 pb-2">
              {post.comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <MessageCircle size={48} className="mb-2" />
                  <p className="text-sm">No comments yet. Be the first!</p>
                </div>
              ) : (
                post.comments.map((comment) => renderComment(comment, post.id))
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-3">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/30"
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmoji(!showEmoji)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                  >
                    😊
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={!commentText.trim()}
                  className="rounded-full p-2 text-blue-500 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Send size={20} />
                </button>
              </form>

              <AnimatePresence>
                {showEmoji && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="mt-2 flex flex-wrap gap-2"
                  >
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => {
                          setCommentText((prev) => prev + emoji);
                          inputRef.current?.focus();
                        }}
                        className="rounded-lg p-1 text-xl hover:bg-gray-100 transition-colors"
                      >
                        {emoji}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
