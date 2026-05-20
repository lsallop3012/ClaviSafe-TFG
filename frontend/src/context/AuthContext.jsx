import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as authApi from '../api/authApi.js';
import { setToken, getToken } from '../api/client.js';
import { validateEmail } from '../utils/validateEmail.js';
 
const AuthContext = createContext(null);
 
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 
  // On mount, if we have a token, try to resolve the current user.
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
    if (!name || name.trim().length < 2) throw new Error('Name must be at least 2 characters.');
    const check = validateEmail(email);
    if (!check.valid) throw new Error(check.error);
    if (!password || password.length < 6) throw new Error('Password must be at least 6 characters.');
    const { token, user: u } = await authApi.register({
      name: name.trim(), email: check.normalized, password,
    });
    setToken(token);
    setUser(u);
    return u;
  }, []);
 
  const logout = useCallback(async () => {
    try { await authApi.logout(); } catch { /* ignore */ }
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