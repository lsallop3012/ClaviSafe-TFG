import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as imagesApi from '../../api/imagesApi.js';
import useFetch from '../../hooks/useFetch.js';
import useIsMobile from '../../hooks/useIsMobile.js';
import styles from './Admin.module.css';
 
const PER_PAGE = 12;
 
export default function AdminImages() {
  const isMobile = useIsMobile();
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
 
  const { data, loading, refetch } = useFetch(
    () => imagesApi.listImages({ q, page, perPage: PER_PAGE, sort: 'recent' }),
    [q, page]
  );
 
  const images = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;
 
  const onDelete = async (img) => {
    if (!window.confirm(`Delete pin "${img.name}"?`)) return;
    try { await imagesApi.deleteImage(img.id); refetch(); } catch (e) { setError(e.message); }
  };
 
  return (
    <div>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>Images</h1>
        <Link to="/create" className={styles.btnPrimary}>+ Create pin</Link>
      </div>
 
      <div className={styles.filters}>
        <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }}
               placeholder="Search by title or description..." className={styles.search} />
      </div>
 
      {error && <div className={styles.error}>{error}</div>}
 
      {loading ? <div className={styles.empty}>Loading...</div>
       : images.length === 0 ? <div className={styles.empty}>No images.</div>
       : isMobile ? (
        <div className={styles.cardList}>
          {images.map((img) => (
            <div key={img.id} className={styles.cardRow}>
              <div className={styles.thumbCell}>
                <img src={img.url} alt={img.name} className={styles.thumb} />
                <div>
                  <strong><Link to={`/images/${img.id}`}>{img.name}</Link></strong>
                  <div className={styles.cardField}>by user #{img.user_id} · {img.like_count} likes</div>
                </div>
              </div>
              {img.description && <div className={styles.cardField}>{img.description}</div>}
              <div className={styles.actions}>
                <Link to={`/images/${img.id}`} className={styles.btn}>Edit / View</Link>
                <button onClick={() => onDelete(img)} className={styles.btnDanger}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Author</th>
              <th>Likes</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((img) => (
              <tr key={img.id}>
                <td><img src={img.url} alt={img.name} className={styles.thumb} /></td>
                <td><Link to={`/images/${img.id}`}>{img.name}</Link></td>
                <td>user #{img.user_id}</td>
                <td>{img.like_count}</td>
                <td style={{ textAlign: 'right' }}>
                  <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                    <Link to={`/images/${img.id}`} className={styles.btn}>Edit / View</Link>
                    <button onClick={() => onDelete(img)} className={styles.btnDanger}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
 
      {totalPages > 1 && (
        <div className={styles.pager}>
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className={styles.btn}>← Prev</button>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Page {meta.page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className={styles.btn}>Next →</button>
        </div>
      )}
    </div>
  );
}