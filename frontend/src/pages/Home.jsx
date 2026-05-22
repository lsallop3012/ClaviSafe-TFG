<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import React from 'react'
import styles from './styles/Home.module.css'
=======
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
import * as boardsApi from '../api/boardsApi.js';
import { listImages } from '../api/imagesApi.js';
import useFetch from '../hooks/useFetch.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import Spinner from '../components/Spinner.jsx';
import styles from './Home.module.css';
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c

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
<<<<<<< HEAD
    <div>Home</div>
  )
>>>>>>> 346013204ac35c6a35bf1f1bb8275a080992db44
=======
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
        myBoards.loading ? <Spinner label="Loading..." />
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
        saved.loading ? <Spinner label="Loading..." />
        : <MasonryGrid images={savedImages} empty="No saved pins yet." onChange={saved.refetch} />
      )}
    </div>
  );
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
}
