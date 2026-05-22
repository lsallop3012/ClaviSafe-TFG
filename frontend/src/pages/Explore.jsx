<<<<<<< HEAD
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
=======
import { useState } from 'react';
import { listImages } from '../api/imagesApi.js';
import useFetch from '../hooks/useFetch.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import Spinner from '../components/Spinner.jsx';
import styles from './Explore.module.css';

const PER_PAGE = 24;

export default function Explore() {
  const [q, setQ] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // applied on submit
  const [page, setPage] = useState(1);

  const { data, loading, error, refetch } = useFetch(
    () => listImages({ q: searchTerm, page, perPage: PER_PAGE, sort: 'recent' }),
    [searchTerm, page]
  );

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchTerm(q.trim());
  };

  const images = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Explore</h1>
<<<<<<< HEAD
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search pins..."
          className={styles.search}
        />
      </div>
      <MasonryGrid images={filtered} empty="No pins match your search." />
=======
        <form onSubmit={onSearch} className={styles.searchForm}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search pins..."
            className={styles.search}
          />
        </form>
      </div>

      {loading && <Spinner label="Loading pins..." />}
      {error && <div className={styles.empty}>Error: {error}</div>}
      {!loading && !error && (
        <>
          <MasonryGrid images={images} empty="No pins match your search." onChange={refetch} />
          {totalPages > 1 && (
            <div className={styles.pager}>
              <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className={styles.pageBtn}>
                ← Prev
              </button>
              <span className={styles.pageInfo}>Page {meta.page} of {totalPages}</span>
              <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className={styles.pageBtn}>
                Next →
              </button>
            </div>
          )}
        </>
      )}
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
    </div>
  );
}
