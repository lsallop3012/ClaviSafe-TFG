import api from '../axios';
import { ENDPOINTS } from '../endpoints';

export const userService = {
  async update(id, payload) {
    const { data } = await api.patch(ENDPOINTS.USERS.UPDATE(id), payload);
    return data;
  },
};
