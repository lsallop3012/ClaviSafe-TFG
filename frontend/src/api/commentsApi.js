import { request } from './client.js';
import { imageCommentsEndpoint, commentEndpoint } from './endpoints.js';

export const listComments = (imageId) =>
  request(imageCommentsEndpoint(imageId));

export const createComment = (imageId, content) =>
  request(imageCommentsEndpoint(imageId), { method: 'POST', body: { content } });

export const deleteComment = (id) =>
  request(commentEndpoint(id), { method: 'DELETE' });
