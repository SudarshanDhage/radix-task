'use client';

import styles from './Why.module.css';
import pageStyles from '@/app/page.module.css';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import { useOnScreen } from '@/hooks/useOnScreen';
import Signup from '@/components/Signup/Signup';

export default function Why() {
  const { scrollToSection } = useScrollToSection();
  const { ref, isVisible } = useOnScreen({ threshold: 0.2, freezeOnceVisible: true });
  const { ref: signupRef, isVisible: isSignupVisible } = useOnScreen<HTMLDivElement>({ 
    threshold: 0.2, 
    freezeOnceVisible: true 
  });

  const handleLearnMoreClick = (): void => {
    scrollToSection('signup-section');
  };

  return (
    <div className={`${pageStyles.whySection} ${isVisible ? pageStyles.visible : ''}`}>
      <section
        ref={ref}
        className={`${styles.why} ${isVisible ? styles.visible : ''}`}
      >
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.illustrationWrapper}>
              <div className={`${styles.illustration} ${styles.illustration1} ${isVisible ? styles.illustrationVisible : ''}`}></div>
              <div className={`${styles.illustration} ${styles.illustration2} ${isVisible ? styles.illustrationVisible : ''}`}></div>
            </div>

            <div className={styles.textContent}>
              <h2 className={styles.title}>Why do you need task management software?</h2>
              <p className={styles.description}>
                Do you waste time organizing sticky notes, searching your email and apps for to-dos, and figuring out what to work on first? Then you need one solution to prioritize your tasks, manage your time, and meet your deadlines.
              </p>
              <div className={styles.learnMoreWrapper}>
                <button
                  type="button"
                  className={styles.learnMoreLink}
                  onClick={handleLearnMoreClick}
                  aria-label="Learn more about task management software"
                >
                  LEARN MORE
                </button>
                <div className={styles.learnMoreArrow} aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div 
        id="signup-section" 
        ref={signupRef}
        className={`${pageStyles.signupSection} ${isSignupVisible ? pageStyles.visible : ''}`}
      >
        <Signup isVisible={isSignupVisible} />
      </div>
    </div>
  );
}

