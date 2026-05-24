import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { imageService } from '../api/services/imageService';
import { boardService } from '../api/services/boardService';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../routes/paths';
import './ImageDetail.css';

export default function ImageDetail() {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const { user }   = useAuth();

  const [image,   setImage]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  const [liked,     setLiked]     = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [saved,     setSaved]     = useState(false);
  const [busy,      setBusy]      = useState(false);

  const [pickerOpen,    setPickerOpen]    = useState(false);
  const [boards,        setBoards]        = useState([]);
  const [boardsLoading, setBoardsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    imageService.show(id)
      .then((res) => {
        if (cancelled) return;
        const img = res.data ?? res;
        setImage(img);
        setLiked(img.liked_by_me ?? false);
        setLikeCount(img.like_count ?? 0);
        setSaved(img.saved_by_me ?? false);
      })
      .catch(() => { if (!cancelled) setError('Could not load image.'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  const handleLike = async () => {
    if (!user || busy) return;
    setBusy(true);
    try {
      const res = await imageService.toggleLike(id);
      setLiked(res.liked);
      setLikeCount(res.count);
    } catch { /* ignore */ }
    finally { setBusy(false); }
  };

  const handleSaveClick = async () => {
    if (!user || saved) return;
    setBoardsLoading(true);
    setPickerOpen(true);
    try {
      const res = await boardService.list({ user_id: user.id, perPage: 100 });
      setBoards(res.data ?? res ?? []);
    } catch { setBoards([]); }
    finally { setBoardsLoading(false); }
  };

  const handlePickBoard = async (boardId) => {
    setBusy(true);
    setPickerOpen(false);
    try {
      await boardService.saveImage(boardId, Number(id));
      setSaved(true);
    } catch { /* ignore */ }
    finally { setBusy(false); }
  };

  if (loading) {
    return (
      <div className="img-detail__state">
        <div className="img-detail__spinner" aria-label="Loading" />
      </div>
    );
  }

  if (error || !image) {
    return (
      <div className="img-detail__state img-detail__state--error">
        <p>{error || 'Image not found.'}</p>
        <button type="button" className="img-detail__back-btn" onClick={() => navigate(-1)}>
          ← Go back
        </button>
      </div>
    );
  }

  const uploadedAt = image.created_at
    ? new Date(image.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="img-detail">
      <button type="button" className="img-detail__back-btn" onClick={() => navigate(-1)}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
          stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back
      </button>

      <div className="img-detail__body">
        <div className="img-detail__media">
          <img src={image.url} alt={image.name} />
        </div>

        <div className="img-detail__panel">
          <h1 className="img-detail__title">{image.name}</h1>

          {image.description && (
            <p className="img-detail__desc">{image.description}</p>
          )}

          {user && (
            <div className="img-detail__actions">
              <button
                type="button"
                className={`img-detail__action-btn${liked ? ' img-detail__action-btn--liked' : ''}`}
                onClick={handleLike}
                disabled={busy}
                aria-label={liked ? 'Unlike' : 'Like'}
              >
                <svg viewBox="0 0 24 24" width="20" height="20"
                  fill={liked ? 'currentColor' : 'none'}
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
              </button>

              <div className="img-detail__picker-wrap">
                <button
                  type="button"
                  className={`img-detail__action-btn${saved ? ' img-detail__action-btn--saved' : ''}`}
                  onClick={handleSaveClick}
                  disabled={busy || saved}
                  aria-label={saved ? 'Saved' : 'Save to board'}
                >
                  <svg viewBox="0 0 24 24" width="20" height="20"
                    fill={saved ? 'currentColor' : 'none'}
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  <span>{saved ? 'Saved' : 'Save'}</span>
                </button>

                {pickerOpen && (
                  <div className="img-detail__board-picker">
                    <p className="img-detail__board-picker-label">Save to…</p>
                    {boardsLoading && <p className="img-detail__board-picker-empty">Loading…</p>}
                    {!boardsLoading && boards.length === 0 && (
                      <p className="img-detail__board-picker-empty">No boards yet</p>
                    )}
                    {!boardsLoading && boards.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        className="img-detail__board-option"
                        onClick={() => handlePickBoard(b.id)}
                      >
                        {b.name}
                      </button>
                    ))}
                    <button
                      type="button"
                      className="img-detail__board-cancel"
                      onClick={() => setPickerOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          <hr className="img-detail__divider" />

          {/* Author */}
          {image.author && (
            <div className="img-detail__author">
              <span className="img-detail__section-label">Uploaded by</span>
              <div className="img-detail__author-row">
                {image.author.avatar
                  ? <img src={image.author.avatar} alt={image.author.name} className="img-detail__avatar" />
                  : (
                    <div className="img-detail__avatar img-detail__avatar--fallback">
                      {image.author.name?.[0]?.toUpperCase() ?? '?'}
                    </div>
                  )
                }
                <div className="img-detail__author-info">
                  <span className="img-detail__author-name">{image.author.name}</span>
                  {uploadedAt && <span className="img-detail__upload-date">{uploadedAt}</span>}
                </div>
              </div>
            </div>
          )}

          {image.boards_containing?.length > 0 && (
            <div className="img-detail__boards">
              <span className="img-detail__section-label">Appears in</span>
              <ul className="img-detail__boards-list">
                {image.boards_containing.map((b) => (
                  <li key={b.id}>
                    <Link
                      to={ROUTES.BOARD_DETAIL.replace(':id', b.id)}
                      className="img-detail__board-link"
                    >
                      {b.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
