import { useState, useEffect } from 'react';
import * as boardsApi from '../api/boardsApi.js';
import { getImage } from '../api/imagesApi.js';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './SaveToBoardModal.module.css';

export default function SaveToBoardModal({ image, onClose, onSavedChange }) {
  const { user } = useAuth();
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [containingIds, setContainingIds] = useState(new Set());
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  // Load my boards + which already contain this image.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [boardsRes, imageDetail] = await Promise.all([
          boardsApi.listBoards({ user_id: user.id, perPage: 50 }),
          getImage(image.id),
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
      await boardsApi.saveImageToBoard(boardId, image.id);
      onSavedChange?.(true);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const onCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const board = await boardsApi.createBoard({ name: newName.trim() });
      await boardsApi.saveImageToBoard(board.id, image.id);
      onSavedChange?.(true);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <h3>Save to board</h3>
          <button onClick={onClose} className={styles.close}>✕</button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.list}>
          {loading && <p className={styles.hint}>Loading boards...</p>}
          {!loading && boards.length === 0 && (
            <p className={styles.hint}>You don't have any boards yet. Create one below.</p>
          )}
          {!loading && boards.map((b) => (
            <button
              key={b.id}
              type="button"
              className={styles.boardRow}
              onClick={() => saveTo(b.id)}
              disabled={containingIds.has(b.id)}
            >
              <span className={styles.boardName}>{b.name}</span>
              <span className={styles.boardCta}>
                {containingIds.has(b.id) ? 'Saved' : 'Save'}
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
            <button type="submit" className={styles.createBtn}>Create &amp; save</button>
          </form>
        )}
      </div>
    </div>
  );
}
