<<<<<<< HEAD
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
=======
import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';
import { validateEmail } from '../utils/validateEmail.js';
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
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

<<<<<<< HEAD
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

=======
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

>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
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

<<<<<<< HEAD
=======
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

>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.dot} />
          <h1>Moodly</h1>
        </div>
        <p className={styles.subtitle}>Join the community. Start collecting inspiration.</p>

<<<<<<< HEAD
=======
        <div className={styles.divider}><span>or</span></div>

>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
        <form onSubmit={onSubmit} className={styles.form}>
          <label className={styles.label}>
            Username
            <input name="name" value={form.name} onChange={onChange} className={styles.input} required minLength={2} />
          </label>
          <label className={styles.label}>
            Email
<<<<<<< HEAD
            <input name="email" type="email" value={form.email} onChange={onChange} className={styles.input} required />
=======
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
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
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

<<<<<<< HEAD
          <button type="submit" disabled={loading} className={styles.submit}>
=======
          <button type="submit" disabled={loading || !emailCheck.valid} className={styles.submit}>
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
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
