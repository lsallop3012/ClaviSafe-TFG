import api from '../axios';
import { ENDPOINTS } from '../endpoints';

const TOKEN_KEY = 'moodly_token';

export function parseApiError(err, fallback = 'Error de servidor.') {
  const data = err.response?.data;
  if (!data) return fallback;
  if (data.errors) {
    const first = Object.values(data.errors)[0];
    return Array.isArray(first) ? first[0] : String(first);
  }
  return data.message ?? fallback;
}

export const authService = {
  async login({ email, password }) {
    const { data } = await api.post(ENDPOINTS.AUTH.LOGIN, { email, password });
    if (data?.token) localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },

  async signup({ email, password, password_confirmation }) {
    const { data } = await api.post(ENDPOINTS.AUTH.REGISTER, {
      email,
      password,
      password_confirmation,
    });
    if (data?.token) localStorage.setItem(TOKEN_KEY, data.token);
    return data;
  },

  async logout() {
    try {
      await api.post(ENDPOINTS.AUTH.LOGOUT);
    } finally {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  async requestPasswordReset({ email }) {
    const { data } = await api.post(ENDPOINTS.AUTH.PASSWORD_RESET, { email });
    return data;
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated() {
    return Boolean(localStorage.getItem(TOKEN_KEY));
  },
};
