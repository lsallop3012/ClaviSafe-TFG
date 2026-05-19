import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>© {new Date().getFullYear()} Moodly</div>
      <div className={styles.right}>Made with React</div>
    </footer>
  );
}
