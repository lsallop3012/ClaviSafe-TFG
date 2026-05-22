import { request } from './client.js';
import {
  LOGIN_ENDPOINT, REGISTER_ENDPOINT, LOGOUT_ENDPOINT, ME_ENDPOINT,
} from './endpoints.js';

export const login = (credentials) =>
  request(LOGIN_ENDPOINT, { method: 'POST', body: credentials, auth: false });

export const register = (payload) =>
  request(REGISTER_ENDPOINT, { method: 'POST', body: payload, auth: false });

export const logout = () =>
  request(LOGOUT_ENDPOINT, { method: 'POST' });

export const me = () =>
  request(ME_ENDPOINT, { method: 'GET' });
