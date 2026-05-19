import { useState, useMemo } from 'react';
import { useData } from '../context/DataContext.jsx';
import MasonryGrid from '../components/MasonryGrid.jsx';
import styles from './Explore.module.css';

export default function Explore() {
  const { images } = useData();
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    if (!q.trim()) return images;
    const needle = q.toLowerCase();
    return images.filter(
      (img) =>
        img.name?.toLowerCase().includes(needle) ||
        img.description?.toLowerCase().includes(needle)
    );
  }, [q, images]);

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Explore</h1>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search pins..."
          className={styles.search}
        />
      </div>
      <MasonryGrid images={filtered} empty="No pins match your search." />
    </div>
  );
}
