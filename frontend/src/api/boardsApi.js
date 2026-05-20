import { request } from './client.js';
import { BOARDS_ENDPOINT, boardEndpoint, boardImagesEndpoint } from './endpoints.js';

const qs = (params) => {
  const cleaned = Object.entries(params || {}).filter(([, v]) => v !== undefined && v !== '');
  return cleaned.length ? `?${new URLSearchParams(Object.fromEntries(cleaned))}` : '';
};

export const listBoards = (params) =>
  request(`${BOARDS_ENDPOINT}${qs(params)}`);

export const getBoard = (id) =>
  request(boardEndpoint(id));

export const createBoard = (payload) =>
  request(BOARDS_ENDPOINT, { method: 'POST', body: payload });

export const updateBoard = (id, payload) =>
  request(boardEndpoint(id), { method: 'PUT', body: payload });

export const deleteBoard = (id) =>
  request(boardEndpoint(id), { method: 'DELETE' });

export const listBoardImages = (id, params) =>
  request(`${boardImagesEndpoint(id)}${qs(params)}`);

export const addImageToBoard = (boardId, imageId) =>
  request(boardImagesEndpoint(boardId), { method: 'POST', body: { image_id: imageId } });

export const removeImageFromBoard = (boardId, imageId) =>
  request(boardImagesEndpoint(boardId), { method: 'DELETE', body: { image_id: imageId } });
