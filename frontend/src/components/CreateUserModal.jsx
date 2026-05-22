import { useState } from 'react';
import * as usersApi from '../api/usersApi.js';
import { validateEmail } from '../utils/validateEmail.js';
import styles from './SaveToBoardModal.module.css';

export default function CreateUserModal({ onClose, onCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (name.trim().length < 2) return setError('Name must be at least 2 characters.');
    const check = validateEmail(email);
    if (!check.valid) return setError(check.error);
    if (password.length < 6) return setError('Password must be at least 6 characters.');

    setSaving(true);
    try {
      await usersApi.createUser({ name: name.trim(), email: check.normalized, password, role });
      onCreated?.();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <h3>Create user</h3>
          <button onClick={onClose} className={styles.close}>✕</button>
        </div>

        <form onSubmit={onSubmit} style={{ padding: '12px 16px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input placeholder="Username" value={name} onChange={(e) => setName(e.target.value)}
                 className={styles.input} required autoFocus />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                 className={styles.input} required />
          <input type="password" placeholder="Password (min 6 chars)" value={password}
                 onChange={(e) => setPassword(e.target.value)} className={styles.input} required />
          <select value={role} onChange={(e) => setRole(e.target.value)} className={styles.input}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.createBtn} disabled={saving}>
            {saving ? 'Creating...' : 'Create user'}
          </button>
        </form>
      </div>
    </div>
  );
}
