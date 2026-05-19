import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  const initial = (user?.name || '?').charAt(0).toUpperCase();

  return (
    <header className={styles.header}>
      <NavLink to="/home" className={styles.brand}>
        <span className={styles.brandDot} />
        Moodly
      </NavLink>

      <nav className={styles.nav}>
        <NavLink to="/home" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Home</NavLink>
        <NavLink to="/explore" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Explore</NavLink>
        <NavLink to="/create" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Create</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>About</NavLink>
      </nav>

      <div className={styles.right}>
        <NavLink to="/profile" className={styles.avatarLink} title={user?.name}>
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
          ) : (
            <span className={styles.avatarFallback}>{initial}</span>
          )}
        </NavLink>
        <button onClick={onLogout} className={styles.logout}>Log out</button>
      </div>
    </header>
  );
}
