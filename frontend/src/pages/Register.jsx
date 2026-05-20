import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';
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

  const applySuggestion = () => {
    if (emailCheck.suggestion) {
      setForm({ ...form, email: emailCheck.suggestion });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 6) return setError('Password must be at least 6 characters.');
    if (form.password !== form.confirm) return setError('Passwords do not match.');
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const emailHelp =
    form.email && !emailCheck.valid
      ? emailCheck.suggestion
        ? (
            <span className={styles.helpError}>
              {emailCheck.error}{' '}
              <button type="button" className={styles.suggestBtn} onClick={applySuggestion}>
                Use it
              </button>
            </span>
          )
        : <span className={styles.helpError}>{emailCheck.error}</span>
      : form.email && emailCheck.valid
        ? <span className={styles.helpOk}>✓ Looks good</span>
        : null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.dot} />
          <h1>Moodly</h1>
        </div>
        <p className={styles.subtitle}>Join the community. Start collecting inspiration.</p>

        <div className={styles.divider}><span>or</span></div>

        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.label}>
            Username
            <input name="name" value={form.name} onChange={onChange} className={styles.input} required minLength={2} />
          </label>
          <label className={styles.label}>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              className={`${styles.input} ${form.email && !emailCheck.valid ? styles.inputError : ''}`}
              required
              autoComplete="email"
            />
            {emailHelp}
          </label>
          <label className={styles.label}>
            Password
            <input name="password" type="password" value={form.password} onChange={onChange} className={styles.input} required />
          </label>
          <label className={styles.label}>
            Confirm password
            <input name="confirm" type="password" value={form.confirm} onChange={onChange} className={styles.input} required />
          </label>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" disabled={loading || !emailCheck.valid} className={styles.submit}>
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
