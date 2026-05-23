import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';
import exploreImg from '../../assets/images/imagen2.avif';
import './ExploreSection.css';

export default function ExploreSection() {
  const navigate = useNavigate();

  return (
    <section className="explore" id="explore-cta">
      <div className="explore__inner">
        <div className="explore__text">
          <p className="explore__tagline">Explore, save, and share visual inspiration.</p>
          <button
            type="button"
            className="explore__cta"
            onClick={() => navigate(ROUTES.EXPLORE)}
          >
            Explore
          </button>
        </div>
        <img
          src={exploreImg}
          alt="Visual inspiration"
          className="explore__media"
        />
      </div>
    </section>
  );
}
