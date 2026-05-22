import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import instagramIcon from '../assets/social/mdi_instagram.png';
import linkedinIcon from '../assets/social/mdi_linkedin.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>© {new Date().getFullYear()} Moodly</div>
      <nav className={styles.links}>
        <Link to="/explore">Explore</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy</Link>
      </nav>
      <div className={styles.social}>
        <a href="https://www.instagram.com/luciasalidoo_/" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" />
        </a>
        <a href="https://www.linkedin.com/in/luciasalido/" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" />
        </a>
      </div>
    </footer>
  );
}
