import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { ENDPOINTS } from '../api/endpoints';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem('moodly_token');
    if (!token) { setLoading(false); return; }
    try {
      const { data } = await api.get(ENDPOINTS.AUTH.ME);
      setUser(data);
    } catch {
      localStorage.removeItem('moodly_token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  const login = (userData, token) => {
    localStorage.setItem('moodly_token', token);
    setUser(userData);
  };

  const logout = async () => {
    try { await api.post(ENDPOINTS.AUTH.LOGOUT); } catch { /* ignore */ }
    localStorage.removeItem('moodly_token');
    setUser(null);
  };

  const updateUser = (partial) => setUser((prev) => ({ ...prev, ...partial }));

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser, fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
