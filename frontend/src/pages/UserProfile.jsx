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

export default function UserProfile() {
  return (
    <div>UserProfile</div>
  )
}
>>>>>>> 346013204ac35c6a35bf1f1bb8275a080992db44
