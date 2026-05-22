import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useAuth } from '../context/AuthContext.jsx';
import styles from './EditProfile.module.css';

export default function EditProfile() {
  const { user, updateProfile } = useAuth();
=======
import { useAuth } from '../Context/AuthContext.jsx';
import * as usersApi from '../api/usersApi.js';
import { validateEmail } from '../utils/validateEmail.js';
import styles from './EditProfile.module.css';

export default function EditProfile() {
  const { user, refreshMe } = useAuth();
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
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
<<<<<<< HEAD
    if (!file.type.startsWith('image/')) {
      setError('Please pick an image.');
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Avatar too large (max 2MB).');
      return;
    }
=======
    if (!file.type.startsWith('image/')) return setError('Please pick an image.');
    if (file.size > 2 * 1024 * 1024) return setError('Avatar too large (max 2MB).');
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result);
    reader.readAsDataURL(file);
  };

<<<<<<< HEAD
  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError('Name is required.');
    setSaving(true);
    try {
      updateProfile({ name: name.trim(), email: email.trim(), bio: bio.trim(), avatar });
=======
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
        name: name.trim(), email: email.trim().toLowerCase(),
        bio: bio.trim(), avatar,
      });
      await refreshMe();
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
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
<<<<<<< HEAD
            {avatar ? (
              <img src={avatar} alt="avatar" className={styles.avatarPreview} />
            ) : (
              <span className={styles.avatarFallback}>{initial}</span>
            )}
=======
            {avatar ? <img src={avatar} alt="avatar" className={styles.avatarPreview} />
                    : <span className={styles.avatarFallback}>{initial}</span>}
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
            <input type="file" accept="image/*" onChange={onAvatar} className={styles.fileInput} />
            <div className={styles.avatarOverlay}>Change</div>
          </label>
          {avatar && (
            <button type="button" onClick={() => setAvatar('')} className={styles.removeBtn}>
              Remove avatar
            </button>
          )}
        </div>

        <label className={styles.label}>
          Name
<<<<<<< HEAD
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            required
          />
=======
          <input value={name} onChange={(e) => setName(e.target.value)} className={styles.input} required />
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
        </label>

        <label className={styles.label}>
          Email
<<<<<<< HEAD
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
=======
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
        </label>

        <label className={styles.label}>
          Bio
<<<<<<< HEAD
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className={styles.textarea}
            rows={3}
            maxLength={200}
            placeholder="Tell people about yourself..."
          />
=======
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className={styles.textarea}
                    rows={3} maxLength={200} placeholder="Tell people about yourself..." />
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
          <span className={styles.charCount}>{bio.length}/200</span>
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.actions}>
<<<<<<< HEAD
          <button type="button" onClick={() => navigate('/profile')} className={styles.cancelBtn}>
            Cancel
          </button>
=======
          <button type="button" onClick={() => navigate('/profile')} className={styles.cancelBtn}>Cancel</button>
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
          <button type="submit" disabled={saving} className={styles.saveBtn}>
            {saving ? 'Saving...' : 'Save changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
