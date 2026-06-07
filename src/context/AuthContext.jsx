import { createContext, useContext, useState, useEffect } from 'react';
import { resolveAuthRole } from '../modules/auth/authConfig';

const AuthContext = createContext(null);

function normalizeUser(userData) {
  const role = resolveAuthRole(userData?.role);
  return {
    name: userData?.name || userData?.email || 'Member',
    email: userData?.email || '',
    role,
    firstLogin: Boolean(userData?.firstLogin),
    loggedInAt: userData?.loggedInAt || Date.now(),
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('pm_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const normalized = normalizeUser(parsed);
        setUser(normalized);
        localStorage.setItem('pm_user', JSON.stringify(normalized));
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('pm_workspace', normalized.role);
        }
      } catch {
        localStorage.removeItem('pm_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const u = normalizeUser(userData);
    localStorage.setItem('pm_user', JSON.stringify(u));
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('pm_workspace', u.role);
    }
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('pm_user');
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('pm_workspace');
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
