import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as usersApi from '../../api/usersApi.js';
import useFetch from '../../hooks/useFetch.js';
import useIsMobile from '../../hooks/useIsMobile.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import CreateUserModal from '../../components/CreateUserModal.jsx';
import ConfirmDialog from '../../components/ConfirmDialog.jsx';
import Spinner from '../../components/Spinner.jsx';
import styles from './Admin.module.css';

const PER_PAGE = 10;

export default function AdminUsers() {
  const { user: me } = useAuth();
  const isMobile = useIsMobile();
  const toast = useToast();

  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const { data, loading, error: fetchError, refetch } = useFetch(
    () => usersApi.listUsers({ q, page, perPage: PER_PAGE }),
    [q, page]
  );

  const users = data?.data || [];
  const meta = data?.meta;
  const totalPages = meta?.totalPages || 1;

  const onDelete = (u) => {
    setConfirm({
      title: `Delete user "${u.name}"?`,
      message: 'This deletes their pins and boards too. This action cannot be undone.',
      confirmText: 'Delete',
      danger: true,
      action: async () => {
        try {
          await usersApi.deleteUser(u.id);
          toast.success(`User "${u.name}" deleted.`);
          refetch();
        } catch (e) { toast.error(e.message); }
      },
    });
  };

  const onToggleRole = (u) => {
    const newRole = u.role === 'admin' ? 'user' : 'admin';
    setConfirm({
      title: `Change role for ${u.name}?`,
      message: `Set role to "${newRole}".`,
      confirmText: 'Change role',
      action: async () => {
        try {
          await usersApi.updateUser(u.id, { role: newRole });
          toast.success(`${u.name} is now ${newRole}.`);
          refetch();
        } catch (e) { toast.error(e.message); }
      },
    });
  };
 
  const RoleTag = ({ role }) => (
    <span className={`${styles.tag} ${role === 'admin' ? styles.tagAdmin : styles.tagUser}`}>
      {role}
    </span>
  );
 
  return (
    <div>
      <div className={styles.pageHead}>
        <h1 className={styles.pageTitle}>Users</h1>
        <button onClick={() => setShowCreate(true)} className={styles.btnPrimary}>
          + Create user
        </button>
      </div>
 
      <div className={styles.filters}>
        <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }}
               placeholder="Search by name or email..." className={styles.search} />
      </div>
 
      {fetchError && <div className={styles.error}>{fetchError}</div>}
 
      {loading ? <Spinner label="Loading users..." />
       : users.length === 0 ? <div className={styles.empty}>No users found.</div>
       : isMobile ? (
        <div className={styles.cardList}>
          {users.map((u) => (
            <div key={u.id} className={styles.cardRow}>
              <div className={styles.thumbCell}>
                {u.avatar ? <img src={u.avatar} alt={u.name} className={styles.thumb} />
                          : <div className={styles.thumbFb}>{u.name.charAt(0).toUpperCase()}</div>}
                <div>
                  <strong><Link to={`/profile/${u.id}`}>{u.name}</Link></strong>
                  <div className={styles.cardField}>{u.email}</div>
                </div>
              </div>
              <div className={styles.cardField}>
                <RoleTag role={u.role} />{' '}
                {u.provider === 'google' && <span className={`${styles.tag} ${styles.tagGoogle}`}>Google</span>}
              </div>
              <div className={styles.actions}>
                <Link to={`/profile/edit/${u.id}`} className={styles.btn}>Edit</Link>
                <button onClick={() => onToggleRole(u)} className={styles.btn} disabled={u.id === me.id}>
                  Make {u.role === 'admin' ? 'user' : 'admin'}
                </button>
                <button onClick={() => onDelete(u)} className={styles.btnDanger} disabled={u.id === me.id}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Provider</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className={styles.thumbCell}>
                    {u.avatar ? <img src={u.avatar} alt={u.name} className={styles.thumb} />
                              : <div className={styles.thumbFb}>{u.name.charAt(0).toUpperCase()}</div>}
                    <Link to={`/profile/${u.id}`}>{u.name}</Link>
                  </div>
                </td>
                <td>{u.email}</td>
                <td><RoleTag role={u.role} /></td>
                <td>
                  {u.provider === 'google'
                    ? <span className={`${styles.tag} ${styles.tagGoogle}`}>Google</span>
                    : 'local'}
                </td>
                <td style={{ textAlign: 'right' }}>
                  <div className={styles.actions} style={{ justifyContent: 'flex-end' }}>
                    <Link to={`/profile/edit/${u.id}`} className={styles.btn}>Edit</Link>
                    <button onClick={() => onToggleRole(u)} className={styles.btn} disabled={u.id === me.id}>
                      Make {u.role === 'admin' ? 'user' : 'admin'}
                    </button>
                    <button onClick={() => onDelete(u)} className={styles.btnDanger} disabled={u.id === me.id}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
 
      {totalPages > 1 && (
        <div className={styles.pager}>
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)} className={styles.btn}>← Prev</button>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Page {meta.page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)} className={styles.btn}>Next →</button>
        </div>
      )}
 
      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreated={() => refetch()}
        />
      )}

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.title}
        message={confirm?.message}
        confirmText={confirm?.confirmText}
        danger={confirm?.danger}
        onConfirm={async () => {
          await confirm.action();
          setConfirm(null);
        }}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}