<<<<<<< HEAD
<<<<<<< HEAD
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import MasonryGrid from '../components/MasonryGrid.jsx';
import styles from './UserProfile.module.css';

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: me, getAllUsers } = useAuth();
  const { getUserBoards, getBoardImages, getUserImages, getSavedImages } = useData();

  const targetId = userId ? Number(userId) : me.id;
  const users = getAllUsers();
  const profile = users.find((u) => u.id === targetId);

  const [tab, setTab] = useState('pins');

  if (!profile) {
    return (
      <div className={styles.notfound}>
        User not found. <Link to="/home">Go home</Link>
      </div>
    );
  }

  const isSelf = profile.id === me.id;
  const pins = getUserImages(profile.id);
  const userBoards = getUserBoards(profile.id);
  const savedPins = isSelf ? getSavedImages(profile.id) : [];

  return (
    <div>
      <div className={styles.head}>
        <div className={styles.avatarBig}>
          {profile.avatar ? (
            <img src={profile.avatar} alt={profile.name} />
          ) : (
            <span>{(profile.name || '?').charAt(0).toUpperCase()}</span>
          )}
        </div>
        <h1 className={styles.name}>{profile.name}</h1>
        <div className={styles.email}>{profile.email}</div>
        {profile.bio && <p className={styles.bio}>{profile.bio}</p>}

        <div className={styles.stats}>
          <div><strong>{pins.length}</strong> pins</div>
          <div><strong>{userBoards.length}</strong> boards</div>
          {isSelf && <div><strong>{savedPins.length}</strong> saved</div>}
        </div>

        {isSelf && (
          <button onClick={() => navigate('/profile/edit')} className={styles.editBtn}>
            Edit profile
          </button>
        )}
      </div>

      <div className={styles.tabs}>
        <button
          className={tab === 'pins' ? styles.tabActive : styles.tab}
          onClick={() => setTab('pins')}
        >
          Pins ({pins.length})
        </button>
        <button
          className={tab === 'boards' ? styles.tabActive : styles.tab}
          onClick={() => setTab('boards')}
        >
          Boards ({userBoards.length})
        </button>
        {isSelf && (
          <button
            className={tab === 'saved' ? styles.tabActive : styles.tab}
            onClick={() => setTab('saved')}
          >
            Saved ({savedPins.length})
          </button>
        )}
      </div>

      {tab === 'pins' && (
        <MasonryGrid images={pins} empty={isSelf ? "You haven't posted any pins yet." : "No pins yet."} />
      )}

      {tab === 'boards' && (
        userBoards.length === 0 ? (
          <div className={styles.empty}>
            {isSelf ? 'You have no boards yet.' : 'No boards yet.'}
          </div>
        ) : (
          <div className={styles.boards}>
            {userBoards.map((b) => {
              const imgs = getBoardImages(b.id);
              const cover = imgs[0]?.url || b.cover;
              return (
                <Link key={b.id} to={`/boards/${b.id}`} className={styles.boardCard}>
                  <div className={styles.boardCover}>
                    {cover ? <img src={cover} alt={b.name} /> : <div className={styles.coverPh}>📌</div>}
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

      {isSelf && tab === 'saved' && (
        <MasonryGrid images={savedPins} empty="No saved pins yet." />
      )}
    </div>
  );
}
=======
import React from 'react'
import styles from './styles/UserProfile.module.css'
=======
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
import * as usersApi from '../api/usersApi.js';
import * as boardsApi from '../api/boardsApi.js';
import * as imagesApi from '../api/imagesApi.js';
import useFetch from '../hooks/useFetch.js';
import MasonryGrid from '../components/MasonryGrid.jsx';
import Spinner from '../components/Spinner.jsx';
import styles from './UserProfile.module.css';
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c

export default function UserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { user: me } = useAuth();
  const targetId = userId ? Number(userId) : me?.id;

  const profile = useFetch(() => usersApi.getUser(targetId), [targetId]);
  const pins = useFetch(() => imagesApi.listImages({ user_id: targetId, perPage: 50 }), [targetId]);
  const userBoards = useFetch(() => boardsApi.listBoards({ user_id: targetId, perPage: 50 }), [targetId]);
  const isSelf = !!me && targetId === me.id;
  const savedPins = useFetch(
    () => (isSelf ? imagesApi.listImages({ saved_by: me.id, perPage: 50 }) : Promise.resolve({ data: [] })),
    [isSelf, me?.id]
  );

  const [tab, setTab] = useState('pins');

  if (profile.loading) return <Spinner label="Loading profile..." fullPage />;
  if (profile.error || !profile.data) {
    return (
      <div className={styles.notfound}>
        User not found. <Link to="/home">Go home</Link>
      </div>
    );
  }
  const p = profile.data;
  const pinsList = pins.data?.data || [];
  const boardsList = userBoards.data?.data || [];
  const savedList = savedPins.data?.data || [];

  return (
<<<<<<< HEAD
    <div>UserProfile</div>
  )
}
>>>>>>> 346013204ac35c6a35bf1f1bb8275a080992db44
=======
    <div>
      <div className={styles.head}>
        <div className={styles.avatarBig}>
          {p.avatar ? <img src={p.avatar} alt={p.name} />
                    : <span>{(p.name || '?').charAt(0).toUpperCase()}</span>}
        </div>
        <h1 className={styles.name}>{p.name}</h1>
        <div className={styles.email}>
          {p.email}
          {p.email_verified && <span className={styles.verified} title="Verified email">✓</span>}
          {p.role === 'admin' && <span className={styles.adminBadge}>Admin</span>}
        </div>
        {p.bio && <p className={styles.bio}>{p.bio}</p>}

        <div className={styles.stats}>
          <div><strong>{pinsList.length}</strong> pins</div>
          <div><strong>{boardsList.length}</strong> boards</div>
        </div>

        {isSelf && (
          <button onClick={() => navigate('/profile/edit')} className={styles.editBtn}>Edit profile</button>
        )}
      </div>

      <div className={styles.tabs}>
        <button className={tab === 'pins' ? styles.tabActive : styles.tab} onClick={() => setTab('pins')}>
          Pins ({pinsList.length})
        </button>
        <button className={tab === 'boards' ? styles.tabActive : styles.tab} onClick={() => setTab('boards')}>
          Boards ({boardsList.length})
        </button>
        {isSelf && (
          <button className={tab === 'saved' ? styles.tabActive : styles.tab} onClick={() => setTab('saved')}>
            Saved ({savedList.length})
          </button>
        )}
      </div>

      {tab === 'pins' && (
        <MasonryGrid images={pinsList} empty={isSelf ? "You haven't posted any pins yet." : "No pins yet."}
                     onChange={pins.refetch} />
      )}

      {tab === 'boards' && (
        boardsList.length === 0 ? (
          <div className={styles.empty}>{isSelf ? 'You have no boards yet.' : 'No boards yet.'}</div>
        ) : (
          <div className={styles.boards}>
            {boardsList.map((b) => (
              <Link key={b.id} to={`/boards/${b.id}`} className={styles.boardCard}>
                <div className={styles.boardCover}>
                  {b.cover ? <img src={b.cover} alt={b.name} /> : <div className={styles.coverPh}>📌</div>}
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

      {isSelf && tab === 'saved' && (
        <MasonryGrid images={savedList} empty="No saved pins yet." onChange={savedPins.refetch} />
      )}
    </div>
  );
}
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
