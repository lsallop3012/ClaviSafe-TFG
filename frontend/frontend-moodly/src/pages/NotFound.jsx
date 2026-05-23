import { Link } from 'react-router-dom';
import { ROUTES } from '../routes/paths';
import './PagePlaceholder.css';

export default function NotFound() {
  return (
    <section className="page">
      <div className="page__card">
        <h1 className="page__title">404</h1>
        <p className="page__subtitle">La página que buscas no existe.</p>
        <Link
          to={ROUTES.HOME}
          style={{
            display: 'inline-block',
            marginTop: 20,
            color: 'var(--color-accent)',
            fontWeight: 600
          }}
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
