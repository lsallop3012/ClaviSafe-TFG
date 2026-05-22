// All API endpoints in one place. If the backend URL changes (or you swap
// from the mock client to a real Laravel server), this is the only file
// you have to edit (plus REACT_APP_API_URL in .env).
//
// Pattern: every function that needs a dynamic param is exported as a
// builder. Plain strings for static routes.

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// AUTH
export const LOGIN_ENDPOINT = `${API_BASE_URL}/auth/login`;
export const REGISTER_ENDPOINT = `${API_BASE_URL}/auth/register`;
export const LOGOUT_ENDPOINT = `${API_BASE_URL}/auth/logout`;
export const GOOGLE_LOGIN_ENDPOINT = `${API_BASE_URL}/auth/google`;
export const ME_ENDPOINT = `${API_BASE_URL}/auth/me`;

// USERS
export const USERS_ENDPOINT = `${API_BASE_URL}/users`;
export const userEndpoint = (id) => `${API_BASE_URL}/users/${id}`;

// BOARDS
export const BOARDS_ENDPOINT = `${API_BASE_URL}/boards`;
export const boardEndpoint = (id) => `${API_BASE_URL}/boards/${id}`;
export const boardImagesEndpoint = (id) => `${API_BASE_URL}/boards/${id}/images`;

// IMAGES
export const IMAGES_ENDPOINT = `${API_BASE_URL}/images`;
export const imageEndpoint = (id) => `${API_BASE_URL}/images/${id}`;
export const imageLikeEndpoint = (id) => `${API_BASE_URL}/images/${id}/like`;
export const imageSaveEndpoint = (id) => `${API_BASE_URL}/images/${id}/save`;

// COMMENTS
export const imageCommentsEndpoint = (id) => `${API_BASE_URL}/images/${id}/comments`;
export const commentEndpoint = (id) => `${API_BASE_URL}/comments/${id}`;
