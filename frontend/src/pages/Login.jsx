<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./styles/Login.module.css";
import { LOGIN_ENDPOINT } from '../../endpoints.js';
=======
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import styles from './AuthPages.module.css';
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c

export default function Login() {
  const { user, login} = useAuth();
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
<<<<<<< HEAD

      if (err.message === "Failed to fetch") {
        setError("Network error: connection failed. Please check your internet connection and try again.");
      } else {
        setError(err.message);
      }

>>>>>>> 346013204ac35c6a35bf1f1bb8275a080992db44
=======
      setError(err.message);
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
    <main className={styles.main}>
      <h1 className={styles.header}>Log In</h1>
=======
    <div className={styles.shell}>
      <Header />  
      <div className={styles.wrapper}>
        <div className={styles.main}>
        <div className={styles.card}>
          <div className={styles.brand}>
            <h1>Moodly</h1>
          </div>
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
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c

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
        </div>
      </div>
      </div>
      <Footer />  
    </div>
  );
}
<<<<<<< HEAD

export default Login;
>>>>>>> 346013204ac35c6a35bf1f1bb8275a080992db44
=======
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
