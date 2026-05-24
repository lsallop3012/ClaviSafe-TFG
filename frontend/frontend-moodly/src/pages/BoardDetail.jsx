import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { boardService } from '../api/services/boardService';
import ImageCard from '../components/explore/ImageCard';
import { ROUTES } from '../routes/paths';
import './BoardDetail.css';

export default function BoardDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();

  const [board,   setBoard]   = useState(null);
  const [images,  setImages]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [boardRes, imagesRes] = await Promise.all([
        boardService.show(id),
        boardService.listImages(id, { perPage: 100 }),
      ]);
      setBoard(boardRes.data ?? boardRes);
      setImages((imagesRes.data ?? imagesRes) ?? []);
    } catch {
      setError('No se pudo cargar el tablero.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { load(); }, [load]);

  const handleUpdate = (updated) => {
    setImages((prev) => prev.map((img) => img.id === updated.id ? updated : img));
  };

  const handleRemove = async (imageId) => {
    try {
      await boardService.removeImage(id, imageId);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch { /* ignore */ }
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="board-detail__state">
        <div className="board-detail__spinner" aria-label="Cargando" />
      </div>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <div className="board-detail__state board-detail__state--error">
        <p>{error}</p>
        <button type="button" className="board-detail__back-btn" onClick={() => navigate(-1)}>
          ← Volver
        </button>
      </div>
    );
  }

  return (
    <div className="board-detail">
      {/* ── Header ── */}
      <div className="board-detail__header">
        <button
          type="button"
          className="board-detail__back-btn"
          onClick={() => navigate(ROUTES.PROFILE)}
          aria-label="Volver al perfil"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Mi perfil
        </button>

        <div className="board-detail__meta">
          <h1 className="board-detail__title">{board?.name}</h1>
          {board?.description && (
            <p className="board-detail__desc">{board.description}</p>
          )}
          <span className="board-detail__count">
            {images.length} {images.length === 1 ? 'imagen' : 'imágenes'}
          </span>
        </div>
      </div>

      {/* ── Empty ── */}
      {images.length === 0 && (
        <div className="board-detail__state">
          <p>Este tablero aún no tiene imágenes.</p>
          <button
            type="button"
            className="board-detail__cta-btn"
            onClick={() => navigate(ROUTES.EXPLORE)}
          >
            Explorar imágenes
          </button>
        </div>
      )}

      {/* ── Masonry grid ── */}
      {images.length > 0 && (
        <div className="board-detail__grid">
          {images.map((img) => (
            <ImageCard key={img.id} image={img} onUpdate={handleUpdate} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}
