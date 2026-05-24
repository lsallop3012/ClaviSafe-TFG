import { useEffect, useState, useCallback, useRef } from 'react';
import { imageService } from '../api/services/imageService';
import ImageCard from '../components/explore/ImageCard';
import './Explore.css';

const PER_PAGE = 20;

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function Explore() {
  const [images,  setImages]  = useState([]);
  const [meta,    setMeta]    = useState({ page: 1, totalPages: 1, total: 0 });
  const [page,    setPage]    = useState(1);
  const [search,  setSearch]  = useState('');
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const topRef = useRef(null);

  const debouncedSearch = useDebounce(search);

  const load = useCallback(async (pg, q) => {
    setLoading(true);
    setError('');
    try {
      const params = { perPage: PER_PAGE, page: pg };
      if (q) params.q = q;
      const res = await imageService.list(params);
      setImages(res.data ?? []);
      setMeta(res.meta ?? { page: pg, totalPages: 1, total: 0 });
    } catch {
      setError('Error loading images.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    load(page, debouncedSearch);
  }, [page, debouncedSearch, load]);

  const goTo = (pg) => {
    setPage(pg);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleUpdate = (updated) => {
    setImages((prev) => prev.map((img) => img.id === updated.id ? updated : img));
  };

  return (
    <div className="explore-page" ref={topRef}>
      <div className="explore-page__topbar">
        <h1 className="explore-page__title">Explore</h1>
        <div className="explore-page__search-wrap">
          <svg className="explore-page__search-icon" viewBox="0 0 24 24" width="18" height="18"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="explore-page__search"
            type="search"
            placeholder="Search pins..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search images"
          />
        </div>
      </div>

      {loading && (
        <div className="explore-page__state">
          <div className="explore-page__spinner" aria-label="Loading" />
        </div>
      )}

      {!loading && error && (
        <div className="explore-page__state explore-page__state--error">{error}</div>
      )}

      {!loading && !error && images.length === 0 && (
        <div className="explore-page__state">
          No images found{search ? ` for "${search}"` : ''}.
        </div>
      )}

      {!loading && !error && images.length > 0 && (
        <div className="explore-page__grid">
          {images.map((img) => (
            <ImageCard key={img.id} image={img} onUpdate={handleUpdate} />
          ))}
        </div>
      )}

      {!loading && meta.totalPages > 1 && (
        <div className="explore-page__pagination">
          <button
            type="button"
            className="explore-page__page-btn"
            onClick={() => goTo(page - 1)}
            disabled={page <= 1}
          >
            ← Prev
          </button>

          <span className="explore-page__page-info">
            Page {meta.page} of {meta.totalPages}
          </span>

          <button
            type="button"
            className="explore-page__page-btn"
            onClick={() => goTo(page + 1)}
            disabled={page >= meta.totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
