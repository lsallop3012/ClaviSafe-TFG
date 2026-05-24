import api from '../axios';
import { ENDPOINTS } from '../endpoints';

export const imageService = {
  async list(params = {}) {
    const { data } = await api.get(ENDPOINTS.IMAGES.LIST, { params });
    return data;
  },

  async show(id) {
    const { data } = await api.get(ENDPOINTS.IMAGES.SHOW(id));
    return data;
  },

  async toggleLike(id) {
    const { data } = await api.post(ENDPOINTS.IMAGES.LIKE(id));
    return data;
  },

  async create(payload) {
    const { data } = await api.post(ENDPOINTS.IMAGES.CREATE, payload);
    return data;
  },

  async update(id, payload) {
    const { data } = await api.put(ENDPOINTS.IMAGES.UPDATE(id), payload);
    return data;
  },

  async remove(id) {
    const { data } = await api.delete(ENDPOINTS.IMAGES.DELETE(id));
    return data;
  },
};
