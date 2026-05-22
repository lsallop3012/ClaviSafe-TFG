import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from './AuthPages.module.css';

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/home');
  }, [user, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login({ name, password });
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.dot} />
          <h1>Moodly</h1>
        </div>
        <p className={styles.subtitle}>Welcome back. Log in to continue.</p>

        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.label}>
            Username or email
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
              required
              autoFocus
            />
          </label>

          <label className={styles.label}>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} className={styles.submit}>
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className={styles.bottom}>
          New here? <Link to="/register" className={styles.link}>Create an account</Link>
        </p>

        <div className={styles.hint}>
          <strong>Demo:</strong> user <code>demo</code> / pass <code>demo1234</code>
        </div>
      </div>
    </div>
  );
}
