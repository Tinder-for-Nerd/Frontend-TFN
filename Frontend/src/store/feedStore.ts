import { create } from 'zustand';
import type { FeedPost, FeedStory, FeedComment, FeedCollection } from '../types';
import { mockFeedPosts, mockStories, generateMorePosts } from '../data/feedMockData';

interface FeedState {
  posts: FeedPost[];
  stories: FeedStory[];
  collections: FeedCollection[];
  isRefreshing: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  activeStoryIndex: number | null;
  activeCommentPostId: string | null;
  activeProfileUserId: string | null;
  activeSharePostId: string | null;
  activeSavePostId: string | null;
  page: number;

  initializeStories: () => void;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  toggleRepost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  likeComment: (postId: string, commentId: string) => void;
  toggleFollow: (userId: string) => void;
  toggleFollowRequest: (userId: string) => void;
  viewStory: (storyId: string) => void;
  markStoryViewed: (index: number) => void;
  nextStory: () => void;
  prevStory: () => void;
  closeStory: () => void;
  setActiveCommentPost: (postId: string | null) => void;
  setActiveProfileUser: (userId: string | null) => void;
  setActiveSharePost: (postId: string | null) => void;
  setActiveSavePost: (postId: string | null) => void;
  createCollection: (name: string) => void;
  saveToCollection: (postId: string, collectionId: string) => void;
  refreshFeed: () => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useFeedStore = create<FeedState>((set, get) => ({
  posts: mockFeedPosts,
  stories: mockStories,
  collections: [
    { id: 'col-1', name: 'Inspiration', posts: ['fp-1', 'fp-3'], coverImage: '' },
    { id: 'col-2', name: 'Tech Stack', posts: ['fp-2'], coverImage: '' },
  ],
  isRefreshing: false,
  isLoadingMore: false,
  hasMore: true,
  activeStoryIndex: null,
  activeCommentPostId: null,
  activeProfileUserId: null,
  activeSharePostId: null,
  activeSavePostId: null,
  page: 1,

  initializeStories: () => set({ stories: mockStories }),

  toggleLike: (postId) => set((state) => ({
    posts: state.posts.map((p) =>
      p.id === postId
        ? { ...p, isLiked: !p.isLiked, likesCount: p.isLiked ? p.likesCount - 1 : p.likesCount + 1 }
        : p
    ),
  })),

  toggleSave: (postId) => set((state) => ({
    posts: state.posts.map((p) =>
      p.id === postId ? { ...p, isSaved: !p.isSaved } : p
    ),
  })),

  toggleRepost: (postId) => set((state) => ({
    posts: state.posts.map((p) =>
      p.id === postId ? { ...p, isReposted: !p.isReposted } : p
    ),
  })),

  addComment: (postId, text) => set((state) => ({
    posts: state.posts.map((p) => {
      if (p.id !== postId) return p;
      const newComment: FeedComment = {
        id: `c-${Date.now()}`,
        user: {
          id: 'fu1',
          name: 'Alex Johnson',
          username: 'alexjohnson',
          avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=2563EB&color=fff&size=200',
          isVerified: true,
          isPrivate: false,
          bio: '',
          followersCount: 0,
          followingCount: 0,
          postsCount: 0,
        },
        text,
        timestamp: new Date().toISOString(),
        likesCount: 0,
        isLiked: false,
        replies: [],
      };
      return {
        ...p,
        comments: [newComment, ...p.comments],
        commentsCount: p.commentsCount + 1,
      };
    }),
  })),

  likeComment: (postId, commentId) => set((state) => ({
    posts: state.posts.map((p) => {
      if (p.id !== postId) return p;
      return {
        ...p,
        comments: p.comments.map((c) => {
          if (c.id === commentId) {
            return { ...c, isLiked: !c.isLiked, likesCount: c.isLiked ? c.likesCount - 1 : c.likesCount + 1 };
          }
          return {
            ...c,
            replies: c.replies.map((r) =>
              r.id === commentId
                ? { ...r, isLiked: !r.isLiked, likesCount: r.isLiked ? r.likesCount - 1 : r.likesCount + 1 }
                : r
            ),
          };
        }),
      };
    }),
  })),

  toggleFollow: (userId) => set((state) => ({
    posts: state.posts.map((p) => ({
      ...p,
      user: p.user.id === userId ? { ...p.user, isFollowing: !p.user.isFollowing } : p.user,
    })),
  })),

  toggleFollowRequest: (userId) => set((state) => ({
    posts: state.posts.map((p) => ({
      ...p,
      user: p.user.id === userId ? { ...p.user, hasFollowRequested: !p.user.hasFollowRequested } : p.user,
    })),
  })),

  viewStory: (storyId) => set((state) => ({
    stories: state.stories.map((s) =>
      s.id === storyId ? { ...s, viewed: true } : s
    ),
    activeStoryIndex: state.stories.findIndex((s) => s.id === storyId),
  })),

  markStoryViewed: (index) => set((state) => {
    const story = state.stories[index];
    if (!story || story.viewed) return state;
    return {
      stories: state.stories.map((s, i) =>
        i === index ? { ...s, viewed: true } : s
      ),
    };
  }),

  nextStory: () => set((state) => {
    const next = state.activeStoryIndex !== null ? state.activeStoryIndex + 1 : null;
    if (next !== null && next >= state.stories.length) return { activeStoryIndex: null };
    return { activeStoryIndex: next };
  }),

  prevStory: () => set((state) => {
    const prev = state.activeStoryIndex !== null ? state.activeStoryIndex - 1 : null;
    if (prev !== null && prev < 0) return { activeStoryIndex: 0 };
    return { activeStoryIndex: prev };
  }),

  closeStory: () => set({ activeStoryIndex: null }),

  setActiveCommentPost: (postId) => set({ activeCommentPostId: postId }),
  setActiveProfileUser: (userId) => set({ activeProfileUserId: userId }),
  setActiveSharePost: (postId) => set({ activeSharePostId: postId }),
  setActiveSavePost: (postId) => set({ activeSavePostId: postId }),

  createCollection: (name) => set((state) => ({
    collections: [
      ...state.collections,
      { id: `col-${Date.now()}`, name, posts: [] },
    ],
  })),

  saveToCollection: (postId, collectionId) => set((state) => ({
    collections: state.collections.map((c) =>
      c.id === collectionId
        ? { ...c, posts: c.posts.includes(postId) ? c.posts : [...c.posts, postId] }
        : c
    ),
    posts: state.posts.map((p) =>
      p.id === postId ? { ...p, isSaved: true } : p
    ),
  })),

  refreshFeed: async () => {
    set({ isRefreshing: true });
    await new Promise((r) => setTimeout(r, 1000));
    set({ posts: mockFeedPosts, isRefreshing: false, page: 1, hasMore: true });
  },

  loadMore: async () => {
    const { isLoadingMore, hasMore, page, posts } = get();
    if (isLoadingMore || !hasMore) return;
    set({ isLoadingMore: true });
    await new Promise((r) => setTimeout(r, 800));
    const newPosts = generateMorePosts(page * 20, 5);
    set({
      posts: [...posts, ...newPosts],
      page: page + 1,
      isLoadingMore: false,
      hasMore: page < 5,
    });
  },
}));
