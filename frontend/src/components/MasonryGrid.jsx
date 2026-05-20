import styles from './MasonryGrid.module.css';
import ImageCard from './ImageCard.jsx';

export default function MasonryGrid({ images, empty, onChange }) {
  if (!images || images.length === 0) {
    return <div className={styles.empty}>{empty || 'Nothing here yet.'}</div>;
  }
  return (
    <div className={styles.grid}>
      {images.map((img) => (
        <ImageCard key={img.id} image={img} onChange={onChange} />
      ))}
    </div>
  );
}
