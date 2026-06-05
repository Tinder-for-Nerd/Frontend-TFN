import { create } from 'zustand';
import type { AuthUser, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  checkAuth: () => {
    const stored = localStorage.getItem('promatch_user');
    if (stored) {
      try {
        const user = JSON.parse(stored) as AuthUser;
        set({ user, isAuthenticated: true });
      } catch {
        localStorage.removeItem('promatch_user');
      }
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });

    await new Promise((r) => setTimeout(r, 1000));

    const matchedUser = mockUsers.find((u) => u.email === email);

    if (matchedUser && password === 'demo123') {
      localStorage.setItem('promatch_user', JSON.stringify(matchedUser));
      localStorage.setItem('promatch_role', matchedUser.role);
      set({ user: matchedUser, isAuthenticated: true, isLoading: false });
      return true;
    }

    set({ isLoading: false, error: 'Invalid email or password' });
    return false;
  },

  register: (name: string, email: string, _password: string) => {
    const user: AuthUser = {
      id: 'u' + Date.now(),
      email,
      name,
      role: 'student',
      avatar: '',
    };
    localStorage.setItem('promatch_user', JSON.stringify(user));
    localStorage.setItem('promatch_role', user.role);
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('promatch_user');
    localStorage.removeItem('promatch_role');
    set({ user: null, isAuthenticated: false });
  },

  setRole: (role: UserRole) => {
    const { user } = get();
    if (user) {
      const updated = { ...user, role };
      localStorage.setItem('promatch_user', JSON.stringify(updated));
      localStorage.setItem('promatch_role', role);
      set({ user: updated });
    }
  },
}));
