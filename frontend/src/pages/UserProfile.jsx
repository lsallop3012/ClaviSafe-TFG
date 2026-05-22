import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import * as usersApi from '../api/usersApi.js';
import * as boardsApi from '../api/boardsApi.js';
import { listImages } from '../api/imagesApi.js';
import useFetch from '../hooks/useFetch.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import Spinner from '../components/Spinner.jsx';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: me } = useAuth();

  const targetId = userId ? Number(userId) : me?.id;
  const isSelf = me && targetId === me.id;

  const profile = useFetch(() => usersApi.getUser(targetId), [targetId]);
  const pins    = useFetch(() => listImages({ user_id: targetId, perPage: 50 }), [targetId]);
  const boards  = useFetch(() => boardsApi.listBoards({ user_id: targetId, perPage: 50 }), [targetId]);
  const saved   = useFetch(
    () => (isSelf ? listImages({ saved_by: targetId, perPage: 50 }) : Promise.resolve({ data: [] })),
    [targetId, isSelf]
  );

  const [tab, setTab] = useState('pins');

  if (profile.loading) return <Spinner label="Loading profile..." fullPage />;
  if (profile.error) {
    return (
      <div className={styles.notfound}>
        User not found. <Link to="/home">Go home</Link>
      </div>
    );
  }

  const p = profile.data;
  const pinItems   = pins.data?.data || [];
  const boardItems = boards.data?.data || [];
  const savedItems = saved.data?.data || [];

  return (
    <div>
      <div className={styles.head}>
        <div className={styles.avatarBig}>
          {p.avatar
            ? <img src={p.avatar} alt={p.name} />
            : <span>{(p.name || '?').charAt(0).toUpperCase()}</span>}
        </div>
        <h1 className={styles.name}>{p.name}</h1>
        <div className={styles.email}>{p.email}</div>
        {p.bio && <p className={styles.bio}>{p.bio}</p>}

        <div className={styles.stats}>
          <div><strong>{pinItems.length}</strong> pins</div>
          <div><strong>{boardItems.length}</strong> boards</div>
          {isSelf && <div><strong>{savedItems.length}</strong> saved</div>}
        </div>

        {isSelf && (
          <button onClick={() => navigate('/profile/edit')} className={styles.editBtn}>
            Edit profile
          </button>
        )}
      </div>

      <div className={styles.tabs}>
        <button className={tab === 'pins' ? styles.tabActive : styles.tab} onClick={() => setTab('pins')}>
          Pins ({pinItems.length})
        </button>
        <button className={tab === 'boards' ? styles.tabActive : styles.tab} onClick={() => setTab('boards')}>
          Boards ({boardItems.length})
        </button>
        {isSelf && (
          <button className={tab === 'saved' ? styles.tabActive : styles.tab} onClick={() => setTab('saved')}>
            Saved ({savedItems.length})
          </button>
        )}
      </div>

      {tab === 'pins' && (
        pins.loading ? <Spinner label="Loading..." />
        : <MasonryGrid images={pinItems}
                       empty={isSelf ? "You haven't posted any pins yet." : 'No pins yet.'}
                       onChange={pins.refetch} />
      )}

      {tab === 'boards' && (
        boards.loading ? <Spinner label="Loading..." />
        : boardItems.length === 0 ? (
            <div className={styles.empty}>{isSelf ? 'You have no boards yet.' : 'No boards yet.'}</div>
          )
        : (
          <div className={styles.boards}>
            {boardItems.map((b) => (
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

      {tab === 'saved' && isSelf && (
        saved.loading ? <Spinner label="Loading..." />
        : <MasonryGrid images={savedItems} empty="No saved pins yet." onChange={saved.refetch} />
      )}
    </div>
  );
}
