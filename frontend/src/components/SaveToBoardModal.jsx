<<<<<<< HEAD
import { useState } from 'react';
import { useData } from '../context/DataContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './SaveToBoardModal.module.css';

export default function SaveToBoardModal({ image, onClose }) {
  const { user } = useAuth();
  const { getUserBoards, addImageToBoard, createBoard, getImageBoards } = useData();
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);

  const userBoards = getUserBoards(user.id);
  const alreadyIn = new Set(getImageBoards(image.id).map((b) => b.id));

  const saveTo = (boardId) => {
    addImageToBoard(boardId, image.id);
    onClose();
  };

  const onCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const board = createBoard({ name: newName.trim(), cover: image.url });
    addImageToBoard(board.id, image.id);
    onClose();
=======
import { useState, useEffect } from 'react';
import * as boardsApi from '../api/boardsApi.js';
import { toggleSave } from '../api/imagesApi.js';
import { useAuth } from '../Context/AuthContext.jsx';
import styles from './SaveToBoardModal.module.css';

export default function SaveToBoardModal({ image, onClose, onSavedChange }) {
  const { user } = useAuth();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [containingIds, setContainingIds] = useState(new Set());
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  // Load my boards + which of them already contain this image
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [boardsRes, imageDetail] = await Promise.all([
          boardsApi.listBoards({ user_id: user.id, perPage: 50 }),
          import('../api/imagesApi.js').then((m) => m.getImage(image.id)),
        ]);
        if (cancelled) return;
        setBoards(boardsRes.data || []);
        setContainingIds(new Set((imageDetail.boards_containing || []).map((b) => b.id)));
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user.id, image.id]);

  const saveTo = async (boardId) => {
    try {
      await boardsApi.addImageToBoard(boardId, image.id);
      // Also mark as saved (toggle to "saved" only if not already saved)
      if (!image.saved_by_me) {
        await toggleSave(image.id);
        onSavedChange?.(true);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const onCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const board = await boardsApi.createBoard({ name: newName.trim(), cover: image.url });
      await boardsApi.addImageToBoard(board.id, image.id);
      if (!image.saved_by_me) {
        await toggleSave(image.id);
        onSavedChange?.(true);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    }
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <h3>Save to board</h3>
          <button onClick={onClose} className={styles.close}>✕</button>
        </div>

<<<<<<< HEAD
        <div className={styles.list}>
          {userBoards.length === 0 && (
            <p className={styles.hint}>You don't have any boards yet. Create one below.</p>
          )}
          {userBoards.map((b) => (
=======
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.list}>
          {loading && <p className={styles.hint}>Loading boards...</p>}
          {!loading && boards.length === 0 && (
            <p className={styles.hint}>You don't have any boards yet. Create one below.</p>
          )}
          {!loading && boards.map((b) => (
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
            <button
              key={b.id}
              type="button"
              className={styles.boardRow}
              onClick={() => saveTo(b.id)}
<<<<<<< HEAD
              disabled={alreadyIn.has(b.id)}
            >
              <span className={styles.boardName}>{b.name}</span>
              <span className={styles.boardCta}>
                {alreadyIn.has(b.id) ? 'Saved' : 'Save'}
=======
              disabled={containingIds.has(b.id)}
            >
              <span className={styles.boardName}>{b.name}</span>
              <span className={styles.boardCta}>
                {containingIds.has(b.id) ? 'Saved' : 'Save'}
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
              </span>
            </button>
          ))}
        </div>

        {!creating ? (
          <button onClick={() => setCreating(true)} className={styles.newBtn}>
            + Create new board
          </button>
        ) : (
          <form onSubmit={onCreate} className={styles.newForm}>
            <input
              type="text"
              placeholder="Board name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className={styles.input}
              autoFocus
            />
<<<<<<< HEAD
            <button type="submit" className={styles.createBtn}>Create & save</button>
=======
            <button type="submit" className={styles.createBtn}>Create &amp; save</button>
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
          </form>
        )}
      </div>
    </div>
  );
}
