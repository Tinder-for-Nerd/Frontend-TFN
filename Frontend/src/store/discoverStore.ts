import { create } from 'zustand';
import type { DiscoveryProfile } from '../types';
import { mockDiscoveryProfiles } from '../data/mockData';

interface DiscoverState {
  profiles: DiscoveryProfile[];
  currentIndex: number;
  likedProfiles: string[];
  superLikedProfiles: string[];
  matches: string[];
  filters: {
    location: string;
    industry: string;
    interests: string;
    intent: string;
  };
  setFilters: (filters: Partial<DiscoverState['filters']>) => void;
  like: (profileId: string) => void;
  pass: (profileId: string) => void;
  superLike: (profileId: string) => void;
  reset: () => void;
  filteredProfiles: () => DiscoveryProfile[];
}

export const useDiscoverStore = create<DiscoverState>((set, get) => ({
  profiles: mockDiscoveryProfiles,
  currentIndex: 0,
  likedProfiles: [],
  superLikedProfiles: [],
  matches: [],
  filters: {
    location: '',
    industry: '',
    interests: '',
    intent: '',
  },

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
  },

  like: (profileId) => {
    set((state) => {
      const liked = [...state.likedProfiles, profileId];
      // Simulate mutual match (50% chance for demo)
      const isMatch = Math.random() > 0.5;
      const matches = isMatch
        ? [...state.matches, profileId]
        : state.matches;
      return {
        likedProfiles: liked,
        matches,
        currentIndex: state.currentIndex + 1,
      };
    });
  },

  pass: (_profileId) => {
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    }));
  },

  superLike: (profileId) => {
    set((state) => {
      const superLiked = [...state.superLikedProfiles, profileId];
      // Super like always results in a match
      return {
        superLikedProfiles: superLiked,
        matches: [...state.matches, profileId],
        currentIndex: state.currentIndex + 1,
      };
    });
  },

  reset: () => {
    set({
      currentIndex: 0,
      likedProfiles: [],
      superLikedProfiles: [],
      matches: [],
    });
  },

  filteredProfiles: () => {
    const { profiles, filters } = get();
    return profiles.filter((p) => {
      if (filters.location && !p.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
      if (filters.interests && !p.interests.some((i) => i.toLowerCase().includes(filters.interests.toLowerCase()))) return false;
      if (filters.intent && !p.bio.toLowerCase().includes(filters.intent.toLowerCase())) return false;
      return true;
    });
  },
}));
