import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import * as usersApi from '../api/usersApi.js';
import { validateEmail } from '../utils/validateEmail.js';
import styles from './EditProfile.module.css';

export default function EditProfile() {
  const { user, refreshMe } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [bio, setBio] = useState(user.bio || '');
  const [avatar, setAvatar] = useState(user.avatar || '');
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const onAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Please pick an image.');
    if (file.size > 2 * 1024 * 1024) return setError('Avatar too large (max 2MB).');
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError('Name is required.');
    if (email && email !== user.email) {
      const check = validateEmail(email);
      if (!check.valid) return setError(check.error);
    }
    setSaving(true);
    try {
      await usersApi.updateUser(user.id, {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        bio: bio.trim(),
        avatar,
      });
      await refreshMe();
      navigate('/profile');
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const initial = (name || '?').charAt(0).toUpperCase();

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Edit profile</h1>

      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.avatarSection}>
          <label className={styles.avatarPicker}>
            {avatar ? <img src={avatar} alt="avatar" className={styles.avatarPreview} />
                    : <span className={styles.avatarFallback}>{initial}</span>}
            <input type="file" accept="image/*" onChange={onAvatar} className={styles.fileInput} />
          </label>
          <span className={styles.avatarHint}>Click to change avatar</span>
        </div>

        <label className={styles.label}>
          Username
          <input value={name} onChange={(e) => setName(e.target.value)} className={styles.input} required />
        </label>

        <label className={styles.label}>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
        </label>

        <label className={styles.label}>
          Bio
          <textarea value={bio} onChange={(e) => setBio(e.target.value)}
                    className={styles.textarea} rows={3} maxLength={500} />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
          <button type="button" onClick={() => navigate('/profile')} className={styles.cancelBtn}>Cancel</button>
          <button type="submit" disabled={saving} className={styles.submit}>
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
