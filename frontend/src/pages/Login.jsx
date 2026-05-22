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

function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/contactos");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    setError(null);


    const { name, password } = data;

    try {
      const loginResult = await fetch(`${LOGIN_ENDPOINT}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      if (!loginResult.ok) throw new Error("Username or password incorrect");

      const responseData = await loginResult.json();
      console.log("Login success:", responseData);

      localStorage.setItem("token", responseData.token);
      navigate("/home");

      window.location.reload();
    } catch (err) {

      if (err.message === "Failed to fetch") {
        setError("Network error: connection failed. Please check your internet connection and try again.");
      } else {
        setError(err.message);
      }

>>>>>>> 346013204ac35c6a35bf1f1bb8275a080992db44
    } finally {
      setLoading(false);
    }
  };

  return (
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

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.input}
          type="text"
          placeholder="Username"

          {...register("name", { required: true })}
        />
        {errors.name && <p className={styles.error}>Username is required</p>}
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}

        />
        {errors.password && <p className={styles.error}>Password is required</p>}
        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.boton} type="submit" disabled={loading}>
          {loading ? "Loading..." : "Log In"}
        </button>
      </form>

      <form>
        <button
          type="button"
          className={styles.boton}
          disabled={loading}
          onClick={() => navigate("/forgot-password")}
        >
          ¿Forgot your password?
        </button>
      </form>
    </main>
  );
}

export default Login;
>>>>>>> 346013204ac35c6a35bf1f1bb8275a080992db44
