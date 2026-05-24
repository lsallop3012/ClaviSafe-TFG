import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/services/authService';
import { ROUTES } from '../routes/paths';
import './PasswordReset.css';

export default function PasswordReset() {
  const navigate = useNavigate();
  const [email, setEmail]   = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', error: '' });
  const sent = !!status.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus({ loading: false, message: '', error: 'Enter your email.' });
      return;
    }
    setStatus({ loading: true, message: '', error: '' });
    try {
      await authService.requestPasswordReset({ email: email.trim() });
      setStatus({ loading: false, message: 'If the email is registered, you will receive instructions to reset your password.', error: '' });
    } catch (err) {
      setStatus({
        loading: false,
        message: '',
        error: err.response?.data?.message ?? 'Failed to process the request.',
      });
    }
  };

  return (
    <div className="pr-page">
      <div className="pr-card">
        <div className="pr-card__icon">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="none"
            stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h1 className="pr-card__title">Reset Password</h1>

        {!sent ? (
          <>
            <p className="pr-card__subtitle">
              Enter your email and we will send you instructions to create a new password.
            </p>
            <form onSubmit={handleSubmit} noValidate className="pr-card__form">
              <input
                type="email"
                className="pr-card__input"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
              {status.error && <p className="pr-card__error">{status.error}</p>}
              <button type="submit" className="pr-card__btn" disabled={status.loading}>
                {status.loading ? 'Sending...' : 'Send Instructions'}
              </button>
            </form>
          </>
        ) : (
          <div className="pr-card__success">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none"
              stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <p className="pr-card__success-text">{status.message}</p>
          </div>
        )}

        <button type="button" className="pr-card__back" onClick={() => navigate(ROUTES.HOME)}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
}
