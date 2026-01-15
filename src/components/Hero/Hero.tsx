'use client';

import styles from './Hero.module.css';
import EmailForm from '@/components/EmailForm/EmailForm';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Task Management And Lists Tool</h1>
          <p className={styles.description}>
            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour.
          </p>
          <EmailForm variant="hero" className={styles.ctaGroup} />
        </div>
      </div>
    </section>
  );
}
