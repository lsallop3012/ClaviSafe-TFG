import HeroSection from '../components/home/HeroSection';
import ExploreSection from '../components/home/ExploreSection';
import AuthSection from '../components/home/AuthSection';
import './Home.css';

export default function Home() {
  return (
    <div className="home">
      <HeroSection nextSectionId="explore-cta" />
      <ExploreSection nextSectionId="auth" />
      <AuthSection />
    </div>
  );
}
