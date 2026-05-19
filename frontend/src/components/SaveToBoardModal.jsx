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
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <h3>Save to board</h3>
          <button onClick={onClose} className={styles.close}>✕</button>
        </div>

        <div className={styles.list}>
          {userBoards.length === 0 && (
            <p className={styles.hint}>You don't have any boards yet. Create one below.</p>
          )}
          {userBoards.map((b) => (
            <button
              key={b.id}
              type="button"
              className={styles.boardRow}
              onClick={() => saveTo(b.id)}
              disabled={alreadyIn.has(b.id)}
            >
              <span className={styles.boardName}>{b.name}</span>
              <span className={styles.boardCta}>
                {alreadyIn.has(b.id) ? 'Saved' : 'Save'}
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
            <button type="submit" className={styles.createBtn}>Create & save</button>
          </form>
        )}
      </div>
    </div>
  );
}
