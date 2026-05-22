import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
<<<<<<< HEAD
import { useAuth } from '../context/AuthContext.jsx';
import { useData } from '../context/DataContext.jsx';
import SaveToBoardModal from '../components/SaveToBoardModal.jsx';
import styles from './ImageDetail.module.css';

export default function ImageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, getAllUsers } = useAuth();
  const {
    images,
    isLiked, likeCount, toggleLike,
    isSaved,
    getImageComments, addComment, deleteComment,
    getImageBoards,
    updateImage, deleteImage,
  } = useData();

  const image = images.find((i) => i.id === Number(id));
  const [comment, setComment] = useState('');
  const [showSave, setShowSave] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(image?.name || '');
  const [desc, setDesc] = useState(image?.description || '');

  if (!image) {
=======
import { useAuth } from '../Context/AuthContext.jsx';
import * as imagesApi from '../api/imagesApi.js';
import * as commentsApi from '../api/commentsApi.js';
import useFetch from '../hooks/useFetch.js';
import SaveToBoardModal from '../components/SaveToBoardModal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';
import Spinner from '../components/Spinner.jsx';
import { useToast } from '../Context/ToastContext.jsx';
import styles from './ImageDetail.module.css';

const formatDate = (iso) => new Date(iso).toLocaleDateString(undefined, {
  year: 'numeric', month: 'short', day: 'numeric',
});

export default function ImageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const toast = useToast();

  const image = useFetch(() => imagesApi.getImage(id), [id]);
  const comments = useFetch(() => commentsApi.listComments(id), [id]);

  const [comment, setComment] = useState('');
  const [showSave, setShowSave] = useState(false);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmDeleteCommentId, setConfirmDeleteCommentId] = useState(null);

  if (image.loading) return <Spinner label="Loading pin..." fullPage />;
  if (image.error || !image.data) {
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
    return (
      <div className={styles.notfound}>
        Pin not found. <Link to="/explore">Browse pins</Link>
      </div>
    );
  }
<<<<<<< HEAD

  const users = getAllUsers();
  const userById = (uid) => users.find((u) => u.id === uid);
  const author = userById(image.user_id);
  const isOwner = user.id === image.user_id;
  const liked = isLiked(image.id);
  const count = likeCount(image.id);
  const saved = isSaved(image.id);
  const comments = getImageComments(image.id);
  const boardsContaining = getImageBoards(image.id);

  const onComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    addComment(image.id, comment);
    setComment('');
  };

  const onDelete = () => {
    if (window.confirm('Delete this pin? This cannot be undone.')) {
      deleteImage(image.id);
      navigate('/home');
    }
  };

  const onSaveEdit = (e) => {
    e.preventDefault();
    updateImage(image.id, { name: name.trim(), description: desc.trim() });
    setEditing(false);
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
=======
  const img = image.data;
  const isOwner = !!user && (user.id === img.user_id || user.role === 'admin');

  const requireAuth = () => {
    if (!user) { navigate('/login'); return false; }
    return true;
  };

  const onLike = async () => {
    if (!requireAuth()) return;
    try { await imagesApi.toggleLike(img.id); image.refetch(); } catch (e) { toast.error(e.message); }
  };

  const onSaveClick = () => {
    if (!requireAuth()) return;
    setShowSave(true);
  };

  const onComment = async (e) => {
    e.preventDefault();
    if (!requireAuth()) return;
    if (!comment.trim()) return;
    try {
      await commentsApi.createComment(img.id, comment.trim());
      setComment('');
      comments.refetch();
    } catch (err) { toast.error(err.message); }
  };

  const doDeleteComment = async () => {
    try {
      await commentsApi.deleteComment(confirmDeleteCommentId);
      toast.success('Comment deleted.');
      comments.refetch();
    } catch (e) { toast.error(e.message); }
  };

  const doDelete = async () => {
    try {
      await imagesApi.deleteImage(img.id);
      toast.success('Pin deleted.');
      navigate('/home');
    } catch (e) { toast.error(e.message); }
  };

  const startEdit = () => {
    setName(img.name); setDesc(img.description || ''); setEditing(true);
  };

  const onSaveEdit = async (e) => {
    e.preventDefault();
    try {
      await imagesApi.updateImage(img.id, { name: name.trim(), description: desc.trim() });
      toast.success('Pin updated.');
      setEditing(false);
      image.refetch();
    } catch (err) { toast.error(err.message); }
  };

  const author = img.author;
  const commentList = comments.data?.data || [];
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.imageSide}>
<<<<<<< HEAD
          <img src={image.url} alt={image.name} className={styles.image} />
=======
          <img src={img.url} alt={img.name} className={styles.image} />
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
        </div>

        <div className={styles.side}>
          <div className={styles.topBar}>
<<<<<<< HEAD
            <div className={styles.likeWrap}>
              <button
                onClick={() => toggleLike(image.id)}
                className={`${styles.likeBtn} ${liked ? styles.liked : ''}`}
              >
                {liked ? '♥' : '♡'} {count}
              </button>
            </div>
            <button onClick={() => setShowSave(true)} className={styles.saveBtn}>
              {saved ? 'Saved' : 'Save'}
=======
            <button onClick={onLike} className={`${styles.likeBtn} ${img.liked_by_me ? styles.liked : ''}`}>
              {img.liked_by_me ? '♥' : '♡'} {img.like_count}
            </button>
            <button onClick={onSaveClick} className={styles.saveBtn}>
              {img.saved_by_me ? 'Saved' : 'Save'}
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
            </button>
          </div>

          {!editing ? (
            <>
<<<<<<< HEAD
              <h1 className={styles.title}>{image.name}</h1>
              {image.description && <p className={styles.desc}>{image.description}</p>}
            </>
          ) : (
            <form onSubmit={onSaveEdit} className={styles.editForm}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                required
              />
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className={styles.textarea}
                rows={3}
              />
=======
              <h1 className={styles.title}>{img.name}</h1>
              {img.description && <p className={styles.desc}>{img.description}</p>}
            </>
          ) : (
            <form onSubmit={onSaveEdit} className={styles.editForm}>
              <input value={name} onChange={(e) => setName(e.target.value)} className={styles.input} required />
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className={styles.textarea} rows={3} />
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
              <div className={styles.editActions}>
                <button type="button" onClick={() => setEditing(false)} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.saveEditBtn}>Save</button>
              </div>
            </form>
          )}

          <div className={styles.author}>
            <Link to={`/profile/${author?.id}`} className={styles.authorLink}>
<<<<<<< HEAD
              {author?.avatar ? (
                <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
              ) : (
                <span className={styles.authorAvatarFb}>{(author?.name || '?').charAt(0).toUpperCase()}</span>
              )}
              <div>
                <div className={styles.authorName}>{author?.name || 'Unknown'}</div>
                <div className={styles.authorMeta}>Posted {formatDate(image.created_at)}</div>
=======
              {author?.avatar
                ? <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
                : <span className={styles.authorAvatarFb}>{(author?.name || '?').charAt(0).toUpperCase()}</span>}
              <div>
                <div className={styles.authorName}>{author?.name || 'Unknown'}</div>
                <div className={styles.authorMeta}>Posted {formatDate(img.created_at)}</div>
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
              </div>
            </Link>
            {isOwner && !editing && (
              <div className={styles.ownerActions}>
<<<<<<< HEAD
                <button onClick={() => setEditing(true)} className={styles.editBtn}>Edit</button>
                <button onClick={onDelete} className={styles.deleteBtn}>Delete</button>
=======
                <button onClick={startEdit} className={styles.editBtn}>Edit</button>
                <button onClick={() => setConfirmDelete(true)} className={styles.deleteBtn}>Delete</button>
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
              </div>
            )}
          </div>

<<<<<<< HEAD
          {boardsContaining.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>In boards</div>
              <div className={styles.boardChips}>
                {boardsContaining.map((b) => (
=======
          {img.boards_containing?.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>In boards</div>
              <div className={styles.boardChips}>
                {img.boards_containing.map((b) => (
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
                  <Link key={b.id} to={`/boards/${b.id}`} className={styles.chip}>{b.name}</Link>
                ))}
              </div>
            </div>
          )}

          <div className={styles.section}>
<<<<<<< HEAD
            <div className={styles.sectionTitle}>Comments ({comments.length})</div>

            <form onSubmit={onComment} className={styles.commentForm}>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className={styles.commentInput}
                maxLength={300}
              />
              <button type="submit" className={styles.postBtn} disabled={!comment.trim()}>Post</button>
            </form>

            <div className={styles.commentList}>
              {comments.length === 0 && (
                <p className={styles.emptyComments}>No comments yet. Be the first.</p>
              )}
              {comments.map((c) => {
                const cu = userById(c.user_id);
                const canDelete = c.user_id === user.id;
                return (
                  <div key={c.id} className={styles.comment}>
                    {cu?.avatar ? (
                      <img src={cu.avatar} alt={cu.name} className={styles.commentAvatar} />
                    ) : (
                      <span className={styles.commentAvatarFb}>{(cu?.name || '?').charAt(0).toUpperCase()}</span>
                    )}
=======
            <div className={styles.sectionTitle}>Comments ({commentList.length})</div>

            {user ? (
              <form onSubmit={onComment} className={styles.commentForm}>
                <input type="text" value={comment} onChange={(e) => setComment(e.target.value)}
                       placeholder="Add a comment..." className={styles.commentInput} maxLength={300} />
                <button type="submit" className={styles.postBtn} disabled={!comment.trim()}>Post</button>
              </form>
            ) : (
              <p className={styles.emptyComments}>
                <Link to="/login">Log in</Link> to leave a comment.
              </p>
            )}

            <div className={styles.commentList}>
              {comments.loading && <Spinner label="Loading comments..." />}
              {!comments.loading && commentList.length === 0 && (
                <p className={styles.emptyComments}>No comments yet. Be the first.</p>
              )}
              {commentList.map((c) => {
                const cu = c.user;
                const canDelete = !!user && (c.user_id === user.id || user.role === 'admin');
                return (
                  <div key={c.id} className={styles.comment}>
                    {cu?.avatar
                      ? <img src={cu.avatar} alt={cu.name} className={styles.commentAvatar} />
                      : <span className={styles.commentAvatarFb}>{(cu?.name || '?').charAt(0).toUpperCase()}</span>}
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
                    <div className={styles.commentBody}>
                      <div className={styles.commentHead}>
                        <span className={styles.commentName}>{cu?.name || 'Unknown'}</span>
                        <span className={styles.commentDate}>{formatDate(c.created_at)}</span>
                      </div>
                      <div className={styles.commentText}>{c.content}</div>
                    </div>
                    {canDelete && (
<<<<<<< HEAD
                      <button onClick={() => deleteComment(c.id)} className={styles.commentDelete} title="Delete">✕</button>
=======
                      <button onClick={() => setConfirmDeleteCommentId(c.id)} className={styles.commentDelete} title="Delete">✕</button>
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {showSave && <SaveToBoardModal image={image} onClose={() => setShowSave(false)} />}
=======
      {showSave && (
        <SaveToBoardModal image={img} onClose={() => setShowSave(false)} onSavedChange={() => image.refetch()} />
      )}

      <ConfirmDialog
        open={confirmDelete}
        title="Delete this pin?"
        message="This action cannot be undone."
        confirmText="Delete"
        danger
        onConfirm={async () => { await doDelete(); setConfirmDelete(false); }}
        onCancel={() => setConfirmDelete(false)}
      />

      <ConfirmDialog
        open={confirmDeleteCommentId !== null}
        title="Delete this comment?"
        confirmText="Delete"
        danger
        onConfirm={async () => { await doDeleteComment(); setConfirmDeleteCommentId(null); }}
        onCancel={() => setConfirmDeleteCommentId(null)}
      />
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
    </div>
  );
}
