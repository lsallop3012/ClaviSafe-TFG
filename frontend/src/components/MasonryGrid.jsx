import styles from './MasonryGrid.module.css';
import ImageCard from './ImageCard.jsx';

<<<<<<< HEAD
export default function MasonryGrid({ images, empty }) {
=======
export default function MasonryGrid({ images, empty, onChange }) {
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
  if (!images || images.length === 0) {
    return <div className={styles.empty}>{empty || 'Nothing here yet.'}</div>;
  }
  return (
    <div className={styles.grid}>
<<<<<<< HEAD
      {images.map((img) => <ImageCard key={img.id} image={img} />)}
=======
      {images.map((img) => (
        <ImageCard key={img.id} image={img} onChange={onChange} />
      ))}
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
    </div>
  );
}
