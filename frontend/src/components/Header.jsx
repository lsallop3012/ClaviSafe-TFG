import { NavLink, useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { useAuth } from '../context/AuthContext.jsx';
=======
import { useAuth } from '../Context/AuthContext.jsx';
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
import styles from './Header.module.css';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

<<<<<<< HEAD
  const onLogout = () => {
    logout();
=======
  const onLogout = async () => {
    await logout();
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
    navigate('/login');
  };

  const initial = (user?.name || '?').charAt(0).toUpperCase();
<<<<<<< HEAD

  return (
    <header className={styles.header}>
      <NavLink to="/home" className={styles.brand}>
        <span className={styles.brandDot} />
=======
  const isAdmin = user?.role === 'admin';

  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.brand}>
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
        Moodly
      </NavLink>

      <nav className={styles.nav}>
<<<<<<< HEAD
        <NavLink to="/home" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Home</NavLink>
        <NavLink to="/explore" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Explore</NavLink>
        <NavLink to="/create" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Create</NavLink>
=======
        {user && (
          <NavLink to="/home" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Home</NavLink>
        )}
        <NavLink to="/explore" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Explore</NavLink>
        {user && (
          <NavLink to="/create" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>Create</NavLink>
        )}
        {isAdmin && (
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>
            Admin
          </NavLink>
        )}
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
        <NavLink to="/about" className={({ isActive }) => isActive ? styles.activeLink : styles.link}>About</NavLink>
      </nav>

      <div className={styles.right}>
<<<<<<< HEAD
        <NavLink to="/profile" className={styles.avatarLink} title={user?.name}>
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
          ) : (
            <span className={styles.avatarFallback}>{initial}</span>
          )}
        </NavLink>
        <button onClick={onLogout} className={styles.logout}>Log out</button>
=======
        {user ? (
          <>
            <NavLink to="/profile" className={styles.avatarLink} title={user?.name}>
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className={styles.avatar} />
              ) : (
                <span className={styles.avatarFallback}>{initial}</span>
              )}
            </NavLink>
            <button onClick={onLogout} className={styles.logout}>Log out</button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={styles.authLink}>Log in</NavLink>
            <NavLink to="/register" className={styles.authPrimary}>Sign up</NavLink>
          </>
        )}
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
      </div>
    </header>
  );
}
