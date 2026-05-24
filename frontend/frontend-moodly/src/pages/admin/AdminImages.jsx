import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';
import { parseApiError } from '../../api/services/authService';
import AdminSidebar from './AdminSidebar';
import './Admin.css';

function ImageModal({ initial, onClose, onSaved }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState(
    isEdit
      ? { name: initial.name ?? '', description: initial.description ?? '', url: initial.url ?? '' }
      : { name: '', description: '', url: '' }
  );
  const [status, setStatus] = useState({ loading: false, error: '' });
  const set = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });
    const payload = { ...form };
    try {
      let data;
      if (isEdit) {
        ({ data } = await api.patch(ENDPOINTS.IMAGES.UPDATE(initial.id), payload));
      } else {
        ({ data } = await api.post(ENDPOINTS.IMAGES.CREATE, payload));
      }
      onSaved(data);
      onClose();
    } catch (err) {
      setStatus({ loading: false, error: parseApiError(err, 'Error saving image.') });
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__header">
          <h2 className="admin-modal__title">{isEdit ? 'Edit image' : 'New image'}</h2>
          <button type="button" className="admin-modal__close" onClick={onClose}>✕</button>
        </div>
        <form className="admin-modal__form" onSubmit={submit} noValidate>
          <label className="admin-modal__field"><span>Name</span>
            <input name="name" value={form.name} onChange={set} required />
          </label>
          <label className="admin-modal__field"><span>URL</span>
            <input name="url" value={form.url} onChange={set} required />
          </label>
          <label className="admin-modal__field"><span>Description</span>
            <textarea name="description" value={form.description} onChange={set} rows={2} />
          </label>
          {status.error && <p className="admin-modal__error">{status.error}</p>}
          <div className="admin-modal__actions">
            <button type="button" className="admin-btn admin-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--accent" disabled={status.loading}>
              {status.loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const [modal, setModal]   = useState(null);

  const load = async () => {
    setLoading(true); setError('');
    try {
      const { data } = await api.get(ENDPOINTS.IMAGES.LIST, { params: { perPage: 100 } });
      setImages(data.data ?? data);
    } catch (err) {
      setError(parseApiError(err, 'Error loading images.'));
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await api.delete(ENDPOINTS.IMAGES.DELETE(id));
      setImages((p) => p.filter((i) => i.id !== id));
    } catch (err) { alert(parseApiError(err, 'Error deleting image.')); }
  };

  const handleSaved = (saved) => {
    setImages((p) => {
      const idx = p.findIndex((i) => i.id === saved.id);
      if (idx >= 0) { const next = [...p]; next[idx] = saved; return next; }
      return [saved, ...p];
    });
  };

  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin__content">
        <div className="admin__header">
          <h1 className="admin__title">Images</h1>
          <button className="admin-btn admin-btn--accent" onClick={() => setModal('create')}>+ New image</button>
        </div>

        {loading && <p className="admin-state">Loading...</p>}
        {error   && <p className="admin-state">{error}</p>}

        {!loading && !error && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Thumb</th><th>ID</th><th>Name</th><th>Likes</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {images.map((img) => (
                  <tr key={img.id}>
                    <td>
                      {img.url
                        ? <img src={img.url} alt={img.title} className="admin-table__thumb" />
                        : <div className="admin-table__empty-thumb" />}
                    </td>
                    <td>{img.id}</td>
                    <td>{img.name ?? '—'}</td>
                    <td>{img.like_count ?? 0}</td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => setModal(img)}>Edit</button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleDelete(img.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal === 'create' && <ImageModal onClose={() => setModal(null)} onSaved={handleSaved} />}
      {modal && modal !== 'create' && <ImageModal initial={modal} onClose={() => setModal(null)} onSaved={handleSaved} />}
    </div>
  );
}
