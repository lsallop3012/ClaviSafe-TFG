// Mock backend. Routes URL patterns (mirroring endpoints.js) to handlers that
// read/write localStorage. Returns the same shapes a real Laravel API would,
// so swapping to real HTTP is just a matter of pointing REACT_APP_API_URL.
//
// Response shape:
//   - Lists:   { data: [...], meta: { page, perPage, total, totalPages } }
//   - Single:  the object directly
//   - Errors:  thrown with { status, message }

import { API_BASE_URL } from './endpoints.js';

// ---------- storage helpers ----------
const K_USERS        = 'moodly_users';
const K_IMAGES       = 'moodly_images';
const K_BOARDS       = 'moodly_boards';
const K_BOARD_IMAGES = 'moodly_board_images';
const K_LIKES        = 'moodly_likes';
const K_SAVED        = 'moodly_saved';
const K_TOKENS       = 'moodly_token_map';

const read = (k, def = []) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; }
};
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const nextId = (arr) => (arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1);

const fail = (status, message) => {
  const e = new Error(message);
  e.status = status;
  throw e;
};

const stripPwd = ({ password, ...rest }) => rest;

const SEED_IMAGES = [
  { name: 'Sunset Vibes', url: '/images/imagen1.avif', description: 'Warm sunset over the city' },
  { name: 'Forest Trail', url: '/images/imagen2.avif', description: 'A path through misty woods' },
  { name: 'Mountain Peak', url: '/images/imagen3.avif', description: 'View from the summit' },
  { name: 'Calm Waters', url: '/images/imagen4.avif', description: 'Reflections on a lake' },
  { name: 'City Lights', url: '/images/imagen5.avif', description: 'Night skyline' },
  { name: 'Quiet Coast', url: '/images/photo-1483982258113-b72862e6cff6.avif', description: 'Coastal view' },
  { name: 'Desert Bloom', url: '/images/photo-1518895949257-7621c3c786d7.avif', description: 'Flowers in the desert' },
  { name: 'Open Road', url: '/images/photo-1564349683136-77e08dba1ef7.avif', description: 'Endless highway' },
  { name: 'Abstract Mood', url: '/images/premium_vector-1720569610058-8c8ed40c464c.avif', description: 'Vector illustration' },
  { name: 'Figma Inspo', url: '/images/FigmaExample.webp', description: 'Design inspiration' },
  { name: 'Silent Hill', url: '/images/FigmaSilentHill.webp', description: 'Foggy atmosphere' },
  { name: 'Sleepy Cat', url: '/images/nimhcat.jpg', description: 'Cat being a cat' },
];

function seed() {
  if (read(K_USERS).length === 0) {
    write(K_USERS, [
      {
        id: 1, name: 'admin', email: 'admin@moodly.app', password: 'admin1234',
        bio: 'I run this place.', avatar: '/images/imagen5.avif',
        role: 'admin', created_at: new Date().toISOString(),
      },
      {
        id: 2, name: 'demo', email: 'demo@moodly.app', password: 'demo1234',
        bio: 'Welcome to Moodly! This is the demo account.',
        avatar: '/images/imagen1.avif',
        role: 'user', created_at: new Date().toISOString(),
      },
    ]);
  }
  if (read(K_IMAGES).length === 0) {
    const now = new Date().toISOString();
    write(K_IMAGES, SEED_IMAGES.map((s, i) => ({
      id: i + 1, ...s, user_id: 2, created_at: now,
    })));
  }
  if (read(K_BOARDS).length === 0) {
    write(K_BOARDS, [
      { id: 1, name: 'Inspiration', description: 'A collection of cool stuff', user_id: 2, cover: '/images/imagen1.avif', created_at: new Date().toISOString() },
      { id: 2, name: 'Travel',      description: 'Places to go',              user_id: 2, cover: '/images/imagen3.avif', created_at: new Date().toISOString() },
    ]);
  }
  if (read(K_BOARD_IMAGES).length === 0) {
    write(K_BOARD_IMAGES, [
      { board_id: 1, image_id: 1 }, { board_id: 1, image_id: 9 }, { board_id: 1, image_id: 10 },
      { board_id: 2, image_id: 2 }, { board_id: 2, image_id: 3 }, { board_id: 2, image_id: 6 },
    ]);
  }
  if (!localStorage.getItem(K_LIKES))  write(K_LIKES, []);
  if (!localStorage.getItem(K_SAVED))  write(K_SAVED, []);
  if (!localStorage.getItem(K_TOKENS)) write(K_TOKENS, {});
}
seed();

// ---------- auth helpers ----------
function authedUser(authRequired) {
  const token = localStorage.getItem('moodly_token');
  if (!token) {
    if (authRequired) fail(401, 'Not authenticated.');
    return null;
  }
  const map = read(K_TOKENS, {});
  const userId = map[token];
  if (!userId) {
    if (authRequired) fail(401, 'Invalid token.');
    return null;
  }
  const user = read(K_USERS).find((u) => u.id === userId);
  if (!user) {
    if (authRequired) fail(401, 'User no longer exists.');
    return null;
  }
  return user;
}

function issueToken(userId) {
  const token = `tok_${userId}_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  const map = read(K_TOKENS, {});
  map[token] = userId;
  write(K_TOKENS, map);
  return token;
}

function revokeToken(token) {
  if (!token) return;
  const map = read(K_TOKENS, {});
  delete map[token];
  write(K_TOKENS, map);
}

function paginate(items, page = 1, perPage = 20) {
  const p  = Math.max(1, Number(page) || 1);
  const pp = Math.max(1, Number(perPage) || 20);
  const start = (p - 1) * pp;
  return {
    data: items.slice(start, start + pp),
    meta: { page: p, perPage: pp, total: items.length, totalPages: Math.ceil(items.length / pp) || 1 },
  };
}

function parseUrl(fullUrl) {
  const u = new URL(fullUrl);
  const path = u.pathname.replace(API_BASE_URL.replace(/^https?:\/\/[^/]+/, ''), '');
  const params = Object.fromEntries(u.searchParams.entries());
  return { path, params };
}

export async function mockHandle(fullUrl, { method, body, auth }) {
  await new Promise((r) => setTimeout(r, 60));

  const { path, params } = parseUrl(fullUrl);
  const route = `${method} ${path}`;

  // ---- Auth (flat paths, mirrors backend) ----
  if (route === 'POST /register') return registerHandler(body);
  if (route === 'POST /login')    return loginHandler(body);
  if (route === 'POST /logout')   return logoutHandler();
  if (route === 'GET /me')        return meHandler();

  // Anonymous-readable routes resolve `me` without requiring auth.
  // Anything else uses the caller's `auth` flag (defaults to true).
  const isAnonReadable =
    (method === 'GET' && (path === '/images' || path === '/boards')) ||
    (method === 'GET' && /^\/images\/\d+$/.test(path)) ||
    (method === 'GET' && /^\/boards\/\d+$/.test(path)) ||
    (method === 'GET' && /^\/boards\/\d+\/images$/.test(path));
  const me = authedUser(isAnonReadable ? false : auth);

  // ---- Users ----
  if (route === 'GET /users')  return usersListHandler(me, params);
  if (route === 'POST /users') return userCreateHandler(me, body);
  const userMatch = path.match(/^\/users\/(\d+)$/);
  if (userMatch) {
    const id = Number(userMatch[1]);
    if (method === 'GET')                       return userGetHandler(id);
    if (method === 'PUT' || method === 'PATCH') return userUpdateHandler(me, id, body);
    if (method === 'DELETE')                    return userDeleteHandler(me, id);
  }

  // ---- Boards ----
  if (route === 'GET /boards')  return boardsListHandler(params);
  if (route === 'POST /boards') return boardCreateHandler(me, body);
  const boardMatch = path.match(/^\/boards\/(\d+)$/);
  if (boardMatch) {
    const id = Number(boardMatch[1]);
    if (method === 'GET')                       return boardGetHandler(id);
    if (method === 'PUT' || method === 'PATCH') return boardUpdateHandler(me, id, body);
    if (method === 'DELETE')                    return boardDeleteHandler(me, id);
  }
  const boardImgMatch  = path.match(/^\/boards\/(\d+)\/images$/);
  if (boardImgMatch && method === 'GET')  return boardImagesHandler(Number(boardImgMatch[1]), params);
  const boardSaveMatch = path.match(/^\/boards\/(\d+)\/save$/);
  if (boardSaveMatch && method === 'POST') return boardSaveHandler(me, Number(boardSaveMatch[1]), body);

  // ---- Images ----
  if (route === 'GET /images')  return imagesListHandler(params);
  if (route === 'POST /images') return imageCreateHandler(me, body);
  const imgMatch = path.match(/^\/images\/(\d+)$/);
  if (imgMatch) {
    const id = Number(imgMatch[1]);
    if (method === 'GET')                       return imageGetHandler(id);
    if (method === 'PUT' || method === 'PATCH') return imageUpdateHandler(me, id, body);
    if (method === 'DELETE')                    return imageDeleteHandler(me, id);
  }
  const likeMatch = path.match(/^\/images\/(\d+)\/like$/);
  if (likeMatch && method === 'POST') return likeToggleHandler(me, Number(likeMatch[1]));

  fail(404, `No mock route for ${route}`);
  return null;
}

// ---------- AUTH ----------
function registerHandler({ name, email, password }) {
  if (!name || !email || !password) fail(422, 'All fields required.');
  const users = read(K_USERS);
  const lowerEmail = String(email).toLowerCase();
  if (users.some((u) => u.name.toLowerCase() === String(name).toLowerCase())) fail(409, 'Username already taken.');
  if (users.some((u) => u.email === lowerEmail))                              fail(409, 'Email already registered.');
  const user = {
    id: nextId(users),
    name: String(name).trim(),
    email: lowerEmail,
    password,
    bio: '', avatar: '',
    role: 'user',
    created_at: new Date().toISOString(),
  };
  users.push(user);
  write(K_USERS, users);
  const token = issueToken(user.id);
  return { token, user: stripPwd(user) };
}

function loginHandler({ name, password }) {
  if (!name || !password) fail(422, 'Username and password are required.');
  const users = read(K_USERS);
  const lower = String(name).toLowerCase();
  const user = users.find(
    (u) => (u.name.toLowerCase() === lower || u.email === lower) && u.password === password
  );
  if (!user) fail(401, 'Credenciales incorrectas');
  const token = issueToken(user.id);
  return { token, user: stripPwd(user) };
}

function logoutHandler() {
  revokeToken(localStorage.getItem('moodly_token'));
  return { ok: true };
}

function meHandler() {
  const user = authedUser(true);
  return stripPwd(user);
}

// ---------- USERS ----------
function usersListHandler(me, params) {
  if (me?.role !== 'admin') fail(403, 'Admin only.');
  const all = read(K_USERS).map(stripPwd);
  const q = (params.q || '').toLowerCase();
  const filtered = q
    ? all.filter((u) => u.name.toLowerCase().includes(q) || u.email.includes(q))
    : all;
  return paginate(filtered, params.page, params.perPage);
}

function userGetHandler(id) {
  const u = read(K_USERS).find((x) => x.id === id);
  if (!u) fail(404, 'User not found.');
  return stripPwd(u);
}

function userCreateHandler(me, body) {
  if (me?.role !== 'admin') fail(403, 'Admin only.');
  if (!body?.name || !body?.email || !body?.password) fail(422, 'All fields required.');
  const users = read(K_USERS);
  const lowerEmail = String(body.email).toLowerCase();
  if (users.some((u) => u.name.toLowerCase() === String(body.name).toLowerCase())) fail(409, 'Username taken.');
  if (users.some((u) => u.email === lowerEmail)) fail(409, 'Email taken.');
  const user = {
    id: nextId(users),
    name: String(body.name).trim(),
    email: lowerEmail,
    password: body.password,
    bio: body.bio || '', avatar: body.avatar || '',
    role: body.role || 'user',
    created_at: new Date().toISOString(),
  };
  users.push(user);
  write(K_USERS, users);
  return stripPwd(user);
}

function userUpdateHandler(me, id, body) {
  if (!me) fail(401, 'Not authenticated.');
  if (me.id !== id && me.role !== 'admin') fail(403, 'Forbidden.');
  const users = read(K_USERS);
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) fail(404, 'User not found.');
  const updatable = ['name', 'email', 'bio', 'avatar', 'password'];
  if (me.role === 'admin') updatable.push('role');
  const next = {};
  updatable.forEach((k) => { if (body[k] !== undefined) next[k] = body[k]; });
  if (next.email) {
    const lower = String(next.email).toLowerCase();
    if (users.some((u) => u.id !== id && u.email === lower)) fail(409, 'Email already in use.');
    next.email = lower;
  }
  users[idx] = { ...users[idx], ...next };
  write(K_USERS, users);
  return stripPwd(users[idx]);
}

function userDeleteHandler(me, id) {
  if (me?.role !== 'admin') fail(403, 'Admin only.');
  if (me.id === id) fail(400, "You can't delete yourself.");
  const users = read(K_USERS);
  if (!users.some((u) => u.id === id)) fail(404, 'User not found.');
  write(K_USERS, users.filter((u) => u.id !== id));
  write(K_IMAGES,       read(K_IMAGES).filter((i) => i.user_id !== id));
  write(K_BOARDS,       read(K_BOARDS).filter((b) => b.user_id !== id));
  write(K_LIKES,        read(K_LIKES).filter((l) => l.user_id !== id));
  write(K_SAVED,        read(K_SAVED).filter((s) => s.user_id !== id));
  return { ok: true };
}

// ---------- BOARDS ----------
function boardsListHandler(params) {
  let boards = read(K_BOARDS);
  if (params.user_id) boards = boards.filter((b) => b.user_id === Number(params.user_id));
  if (params.q) {
    const q = params.q.toLowerCase();
    boards = boards.filter((b) => b.name.toLowerCase().includes(q));
  }
  const links = read(K_BOARD_IMAGES);
  const images = read(K_IMAGES);
  boards = boards.map((b) => {
    const imgIds = links.filter((x) => x.board_id === b.id).map((x) => x.image_id);
    const imgs = images.filter((i) => imgIds.includes(i.id));
    return { ...b, image_count: imgIds.length, cover: imgs[0]?.url || b.cover };
  });
  return paginate(boards, params.page, params.perPage);
}

function boardCreateHandler(me, body) {
  if (!me) fail(401, 'Not authenticated.');
  if (!body?.name?.trim()) fail(422, 'Name is required.');
  const all = read(K_BOARDS);
  const board = {
    id: nextId(all),
    name: body.name.trim(),
    description: (body.description || '').trim(),
    cover: body.cover || '',
    user_id: me.id,
    created_at: new Date().toISOString(),
  };
  all.push(board);
  write(K_BOARDS, all);
  return board;
}

function boardGetHandler(id) {
  const b = read(K_BOARDS).find((x) => x.id === id);
  if (!b) fail(404, 'Board not found.');
  return b;
}

function boardUpdateHandler(me, id, body) {
  if (!me) fail(401, 'Not authenticated.');
  const all = read(K_BOARDS);
  const idx = all.findIndex((b) => b.id === id);
  if (idx === -1) fail(404, 'Board not found.');
  if (all[idx].user_id !== me.id && me.role !== 'admin') fail(403, 'Forbidden.');
  ['name', 'description', 'cover'].forEach((k) => {
    if (body[k] !== undefined) all[idx][k] = body[k];
  });
  write(K_BOARDS, all);
  return all[idx];
}

function boardDeleteHandler(me, id) {
  if (!me) fail(401, 'Not authenticated.');
  const all = read(K_BOARDS);
  const b = all.find((x) => x.id === id);
  if (!b) fail(404, 'Board not found.');
  if (b.user_id !== me.id && me.role !== 'admin') fail(403, 'Forbidden.');
  write(K_BOARDS, all.filter((x) => x.id !== id));
  write(K_BOARD_IMAGES, read(K_BOARD_IMAGES).filter((x) => x.board_id !== id));
  return { ok: true };
}

function boardImagesHandler(boardId, params) {
  const me = authedUser(false);
  const links = read(K_BOARD_IMAGES).filter((x) => x.board_id === boardId);
  const imageIds = new Set(links.map((x) => x.image_id));
  const items = read(K_IMAGES).filter((i) => imageIds.has(i.id));
  const paged = paginate(items, params.page, params.perPage || 24);
  paged.data = paged.data.map((i) => annotateImage(i, me?.id));
  return paged;
}

function boardSaveHandler(me, boardId, body) {
  if (!me) fail(401, 'Not authenticated.');
  const board = read(K_BOARDS).find((b) => b.id === boardId);
  if (!board) fail(404, 'Board not found.');
  if (board.user_id !== me.id) fail(403, 'Forbidden.');

  const imageId = Number(body?.image_id);
  if (!imageId) fail(422, 'image_id required.');
  if (!read(K_IMAGES).some((i) => i.id === imageId)) fail(404, 'Image not found.');

  const links = read(K_BOARD_IMAGES);
  if (!links.some((x) => x.board_id === boardId && x.image_id === imageId)) {
    links.push({ board_id: boardId, image_id: imageId });
    write(K_BOARD_IMAGES, links);
  }
  const saved = read(K_SAVED);
  if (!saved.some((s) => s.user_id === me.id && s.image_id === imageId)) {
    saved.push({ user_id: me.id, image_id: imageId, created_at: new Date().toISOString() });
    write(K_SAVED, saved);
  }
  return { saved: true };
}

// ---------- IMAGES ----------
function annotateImage(img, meId) {
  const likes = read(K_LIKES).filter((l) => l.image_id === img.id);
  const saved = read(K_SAVED);
  return {
    ...img,
    like_count:  likes.length,
    liked_by_me: meId ? likes.some((l) => l.user_id === meId) : false,
    saved_by_me: meId ? saved.some((s) => s.user_id === meId && s.image_id === img.id) : false,
  };
}

function imagesListHandler(params) {
  const me = authedUser(false);
  let items = read(K_IMAGES);
  if (params.q) {
    const q = params.q.toLowerCase();
    items = items.filter(
      (i) => i.name?.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q)
    );
  }
  if (params.user_id) items = items.filter((i) => i.user_id === Number(params.user_id));
  if (params.saved_by) {
    const ids = new Set(read(K_SAVED).filter((s) => s.user_id === Number(params.saved_by)).map((s) => s.image_id));
    items = items.filter((i) => ids.has(i.id));
  }
  if (params.sort === 'recent') {
    items = items.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  }
  const paged = paginate(items, params.page, params.perPage || 24);
  paged.data = paged.data.map((i) => annotateImage(i, me?.id));
  return paged;
}

function imageCreateHandler(me, body) {
  if (!me) fail(401, 'Not authenticated.');
  if (!body?.url) fail(422, 'Image URL required.');
  if (!body?.name?.trim()) fail(422, 'Title required.');
  const all = read(K_IMAGES);
  const img = {
    id: nextId(all),
    name: body.name.trim(),
    url: body.url,
    description: (body.description || '').trim(),
    user_id: me.id,
    created_at: new Date().toISOString(),
  };
  all.push(img);
  write(K_IMAGES, all);
  if (body.board_id) {
    const links = read(K_BOARD_IMAGES);
    links.push({ board_id: Number(body.board_id), image_id: img.id });
    write(K_BOARD_IMAGES, links);
  }
  return annotateImage(img, me.id);
}

function imageGetHandler(id) {
  const img = read(K_IMAGES).find((i) => i.id === id);
  if (!img) fail(404, 'Image not found.');
  const me = authedUser(false);
  const annotated = annotateImage(img, me?.id);
  const author = read(K_USERS).find((u) => u.id === img.user_id);
  const boardLinks = read(K_BOARD_IMAGES).filter((x) => x.image_id === img.id);
  const boardIds = new Set(boardLinks.map((x) => x.board_id));
  const boards_containing = read(K_BOARDS)
    .filter((b) => boardIds.has(b.id))
    .map((b) => ({ id: b.id, name: b.name, user_id: b.user_id }));
  return {
    ...annotated,
    author: author ? { id: author.id, name: author.name, avatar: author.avatar } : null,
    boards_containing,
  };
}

function imageUpdateHandler(me, id, body) {
  if (!me) fail(401, 'Not authenticated.');
  const all = read(K_IMAGES);
  const idx = all.findIndex((i) => i.id === id);
  if (idx === -1) fail(404, 'Image not found.');
  if (all[idx].user_id !== me.id && me.role !== 'admin') fail(403, 'Forbidden.');
  ['name', 'description'].forEach((k) => { if (body[k] !== undefined) all[idx][k] = body[k]; });
  write(K_IMAGES, all);
  return all[idx];
}

function imageDeleteHandler(me, id) {
  if (!me) fail(401, 'Not authenticated.');
  const all = read(K_IMAGES);
  const img = all.find((x) => x.id === id);
  if (!img) fail(404, 'Image not found.');
  if (img.user_id !== me.id && me.role !== 'admin') fail(403, 'Forbidden.');
  write(K_IMAGES,       all.filter((x) => x.id !== id));
  write(K_BOARD_IMAGES, read(K_BOARD_IMAGES).filter((x) => x.image_id !== id));
  write(K_LIKES,        read(K_LIKES).filter((x) => x.image_id !== id));
  write(K_SAVED,        read(K_SAVED).filter((x) => x.image_id !== id));
  return { ok: true };
}

function likeToggleHandler(me, imageId) {
  if (!me) fail(401, 'Not authenticated.');
  if (!read(K_IMAGES).some((i) => i.id === imageId)) fail(404, 'Image not found.');
  const all = read(K_LIKES);
  const existing = all.find((l) => l.user_id === me.id && l.image_id === imageId);
  if (existing) {
    write(K_LIKES, all.filter((l) => !(l.user_id === me.id && l.image_id === imageId)));
    return { liked: false, count: read(K_LIKES).filter((l) => l.image_id === imageId).length };
  }
  all.push({ user_id: me.id, image_id: imageId, created_at: new Date().toISOString() });
  write(K_LIKES, all);
  return { liked: true, count: all.filter((l) => l.image_id === imageId).length };
}
