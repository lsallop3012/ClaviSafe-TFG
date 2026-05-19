import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import MasonryGrid from '../components/MasonryGrid.jsx';
import styles from './BoardDetail.module.css';

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { boards, getBoardImages, updateBoard, deleteBoard } = useData();

  const board = boards.find((b) => b.id === Number(id));
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(board?.name || '');
  const [desc, setDesc] = useState(board?.description || '');

  if (!board) {
    return (
      <div className={styles.notfound}>
        Board not found. <Link to="/home">Go home</Link>
      </div>
    );
  }

  const images = getBoardImages(board.id);
  const isOwner = user.id === board.user_id;

  const onSave = (e) => {
    e.preventDefault();
    updateBoard(board.id, { name: name.trim(), description: desc.trim() });
    setEditing(false);
  };

  const onDelete = () => {
    if (window.confirm(`Delete board "${board.name}"? This cannot be undone.`)) {
      deleteBoard(board.id);
      navigate('/home');
    }
  };

  return (
    <div>
      <div className={styles.head}>
        {!editing ? (
          <>
            <div>
              <h1 className={styles.title}>{board.name}</h1>
              {board.description && <p className={styles.desc}>{board.description}</p>}
              <p className={styles.meta}>{images.length} pins</p>
            </div>
            {isOwner && (
              <div className={styles.actions}>
                <button onClick={() => setEditing(true)} className={styles.editBtn}>Edit</button>
                <button onClick={onDelete} className={styles.deleteBtn}>Delete</button>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={onSave} className={styles.editForm}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className={styles.textarea}
              placeholder="Description"
              rows={2}
            />
            <div className={styles.editActions}>
              <button type="button" onClick={() => setEditing(false)} className={styles.cancelBtn}>Cancel</button>
              <button type="submit" className={styles.saveBtn}>Save</button>
            </div>
          </form>
        )}
      </div>

      <MasonryGrid images={images} empty="This board has no pins yet." />
    </div>
  );
}
