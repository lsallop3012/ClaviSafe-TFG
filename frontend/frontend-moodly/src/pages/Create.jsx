import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { imageService } from '../api/services/imageService';
import { parseApiError } from '../api/services/authService';
import { ROUTES } from '../routes/paths';
import './Create.css';

const MODE_FILE = 'file';
const MODE_URL  = 'url';

export default function Create() {
  const navigate = useNavigate();

  const [mode,    setMode]    = useState(MODE_FILE);
  const [name,    setName]    = useState('');
  const [desc,    setDesc]    = useState('');
  const [url,     setUrl]     = useState('');
  const [file,    setFile]    = useState(null);
  const [preview, setPreview] = useState('');
  const [drag,    setDrag]    = useState(false);
  const [status,  setStatus]  = useState({ loading: false, error: '' });

  const inputRef = useRef(null);

  /* ── file helpers ── */
  const applyFile = (f) => {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleFileChange = (e) => applyFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    applyFile(e.dataTransfer.files[0]);
  };

  const clearFile = () => {
    setFile(null);
    setPreview('');
    if (inputRef.current) inputRef.current.value = '';
  };

  /* ── submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setStatus({ loading: false, error: 'El nombre es obligatorio.' }); return; }
    if (mode === MODE_FILE && !file) { setStatus({ loading: false, error: 'Selecciona una imagen.' }); return; }
    if (mode === MODE_URL  && !url.trim()) { setStatus({ loading: false, error: 'Introduce una URL válida.' }); return; }

    setStatus({ loading: true, error: '' });

    try {
      let payload;
      if (mode === MODE_FILE) {
        payload = new FormData();
        payload.append('name', name.trim());
        if (desc.trim()) payload.append('description', desc.trim());
        payload.append('image', file);
      } else {
        payload = { name: name.trim(), description: desc.trim() || undefined, url: url.trim() };
      }

      await imageService.create(payload);
      navigate(ROUTES.PROFILE);
    } catch (err) {
      setStatus({ loading: false, error: parseApiError(err, 'No se pudo subir la imagen.') });
    }
  };

  return (
    <div className="create-page">
      <div className="create-page__card">
        <h1 className="create-page__title">Nueva imagen</h1>

        {/* ── mode toggle ── */}
        <div className="create-page__toggle">
          <button
            type="button"
            className={`create-page__toggle-btn${mode === MODE_FILE ? ' create-page__toggle-btn--active' : ''}`}
            onClick={() => { setMode(MODE_FILE); setUrl(''); }}
          >
            Subir archivo
          </button>
          <button
            type="button"
            className={`create-page__toggle-btn${mode === MODE_URL ? ' create-page__toggle-btn--active' : ''}`}
            onClick={() => { setMode(MODE_URL); clearFile(); }}
          >
            Usar URL
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="create-page__form">
          {/* ── image input ── */}
          {mode === MODE_FILE ? (
            <div
              className={`create-page__dropzone${drag ? ' create-page__dropzone--drag' : ''}${preview ? ' create-page__dropzone--has-preview' : ''}`}
              onClick={() => !preview && inputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && !preview && inputRef.current?.click()}
              aria-label="Zona de carga de imagen"
            >
              {preview ? (
                <>
                  <img src={preview} alt="preview" className="create-page__preview" />
                  <button
                    type="button"
                    className="create-page__remove-btn"
                    onClick={(e) => { e.stopPropagation(); clearFile(); }}
                    aria-label="Quitar imagen"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <div className="create-page__dropzone-inner">
                  <svg viewBox="0 0 24 24" width="40" height="40" fill="none"
                    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <p>Arrastra una imagen o <span>haz click</span></p>
                  <small>JPG, PNG, WEBP · máx 5 MB</small>
                </div>
              )}
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="create-page__file-input"
                onChange={handleFileChange}
                tabIndex={-1}
              />
            </div>
          ) : (
            <div className="create-page__url-wrap">
              {url && (
                <img
                  src={url}
                  alt="preview"
                  className="create-page__url-preview"
                  onError={(e) => { e.target.style.display = 'none'; }}
                  onLoad={(e)  => { e.target.style.display = 'block'; }}
                  style={{ display: 'none' }}
                />
              )}
              <input
                type="url"
                className="create-page__input"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
          )}

          {/* ── fields ── */}
          <label className="create-page__field">
            <span>Nombre <span className="create-page__required">*</span></span>
            <input
              type="text"
              className="create-page__input"
              placeholder="Dale un nombre a tu imagen..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={255}
            />
          </label>

          <label className="create-page__field">
            <span>Descripción <small>(opcional)</small></span>
            <textarea
              className="create-page__input create-page__textarea"
              placeholder="Cuéntanos algo sobre esta imagen..."
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
            />
          </label>

          {status.error && <p className="create-page__error">{status.error}</p>}

          <div className="create-page__actions">
            <button
              type="button"
              className="create-page__btn create-page__btn--ghost"
              onClick={() => navigate(-1)}
              disabled={status.loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="create-page__btn create-page__btn--accent"
              disabled={status.loading}
            >
              {status.loading ? 'Subiendo...' : 'Publicar imagen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
