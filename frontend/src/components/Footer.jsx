import styles from './Footer.module.css';
import instagramIcon from '../assets/mdi_instagram.png';
import linkedinIcon from '../assets/mdi_linkedin.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>© {new Date().getFullYear()} Moodly</div>
      <div className={styles.divs}>by Lucía Salido</div>
      <div className={styles.divs}>
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
