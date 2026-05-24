import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService, parseApiError } from '../../api/services/authService';
import { useAuth } from '../../context/AuthContext';
import loginImg from '../../assets/images/imagen5.avif';
import { ROUTES } from '../../routes/paths';
import './AuthSection.css';

const INITIAL_FORM = { email: '', password: '', confirmPassword: '' };

export default function AuthSection() {
  const navigate   = useNavigate();
  const location   = useLocation();
  const { login }  = useAuth();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ loading: false, error: '' });

  const isSignup = mode === 'signup';

  const switchMode = (next) => {
    setMode(next);
    setForm(INITIAL_FORM);
    setStatus({ loading: false, error: '' });
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) {
      setStatus({ loading: false, error: 'Please complete email and password.' });
      return;
    }
    if (isSignup && form.password !== form.confirmPassword) {
      setStatus({ loading: false, error: 'Passwords do not match.' });
      return;
    }
    setStatus({ loading: true, error: '' });
    try {
      let result;
      if (isSignup) {
        result = await authService.signup({
          email: form.email,
          password: form.password,
          password_confirmation: form.confirmPassword,
        });
      } else {
        result = await authService.login({ email: form.email, password: form.password });
      }
      login(result.user, result.token);
      const destination = location.state?.from ?? ROUTES.EXPLORE;
      navigate(destination, { replace: true });
    } catch (err) {
      const fallback = isSignup ? 'Your account could not be created.' : 'Incorrect credentials.';
      setStatus({ loading: false, error: parseApiError(err, fallback) });
    }
  };

  return (
    <section className="auth" id="auth">
      <div className="auth__inner">
        <img
          src={loginImg}
          alt="Login illustration"
          className="auth__media"
        />

        <form className="auth__card" onSubmit={handleSubmit} noValidate>
          <h2 className="auth__title">Welcome to Moodly</h2>

          <label className="auth__field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={updateField}
              autoComplete="email"
            />
          </label>

          <label className="auth__field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={updateField}
              autoComplete={isSignup ? 'new-password' : 'current-password'}
            />
          </label>

          {isSignup && (
            <label className="auth__field">
              <span>Confirm password</span>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={updateField}
                autoComplete="new-password"
              />
            </label>
          )}

          {status.error && <p className="auth__error">{status.error}</p>}

          <div className="auth__actions">
            <button
              type={isSignup ? 'button' : 'submit'}
              className={`auth__btn ${!isSignup ? 'auth__btn--active' : ''}`}
              onClick={isSignup ? () => switchMode('login') : undefined}
              disabled={status.loading}
            >
              {status.loading && !isSignup ? '...' : 'Log In'}
            </button>
            <button
              type={isSignup ? 'submit' : 'button'}
              className={`auth__btn ${isSignup ? 'auth__btn--active' : ''}`}
              onClick={isSignup ? undefined : () => switchMode('signup')}
              disabled={status.loading}
            >
              {status.loading && isSignup ? '...' : 'Sign Up'}
            </button>
          </div>

          <Link to={ROUTES.PASSWORD_RESET} className="auth__forgot">
            Password forgotten?
          </Link>
        </form>
      </div>
    </section>
  );
}
