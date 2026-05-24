import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { boardService } from '../api/services/boardService';
import { imageService } from '../api/services/imageService';
import { userService } from '../api/services/userService';
import { parseApiError } from '../api/services/authService';
import ImageCard from '../components/explore/ImageCard';
import { ROUTES } from '../routes/paths';
import './Profile.css';

function AvatarCircle({ user, size = 96 }) {
  if (user?.avatar) {
    return <img src={user.avatar} alt={user.name} className="profile__avatar-img" style={{ width: size, height: size }} />;
  }
  return (
    <div className="profile__avatar-placeholder" style={{ width: size, height: size }}>
      {user?.name?.[0]?.toUpperCase() ?? '?'}
    </div>
  );
}

function BoardCard({ board }) {
  const navigate = useNavigate();
  return (
    <div
      className="board-card"
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/boards/${board.id}`)}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/boards/${board.id}`)}
    >
      <div className="board-card__cover">
        {board.cover
          ? <img src={board.cover} alt={board.name} />
          : <div className="board-card__empty-cover" aria-hidden="true" />
        }
        <span className="board-card__count">{board.image_count ?? 0} imgs</span>
      </div>
      <p className="board-card__name">{board.name}</p>
      {board.description && <p className="board-card__desc">{board.description}</p>}
    </div>
  );
}

function EditModal({ user, onClose, onSave }) {
  const [form, setForm]     = useState({ name: user.name ?? '', email: user.email ?? '', bio: user.bio ?? '', password: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });

  const update = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });
    const payload = {};
    if (form.name    !== user.name)        payload.name     = form.name;
    if (form.email   !== user.email)       payload.email    = form.email;
    if (form.bio     !== (user.bio ?? '')) payload.bio      = form.bio;
    if (form.password)                     payload.password = form.password;
    if (!Object.keys(payload).length)      { onClose(); return; }
    try {
      const updated = await userService.update(user.id, payload);
      onSave(updated);
      onClose();
    } catch (err) {
      setStatus({ loading: false, error: parseApiError(err, 'Failed to save changes.') });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">Edit profile</h2>
          <button type="button" className="modal__close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} noValidate className="modal__form">
          <label className="modal__field"><span>Username</span>
            <input name="name"  value={form.name}  onChange={update} autoComplete="username" />
          </label>
          <label className="modal__field"><span>Email</span>
            <input type="email" name="email" value={form.email} onChange={update} autoComplete="email" />
          </label>
          <label className="modal__field"><span>Bio</span>
            <textarea name="bio" value={form.bio} onChange={update} rows={3} placeholder="Tell something about you..." />
          </label>
          <label className="modal__field">
            <span>New password <small>(leave blank to keep)</small></span>
            <input type="password" name="password" value={form.password} onChange={update} autoComplete="new-password" />
          </label>
          {status.error && <p className="modal__error">{status.error}</p>}
          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--accent" disabled={status.loading}>
              {status.loading ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function NewBoardModal({ onClose, onCreate }) {
  const [form, setForm]     = useState({ name: '', description: '' });
  const [status, setStatus] = useState({ loading: false, error: '' });
  const update = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setStatus({ loading: false, error: 'The name is required.' }); return; }
    setStatus({ loading: true, error: '' });
    try {
      const board = await boardService.create({ name: form.name.trim(), description: form.description.trim() || null });
      onCreate(board);
      onClose();
    } catch (err) {
      setStatus({ loading: false, error: parseApiError(err, 'Failed to create board.') });
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">New board</h2>
          <button type="button" className="modal__close" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} noValidate className="modal__form">
          <label className="modal__field"><span>Name</span>
            <input name="name" value={form.name} onChange={update} placeholder="My board..." autoFocus />
          </label>
          <label className="modal__field"><span>Description <small>(optional)</small></span>
            <textarea name="description" value={form.description} onChange={update} rows={2} />
          </label>
          {status.error && <p className="modal__error">{status.error}</p>}
          <div className="modal__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--accent" disabled={status.loading}>
              {status.loading ? 'Creating...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, loading: authLoading, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState('boards');

  const [boards, setBoards]               = useState([]);
  const [boardsLoading, setBoardsLoading] = useState(true);

  const [myImages, setMyImages]               = useState([]);
  const [myImagesLoading, setMyImagesLoading] = useState(false);
  const [myImagesFetched, setMyImagesFetched] = useState(false);

  const [liked, setLiked]               = useState([]);
  const [likedLoading, setLikedLoading] = useState(false);
  const [likedFetched, setLikedFetched] = useState(false);

  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) navigate(ROUTES.LOGIN, { replace: true });
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    setBoardsLoading(true);
    boardService
      .list({ user_id: user.id, perPage: 50 })
      .then(({ data }) => setBoards(data ?? []))
      .catch(() => setBoards([]))
      .finally(() => setBoardsLoading(false));
  }, [user]);

  useEffect(() => {
    if (tab !== 'images' || !user || myImagesFetched) return;
    setMyImagesLoading(true);
    imageService
      .list({ user_id: user.id, perPage: 100, sort: 'recent' })
      .then((res) => setMyImages(res.data ?? []))
      .catch(() => setMyImages([]))
      .finally(() => { setMyImagesLoading(false); setMyImagesFetched(true); });
  }, [tab, user, myImagesFetched]);

  const handleMyImagesUpdate = (updated) => {
    setMyImages((prev) => prev.map((img) => img.id === updated.id ? updated : img));
  };

  const handleMyImagesDelete = async (imageId) => {
    try {
      await imageService.remove(imageId);
      setMyImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch { /* ignore */ }
  };

  useEffect(() => {
    if (tab !== 'liked' || !user || likedFetched) return;
    setLikedLoading(true);
    imageService
      .list({ liked_by: user.id, perPage: 100, sort: 'recent' })
      .then((res) => setLiked(res.data ?? []))
      .catch(() => setLiked([]))
      .finally(() => { setLikedLoading(false); setLikedFetched(true); });
  }, [tab, user, likedFetched]);

  const handleLikedUpdate = (updated) => {
    setLiked((prev) =>
      updated.liked_by_me
        ? prev.map((img) => img.id === updated.id ? updated : img)
        : prev.filter((img) => img.id !== updated.id)   // remove if unliked
    );
  };

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  if (authLoading) return <div className="profile-loading">Loading...</div>;
  if (!user) return null;

  return (
    <div className="profile">
      <section className="profile__hero">
        <div className="profile__hero-inner">
          <AvatarCircle user={user} />

          <div className="profile__info">
            <h1 className="profile__name">{user.name}</h1>
            <p className="profile__email">{user.email}</p>
            {user.bio && <p className="profile__bio">{user.bio}</p>}
            <span className="profile__role-badge">{user.role ?? 'user'}</span>
          </div>

          <div className="profile__hero-actions">
            <button type="button" className="btn btn--accent" onClick={() => setModal('edit')}>
              Edit profile
            </button>
            <button type="button" className="btn btn--ghost" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      </section>

      <div className="profile__tabs">
        <button
          type="button"
          className={`profile__tab${tab === 'boards' ? ' profile__tab--active' : ''}`}
          onClick={() => setTab('boards')}
        >
          Boards
        </button>
        <button
          type="button"
          className={`profile__tab${tab === 'images' ? ' profile__tab--active' : ''}`}
          onClick={() => setTab('images')}
        >
          My images
        </button>
        <button
          type="button"
          className={`profile__tab${tab === 'liked' ? ' profile__tab--active' : ''}`}
          onClick={() => setTab('liked')}
        >
          Liked
        </button>
      </div>

      {tab === 'boards' && (
        <section className="profile__boards">
          <div className="profile__boards-header">
            <h2 className="profile__section-title">My boards</h2>
            <button type="button" className="btn btn--accent btn--sm" onClick={() => setModal('newBoard')}>
              + New board
            </button>
          </div>

          {boardsLoading ? (
            <p className="profile__empty">Loading boards...</p>
          ) : boards.length === 0 ? (
            <div className="profile__empty">
              <p>You don't have any boards yet.</p>
              <button type="button" className="btn btn--accent" onClick={() => setModal('newBoard')}>
                Create your first board
              </button>
            </div>
          ) : (
            <div className="boards-grid">
              {boards.map((b) => <BoardCard key={b.id} board={b} />)}
            </div>
          )}
        </section>
      )}

      {tab === 'images' && (
        <section className="profile__boards">
          <div className="profile__boards-header">
            <h2 className="profile__section-title">My images</h2>
            <button
              type="button"
              className="btn btn--accent btn--sm"
              onClick={() => navigate(ROUTES.CREATE)}
            >
              + Upload image
            </button>
          </div>

          {myImagesLoading ? (
            <p className="profile__empty">Loading...</p>
          ) : myImages.length === 0 ? (
            <div className="profile__empty">
              <p>You haven't uploaded any images yet.</p>
              <button type="button" className="btn btn--accent" onClick={() => navigate(ROUTES.CREATE)}>
                Upload your first image
              </button>
            </div>
          ) : (
            <div className="profile__liked-grid">
              {myImages.map((img) => (
                <ImageCard key={img.id} image={img} onUpdate={handleMyImagesUpdate} onDelete={handleMyImagesDelete} />
              ))}
            </div>
          )}
        </section>
      )}

      {tab === 'liked' && (
        <section className="profile__boards">
          <div className="profile__boards-header">
            <h2 className="profile__section-title">Liked images</h2>
          </div>

          {likedLoading ? (
            <p className="profile__empty">Loading...</p>
          ) : liked.length === 0 ? (
            <div className="profile__empty">
              <p>You haven't liked any images yet.</p>
              <button type="button" className="btn btn--accent" onClick={() => navigate(ROUTES.EXPLORE)}>
                Explore images
              </button>
            </div>
          ) : (
            <div className="profile__liked-grid">
              {liked.map((img) => (
                <ImageCard key={img.id} image={img} onUpdate={handleLikedUpdate} />
              ))}
            </div>
          )}
        </section>
      )}

      {modal === 'edit'     && <EditModal     user={user} onClose={() => setModal(null)} onSave={updateUser} />}
      {modal === 'newBoard' && <NewBoardModal            onClose={() => setModal(null)} onCreate={(b) => setBoards((p) => [b, ...p])} />}
    </div>
  );
}
