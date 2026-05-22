import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import * as imagesApi from '../api/imagesApi.js';
import useFetch from '../hooks/useFetch.js';
import SaveToBoardModal from '../components/SaveToBoardModal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import Spinner from '../components/Spinner.jsx';
import styles from './ImageDetail.module.css';

export default function ImageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const image = useFetch(() => imagesApi.getImage(id), [id]);

  const [showSave, setShowSave] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState(null);

  // Local optimistic states for like / save buttons.
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [saved, setSaved] = useState(false);

  // Sync local state when the fetched image changes.
  useEffect(() => {
    if (image.data) {
      setLiked(Boolean(image.data.liked_by_me));
      setCount(Number(image.data.like_count) || 0);
      setSaved(Boolean(image.data.saved_by_me));
    }
  }, [image.data]);

  if (image.loading) return <Spinner label="Loading pin..." fullPage />;
  if (image.error) {
    return (
      <div className={styles.notfound}>
        Pin not found. <Link to="/explore">Browse pins</Link>
      </div>
    );
  }

  const img = image.data;
  const isOwner = !!user && (user.id === img.user_id || user.role === 'admin');

  const onLike = async () => {
    if (!user) { navigate('/login'); return; }
    const prev = { liked, count };
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
    try {
      const res = await imagesApi.toggleLike(img.id);
      setLiked(res.liked);
      setCount(res.count);
    } catch {
      setLiked(prev.liked);
      setCount(prev.count);
    }
  };

  const startEdit = () => {
    setName(img.name);
    setDesc(img.description || '');
    setEditing(true);
  };

  const onSaveEdit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await imagesApi.updateImage(img.id, { name: name.trim(), description: desc.trim() });
      setEditing(false);
      image.refetch();
    } catch (err) { setError(err.message); }
  };

  const doDelete = async () => {
    try {
      await imagesApi.deleteImage(img.id);
      navigate('/home');
    } catch (err) { setError(err.message); }
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.imageSide}>
          <img src={img.url} alt={img.name} className={styles.image} />
        </div>

        <div className={styles.side}>
          <div className={styles.topBar}>
            <button onClick={onLike} className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}>
              {liked ? '♥' : '♡'} {count}
            </button>
            <button
              onClick={() => user ? setShowSave(true) : navigate('/login')}
              className={styles.saveBtn}
            >
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>

          {!editing ? (
            <>
              <h1 className={styles.title}>{img.name}</h1>
              {img.description && <p className={styles.desc}>{img.description}</p>}
            </>
          ) : (
            <form onSubmit={onSaveEdit} className={styles.editForm}>
              <input value={name} onChange={(e) => setName(e.target.value)}
                     className={styles.input} required maxLength={80} />
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)}
                        className={styles.textarea} rows={3} maxLength={300} />
              <div className={styles.editActions}>
                <button type="button" onClick={() => setEditing(false)} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>Save</button>
              </div>
            </form>
          )}

          {img.author && (
            <div className={styles.author}>
              <Link to={`/profile/${img.author.id}`} className={styles.authorLink}>
                {img.author.avatar
                  ? <img src={img.author.avatar} alt={img.author.name} className={styles.authorAvatar} />
                  : <span className={styles.authorFallback}>{(img.author.name || '?').charAt(0).toUpperCase()}</span>}
                <span>{img.author.name}</span>
              </Link>
              <span className={styles.date}>{formatDate(img.created_at)}</span>
            </div>
          )}

          {isOwner && !editing && (
            <div className={styles.ownerActions}>
              <button onClick={startEdit} className={styles.editBtn}>Edit</button>
              <button onClick={() => setConfirmDelete(true)} className={styles.deleteBtn}>Delete</button>
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>

      {showSave && (
        <SaveToBoardModal
          image={img}
          onClose={() => setShowSave(false)}
          onSavedChange={(s) => setSaved(s)}
        />
      )}

      <ConfirmDialog
        open={confirmDelete}
        title={`Delete pin "${img.name}"?`}
        message="This action cannot be undone."
        confirmText="Delete"
        danger
        onConfirm={async () => { await doDelete(); setConfirmDelete(false); }}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
