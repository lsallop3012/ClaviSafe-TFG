import { request } from './client.js';
import { USERS_ENDPOINT, userEndpoint } from './endpoints.js';

const qs = (params) => {
  const cleaned = Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== '');
  return cleaned.length ? `?${new URLSearchParams(Object.fromEntries(cleaned))}` : '';
};

export const listUsers = (params) =>
  request(`${USERS_ENDPOINT}${qs(params)}`);

export const getUser = (id) =>
  request(userEndpoint(id));

export const createUser = (payload) =>
  request(USERS_ENDPOINT, { method: 'POST', body: payload });

export const updateUser = (id, payload) =>
  request(userEndpoint(id), { method: 'PUT', body: payload });

export const deleteUser = (id) =>
  request(userEndpoint(id), { method: 'DELETE' });
