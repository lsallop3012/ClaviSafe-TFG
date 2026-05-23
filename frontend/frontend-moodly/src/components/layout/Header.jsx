import { useNavigate, Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ROUTES } from '../../routes/paths';
import logo from '../../assets/Logo.png';
import './Header.css';

const ADMIN_LINKS = [
  { to: ROUTES.ADMIN_USERS,  label: 'Users'  },
  { to: ROUTES.ADMIN_IMAGES, label: 'Images' },
  { to: ROUTES.ADMIN_BOARDS, label: 'Boards' },
];

function AdminDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  useEffect(() => { setOpen(false); }, [location]);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isAdminActive = location.pathname.startsWith('/admin');

  return (
    <div className="header__dropdown-wrap" ref={ref}>
      <button
        type="button"
        className={`header__link header__dropdown-trigger${isAdminActive ? ' header__link--active' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        Admin
        <svg className={`header__chevron${open ? ' header__chevron--open' : ''}`}
          viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
          <path fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul className="header__dropdown" role="menu">
          {ADMIN_LINKS.map((l) => (
            <li key={l.to} role="none">
              <NavLink
                to={l.to}
                role="menuitem"
                className={({ isActive }) => `header__dropdown-item${isActive ? ' header__dropdown-item--active' : ''}`}
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isAdmin  = user?.role === 'admin';

  const handleAvatar = () => navigate(user ? ROUTES.PROFILE : ROUTES.LOGIN);

  return (
    <header className="header">
      <div className="header__brand">
        <Link to={ROUTES.HOME} className="header__logo" aria-label="Moodly home">
          <img src={logo} alt="Moodly" className="header__logo-img" />
        </Link>
        <NavLink to={ROUTES.EXPLORE} className="header__link header__link--strong">
          Explore
        </NavLink>
      </div>

      <nav className="header__nav">
        <NavLink to={ROUTES.ABOUT} className="header__link">About Us</NavLink>
        <NavLink to={ROUTES.CREATE} className="header__link">Create</NavLink>
        {isAdmin && <AdminDropdown />}

        <button
          type="button"
          className="header__avatar"
          aria-label={user ? 'My profile' : 'Log in'}
          onClick={handleAvatar}
        >
          {user?.avatar
            ? <img src={user.avatar} alt={user.name} className="header__avatar-img" />
            : user
              ? <span className="header__avatar-initials">{user.name?.[0]?.toUpperCase() ?? '?'}</span>
              : <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <path fill="currentColor" d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-3.33 0-8 1.67-8 5v1h16v-1c0-3.33-4.67-5-8-5Z" />
                </svg>
          }
        </button>
      </nav>
    </header>
  );
}
