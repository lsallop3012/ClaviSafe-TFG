import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
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
    return (
      <div className={styles.notfound}>
        Pin not found. <Link to="/explore">Browse pins</Link>
      </div>
    );
  }

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

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.imageSide}>
          <img src={image.url} alt={image.name} className={styles.image} />
        </div>

        <div className={styles.side}>
          <div className={styles.topBar}>
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
            </button>
          </div>

          {!editing ? (
            <>
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
              <div className={styles.editActions}>
                <button type="button" onClick={() => setEditing(false)} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.saveEditBtn}>Save</button>
              </div>
            </form>
          )}

          <div className={styles.author}>
            <Link to={`/profile/${author?.id}`} className={styles.authorLink}>
              {author?.avatar ? (
                <img src={author.avatar} alt={author.name} className={styles.authorAvatar} />
              ) : (
                <span className={styles.authorAvatarFb}>{(author?.name || '?').charAt(0).toUpperCase()}</span>
              )}
              <div>
                <div className={styles.authorName}>{author?.name || 'Unknown'}</div>
                <div className={styles.authorMeta}>Posted {formatDate(image.created_at)}</div>
              </div>
            </Link>
            {isOwner && !editing && (
              <div className={styles.ownerActions}>
                <button onClick={() => setEditing(true)} className={styles.editBtn}>Edit</button>
                <button onClick={onDelete} className={styles.deleteBtn}>Delete</button>
              </div>
            )}
          </div>

          {boardsContaining.length > 0 && (
            <div className={styles.section}>
              <div className={styles.sectionTitle}>In boards</div>
              <div className={styles.boardChips}>
                {boardsContaining.map((b) => (
                  <Link key={b.id} to={`/boards/${b.id}`} className={styles.chip}>{b.name}</Link>
                ))}
              </div>
            </div>
          )}

          <div className={styles.section}>
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
                    <div className={styles.commentBody}>
                      <div className={styles.commentHead}>
                        <span className={styles.commentName}>{cu?.name || 'Unknown'}</span>
                        <span className={styles.commentDate}>{formatDate(c.created_at)}</span>
                      </div>
                      <div className={styles.commentText}>{c.content}</div>
                    </div>
                    {canDelete && (
                      <button onClick={() => deleteComment(c.id)} className={styles.commentDelete} title="Delete">✕</button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {showSave && <SaveToBoardModal image={image} onClose={() => setShowSave(false)} />}
    </div>
  );
}
