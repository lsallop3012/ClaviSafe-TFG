import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';
import { parseApiError } from '../../api/services/authService';
import AdminSidebar from './AdminSidebar';
import './Admin.css';

function BoardModal({ initial, onClose, onSaved }) {
  const isNew = !initial;
  const [form, setForm] = useState({
    name:        initial?.name        ?? '',
    description: initial?.description ?? '',
  });
  const [status, setStatus] = useState({ loading: false, error: '' });
  const set = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setStatus({ loading: false, error: 'Name is required.' }); return; }
    setStatus({ loading: true, error: '' });
    try {
      let data;
      if (isNew) {
        ({ data } = await api.post(ENDPOINTS.BOARDS.CREATE, {
          name:        form.name.trim(),
          description: form.description.trim() || null,
        }));
      } else {
        ({ data } = await api.patch(ENDPOINTS.BOARDS.UPDATE(initial.id), {
          name:        form.name.trim(),
          description: form.description.trim() || null,
        }));
      }
      onSaved(data);
      onClose();
    } catch (err) {
      setStatus({ loading: false, error: parseApiError(err, 'Error saving board.') });
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__header">
          <h2 className="admin-modal__title">{isNew ? 'New board' : 'Edit board'}</h2>
          <button type="button" className="admin-modal__close" onClick={onClose}>✕</button>
        </div>
        <form className="admin-modal__form" onSubmit={submit} noValidate>
          <label className="admin-modal__field"><span>Name</span>
            <input name="name" value={form.name} onChange={set} required autoFocus />
          </label>
          <label className="admin-modal__field"><span>Description <small>(optional)</small></span>
            <textarea name="description" value={form.description} onChange={set} rows={2} />
          </label>
          {status.error && <p className="admin-modal__error">{status.error}</p>}
          <div className="admin-modal__actions">
            <button type="button" className="admin-btn admin-btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="admin-btn admin-btn--accent" disabled={status.loading}>
              {status.loading ? 'Saving...' : isNew ? 'Create' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminBoards() {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const [modal, setModal]   = useState(null);

  const load = async () => {
    setLoading(true); setError('');
    try {
      const { data } = await api.get(ENDPOINTS.BOARDS.LIST, { params: { perPage: 100 } });
      setBoards(data.data ?? data);
    } catch (err) {
      setError(parseApiError(err, 'Error loading boards.'));
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this board?')) return;
    try {
      await api.delete(ENDPOINTS.BOARDS.DELETE(id));
      setBoards((p) => p.filter((b) => b.id !== id));
    } catch (err) { alert(parseApiError(err, 'Error deleting board.')); }
  };

  const handleSaved = (saved) => {
    setBoards((p) => {
      const idx = p.findIndex((b) => b.id === saved.id);
      if (idx >= 0) { const next = [...p]; next[idx] = saved; return next; }
      return [saved, ...p];
    });
  };

  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin__content">
        <div className="admin__header">
          <h1 className="admin__title">Boards</h1>
          <button className="admin-btn admin-btn--accent" onClick={() => setModal('new')}>
            + New board
          </button>
        </div>

        {loading && <p className="admin-state">Loading...</p>}
        {error   && <p className="admin-state">{error}</p>}

        {!loading && !error && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>Cover</th><th>ID</th><th>Name</th><th>Description</th><th>Images</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {boards.map((b) => (
                  <tr key={b.id}>
                    <td>
                      {b.cover
                        ? <img src={b.cover} alt={b.name} className="admin-table__thumb" />
                        : <div className="admin-table__empty-thumb" />}
                    </td>
                    <td>{b.id}</td>
                    <td>{b.name}</td>
                    <td>{b.description ?? '—'}</td>
                    <td>{b.image_count ?? 0}</td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => setModal(b)}>Edit</button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleDelete(b.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <BoardModal
          initial={modal === 'new' ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
