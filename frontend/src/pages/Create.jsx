import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import * as imagesApi from '../api/imagesApi.js';
import * as boardsApi from '../api/boardsApi.js';
import styles from './Create.module.css';

export default function Create() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [boardId, setBoardId] = useState('');
  const [boards, setBoards] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    boardsApi
      .listBoards({ user_id: user.id, perPage: 50 })
      .then((res) => { if (!cancelled) setBoards(res.data || []); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [user.id]);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Please choose an image file.');
    if (file.size > 5 * 1024 * 1024) return setError('Image too large (max 5MB).');
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!url) return setError('Choose an image or paste a URL.');
    if (!name.trim()) return setError('Title is required.');
    setSubmitting(true);
    try {
      const img = await imagesApi.createImage({
        name: name.trim(),
        description: description.trim(),
        url,
        board_id: boardId ? Number(boardId) : undefined,
      });
      navigate(`/images/${img.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Create a pin</h1>

      <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.dropzone}>
          {url ? <img src={url} alt="preview" className={styles.preview} />
               : (
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
            <input type="url" value={url?.startsWith('data:') ? '' : url}
                   onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className={styles.input} />
          </label>

          <label className={styles.label}>
            Title
            <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                   className={styles.input} required maxLength={80} />
          </label>

          <label className={styles.label}>
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
                      className={styles.textarea} rows={3} maxLength={300} />
          </label>

          <label className={styles.label}>
            Add to board (optional)
            <select value={boardId} onChange={(e) => setBoardId(e.target.value)} className={styles.input}>
              <option value="">— None —</option>
              {boards.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={submitting} className={styles.submit}>
            {submitting ? 'Publishing...' : 'Publish pin'}
          </button>
        </div>
      </form>
    </div>
  );
}
