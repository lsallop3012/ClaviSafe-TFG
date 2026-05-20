import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toggleLike } from '../api/imagesApi.js';
import { useAuth } from '../Context/AuthContext.jsx';
import SaveToBoardModal from './SaveToBoardModal.jsx';
import styles from './ImageCard.module.css';

export default function ImageCard({ image, onChange }) {
  const { user } = useAuth();
  const [showSave, setShowSave] = useState(false);
  // Optimistic local state so the heart toggles instantly.
  const [liked, setLiked] = useState(Boolean(image.liked_by_me));
  const [count, setCount] = useState(Number(image.like_count) || 0);
  const [saved, setSaved] = useState(Boolean(image.saved_by_me));

  const onLike = async (e) => {
    e.preventDefault();
    if (!user) return;
    const prev = { liked, count };
    setLiked(!liked);
    setCount(liked ? count - 1 : count + 1);
    try {
      const res = await toggleLike(image.id);
      setLiked(res.liked);
      setCount(res.count);
    } catch {
      setLiked(prev.liked);
      setCount(prev.count);
    }
  };

  const onSaved = (newState) => {
    setSaved(newState);
    onChange?.();
  };

  return (
    <>
      <div className={styles.card}>
        <Link to={`/images/${image.id}`} className={styles.imgLink}>
          <img src={image.url} alt={image.name} className={styles.img} loading="lazy" />
        </Link>

        <div className={styles.overlay}>
          <button
            type="button"
            onClick={() => setShowSave(true)}
            className={`${styles.saveBtn} ${saved ? styles.saveBtnActive : ''}`}
            title={saved ? 'Saved' : 'Save'}
          >
            {saved ? 'Saved' : 'Save'}
          </button>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={onLike}
              className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
              aria-label="like"
            >
              {liked ? '♥' : '♡'} {count}
            </button>
          </div>
        </div>

        <div className={styles.info}>
          <Link to={`/images/${image.id}`} className={styles.title}>{image.name}</Link>
        </div>
      </div>

      {showSave && (
        <SaveToBoardModal
          image={image}
          onClose={() => setShowSave(false)}
          onSavedChange={onSaved}
        />
      )}
    </>
  );
}
