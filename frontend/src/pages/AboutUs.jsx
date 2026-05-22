<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import React from 'react'
import styles from './styles/AboutUs.module.css'

export default function AboutUs() {
  return (
    <div>AboutUs</div>
  )
>>>>>>> 346013204ac35c6a35bf1f1bb8275a080992db44
=======
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
>>>>>>> ed91d6fb4c4c8f0d8dd0c47f93450acd7c7d014c
}
