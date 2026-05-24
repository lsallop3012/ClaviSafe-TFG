export const ENDPOINTS = Object.freeze({
  AUTH: {
    LOGIN:          '/login',
    LOGOUT:         '/logout',
    REGISTER:       '/register',
    ME:             '/me',
    PASSWORD_RESET: '/password/reset',
  },
  IMAGES: {
    LIST:   '/images',
    SHOW:   (id) => `/images/${id}`,
    LIKE:   (id) => `/images/${id}/like`,
    CREATE: '/images',
    UPDATE: (id) => `/images/${id}`,
    DELETE: (id) => `/images/${id}`,
  },
  BOARDS: {
    LIST:        '/boards',
    SHOW:        (id) => `/boards/${id}`,
    IMAGES:      (id) => `/boards/${id}/images`,
    CREATE:      '/boards',
    SAVE_IMAGE:   (id) => `/boards/${id}/save`,
    REMOVE_IMAGE: (boardId, imageId) => `/boards/${boardId}/images/${imageId}`,
    UPDATE:      (id) => `/boards/${id}`,
    DELETE:      (id) => `/boards/${id}`,
  },
  USERS: {
    LIST:   '/users',
    SHOW:   (id) => `/users/${id}`,
    UPDATE: (id) => `/users/${id}`,
    DELETE: (id) => `/users/${id}`,
  },
});
