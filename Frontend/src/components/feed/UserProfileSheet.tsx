import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BadgeCheck, Grid3X3, Bookmark, Award, Lock } from 'lucide-react';
import type { FeedUser } from '../../types';

interface UserProfileSheetProps {
  user: FeedUser | null;
  isOpen: boolean;
  onClose: () => void;
  onFollow: (userId: string) => void;
  onFollowRequest: (userId: string) => void;
  onMessage?: (userId: string) => void;
}

export function UserProfileSheet({ user, isOpen, onClose, onFollow, onFollowRequest, onMessage }: UserProfileSheetProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'saved' | 'highlights'>('posts');
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing ?? false);
  const [requested, setRequested] = useState(user?.hasFollowRequested ?? false);

  if (!user) return null;

  const handleFollow = () => {
    if (user.isPrivate && !isFollowing && !requested) {
      setRequested(true);
      onFollowRequest(user.id);
    } else {
      setIsFollowing(!isFollowing);
      onFollow(user.id);
    }
  };

  const tabs = [
    { id: 'posts' as const, icon: Grid3X3, label: 'Posts' },
    { id: 'saved' as const, icon: Bookmark, label: 'Saved' },
    { id: 'highlights' as const, icon: Award, label: 'Highlights' },
  ];

  const highlights = [
    { id: 'h1', label: 'Projects', image: '💻' },
    { id: 'h2', label: 'Talks', image: '🎤' },
    { id: 'h3', label: 'Awards', image: '🏆' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] z-50 overflow-y-auto rounded-2xl bg-white shadow-2xl max-w-md mx-auto"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-5 py-3 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Profile</h2>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-5">
              <div className="flex items-start gap-4">
                <div className="shrink-0">
                  <div className="h-20 w-20 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-gray-200">
                    <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-bold text-gray-900 truncate">{user.name}</h3>
                    {user.isVerified && <BadgeCheck size={18} className="fill-blue-500 text-white shrink-0" />}
                    {user.isPrivate && <Lock size={14} className="text-gray-400 shrink-0" />}
                  </div>
                  <p className="text-sm text-gray-500">@{user.username}</p>
                  <p className="mt-1 text-sm text-gray-700 line-clamp-2">{user.bio}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{user.postsCount}</p>
                  <p className="text-xs text-gray-500">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{user.followersCount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-900">{user.followingCount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Following</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                {!isFollowing && !requested && (
                  <button
                    onClick={handleFollow}
                    className="flex-1 rounded-lg bg-blue-500 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition-colors"
                  >
                    {user.isPrivate ? 'Follow' : 'Follow'}
                  </button>
                )}
                {requested && !isFollowing && (
                  <button className="flex-1 rounded-lg bg-gray-200 py-2 text-sm font-semibold text-gray-700 cursor-default">
                    Requested
                  </button>
                )}
                {isFollowing && (
                  <button
                    onClick={handleFollow}
                    className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Following
                  </button>
                )}
                {onMessage && (
                  <button
                    onClick={() => { onMessage(user.id); onClose(); }}
                    className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Message
                  </button>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <tab.icon size={16} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5">
              {activeTab === 'posts' && (
                <div className="grid grid-cols-3 gap-1">
                  {Array.from({ length: 9 }, (_, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-md bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-2xl"
                    >
                      {['💻', '🚀', '🎨', '📱', '🌐', '⚡', '🔧', '📊', '🤖'][i]}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'saved' && (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <Bookmark size={48} className="text-gray-300" />
                  <div>
                    <h4 className="text-base font-semibold text-gray-900">Saved</h4>
                    <p className="mt-1 text-sm text-gray-500">
                      Save posts and videos to view them later.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'highlights' && (
                <div className="flex gap-4 overflow-x-auto py-2">
                  {highlights.map((h) => (
                    <div key={h.id} className="flex flex-col items-center gap-1 shrink-0">
                      <div className="h-16 w-16 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-50 text-2xl">
                        {h.image}
                      </div>
                      <span className="text-xs text-gray-600">{h.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
