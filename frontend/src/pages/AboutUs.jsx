import styles from './AboutUs.module.css';

export default function AboutUs() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>About Moodly</h1>

      <section className={styles.section}>
        <p className={styles.lead}>
          Moodly is a visual discovery platform — a space to collect, organize, and share the
          images that inspire you.
        </p>
        <p>
          Save pins to your boards, follow your curiosity, and build a personal library of ideas
          you can come back to anytime.
        </p>
      </section>

      <section className={styles.section}>
        <h2>What you can do</h2>
        <ul className={styles.list}>
          <li><strong>Explore</strong> a stream of pins and search by keyword.</li>
          <li><strong>Create</strong> pins from your own images or paste any URL.</li>
          <li><strong>Boards</strong> let you group pins by mood, project, or theme.</li>
          <li><strong>Like & comment</strong> to engage with content you love.</li>
          <li><strong>Customize</strong> your profile with an avatar, name, and bio.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Built with</h2>
        <p className={styles.tech}>React 19 · React Router 7 · localStorage persistence</p>
      </section>
    </div>
  );
}
