import styles from './AboutUs.module.css';

export default function AboutUs() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>About Moodly</h1>

      <section className={styles.section}>
        <p className={styles.lead}>
          Moodly is a visual discovery platform designed to inspire creativity through images. 
          We believe ideas start with what you see, so we’ve built a space where users can explore, save, and organize visual content effortlessly.
          Our mission is to transform the way people collect inspiration online, making it more intuitive, personalized, and engaging. Moodly lets users discover new ideas, curate their own visual collections, and connect with content that matches their interests and mood.
          Built with a modern full-stack architecture, Moodly focuses on speed, usability, and a clean user experience. From seamless navigation to interactive features like likes, comments, and collections, everything is designed to keep inspiration flowing.
        </p>
        <p>
          Moodly isn’t just a gallery — it’s a living space for ideas.
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
    </div>
  );
}
