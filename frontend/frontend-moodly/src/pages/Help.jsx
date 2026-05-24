import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/paths';
import './StaticPage.css';

const FAQS = [
  {
    q: '¿Cómo me registro en Moodly?',
    a: 'En la página de inicio encontrarás el formulario de registro. Introduce tu nombre, correo electrónico y contraseña. En menos de un minuto tendrás tu cuenta activa.',
  },
  {
    q: '¿Cómo subo una imagen?',
    a: 'Una vez logueado, ve a la sección "Create" desde el menú. Puedes arrastrar un archivo desde tu ordenador o pegar directamente una URL de imagen externa.',
  },
  {
    q: '¿Cómo creo un tablero?',
    a: 'Accede a tu perfil y pulsa "+ New board". Dale un nombre y descripción opcionales. Después podrás guardar imágenes del Explore en ese tablero.',
  },
  {
    q: '¿Cómo guardo una imagen en un tablero?',
    a: 'En el Explore, pasa el cursor sobre cualquier imagen y pulsa el icono de marcador. Se abrirá un selector con tus tableros; elige el que prefieras.',
  },
  {
    q: '¿Puedo quitar una imagen de un tablero?',
    a: 'Sí. Entra en el detalle del tablero y pasa el cursor sobre la imagen que quieras quitar. Aparecerá un botón ✕ en la esquina superior derecha.',
  },
  {
    q: '¿Cómo elimino una imagen que he subido?',
    a: 'Ve a tu perfil → pestaña "My images", pasa el cursor sobre la imagen y pulsa el icono de papelera. La imagen se eliminará permanentemente.',
  },
  {
    q: '¿Puedo cambiar mi contraseña?',
    a: 'Sí. En tu perfil, pulsa "Edit profile". Verás un campo de nueva contraseña; déjalo en blanco si no quieres cambiarla.',
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', paddingBottom: 16, marginBottom: 16 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        style={{
          background: 'none', border: 'none', width: '100%', textAlign: 'left',
          cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', gap: 12, padding: 0,
        }}
      >
        <span style={{ fontSize: '0.97rem', fontWeight: 600, color: 'var(--color-text)' }}>{q}</span>
        <span style={{ color: 'var(--color-accent)', fontSize: '1.2rem', flexShrink: 0 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p style={{ margin: '12px 0 0', fontSize: '0.93rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
          {a}
        </p>
      )}
    </div>
  );
}

export default function Help() {
  const navigate = useNavigate();

  return (
    <div className="static-page">
      <div className="static-page__inner">

        <div className="static-page__hero">
          <span className="static-page__tag">Soporte</span>
          <h1 className="static-page__title">Centro de ayuda</h1>
          <p className="static-page__lead">
            Encuentra respuestas a las preguntas más frecuentes o descubre cómo sacar el máximo
            partido a Moodly.
          </p>
        </div>

        {/* Feature cards */}
        <div className="static-page__section">
          <h2 className="static-page__section-title">¿Por dónde empezar?</h2>
          <div className="static-page__cards">
            <div className="static-page__card">
              <div className="static-page__card-icon">🔍</div>
              <p className="static-page__card-title">Explorar</p>
              <p className="static-page__card-desc">Navega por el Explore y usa el buscador para encontrar imágenes por nombre o descripción.</p>
            </div>
            <div className="static-page__card">
              <div className="static-page__card-icon">📌</div>
              <p className="static-page__card-title">Guardar</p>
              <p className="static-page__card-desc">Crea tableros temáticos y guarda en ellos las imágenes que más te inspiren.</p>
            </div>
            <div className="static-page__card">
              <div className="static-page__card-icon">📤</div>
              <p className="static-page__card-title">Publicar</p>
              <p className="static-page__card-desc">Sube tus propias imágenes desde un archivo o usando una URL externa.</p>
            </div>
            <div className="static-page__card">
              <div className="static-page__card-icon">❤️</div>
              <p className="static-page__card-title">Likes</p>
              <p className="static-page__card-desc">Da like a las imágenes que te gusten y encuéntralas todas en la pestaña Liked de tu perfil.</p>
            </div>
          </div>
        </div>

        <hr className="static-page__divider" />

        {/* FAQ */}
        <div className="static-page__section">
          <h2 className="static-page__section-title">Preguntas frecuentes</h2>
          {FAQS.map((item) => (
            <FaqItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>

        <hr className="static-page__divider" />

        <div className="static-page__section">
          <h2 className="static-page__section-title">¿Aún tienes dudas?</h2>
          <p className="static-page__text">
            Si no has encontrado lo que buscabas, puedes crear una cuenta y explorar la plataforma
            por ti mismo. Está diseñada para ser intuitiva desde el primer momento.
          </p>
          <button
            type="button"
            onClick={() => navigate(ROUTES.HOME)}
            style={{
              marginTop: 8, background: 'var(--color-accent)', color: 'var(--color-bg-dark)',
              border: 'none', borderRadius: 12, padding: '10px 24px',
              fontWeight: 700, fontSize: '0.92rem', fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            Ir al inicio
          </button>
        </div>

      </div>
    </div>
  );
}
