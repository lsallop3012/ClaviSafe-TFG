import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
<<<<<<< HEAD
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import MasonryGrid from '../components/MasonryGrid.jsx';
=======
import { useAuth } from '../Context/AuthContext.jsx';
import * as boardsApi from '../api/boardsApi.js';
import useFetch from '../hooks/useFetch.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import Spinner from '../components/Spinner.jsx';
import { useToast } from '../Context/ToastContext.jsx';
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
import styles from './BoardDetail.module.css';

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
<<<<<<< HEAD
  const { boards, getBoardImages, updateBoard, deleteBoard } = useData();

  const board = boards.find((b) => b.id === Number(id));
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(board?.name || '');
  const [desc, setDesc] = useState(board?.description || '');

  if (!board) {
=======
  const toast = useToast();

  const board = useFetch(() => boardsApi.getBoard(id), [id]);
  const images = useFetch(() => boardsApi.listBoardImages(id), [id]);

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (board.loading) return <Spinner label="Loading board..." fullPage />;
  if (board.error) {
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
    return (
      <div className={styles.notfound}>
        Board not found. <Link to="/home">Go home</Link>
      </div>
    );
  }
<<<<<<< HEAD

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
=======
  const b = board.data;
  const isOwner = !!user && (user.id === b.user_id || user.role === 'admin');

  const startEdit = () => {
    setName(b.name);
    setDesc(b.description || '');
    setEditing(true);
  };

  const onSave = async (e) => {
    e.preventDefault();
    try {
      await boardsApi.updateBoard(b.id, { name: name.trim(), description: desc.trim() });
      toast.success('Board updated.');
      setEditing(false);
      board.refetch();
    } catch (err) { toast.error(err.message); }
  };

  const doDelete = async () => {
    try {
      await boardsApi.deleteBoard(b.id);
      toast.success(`Board "${b.name}" deleted.`);
      navigate('/home');
    } catch (e) { toast.error(e.message); }
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
  };

  return (
    <div>
      <div className={styles.head}>
        {!editing ? (
          <>
            <div>
<<<<<<< HEAD
              <h1 className={styles.title}>{board.name}</h1>
              {board.description && <p className={styles.desc}>{board.description}</p>}
              <p className={styles.meta}>{images.length} pins</p>
            </div>
            {isOwner && (
              <div className={styles.actions}>
                <button onClick={() => setEditing(true)} className={styles.editBtn}>Edit</button>
                <button onClick={onDelete} className={styles.deleteBtn}>Delete</button>
=======
              <h1 className={styles.title}>{b.name}</h1>
              {b.description && <p className={styles.desc}>{b.description}</p>}
              <p className={styles.meta}>{images.data?.meta?.total ?? 0} pins</p>
            </div>
            {isOwner && (
              <div className={styles.actions}>
                <button onClick={startEdit} className={styles.editBtn}>Edit</button>
                <button onClick={() => setConfirmDelete(true)} className={styles.deleteBtn}>Delete</button>
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
              </div>
            )}
          </>
        ) : (
          <form onSubmit={onSave} className={styles.editForm}>
<<<<<<< HEAD
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
=======
            <input value={name} onChange={(e) => setName(e.target.value)} className={styles.input} required />
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className={styles.textarea}
                      placeholder="Description" rows={2} />
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
            <div className={styles.editActions}>
              <button type="button" onClick={() => setEditing(false)} className={styles.cancelBtn}>Cancel</button>
              <button type="submit" className={styles.saveBtn}>Save</button>
            </div>
          </form>
        )}
      </div>

<<<<<<< HEAD
      <MasonryGrid images={images} empty="This board has no pins yet." />
=======
      {images.loading ? <Spinner label="Loading pins..." />
                      : <MasonryGrid images={images.data?.data || []}
                                     empty="This board has no pins yet."
                                     onChange={images.refetch} />}

      <ConfirmDialog
        open={confirmDelete}
        title={`Delete board "${b.name}"?`}
        message="The board will be removed. Pins inside are kept."
        confirmText="Delete"
        danger
        onConfirm={async () => { await doDelete(); setConfirmDelete(false); }}
        onCancel={() => setConfirmDelete(false)}
      />
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
    </div>
  );
}
