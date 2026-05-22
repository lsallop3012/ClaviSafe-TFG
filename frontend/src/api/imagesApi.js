import { request } from './client.js';
import {
  IMAGES_ENDPOINT, imageEndpoint,
  imageLikeEndpoint, imageSaveEndpoint,
} from './endpoints.js';

const qs = (params) => {
  const cleaned = Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== '');
  return cleaned.length ? `?${new URLSearchParams(Object.fromEntries(cleaned))}` : '';
};

export const listImages = (params) =>
  request(`${IMAGES_ENDPOINT}${qs(params)}`);

export const getImage = (id) =>
  request(imageEndpoint(id));

export const createImage = (payload) =>
  request(IMAGES_ENDPOINT, { method: 'POST', body: payload });

export const updateImage = (id, payload) =>
  request(imageEndpoint(id), { method: 'PUT', body: payload });

export const deleteImage = (id) =>
  request(imageEndpoint(id), { method: 'DELETE' });

export const toggleLike = (id) =>
  request(imageLikeEndpoint(id), { method: 'POST' });

export const toggleSave = (id) =>
  request(imageSaveEndpoint(id), { method: 'POST' });
