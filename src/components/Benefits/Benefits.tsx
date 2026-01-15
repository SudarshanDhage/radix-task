'use client';

import styles from './Benefits.module.css';
import { BENEFITS } from '@/constants';
import { getClassName } from '@/utils/cssModules';
import { useOnScreen } from '@/hooks/useOnScreen';

export default function Benefits() {
  const { ref, isVisible } = useOnScreen({ threshold: 0.1, freezeOnceVisible: true });

  return (
    <section
      ref={ref}
      className={`${styles.benefits} ${isVisible ? styles.visible : ''}`}
    >
      <div className={styles.container}>
        <h2 className={styles.title}>
          Key benefits of using task management software
        </h2>

        <div className={styles.benefitsGrid}>
          {BENEFITS.map((benefit, index) => (
            <div key={benefit.id} className={styles.benefitCard}>
              <div
                className={`${getClassName(styles, benefit.icon)} ${isVisible ? styles.iconVisible : ''}`}
                aria-hidden="true"
                data-index={index}
              ></div>
              <h3 className={`${styles.benefitTitle} ${isVisible ? styles.titleVisible : ''}`} data-index={index}>
                {benefit.title}
              </h3>
              <p className={`${styles.benefitDescription} ${isVisible ? styles.descriptionVisible : ''}`} data-index={index}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

