import styles from './Spinner.module.css';

export default function Spinner({ label = 'Loading...', fullPage = false }) {
  return (
    <div className={`${styles.wrap} ${fullPage ? styles.fullPage : ''}`}>
      <span className={styles.spinner} aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
