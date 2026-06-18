import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  token: null,
  hydrated: false,
  setUser: (user) => set({ user, hydrated: true }),
  setToken: (token) => set({ token }),
  setSession: ({ user, token }) => set({ user, token, hydrated: true }),
  logout: () => set({ user: null, token: null, hydrated: true }),
}));

export const selectIsAuthenticated = (state) => Boolean(state.user);
export const selectUserRole = (state) => state.user?.role || 'student';
