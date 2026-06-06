import { useState } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, BadgeCheck, Lock, UserPlus, UserMinus, Clock } from 'lucide-react';
import type { FeedUser } from '../../types';
import { getTimeAgo } from '../../lib/utils';

interface PostHeaderProps {
  user: FeedUser;
  timestamp: string;
  onUserClick: (userId: string) => void;
  onFollow: (userId: string) => void;
  onFollowRequest: (userId: string) => void;
}

export function PostHeader({ user, timestamp, onUserClick, onFollow, onFollowRequest }: PostHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);
  const [requested, setRequested] = useState(user.hasFollowRequested);

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (user.isPrivate && !isFollowing && !requested) {
      setRequested(true);
      onFollowRequest(user.id);
    } else {
      setIsFollowing(!isFollowing);
      onFollow(user.id);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-3">
        <button onClick={() => onUserClick(user.id)} className="shrink-0">
          <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          </div>
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <button
              onClick={() => onUserClick(user.id)}
              className="text-sm font-semibold text-gray-900 hover:underline"
            >
              {user.username}
            </button>
            {user.isVerified && <BadgeCheck size={14} className="fill-blue-500 text-white" />}
            {user.isPrivate && <Lock size={12} className="text-gray-400" />}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={10} />
            <span>{getTimeAgo(timestamp)}</span>
          </div>
        </div>
        {!isFollowing && !requested && (
          <button
            onClick={handleFollow}
            className="ml-2 rounded-lg bg-blue-500 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-600 transition-colors"
          >
            Follow
          </button>
        )}
        {requested && !isFollowing && (
          <span className="ml-2 text-xs text-gray-400">Requested</span>
        )}
        {isFollowing && (
          <button
            onClick={handleFollow}
            className="ml-2 flex items-center gap-1 rounded-lg border border-gray-300 px-2 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <UserMinus size={12} />
            Following
          </button>
        )}
      </div>

      <div className="relative">
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
          className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <MoreHorizontal size={18} />
        </button>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-0 top-full z-20 mt-1 w-56 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
            >
              <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                <UserPlus size={16} />
                Add to favorites
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                <span className="text-base">🚫</span>
                Not interested
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                <span className="text-base">🚩</span>
                Report
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
