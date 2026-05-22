// Tiny fetch wrapper. All API modules go through here.
//
// - In a real deployment, set REACT_APP_API_URL and this will do real HTTP.
// - With no env var set, requests are routed to the mock handler so the
//   app works fully offline (the demo / TFG mode).
//
// The bearer token (when present) is read from localStorage and attached
// automatically. No manual header juggling in the rest of the codebase.

import { mockHandle } from './mockBackend.js';

const TOKEN_KEY = 'moodly_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
};

const USE_MOCK = !process.env.REACT_APP_API_URL;

/**
 * Generic request.
 * @param {string} url       Full URL from endpoints.js
 * @param {object} [options] { method, body, auth }
 *   - method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'  (default GET)
 *   - body:   any JSON-serializable payload (default none)
 *   - auth:   true to send the bearer token (default true)
 */
export async function request(url, { method = 'GET', body, auth = true } = {}) {
  if (USE_MOCK) {
    // Mock mode — short-circuit the network and run against localStorage.
    return mockHandle(url, { method, body, auth });
  }

  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Try to parse JSON regardless of status so the caller gets error details.
  let payload = null;
  try { payload = await res.json(); } catch { /* no body */ }

  if (!res.ok) {
    const message = payload?.message || `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.payload = payload;
    throw err;
  }

  return payload;
}
