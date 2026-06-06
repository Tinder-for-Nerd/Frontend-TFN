import { motion } from 'framer-motion';
import type { FeedPost } from '../../types';
import { PostHeader } from './PostHeader';
import { PostImage } from './PostImage';
import { PostActions } from './PostActions';
import { PostCaption } from './PostCaption';

interface PostCardProps {
  post: FeedPost;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
  onUserClick: (userId: string) => void;
  onFollow: (userId: string) => void;
  onFollowRequest: (userId: string) => void;
}

export function PostCard({
  post,
  onLike,
  onSave,
  onComment,
  onShare,
  onUserClick,
  onFollow,
  onFollowRequest,
}: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm"
    >
      <PostHeader
        user={post.user}
        timestamp={post.timestamp}
        onUserClick={onUserClick}
        onFollow={onFollow}
        onFollowRequest={onFollowRequest}
      />

      <PostImage
        images={post.images}
        onDoubleTapLike={() => onLike(post.id)}
      />

      <PostActions
        postId={post.id}
        isLiked={post.isLiked}
        isSaved={post.isSaved}
        likesCount={post.likesCount}
        commentsCount={post.commentsCount}
        viewCount={post.viewCount}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onSave={onSave}
      />

      <PostCaption
        username={post.user.username}
        caption={post.caption}
        hashtags={post.hashtags}
      />

      <div className="px-4 pb-3 pt-1">
        {post.comments.slice(0, 2).map((comment) => (
          <div key={comment.id} className="flex items-start gap-2 mt-1">
            <span className="text-sm font-semibold text-gray-900 shrink-0">
              {comment.user.username}
            </span>
            <span className="text-sm text-gray-700 truncate">{comment.text}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
