export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8080/backend/api';

// AUTH (backend uses flat paths — no /auth/ prefix)
export const LOGIN_ENDPOINT    = `${API_BASE_URL}/login`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}/register`;
export const LOGOUT_ENDPOINT   = `${API_BASE_URL}/logout`;
export const ME_ENDPOINT       = `${API_BASE_URL}/me`;

// USERS
export const USERS_ENDPOINT = `${API_BASE_URL}/users`;
export const userEndpoint   = (id) => `${API_BASE_URL}/users/${id}`;

// BOARDS
export const BOARDS_ENDPOINT     = `${API_BASE_URL}/boards`;
export const boardEndpoint       = (id) => `${API_BASE_URL}/boards/${id}`;
export const boardImagesEndpoint = (id) => `${API_BASE_URL}/boards/${id}/images`;
export const boardSaveEndpoint   = (id) => `${API_BASE_URL}/boards/${id}/save`;

// IMAGES
export const IMAGES_ENDPOINT   = `${API_BASE_URL}/images`;
export const imageEndpoint     = (id) => `${API_BASE_URL}/images/${id}`;
export const imageLikeEndpoint = (id) => `${API_BASE_URL}/images/${id}/like`;
