import { useEffect, useRef, useCallback } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFeedStore } from '../store/feedStore';
import { PostCard } from '../components/feed/PostCard';
import { CommentsSheet } from '../components/feed/CommentsSheet';
import { UserProfileSheet } from '../components/feed/UserProfileSheet';
import { ShareSheet } from '../components/feed/ShareSheet';
import { SaveSheet } from '../components/feed/SaveSheet';
import { SuggestedUsers } from '../components/feed/SuggestedUsers';
import { TrendingHashtags } from '../components/feed/TrendingHashtags';
import { feedUsers, mockSuggestedUsers, mockTrendingHashtags } from '../data/feedMockData';

export default function FeedPage() {
  const navigate = useNavigate();
  const {
    posts,
    collections,
    isRefreshing,
    isLoadingMore,
    hasMore,
    activeCommentPostId,
    activeProfileUserId,
    activeSharePostId,
    activeSavePostId,
    toggleLike,
    addComment,
    likeComment,
    toggleFollow,
    toggleFollowRequest,
    setActiveCommentPost,
    setActiveProfileUser,
    setActiveSharePost,
    setActiveSavePost,
    createCollection,
    saveToCollection,
    refreshFeed,
    loadMore,
  } = useFeedStore();

  const feedRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const activePost = posts.find((p) => p.id === activeCommentPostId) || null;
  const activeSharePost = posts.find((p) => p.id === activeSharePostId) || null;
  const activeSavePostData = posts.find((p) => p.id === activeSavePostId) || null;
  const activeUser = feedUsers.find((u) => u.id === activeProfileUserId) || null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loadMore]);

  const handleRefresh = useCallback(async () => {
    await refreshFeed();
  }, [refreshFeed]);

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (el.scrollTop < -100 && !isRefreshing) {
        handleRefresh();
      }
    },
    [isRefreshing, handleRefresh]
  );

  return (
    <div className="mx-auto flex max-w-5xl justify-center gap-6">
      <div
        ref={feedRef}
        onScroll={handleScroll}
        className="w-full max-w-[600px] overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 80px)' }}
      >

        {isRefreshing && (
          <div className="flex items-center justify-center py-4">
            <RefreshCw size={20} className="animate-spin text-blue-500" />
            <span className="ml-2 text-sm text-gray-500">Refreshing...</span>
          </div>
        )}

        <div className="space-y-4 py-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={toggleLike}
              onSave={(postId) => setActiveSavePost(postId)}
              onComment={(postId) => setActiveCommentPost(postId)}
              onShare={(postId) => setActiveSharePost(postId)}
              onUserClick={setActiveProfileUser}
              onFollow={toggleFollow}
              onFollowRequest={toggleFollowRequest}
            />
          ))}

          {isLoadingMore && (
            <div className="flex items-center justify-center py-6">
              <Loader2 size={24} className="animate-spin text-blue-500" />
              <span className="ml-2 text-sm text-gray-500">Loading more...</span>
            </div>
          )}

          {hasMore && !isLoadingMore && <div ref={sentinelRef} className="h-4" />}

          {!hasMore && (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-400">You've seen all posts</p>
            </div>
          )}
        </div>
      </div>

      <div className="hidden w-[320px] shrink-0 lg:block pt-4">
        <div className="sticky top-4 space-y-4">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <img
                  src="https://ui-avatars.com/api/?name=Alex+Johnson&background=2563EB&color=fff&size=200"
                  alt="Your profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">alexjohnson</p>
                <p className="text-xs text-gray-500">Alex Johnson</p>
              </div>
            </div>
            <button className="text-xs font-semibold text-blue-500 hover:text-blue-700 transition-colors">
              Switch
            </button>
          </div>

          <SuggestedUsers users={mockSuggestedUsers} onFollow={toggleFollow} />

          <TrendingHashtags hashtags={mockTrendingHashtags} />

          <div className="px-4 text-xs text-gray-400 leading-relaxed">
            <p>About &bull; Help &bull; Press &bull; API &bull; Jobs &bull; Privacy &bull; Terms</p>
            <p className="mt-2">&copy; 2026 ProMatch from SkillSynth</p>
          </div>
        </div>
      </div>

      <CommentsSheet
        post={activePost}
        isOpen={!!activeCommentPostId}
        onClose={() => setActiveCommentPost(null)}
        onAddComment={addComment}
        onLikeComment={likeComment}
      />

      <UserProfileSheet
        user={activeUser}
        isOpen={!!activeProfileUserId}
        onClose={() => setActiveProfileUser(null)}
        onFollow={toggleFollow}
        onFollowRequest={toggleFollowRequest}
        onMessage={() => navigate('/messages')}
      />

      <ShareSheet
        isOpen={!!activeSharePostId}
        onClose={() => setActiveSharePost(null)}
        postId={activeSharePost?.id || ''}
      />

      <SaveSheet
        isOpen={!!activeSavePostId}
        onClose={() => setActiveSavePost(null)}
        postId={activeSavePostData?.id || ''}
        collections={collections}
        onSaveToCollection={saveToCollection}
        onCreateCollection={createCollection}
      />
    </div>
  );
}
