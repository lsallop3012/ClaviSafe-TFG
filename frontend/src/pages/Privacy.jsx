import styles from './StaticPages.module.css';

export default function Privacy() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Privacy Policy</h1>

      <section className={styles.section}>
        <p className={styles.updated}>Last updated: January 2026</p>
        <p>
          This Privacy Policy describes how Moodly ("we", "us") collects, uses, and shares
          information about you when you use our service. This is a student project; the
          policy is illustrative.
        </p>
      </section>

      <section className={styles.section}>
        <h2>What we collect</h2>
        <ul>
          <li>Account information you provide: username, email, password (hashed), avatar, bio.</li>
          <li>Pins you create and boards you organize.</li>
          <li>Likes, saves, and comments you post.</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>How we use it</h2>
        <ul>
          <li>To authenticate you and keep you signed in across sessions.</li>
          <li>To display your content and interactions to other users.</li>
          <li>To personalize your experience (your saved pins, your boards).</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Where it lives</h2>
        <p>
          In this version of Moodly, all data is stored in your browser's <code>localStorage</code>.
          No data is sent to a remote server. Clearing your browser data clears your account.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Your rights</h2>
        <p>
          You can edit or delete your profile, your pins, your boards, and your comments at any
          time from inside the app.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Contact</h2>
        <p>Questions? Reach us at <strong>hello@moodly.app</strong>.</p>
      </section>
    </div>
  );
}
