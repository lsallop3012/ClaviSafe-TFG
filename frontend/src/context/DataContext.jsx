import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext.jsx';

const DataContext = createContext(null);

const K_IMAGES = 'moodly_images';
const K_BOARDS = 'moodly_boards';
const K_BOARD_IMAGES = 'moodly_board_images';
const K_LIKES = 'moodly_likes';
const K_COMMENTS = 'moodly_comments';
const K_SAVED = 'moodly_saved';

const read = (k) => {
  try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; }
};
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const nextId = (arr) => (arr.length ? Math.max(...arr.map((x) => x.id)) + 1 : 1);

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
  if (read(K_IMAGES).length === 0) {
    const now = new Date().toISOString();
    const imgs = SEED_IMAGES.map((s, i) => ({
      id: i + 1,
      ...s,
      user_id: 1,
      created_at: now,
    }));
    write(K_IMAGES, imgs);
  }
  if (read(K_BOARDS).length === 0) {
    write(K_BOARDS, [
      { id: 1, name: 'Inspiration', description: 'A collection of cool stuff', user_id: 1, cover: '/images/imagen1.avif', created_at: new Date().toISOString() },
      { id: 2, name: 'Travel', description: 'Places to go', user_id: 1, cover: '/images/imagen3.avif', created_at: new Date().toISOString() },
    ]);
  }
  if (read(K_BOARD_IMAGES).length === 0) {
    write(K_BOARD_IMAGES, [
      { board_id: 1, image_id: 1 },
      { board_id: 1, image_id: 9 },
      { board_id: 1, image_id: 10 },
      { board_id: 2, image_id: 2 },
      { board_id: 2, image_id: 3 },
      { board_id: 2, image_id: 6 },
    ]);
  }
  if (read(K_LIKES).length === 0) write(K_LIKES, []);
  if (read(K_COMMENTS).length === 0) write(K_COMMENTS, []);
  if (read(K_SAVED).length === 0) write(K_SAVED, []);
}

export function DataProvider({ children }) {
  const { user } = useAuth();
  const [images, setImages] = useState([]);
  const [boards, setBoards] = useState([]);
  const [boardImages, setBoardImages] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [saved, setSaved] = useState([]);

  const refresh = useCallback(() => {
    setImages(read(K_IMAGES));
    setBoards(read(K_BOARDS));
    setBoardImages(read(K_BOARD_IMAGES));
    setLikes(read(K_LIKES));
    setComments(read(K_COMMENTS));
    setSaved(read(K_SAVED));
  }, []);

  useEffect(() => {
    seed();
    refresh();
  }, [refresh]);

  // IMAGES
  const createImage = useCallback((payload) => {
    const all = read(K_IMAGES);
    const img = {
      id: nextId(all),
      name: payload.name,
      url: payload.url,
      description: payload.description || '',
      user_id: user.id,
      created_at: new Date().toISOString(),
    };
    all.push(img);
    write(K_IMAGES, all);

    if (payload.board_id) {
      const bi = read(K_BOARD_IMAGES);
      bi.push({ board_id: Number(payload.board_id), image_id: img.id });
      write(K_BOARD_IMAGES, bi);
    }
    refresh();
    return img;
  }, [user, refresh]);

  const updateImage = useCallback((id, updates) => {
    const all = read(K_IMAGES);
    const idx = all.findIndex((x) => x.id === Number(id));
    if (idx === -1) return;
    all[idx] = { ...all[idx], ...updates };
    write(K_IMAGES, all);
    refresh();
  }, [refresh]);

  const deleteImage = useCallback((id) => {
    write(K_IMAGES, read(K_IMAGES).filter((x) => x.id !== Number(id)));
    write(K_BOARD_IMAGES, read(K_BOARD_IMAGES).filter((x) => x.image_id !== Number(id)));
    write(K_LIKES, read(K_LIKES).filter((x) => x.image_id !== Number(id)));
    write(K_COMMENTS, read(K_COMMENTS).filter((x) => x.image_id !== Number(id)));
    write(K_SAVED, read(K_SAVED).filter((x) => x.image_id !== Number(id)));
    refresh();
  }, [refresh]);

  // BOARDS
  const createBoard = useCallback((payload) => {
    const all = read(K_BOARDS);
    const board = {
      id: nextId(all),
      name: payload.name,
      description: payload.description || '',
      cover: payload.cover || '',
      user_id: user.id,
      created_at: new Date().toISOString(),
    };
    all.push(board);
    write(K_BOARDS, all);
    refresh();
    return board;
  }, [user, refresh]);

  const updateBoard = useCallback((id, updates) => {
    const all = read(K_BOARDS);
    const idx = all.findIndex((x) => x.id === Number(id));
    if (idx === -1) return;
    all[idx] = { ...all[idx], ...updates };
    write(K_BOARDS, all);
    refresh();
  }, [refresh]);

  const deleteBoard = useCallback((id) => {
    write(K_BOARDS, read(K_BOARDS).filter((x) => x.id !== Number(id)));
    write(K_BOARD_IMAGES, read(K_BOARD_IMAGES).filter((x) => x.board_id !== Number(id)));
    refresh();
  }, [refresh]);

  // BOARD-IMAGES
  const addImageToBoard = useCallback((boardId, imageId) => {
    const bi = read(K_BOARD_IMAGES);
    if (bi.some((x) => x.board_id === Number(boardId) && x.image_id === Number(imageId))) return;
    bi.push({ board_id: Number(boardId), image_id: Number(imageId) });
    write(K_BOARD_IMAGES, bi);
    refresh();
  }, [refresh]);

  const removeImageFromBoard = useCallback((boardId, imageId) => {
    write(
      K_BOARD_IMAGES,
      read(K_BOARD_IMAGES).filter(
        (x) => !(x.board_id === Number(boardId) && x.image_id === Number(imageId))
      )
    );
    refresh();
  }, [refresh]);

  // LIKES
  const toggleLike = useCallback((imageId) => {
    const all = read(K_LIKES);
    const exists = all.find((x) => x.user_id === user.id && x.image_id === Number(imageId));
    if (exists) {
      write(K_LIKES, all.filter((x) => !(x.user_id === user.id && x.image_id === Number(imageId))));
    } else {
      all.push({ user_id: user.id, image_id: Number(imageId), created_at: new Date().toISOString() });
      write(K_LIKES, all);
    }
    refresh();
  }, [user, refresh]);

  const isLiked = useCallback((imageId) =>
    likes.some((x) => x.user_id === user?.id && x.image_id === Number(imageId)),
    [likes, user]
  );

  const likeCount = useCallback((imageId) =>
    likes.filter((x) => x.image_id === Number(imageId)).length,
    [likes]
  );

  // SAVED
  const toggleSave = useCallback((imageId) => {
    const all = read(K_SAVED);
    const exists = all.find((x) => x.user_id === user.id && x.image_id === Number(imageId));
    if (exists) {
      write(K_SAVED, all.filter((x) => !(x.user_id === user.id && x.image_id === Number(imageId))));
    } else {
      all.push({ user_id: user.id, image_id: Number(imageId), created_at: new Date().toISOString() });
      write(K_SAVED, all);
    }
    refresh();
  }, [user, refresh]);

  const isSaved = useCallback((imageId) =>
    saved.some((x) => x.user_id === user?.id && x.image_id === Number(imageId)),
    [saved, user]
  );

  // COMMENTS
  const addComment = useCallback((imageId, content) => {
    if (!content.trim()) return;
    const all = read(K_COMMENTS);
    const c = {
      id: nextId(all),
      user_id: user.id,
      image_id: Number(imageId),
      content: content.trim(),
      created_at: new Date().toISOString(),
    };
    all.push(c);
    write(K_COMMENTS, all);
    refresh();
    return c;
  }, [user, refresh]);

  const deleteComment = useCallback((id) => {
    write(K_COMMENTS, read(K_COMMENTS).filter((x) => x.id !== Number(id)));
    refresh();
  }, [refresh]);

  // Derived helpers
  const getBoardImages = useCallback((boardId) => {
    const ids = boardImages
      .filter((x) => x.board_id === Number(boardId))
      .map((x) => x.image_id);
    return images.filter((img) => ids.includes(img.id));
  }, [boardImages, images]);

  const getImageBoards = useCallback((imageId) => {
    const ids = boardImages
      .filter((x) => x.image_id === Number(imageId))
      .map((x) => x.board_id);
    return boards.filter((b) => ids.includes(b.id));
  }, [boardImages, boards]);

  const getImageComments = useCallback((imageId) =>
    comments.filter((c) => c.image_id === Number(imageId)).sort((a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
    ),
    [comments]
  );

  const getUserBoards = useCallback((userId) =>
    boards.filter((b) => b.user_id === Number(userId)),
    [boards]
  );

  const getUserImages = useCallback((userId) =>
    images.filter((i) => i.user_id === Number(userId)),
    [images]
  );

  const getSavedImages = useCallback((userId) => {
    const ids = saved.filter((s) => s.user_id === Number(userId)).map((s) => s.image_id);
    return images.filter((i) => ids.includes(i.id));
  }, [saved, images]);

  return (
    <DataContext.Provider
      value={{
        images, boards, comments, likes,
        createImage, updateImage, deleteImage,
        createBoard, updateBoard, deleteBoard,
        addImageToBoard, removeImageFromBoard,
        toggleLike, isLiked, likeCount,
        toggleSave, isSaved,
        addComment, deleteComment,
        getBoardImages, getImageBoards, getImageComments,
        getUserBoards, getUserImages, getSavedImages,
        refresh,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside DataProvider');
  return ctx;
}
