'use client';

import styles from './Signup.module.css';
import EmailForm from '@/components/EmailForm/EmailForm';

interface SignupProps {
  isVisible?: boolean;
}

export default function Signup({ isVisible = false }: SignupProps) {
  return (
    <section
      className={`${styles.signup} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Get better work done</h2>
          <p className={styles.description}>
            See why millions of people across 195 countries use TaskMan.
          </p>
          <EmailForm variant="signup" className={styles.ctaGroup} />
        </div>
      </div>
    </section>
  );
}
