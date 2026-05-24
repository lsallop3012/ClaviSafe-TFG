import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoints';
import { parseApiError } from '../../api/services/authService';
import AdminSidebar from './AdminSidebar';
import './Admin.css';

const EMPTY_FORM = { name: '', email: '', password: '', bio: '', role: 'user' };

function UserModal({ initial, onClose, onSaved }) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState(isEdit ? { ...initial, password: '' } : EMPTY_FORM);
  const [status, setStatus] = useState({ loading: false, error: '' });
  const set = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: '' });
    try {
      if (isEdit) {
        const payload = {};
        if (form.name  !== initial.name)  payload.name  = form.name;
        if (form.email !== initial.email) payload.email = form.email;
        if (form.bio   !== (initial.bio ?? '')) payload.bio = form.bio;
        if (form.role  !== initial.role)  payload.role  = form.role;
        if (form.password) payload.password = form.password;
        const { data } = await api.patch(ENDPOINTS.USERS.UPDATE(initial.id), payload);
        onSaved(data);
      } else {
        const { data } = await api.post(ENDPOINTS.USERS.LIST, form);
        onSaved(data);
      }
      onClose();
    } catch (err) {
      setStatus({ loading: false, error: parseApiError(err, 'Error saving user.') });
    }
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal__header">
          <h2 className="admin-modal__title">{isEdit ? 'Edit user' : 'New user'}</h2>
          <button type="button" className="admin-modal__close" onClick={onClose}>✕</button>
        </div>
        <form className="admin-modal__form" onSubmit={submit} noValidate>
          <label className="admin-modal__field"><span>Username</span>
            <input name="name" value={form.name} onChange={set} required />
          </label>
          <label className="admin-modal__field"><span>Email</span>
            <input type="email" name="email" value={form.email} onChange={set} required />
          </label>
          <label className="admin-modal__field"><span>Password {isEdit && <small>(empty = no change)</small>}</span>
            <input type="password" name="password" value={form.password} onChange={set} autoComplete="new-password" />
          </label>
          <label className="admin-modal__field"><span>Bio</span>
            <textarea name="bio" value={form.bio ?? ''} onChange={set} rows={2} />
          </label>
          <label className="admin-modal__field"><span>Role</span>
            <select name="role" value={form.role ?? 'user'} onChange={set}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
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

export default function AdminUsers() {
  const [users, setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState('');
  const [modal, setModal]   = useState(null);

  const load = async () => {
    setLoading(true); setError('');
    try {
      const { data } = await api.get(ENDPOINTS.USERS.LIST, { params: { perPage: 100 } });
      setUsers(data.data ?? data);
    } catch (err) {
      setError(parseApiError(err, 'Error loading users.'));
    } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await api.delete(ENDPOINTS.USERS.DELETE(id));
      setUsers((p) => p.filter((u) => u.id !== id));
    } catch (err) { alert(parseApiError(err, 'Error deleting user.')); }
  };

  const handleSaved = (saved) => {
    setUsers((p) => {
      const idx = p.findIndex((u) => u.id === saved.id);
      if (idx >= 0) { const next = [...p]; next[idx] = saved; return next; }
      return [saved, ...p];
    });
  };

  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin__content">
        <div className="admin__header">
          <h1 className="admin__title">Users</h1>
          <button className="admin-btn admin-btn--accent" onClick={() => setModal('create')}>+ New user</button>
        </div>

        {loading && <p className="admin-state">Loading...</p>}
        {error   && <p className="admin-state">{error}</p>}

        {!loading && !error && (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Bio</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className={`admin-badge admin-badge--${u.role}`}>{u.role}</span></td>
                    <td>{u.bio ?? '—'}</td>
                    <td>
                      <div className="admin-table__actions">
                        <button className="admin-btn admin-btn--ghost admin-btn--sm" onClick={() => setModal(u)}>Edit</button>
                        <button className="admin-btn admin-btn--danger admin-btn--sm" onClick={() => handleDelete(u.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal === 'create' && <UserModal onClose={() => setModal(null)} onSaved={handleSaved} />}
      {modal && modal !== 'create' && <UserModal initial={modal} onClose={() => setModal(null)} onSaved={handleSaved} />}
    </div>
  );
}
