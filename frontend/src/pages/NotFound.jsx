import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      padding: '20px',
      background: 'var(--background-light-mode)'
    }}>
      <h1 style={{ fontSize: '72px', margin: 0, color: 'var(--accent)' }}>404</h1>
      <p style={{ color: 'var(--background-light-mode-text-muted)' }}>This page doesn't exist.</p>
      <Link
        to="/home"
        style={{
          padding: '10px 22px',
          background: 'var(--accent)',
          color: 'white',
          borderRadius: '999px',
          textDecoration: 'none',
          fontWeight: 700,
        }}
      >
        Back to home
      </Link>
    </div>
  );
}
