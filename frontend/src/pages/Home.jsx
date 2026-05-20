import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
import * as boardsApi from '../api/boardsApi.js';
import { listImages } from '../api/imagesApi.js';
import useFetch from '../hooks/useFetch.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import styles from './Home.module.css';

export default function Home() {
  const { user } = useAuth();
  const [tab, setTab] = useState('boards');
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const myBoards = useFetch(
    () => boardsApi.listBoards({ user_id: user.id, perPage: 50 }),
    [user.id]
  );
  const saved = useFetch(
    () => listImages({ saved_by: user.id, perPage: 50 }),
    [user.id]
  );

  const onCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await boardsApi.createBoard({ name: name.trim(), description: desc.trim() });
    setName(''); setDesc(''); setShowCreate(false);
    myBoards.refetch();
  };

  const boards = myBoards.data?.data || [];
  const savedImages = saved.data?.data || [];

  return (
    <div>
      <div className={styles.head}>
        <div>
          <h1 className={styles.title}>Hello, {user.name}</h1>
          <p className={styles.subtitle}>Your boards and saved pins</p>
        </div>
        <button onClick={() => setShowCreate((s) => !s)} className={styles.newBtn}>
          {showCreate ? 'Cancel' : '+ New board'}
        </button>
      </div>

      {showCreate && (
        <form onSubmit={onCreate} className={styles.newForm}>
          <input placeholder="Board name" value={name} onChange={(e) => setName(e.target.value)}
                 className={styles.input} required autoFocus />
          <input placeholder="Description (optional)" value={desc}
                 onChange={(e) => setDesc(e.target.value)} className={styles.input} />
          <button type="submit" className={styles.createBtn}>Create</button>
        </form>
      )}

      <div className={styles.tabs}>
        <button className={tab === 'boards' ? styles.tabActive : styles.tab} onClick={() => setTab('boards')}>
          Boards ({boards.length})
        </button>
        <button className={tab === 'saved' ? styles.tabActive : styles.tab} onClick={() => setTab('saved')}>
          Saved ({savedImages.length})
        </button>
      </div>

      {tab === 'boards' && (
        myBoards.loading ? <div className={styles.empty}>Loading...</div>
        : myBoards.error ? <div className={styles.empty}>Error: {myBoards.error}</div>
        : boards.length === 0 ? (
          <div className={styles.empty}>
            No boards yet. Click <strong>+ New board</strong> to create your first one.
          </div>
        ) : (
          <div className={styles.boards}>
            {boards.map((b) => (
              <Link key={b.id} to={`/boards/${b.id}`} className={styles.boardCard}>
                <div className={styles.boardCover}>
                  {b.cover ? <img src={b.cover} alt={b.name} />
                           : <div className={styles.coverPlaceholder}>📌</div>}
                </div>
                <div className={styles.boardInfo}>
                  <div className={styles.boardName}>{b.name}</div>
                  <div className={styles.boardMeta}>{b.image_count} pins</div>
                </div>
              </Link>
            ))}
          </div>
        )
      )}

      {tab === 'saved' && (
        saved.loading ? <div className={styles.empty}>Loading...</div>
        : <MasonryGrid images={savedImages} empty="No saved pins yet." onChange={saved.refetch} />
      )}
    </div>
  );
}
