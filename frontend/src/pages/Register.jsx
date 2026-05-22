import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { validateEmail } from '../utils/validateEmail.js';
import styles from './AuthPages.module.css';

export default function Register() {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate('/home');
  }, [user, navigate]);

  const emailCheck = useMemo(
    () => (form.email ? validateEmail(form.email) : { valid: false }),
    [form.email]
  );

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.name.trim().length < 2) return setError('Username must be at least 2 characters.');
    if (!emailCheck.valid) return setError(emailCheck.error || 'Invalid email.');
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    setLoading(true);
    try {
      await register({
        name: form.name.trim(),
        email: emailCheck.normalized,
        password: form.password,
      });
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
        <p className={styles.subtitle}>Join the community. Start collecting inspiration.</p>

        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.label}>
            Username
            <input name="name" value={form.name} onChange={onChange}
                   className={styles.input} required minLength={2} />
          </label>
          <label className={styles.label}>
            Email
            <input name="email" type="email" value={form.email} onChange={onChange}
                   className={styles.input} required autoComplete="email" />
          </label>
          <label className={styles.label}>
            Password
            <input name="password" type="password" value={form.password} onChange={onChange}
                   className={styles.input} required />
          </label>
          <label className={styles.label}>
            Confirm password
            <input name="confirm" type="password" value={form.confirm} onChange={onChange}
                   className={styles.input} required />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} className={styles.submit}>
            {loading ? 'Creating...' : 'Create account'}
          </button>
        </form>

        <p className={styles.bottom}>
          Already have an account? <Link to="/login" className={styles.link}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
