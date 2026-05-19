import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import MasonryGrid from '../components/MasonryGrid.jsx';
import styles from './Home.module.css';

export default function Home() {
  const { user } = useAuth();
  const { getUserBoards, getBoardImages, getSavedImages, createBoard } = useData();
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [tab, setTab] = useState('boards');

  const myBoards = getUserBoards(user.id);
  const savedImages = getSavedImages(user.id);

  const onCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    createBoard({ name: name.trim(), description: desc.trim() });
    setName(''); setDesc(''); setShowCreate(false);
  };

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
          <input
            placeholder="Board name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
            autoFocus
          />
          <input
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className={styles.input}
          />
          <button type="submit" className={styles.createBtn}>Create</button>
        </form>
      )}

      <div className={styles.tabs}>
        <button
          className={tab === 'boards' ? styles.tabActive : styles.tab}
          onClick={() => setTab('boards')}
        >
          Boards ({myBoards.length})
        </button>
        <button
          className={tab === 'saved' ? styles.tabActive : styles.tab}
          onClick={() => setTab('saved')}
        >
          Saved ({savedImages.length})
        </button>
      </div>

      {tab === 'boards' && (
        myBoards.length === 0 ? (
          <div className={styles.empty}>
            No boards yet. Click <strong>+ New board</strong> to create your first one.
          </div>
        ) : (
          <div className={styles.boards}>
            {myBoards.map((b) => {
              const imgs = getBoardImages(b.id);
              const cover = imgs[0]?.url || b.cover;
              return (
                <Link key={b.id} to={`/boards/${b.id}`} className={styles.boardCard}>
                  <div className={styles.boardCover}>
                    {cover ? (
                      <img src={cover} alt={b.name} />
                    ) : (
                      <div className={styles.coverPlaceholder}>📌</div>
                    )}
                  </div>
                  <div className={styles.boardInfo}>
                    <div className={styles.boardName}>{b.name}</div>
                    <div className={styles.boardMeta}>{imgs.length} pins</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )
      )}

      {tab === 'saved' && <MasonryGrid images={savedImages} empty="No saved pins yet." />}
    </div>
  );
}
