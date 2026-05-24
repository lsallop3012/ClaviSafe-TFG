import './StaticPage.css';

export default function Policies() {
  return (
    <div className="static-page">
      <div className="static-page__inner">

        <div className="static-page__hero">
          <span className="static-page__tag">Privacidad</span>
          <h1 className="static-page__title">Política de privacidad</h1>
          <p className="static-page__lead">
            En Moodly nos tomamos en serio la protección de tus datos. Esta política explica qué
            información recopilamos, cómo la usamos y qué derechos tienes sobre ella.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">1. Datos que recopilamos</h2>
          <p className="static-page__text">Al registrarte y usar Moodly podemos recopilar:</p>
          <ul className="static-page__list">
            <li>Nombre de usuario y dirección de correo electrónico</li>
            <li>Contraseña (almacenada de forma cifrada, nunca en texto plano)</li>
            <li>Imágenes que subas a la plataforma</li>
            <li>Interacciones: likes, tableros creados e imágenes guardadas</li>
            <li>Datos de sesión y tokens de autenticación</li>
          </ul>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">2. Cómo usamos tus datos</h2>
          <p className="static-page__text">Los datos recogidos se utilizan exclusivamente para:</p>
          <ul className="static-page__list">
            <li>Gestionar tu cuenta y autenticación</li>
            <li>Mostrarte contenido personalizado basado en tus interacciones</li>
            <li>Mejorar el funcionamiento y la seguridad de la plataforma</li>
          </ul>
          <p className="static-page__text">
            No vendemos ni cedemos tus datos personales a terceros bajo ninguna circunstancia.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">3. Cookies</h2>
          <p className="static-page__text">
            Moodly utiliza el almacenamiento local del navegador (localStorage) para mantener tu
            sesión activa mediante un token de autenticación seguro. No utilizamos cookies de
            seguimiento ni publicidad.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">4. Tus derechos</h2>
          <p className="static-page__text">Tienes derecho a:</p>
          <ul className="static-page__list">
            <li>Acceder a los datos que tenemos sobre ti</li>
            <li>Modificar tu información de perfil en cualquier momento</li>
            <li>Solicitar la eliminación de tu cuenta y datos asociados</li>
          </ul>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">5. Seguridad</h2>
          <p className="static-page__text">
            Implementamos medidas técnicas para proteger tus datos: contraseñas cifradas con bcrypt,
            autenticación mediante tokens Bearer (Laravel Sanctum) y comunicaciones sobre HTTPS
            en entornos de producción.
          </p>
        </div>

        <hr className="static-page__divider" />
        <p className="static-page__note">Última actualización: mayo 2025 · Moodly</p>
      </div>
    </div>
  );
}
