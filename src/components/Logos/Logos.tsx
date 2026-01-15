import styles from './Logos.module.css';
import { LOGO_ROWS } from '@/constants';
import { getClassName } from '@/utils/cssModules';

export default function Logos() {
  return (
    <section className={styles.logos}>
      <div className={styles.container}>
        {LOGO_ROWS.map((row) => (
          <div key={`row-${row[0]?.name}-${row[1]?.name}-${row[2]?.name}`} className={styles.row}>
            {row.map((logo) => (
              <div key={logo.name} className={styles.logoItem}>
                <div
                  className={getClassName(styles, logo.className)}
                  aria-label={logo.alt}
                  role="img"
                ></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
