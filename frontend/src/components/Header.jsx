import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/login');
  };

  const initial = (user?.name || '?').charAt(0).toUpperCase();
  const isAdmin = user?.role === 'admin';

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.brand}>Moodly</NavLink>

      <nav className={styles.nav}>
        {user && (
          <NavLink to="/home" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Home</NavLink>
        )}
        <NavLink to="/explore" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Explore</NavLink>
        {user && (
          <NavLink to="/create" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Create</NavLink>
        )}
        {isAdmin && (
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Admin</NavLink>
        )}
        <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>About</NavLink>
      </nav>

      <div className={styles.right}>
        {user ? (
          <>
            <NavLink to="/profile" className={styles.avatarLink} title={user?.name}>
              {user?.avatar
                ? <img src={user.avatar} alt={user.name} className={styles.avatar} />
                : <span className={styles.avatarFallback}>{initial}</span>}
            </NavLink>
            <button onClick={onLogout} className={styles.logout}>Log out</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={styles.authLink}>Log in</NavLink>
            <NavLink to="/register" className={styles.authPrimary}>Sign up</NavLink>
          </>
        )}
      </div>
    </header>
  );
}
