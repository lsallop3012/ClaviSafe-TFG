import api from '../axios';
import { ENDPOINTS } from '../endpoints';

export const boardService = {
  async list(params = {}) {
    const { data } = await api.get(ENDPOINTS.BOARDS.LIST, { params });
    return data;
  },

  async show(id) {
    const { data } = await api.get(ENDPOINTS.BOARDS.SHOW(id));
    return data;
  },

  async listImages(id, params = {}) {
    const { data } = await api.get(ENDPOINTS.BOARDS.IMAGES(id), { params });
    return data;
  },

  async create(payload) {
    const { data } = await api.post(ENDPOINTS.BOARDS.CREATE, payload);
    return data;
  },

  async update(id, payload) {
    const { data } = await api.put(ENDPOINTS.BOARDS.UPDATE(id), payload);
    return data;
  },

  async saveImage(boardId, imageId) {
    const { data } = await api.post(ENDPOINTS.BOARDS.SAVE_IMAGE(boardId), { image_id: imageId });
    return data;
  },

  async remove(id) {
    const { data } = await api.delete(ENDPOINTS.BOARDS.DELETE(id));
    return data;
  },
};
