import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
import * as boardsApi from '../api/boardsApi.js';
import useFetch from '../hooks/useFetch.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import styles from './BoardDetail.module.css';

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const board = useFetch(() => boardsApi.getBoard(id), [id]);
  const images = useFetch(() => boardsApi.listBoardImages(id), [id]);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  if (board.loading) return <div className={styles.notfound}>Loading...</div>;
  if (board.error) {
    return (
      <div className={styles.notfound}>
        Board not found. <Link to="/home">Go home</Link>
      </div>
    );
  }
  const b = board.data;
  const isOwner = user.id === b.user_id || user.role === 'admin';

  const startEdit = () => {
    setName(b.name);
    setDesc(b.description || '');
    setEditing(true);
  };

  const onSave = async (e) => {
    e.preventDefault();
    await boardsApi.updateBoard(b.id, { name: name.trim(), description: desc.trim() });
    setEditing(false);
    board.refetch();
  };

  const onDelete = async () => {
    if (!window.confirm(`Delete board "${b.name}"? This cannot be undone.`)) return;
    await boardsApi.deleteBoard(b.id);
    navigate('/home');
  };

  return (
    <div>
      <div className={styles.head}>
        {!editing ? (
          <>
            <div>
              <h1 className={styles.title}>{b.name}</h1>
              {b.description && <p className={styles.desc}>{b.description}</p>}
              <p className={styles.meta}>{images.data?.meta?.total ?? 0} pins</p>
            </div>
            {isOwner && (
              <div className={styles.actions}>
                <button onClick={startEdit} className={styles.editBtn}>Edit</button>
                <button onClick={onDelete} className={styles.deleteBtn}>Delete</button>
              </div>
            )}
          </>
        ) : (
          <form onSubmit={onSave} className={styles.editForm}>
            <input value={name} onChange={(e) => setName(e.target.value)} className={styles.input} required />
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className={styles.textarea}
                      placeholder="Description" rows={2} />
            <div className={styles.editActions}>
              <button type="button" onClick={() => setEditing(false)} className={styles.cancelBtn}>Cancel</button>
              <button type="submit" className={styles.saveBtn}>Save</button>
            </div>
          </form>
        )}
      </div>

      {images.loading ? <div className={styles.notfound}>Loading...</div>
                      : <MasonryGrid images={images.data?.data || []}
                                     empty="This board has no pins yet."
                                     onChange={images.refetch} />}
    </div>
  );
}
