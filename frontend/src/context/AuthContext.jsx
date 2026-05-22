import { createContext, useContext, useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD

const AuthContext = createContext(null);

const STORAGE_KEY = 'moodly_users';
const SESSION_KEY = 'moodly_session';

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function seedDefaultUser() {
  const users = readUsers();
  if (users.length === 0) {
    users.push({
      id: 1,
      name: 'demo',
      email: 'demo@moodly.app',
      password: 'demo1234',
      bio: 'Welcome to Moodly! This is the demo account.',
      avatar: '/images/imagen1.avif',
      role_id: 1,
      created_at: new Date().toISOString(),
    });
    writeUsers(users);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedDefaultUser();
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) {
      const users = readUsers();
      const found = users.find((u) => String(u.id) === String(sessionId));
      if (found) {
        const { password, ...safe } = found;
        setUser(safe);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async ({ name, password }) => {
    const users = readUsers();
    const found = users.find(
      (u) => (u.name === name || u.email === name) && u.password === password
    );
    if (!found) {
      throw new Error('Username or password incorrect');
    }
    localStorage.setItem(SESSION_KEY, String(found.id));
    const { password: _p, ...safe } = found;
    setUser(safe);
    return safe;
  }, []);

  const register = useCallback(async ({ name, email, password }) => {
    const users = readUsers();
    if (users.some((u) => u.name === name)) {
      throw new Error('Username already taken');
    }
    if (users.some((u) => u.email === email)) {
      throw new Error('Email already registered');
    }
    const newUser = {
      id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
      name,
      email,
      password,
      bio: '',
      avatar: '',
      role_id: 2,
      created_at: new Date().toISOString(),
    };
    users.push(newUser);
    writeUsers(users);
    localStorage.setItem(SESSION_KEY, String(newUser.id));
    const { password: _p, ...safe } = newUser;
    setUser(safe);
    return safe;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === user?.id);
    if (idx === -1) return;
    users[idx] = { ...users[idx], ...updates };
    writeUsers(users);
    const { password, ...safe } = users[idx];
    setUser(safe);
  }, [user]);

  const getAllUsers = useCallback(() => {
    return readUsers().map(({ password, ...rest }) => rest);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile, getAllUsers }}
=======
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
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
    >
      {children}
    </AuthContext.Provider>
  );
}
<<<<<<< HEAD

=======
 
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
<<<<<<< HEAD
}
=======
}
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
