import { useState, useEffect, useCallback } from 'react';
import ScrollDownButton from './ScrollDownButton';
import img1 from '../../assets/carrousel/carrusel1.avif';
import img2 from '../../assets/carrousel/carrusel2.avif';
import img3 from '../../assets/carrousel/carrusel3.avif';
import img4 from '../../assets/carrousel/carrusel4.avif';
import './HeroSection.css';

const SLIDES = [img1, img2, img3, img4];
const INTERVAL_MS = 4000;

export default function HeroSection({ nextSectionId }) {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="hero" id="hero">
      <div className="hero__carousel" aria-hidden="true">
        {SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            className={`hero__slide ${i === current ? 'hero__slide--active' : ''}`}
          />
        ))}
      </div>

      <div className="hero__overlay" />

      <div className="hero__content">
        <h1 className="hero__title">Find images that match your mood</h1>
        <p className="hero__subtitle">Explore, save, and share visual inspiration.</p>

        <div className="hero__dots" role="tablist" aria-label="Carousel navigation">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === current}
              aria-label={`Slide ${i + 1}`}
              className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      <ScrollDownButton targetId={nextSectionId} />
    </section>
  );
}
