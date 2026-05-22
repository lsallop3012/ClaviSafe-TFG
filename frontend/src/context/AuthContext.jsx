import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authApi from '../api/authApi.js';
import { setToken, getToken } from '../api/client.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount: if a token exists, try to resolve the current user.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!getToken()) { setLoading(false); return; }
      try {
        const me = await authApi.me();
        if (!cancelled) setUser(me);
      } catch {
        setToken(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async ({ name, password }) => {
    const { token, user: u } = await authApi.login({ name, password });
    setToken(token);
    setUser(u);
    return u;
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    const { token, user: u } = await authApi.register({ name, email, password });
    setToken(token);
    setUser(u);
    return u;
  }, []);

  const logout = useCallback(async () => {
    try { await authApi.logout(); } catch { /* ignore network errors on logout */ }
    setToken(null);
    setUser(null);
  }, []);

  const refreshMe = useCallback(async () => {
    const me = await authApi.me();
    setUser(me);
    return me;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, refreshMe, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
