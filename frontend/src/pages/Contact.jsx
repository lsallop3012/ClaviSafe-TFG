import { useState } from 'react';
import styles from './StaticPages.module.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    // No backend yet — just simulate a sent message.
    setSent(true);
  };

  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Contact</h1>

      <section className={styles.section}>
        <p>We'd love to hear from you. Drop us a message and we'll get back as soon as we can.</p>
        <ul className={styles.contactInfo}>
          <li><strong>Email:</strong> hello@moodly.app</li>
          <li><strong>Address:</strong> Calle Inventada 123, Málaga, Spain</li>
          <li><strong>Hours:</strong> Mon–Fri, 9:00–18:00</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Send us a message</h2>
        {sent ? (
          <p className={styles.success}>✓ Thanks! Your message has been recorded.</p>
        ) : (
          <form onSubmit={onSubmit} className={styles.form}>
            <label className={styles.label}>
              Name
              <input name="name" value={form.name} onChange={onChange} className={styles.input} required />
            </label>
            <label className={styles.label}>
              Email
              <input name="email" type="email" value={form.email} onChange={onChange} className={styles.input} required />
            </label>
            <label className={styles.label}>
              Message
              <textarea
                name="message" value={form.message} onChange={onChange}
                className={styles.textarea} rows={5} required
              />
            </label>
            <button type="submit" className={styles.submit}>Send</button>
          </form>
        )}
      </section>
    </div>
  );
}
