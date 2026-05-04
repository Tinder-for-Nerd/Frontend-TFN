import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('pm_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { localStorage.removeItem('pm_user'); }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    const u = { name: userData.name || userData.email, email: userData.email, loggedInAt: Date.now() };
    localStorage.setItem('pm_user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('pm_user');
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
