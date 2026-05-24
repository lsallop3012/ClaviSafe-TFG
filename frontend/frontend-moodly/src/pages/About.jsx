import './StaticPage.css';

export default function About() {
  return (
    <div className="static-page">
      <div className="static-page__inner">

        <div className="static-page__hero">
          <span className="static-page__tag">About Moodly</span>
          <h1 className="static-page__title">Tu espacio de inspiración visual</h1>
          <p className="static-page__lead">
            Moodly es una plataforma para descubrir, guardar y organizar imágenes que te inspiran.
            Crea tableros temáticos, colecciona lo que te mueve y comparte tu visión estética con el mundo.
          </p>
        </div>

        <div className="static-page__section">
          <h2 className="static-page__section-title">¿Qué es Moodly?</h2>
          <p className="static-page__text">
            Moodly nace de la idea de que cada persona tiene un universo visual propio. Un lugar donde
            los colores, las texturas, las formas y los momentos cuentan una historia. Nuestra misión
            es darte las herramientas para capturar esa historia y hacerla tuya.
          </p>
          <p className="static-page__text">
            Tanto si eres diseñador buscando referencias, un creativo armando un moodboard o simplemente
            alguien que colecciona imágenes bonitas, Moodly está hecho para ti.
          </p>
        </div>

        <hr className="static-page__divider" />

        <div className="static-page__section">
          <h2 className="static-page__section-title">¿Qué puedes hacer?</h2>
          <ul className="static-page__list">
            <li>Explorar miles de imágenes subidas por la comunidad</li>
            <li>Dar like a las imágenes que más te gusten</li>
            <li>Crear tableros temáticos y guardar imágenes en ellos</li>
            <li>Subir tus propias fotografías e ilustraciones</li>
            <li>Gestionar tu perfil y colecciones desde un solo lugar</li>
          </ul>
        </div>

        <hr className="static-page__divider" />

        <div className="static-page__section">
          <h2 className="static-page__section-title">Tecnología</h2>
          <p className="static-page__text">
            Moodly está construida con tecnologías modernas: un backend en <strong>Laravel</strong> con
            autenticación segura mediante tokens Sanctum, y un frontend en <strong>React + Vite</strong>
            diseñado para ofrecer una experiencia rápida y fluida. Todo desplegado en un entorno
            contenerizado con <strong>Docker</strong>.
          </p>
        </div>

        <hr className="static-page__divider" />

        <p className="static-page__note">Moodly · Proyecto Final de Grado · 2025</p>
      </div>
    </div>
  );
}
