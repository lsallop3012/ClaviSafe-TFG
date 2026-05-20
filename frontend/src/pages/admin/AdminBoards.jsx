import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as boardsApi from '../../api/boardsApi.js';
import useFetch from '../../hooks/useFetch.js';
import useIsMobile from '../../hooks/useIsMobile.js';
import styles from './Admin.module.css';
 
const PER_PAGE = 12;
 
export default function AdminBoards() {
  const isMobile = useIsMobile();
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
 
  // Creación inline (no merece modal — solo 2 campos)
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
 
  const { data, loading, refetch } = useFetch(
    () => boardsApi.listBoards({ q, page, perPage: PER_PAGE }),
    [q, page]
  );
 
  const boards = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;
 
  const onDelete = async (b) => {
    if (!window.confirm(`Delete board "${b.name}"?`)) return;
    try { await boardsApi.deleteBoard(b.id); refetch(); } catch (e) { setError(e.message); }
  };
 
  const onCreate = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      await boardsApi.createBoard({ name: newName.trim(), description: newDesc.trim() });
      setNewName(''); setNewDesc(''); setCreating(false);
      refetch();
    } catch (err) {
      setError(err.message);
    }
  };
 
  return (
    <div>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>Boards</h1>
        <button onClick={() => setCreating((c) => !c)} className={styles.btnPrimary}>
          {creating ? 'Cancel' : '+ Create board'}
        </button>
      </div>
 
      {creating && (
        <form onSubmit={onCreate} className={styles.filters} style={{ background: 'var(--surface)', padding: 14, borderRadius: 12 }}>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Board name"
            className={styles.search}
            required
            autoFocus
          />
          <input
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Description (optional)"
            className={styles.search}
          />
          <button type="submit" className={styles.btnPrimary}>Create</button>
        </form>
      )}
 
      <div className={styles.filters}>
        <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }}
               placeholder="Search board name..." className={styles.search} />
      </div>
 
      {error && <div className={styles.error}>{error}</div>}
 
      {loading ? <div className={styles.empty}>Loading...</div>
       : boards.length === 0 ? <div className={styles.empty}>No boards.</div>
       : isMobile ? (
        <div className={styles.cardList}>
          {boards.map((b) => (
            <div key={b.id} className={styles.cardRow}>
              <div className={styles.thumbCell}>
                {b.cover ? <img src={b.cover} alt={b.name} className={styles.thumb} />
                         : <div className={styles.thumbFb}>📌</div>}
                <div>
                  <strong><Link to={`/boards/${b.id}`}>{b.name}</Link></strong>
                  <div className={styles.cardField}>{b.image_count} pins · user #{b.user_id}</div>
                </div>
              </div>
              {b.description && <div className={styles.cardField}>{b.description}</div>}
              <div className={styles.actions}>
                <Link to={`/boards/${b.id}`} className={styles.btn}>Edit / View</Link>
                <button onClick={() => onDelete(b)} className={styles.btnDanger}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Pins</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((b) => (
              <tr key={b.id}>
                <td>
                  {b.cover ? <img src={b.cover} alt={b.name} className={styles.thumb} />
                           : <div className={styles.thumbFb}>📌</div>}
                </td>
                <td><Link to={`/boards/${b.id}`}>{b.name}</Link></td>
                <td>user #{b.user_id}</td>
                <td>{b.image_count}</td>
                <td style={{ textAlign: 'right' }}>
                  <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                    <Link to={`/boards/${b.id}`} className={styles.btn}>Edit / View</Link>
                    <button onClick={() => onDelete(b)} className={styles.btnDanger}>Delete</button>
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