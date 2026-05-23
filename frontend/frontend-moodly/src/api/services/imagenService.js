import api from '../axios';
import { ENDPOINTS } from '../endpoints';

export const imagenService = {
  async list() {
    const { data } = await api.get(ENDPOINTS.IMAGENES.LIST);
    return data;
  },

  async create(payload) {
    const { data } = await api.post(ENDPOINTS.IMAGENES.CREATE, payload);
    return data;
  },

  async show(id) {
    const { data } = await api.get(ENDPOINTS.IMAGENES.SHOW(id));
    return data;
  },

  async update(id, payload) {
    const { data } = await api.put(ENDPOINTS.IMAGENES.UPDATE(id), payload);
    return data;
  },

  async remove(id) {
    const { data } = await api.delete(ENDPOINTS.IMAGENES.DELETE(id));
    return data;
  }
};
