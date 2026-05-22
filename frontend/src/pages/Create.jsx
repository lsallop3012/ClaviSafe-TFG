<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import styles from './Create.module.css';

export default function Create() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createImage, getUserBoards } = useData();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [boardId, setBoardId] = useState('');
  const [error, setError] = useState(null);

  const userBoards = getUserBoards(user.id);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image too large (max 5MB).');
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (!url) return setError('Choose an image or paste a URL.');
    if (!name.trim()) return setError('Title is required.');
    const img = createImage({
      name: name.trim(),
      description: description.trim(),
      url,
      board_id: boardId || undefined,
    });
    navigate(`/images/${img.id}`);
  };

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Create a pin</h1>

      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.dropzone}>
          {url ? (
            <img src={url} alt="preview" className={styles.preview} />
          ) : (
            <div className={styles.placeholder}>
              <div className={styles.icon}>📷</div>
              <div>Click to choose an image</div>
              <div className={styles.hint}>JPG, PNG, WebP — up to 5MB</div>
            </div>
          )}
          <input type="file" accept="image/*" onChange={onFile} className={styles.fileInput} />
        </label>

        <div className={styles.fields}>
          <label className={styles.label}>
            Or paste an image URL
            <input
              type="url"
              value={url?.startsWith('data:') ? '' : url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Title
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
              maxLength={80}
            />
          </label>

          <label className={styles.label}>
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.textarea}
              rows={3}
              maxLength={300}
            />
          </label>

          <label className={styles.label}>
            Add to board (optional)
            <select
              value={boardId}
              onChange={(e) => setBoardId(e.target.value)}
              className={styles.input}
            >
              <option value="">— None —</option>
              {userBoards.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.submit}>Publish pin</button>
        </div>
      </form>
    </div>
  );
=======
import React from 'react'
import styles from './styles/Create.module.css'

export default function Create() {
  return (
    <div>Create</div>
  )
>>>>>>> 346013204ac35c6a35bf1f1bb8275a080992db44
}
