import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from 'react-alice-carousel';
import styles from "./carrusel.module.css";


const handleDragStart = (e) => e.preventDefault();

const items = [
  <img 
    src="/carrusel/carrusel1.avif"
    onDragStart={handleDragStart}
    role="presentation"
    alt="imagen1"
    className={styles.carouselImg}
  />,
  <img
    src="/carrusel/carrusel2.avif"
    onDragStart={handleDragStart}
    role="presentation"
    alt="imagen2"
    className={styles.carouselImg}
  />,
  <img
    src="/carrusel/carrusel3.avif"
    onDragStart={handleDragStart}
    role="presentation"
    alt="imagen3"
    className={styles.carouselImg}
  />,
  <img
    src="/carrusel/carrusel4.avif"
    onDragStart={handleDragStart}
    role="presentation"
    alt="imagen4"
    className={styles.carouselImg}
  />,
];

const Gallery = () => <AliceCarousel mouseTracking items={items} autoPlayInterval={3000} autoPlay={true} infinite={true} />;

function carousel() {
  return <Gallery />;
}

export default carousel;