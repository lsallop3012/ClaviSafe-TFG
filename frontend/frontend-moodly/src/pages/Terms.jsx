import './StaticPage.css';

export default function Terms() {
  return (
    <div className="static-page">
      <div className="static-page__inner">

        <div className="static-page__hero">
          <span className="static-page__tag">Legal</span>
          <h1 className="static-page__title">Términos y condiciones</h1>
          <p className="static-page__lead">
            Al usar Moodly aceptas los presentes términos. Léelos con atención antes de registrarte
            o publicar contenido en la plataforma.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">1. Aceptación de los términos</h2>
          <p className="static-page__text">
            El acceso y uso de Moodly implica la aceptación plena de estos Términos y Condiciones.
            Si no estás de acuerdo con alguno de ellos, debes abstenerte de usar la plataforma.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">2. Registro y cuenta</h2>
          <p className="static-page__text">
            Para acceder a las funciones principales de Moodly es necesario crear una cuenta. Eres
            responsable de mantener la confidencialidad de tus credenciales y de todas las actividades
            realizadas bajo tu cuenta.
          </p>
          <p className="static-page__text">
            Moodly se reserva el derecho de suspender o eliminar cuentas que incumplan estos términos.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">3. Contenido publicado</h2>
          <p className="static-page__text">
            Al subir imágenes a Moodly declaras que tienes los derechos necesarios para hacerlo y
            que el contenido no infringe derechos de terceros ni contiene material ilegal, ofensivo
            o inapropiado.
          </p>
          <p className="static-page__text">
            Moodly puede eliminar cualquier contenido que considere que viola estos términos sin
            previo aviso.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">4. Propiedad intelectual</h2>
          <p className="static-page__text">
            El diseño, código y marca de Moodly son propiedad de sus creadores. Las imágenes
            publicadas por los usuarios conservan los derechos de sus respectivos autores.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">5. Limitación de responsabilidad</h2>
          <p className="static-page__text">
            Moodly se ofrece "tal cual" y no garantiza la disponibilidad continua del servicio.
            No seremos responsables de pérdidas de datos o perjuicios derivados del uso de la
            plataforma.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">6. Modificaciones</h2>
          <p className="static-page__text">
            Nos reservamos el derecho de actualizar estos términos en cualquier momento. Los cambios
            serán notificados en la plataforma y entrarán en vigor desde su publicación.
          </p>
        </div>

        <hr className="static-page__divider" />
        <p className="static-page__note">Última actualización: mayo 2025 · Moodly</p>
      </div>
    </div>
  );
}
