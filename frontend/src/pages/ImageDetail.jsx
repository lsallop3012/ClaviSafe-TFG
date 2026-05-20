import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../Context/AuthContext.jsx';
import * as imagesApi from '../api/imagesApi.js';
import * as commentsApi from '../api/commentsApi.js';
import useFetch from '../hooks/useFetch.js';
import SaveToBoardModal from '../components/SaveToBoardModal.jsx';
import styles from './ImageDetail.module.css';

const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, {
  year: 'numeric', month: 'short', day: 'numeric',
});

export default function ImageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const image = useFetch(() => imagesApi.getImage(id), [id]);
  const comments = useFetch(() => commentsApi.listComments(id), [id]);

  const [comment, setComment] = useState('');
  const [showSave, setShowSave] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(null);

  if (image.loading) return <div className={styles.notfound}>Loading...</div>;
  if (image.error || !image.data) {
    return (
      <div className={styles.notfound}>
        Pin not found. <Link to="/explore">Browse pins</Link>
      </div>
    );
  }
  const img = image.data;
  const isOwner = user.id === img.user_id || user.role === 'admin';

  const onLike = async () => {
    try { await imagesApi.toggleLike(img.id); image.refetch(); } catch (e) { setError(e.message); }
  };

  const onComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    try { await commentsApi.createComment(img.id, comment.trim()); setComment(''); comments.refetch(); }
    catch (err) { setError(err.message); }
  };

  const onDeleteComment = async (cid) => {
    try { await commentsApi.deleteComment(cid); comments.refetch(); } catch (e) { setError(e.message); }
  };

  const onDelete = async () => {
    if (!window.confirm('Delete this pin? This cannot be undone.')) return;
    await imagesApi.deleteImage(img.id);
    navigate('/home');
  };

  const startEdit = () => {
    setName(img.name); setDesc(img.description || ''); setEditing(true);
  };

  const onSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await imagesApi.updateImage(img.id, { name: name.trim(), description: desc.trim() });
      setEditing(false); image.refetch();
    } catch (err) { setError(err.message); }
  };

  const author = img.author;
  const commentList = comments.data?.data || [];

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.imageSide}>
          <img src={img.url} alt={img.name} className={styles.image} />
        </div>

        <div className={styles.side}>
          <div className={styles.topBar}>
            <button onClick={onLike} className={`${styles.likeBtn} ${img.liked_by_me ? styles.liked : ''}`}>
              {img.liked_by_me ? '♥' : '♡'} {img.like_count}
            </button>
            <button onClick={() => setShowSave(true)} className={styles.saveBtn}>
              {img.saved_by_me ? 'Saved' : 'Save'}
            </button>
          </div>

          {!editing ? (
            <>
              <h1 className={styles.title}>{img.name}</h1>
              {img.description && <p className={styles.desc}>{img.description}</p>}
            </>
          ) : (
            <form onSubmit={onSaveEdit} className={styles.editForm}>
              <input value={name} onChange={(e) => setName(e.target.value)} className={styles.input} required />
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className={styles.textarea} rows={3} />
              <div className={styles.editActions}>
                <button type="button" onClick={() => setEditing(false)} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.saveEditBtn}>Save</button>
              </div>
            </form>
          )}

          <div className={styles.author}>
            <Link to={`/profile/${author?.id}`} className={styles.authorLink}>
              {author?.avatar
                ? <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
                : <span className={styles.authorAvatarFb}>{(author?.name || '?').charAt(0).toUpperCase()}</span>}
              <div>
                <div className={styles.authorName}>{author?.name || 'Unknown'}</div>
                <div className={styles.authorMeta}>Posted {formatDate(img.created_at)}</div>
              </div>
            </Link>
            {isOwner && !editing && (
              <div className={styles.ownerActions}>
                <button onClick={startEdit} className={styles.editBtn}>Edit</button>
                <button onClick={onDelete} className={styles.deleteBtn}>Delete</button>
              </div>
            )}
          </div>

          {img.boards_containing?.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>In boards</div>
              <div className={styles.boardChips}>
                {img.boards_containing.map((b) => (
                  <Link key={b.id} to={`/boards/${b.id}`} className={styles.chip}>{b.name}</Link>
                ))}
              </div>
            </div>
          )}

          <div className={styles.section}>
            <div className={styles.sectionTitle}>Comments ({commentList.length})</div>

            <form onSubmit={onComment} className={styles.commentForm}>
              <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}
                     placeholder="Add a comment..." className={styles.commentInput} maxLength={300} />
              <button type="submit" className={styles.postBtn} disabled={!comment.trim()}>Post</button>
            </form>

            {error && <div style={{ color: 'var(--danger)', fontSize: 13 }}>{error}</div>}

            <div className={styles.commentList}>
              {comments.loading && <p className={styles.emptyComments}>Loading...</p>}
              {!comments.loading && commentList.length === 0 && (
                <p className={styles.emptyComments}>No comments yet. Be the first.</p>
              )}
              {commentList.map((c) => {
                const cu = c.user;
                const canDelete = c.user_id === user.id || user.role === 'admin';
                return (
                  <div key={c.id} className={styles.comment}>
                    {cu?.avatar
                      ? <img src={cu.avatar} alt={cu.name} className={styles.commentAvatar} />
                      : <span className={styles.commentAvatarFb}>{(cu?.name || '?').charAt(0).toUpperCase()}</span>}
                    <div className={styles.commentBody}>
                      <div className={styles.commentHead}>
                        <span className={styles.commentName}>{cu?.name || 'Unknown'}</span>
                        <span className={styles.commentDate}>{formatDate(c.created_at)}</span>
                      </div>
                      <div className={styles.commentText}>{c.content}</div>
                    </div>
                    {canDelete && (
                      <button onClick={() => onDeleteComment(c.id)} className={styles.commentDelete} title="Delete">✕</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showSave && (
        <SaveToBoardModal image={img} onClose={() => setShowSave(false)} onSavedChange={() => image.refetch()} />
      )}
    </div>
  );
}
