<<<<<<< HEAD
import styles from './Footer.module.css';
=======
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import instagramIcon from '../assets/social/mdi_instagram.png';
import linkedinIcon from '../assets/social/mdi_linkedin.png';
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>© {new Date().getFullYear()} Moodly</div>
<<<<<<< HEAD
      <div className={styles.right}>Made with React</div>
=======
      <nav className={styles.links}>
        <Link to="/explore">Explore</Link>
        <Link to="/about">About</Link>
      </nav>
       <div className={styles.divs}>
        <a href="https://www.instagram.com/luciasalidoo_/" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" />
        </a>
        <a href="https://www.linkedin.com/in/luciasalido/" target="_blank" rel="noopener noreferrer">
          <img src={linkedinIcon} alt="LinkedIn" />
        </a>
      </div>
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
    </footer>
  );
}
