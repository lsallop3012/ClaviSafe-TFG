import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useData } from '../context/DataContext.jsx';
import SaveToBoardModal from './SaveToBoardModal.jsx';
import styles from './ImageCard.module.css';

export default function ImageCard({ image }) {
  const { isLiked, likeCount, toggleLike, isSaved } = useData();
  const [showSave, setShowSave] = useState(false);

  const liked = isLiked(image.id);
  const saved = isSaved(image.id);
  const count = likeCount(image.id);

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
              onClick={(e) => { e.preventDefault(); toggleLike(image.id); }}
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
        <SaveToBoardModal image={image} onClose={() => setShowSave(false)} />
      )}
    </>
  );
}
