import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { imageService } from '../../api/services/imageService';
import { boardService } from '../../api/services/boardService';
import './ImageCard.css';

export default function ImageCard({ image, onUpdate, onRemove, onDelete }) {
  const { user } = useAuth();
  const [likeCount, setLikeCount] = useState(image.like_count  ?? 0);
  const [liked,     setLiked]     = useState(image.liked_by_me ?? false);
  const [saved,     setSaved]     = useState(image.saved_by_me ?? false);
  const [busy,      setBusy]      = useState(false);

  /* ── board picker ── */
  const [pickerOpen,  setPickerOpen]  = useState(false);
  const [boards,      setBoards]      = useState([]);
  const [boardsLoading, setBoardsLoading] = useState(false);
  const pickerRef = useRef(null);

  /* close picker on outside click */
  useEffect(() => {
    if (!pickerOpen) return;
    const handler = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [pickerOpen]);

  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user || busy) return;
    setBusy(true);
    try {
      const res = await imageService.toggleLike(image.id);
      setLiked(res.liked);
      setLikeCount(res.count);
      onUpdate?.({ ...image, liked_by_me: res.liked, like_count: res.count });
    } catch { /* ignore */ }
    finally { setBusy(false); }
  };

  const handleSaveClick = async (e) => {
    e.stopPropagation();
    if (!user) return;
    if (saved) return; /* already saved — could add unsave later */

    setBoardsLoading(true);
    setPickerOpen(true);
    try {
      const res = await boardService.list({ user_id: user.id, perPage: 100 });
      setBoards(res.data ?? res ?? []);
    } catch {
      setBoards([]);
    } finally {
      setBoardsLoading(false);
    }
  };

  const handlePickBoard = async (e, boardId) => {
    e.stopPropagation();
    setBusy(true);
    setPickerOpen(false);
    try {
      await boardService.saveImage(boardId, image.id);
      setSaved(true);
      onUpdate?.({ ...image, saved_by_me: true });
    } catch { /* ignore */ }
    finally { setBusy(false); }
  };

  return (
    <article className="img-card">
      {/* imagen */}
      <div className="img-card__media">
        {image.url
          ? <img src={image.url} alt={image.name} loading="lazy" />
          : <div className="img-card__placeholder" aria-hidden="true" />
        }

        {/* overlay on hover */}
        <div className="img-card__overlay" aria-hidden="true">
          {/* remove from board ✕ — only in board detail */}
          {onRemove && (
            <button
              type="button"
              className="img-card__remove-btn"
              onClick={(e) => { e.stopPropagation(); onRemove(image.id); }}
              aria-label="Quitar del tablero"
              disabled={busy}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          {/* delete image 🗑 — only in "My images" tab */}
          {onDelete && (
            <button
              type="button"
              className="img-card__remove-btn img-card__remove-btn--delete"
              onClick={(e) => { e.stopPropagation(); onDelete(image.id); }}
              aria-label="Eliminar imagen"
              disabled={busy}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          )}

          <div className="img-card__overlay-actions">
            {user && (
              <button
                type="button"
                className={`img-card__action-btn${liked ? ' img-card__action-btn--liked' : ''}`}
                onClick={handleLike}
                aria-label={liked ? 'Quitar like' : 'Dar like'}
                disabled={busy}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill={liked ? 'currentColor' : 'none'}
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {likeCount > 0 && <span>{likeCount}</span>}
              </button>
            )}

            {/* save / board picker */}
            {user && (
              <div className="img-card__picker-wrap" ref={pickerRef}>
                <button
                  type="button"
                  className={`img-card__action-btn${saved ? ' img-card__action-btn--saved' : ''}`}
                  onClick={handleSaveClick}
                  aria-label={saved ? 'Guardado' : 'Guardar en tablero'}
                  disabled={busy || saved}
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill={saved ? 'currentColor' : 'none'}
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>

                {pickerOpen && (
                  <div className="img-card__board-picker" onClick={(e) => e.stopPropagation()}>
                    <p className="img-card__board-picker-label">Guardar en…</p>
                    {boardsLoading && (
                      <p className="img-card__board-picker-empty">Cargando…</p>
                    )}
                    {!boardsLoading && boards.length === 0 && (
                      <p className="img-card__board-picker-empty">Sin tableros</p>
                    )}
                    {!boardsLoading && boards.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        className="img-card__board-option"
                        onClick={(e) => handlePickBoard(e, b.id)}
                      >
                        {b.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* info */}
      <div className="img-card__info">
        <p className="img-card__title">{image.name}</p>
        {image.description && <p className="img-card__desc">{image.description}</p>}
      </div>
    </article>
  );
}
