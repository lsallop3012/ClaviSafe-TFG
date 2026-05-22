import { NavLink, Outlet } from 'react-router-dom';
import styles from './Admin.module.css';

export default function AdminLayout() {
  return (
    <div className={styles.wrap}>
      <aside className={styles.sidebar}>
        <h2 className={styles.heading}>Admin</h2>
        <nav className={styles.nav}>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
            Users
          </NavLink>
          <NavLink to="/admin/images" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
            Images
          </NavLink>
          <NavLink to="/admin/boards" className={({ isActive }) => isActive ? styles.linkActive : styles.link}>
            Boards
          </NavLink>
        </nav>
      </aside>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
