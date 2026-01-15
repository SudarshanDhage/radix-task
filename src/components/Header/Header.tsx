'use client';

import styles from './Header.module.css';
import { useScrollToSection } from '@/hooks/useScrollToSection';

export default function Header() {
  const { scrollToSection } = useScrollToSection();

  const handleTryFreeClick = (): void => {
    scrollToSection('signup-section');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>TaskMan</div>
        <button 
          className={styles.tryForFreeButton} 
          type="button"
          onClick={handleTryFreeClick}
          aria-label="Try TaskMan for free"
        >
          <span className={styles.buttonText}>Try free</span>
        </button>
      </div>
    </header>
  );
}
