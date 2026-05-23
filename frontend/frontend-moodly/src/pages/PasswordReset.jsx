import { useState } from 'react';
import { authService } from '../api/services/authService';
import './PagePlaceholder.css';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', error: '' });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) {
      setStatus({ loading: false, message: '', error: 'Introduce un email.' });
      return;
    }
    setStatus({ loading: true, message: '', error: '' });
    try {
      await authService.requestPasswordReset({ email });
      setStatus({ loading: false, message: 'Si el email existe, recibirás instrucciones.', error: '' });
    } catch (err) {
      setStatus({
        loading: false,
        message: '',
        error: err.response?.data?.message ?? 'No se pudo procesar la solicitud.'
      });
    }
  };

  return (
    <section className="page">
      <form className="page__card" onSubmit={handleSubmit} noValidate>
        <h1 className="page__title">Password reset</h1>
        <p className="page__subtitle">Te enviaremos un enlace para restablecerla.</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          style={{
            marginTop: 24,
            width: '100%',
            padding: '10px 16px',
            borderRadius: 999,
            border: '1px solid var(--color-input-border)',
            background: 'transparent',
            color: 'var(--color-text)'
          }}
        />
        {status.error && <p className="page__subtitle" style={{ color: '#ffb4b4', marginTop: 12 }}>{status.error}</p>}
        {status.message && <p className="page__subtitle" style={{ marginTop: 12 }}>{status.message}</p>}
        <button
          type="submit"
          disabled={status.loading}
          style={{
            marginTop: 20,
            padding: '10px 28px',
            borderRadius: 12,
            border: '1px solid var(--color-input-border)',
            background: 'transparent',
            color: 'var(--color-text)'
          }}
        >
          {status.loading ? '...' : 'Enviar'}
        </button>
      </form>
    </section>
  );
}
