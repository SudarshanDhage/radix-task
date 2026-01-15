'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Logos from "@/components/Logos/Logos";
import Benefits from "@/components/Benefits/Benefits";
import Why from "@/components/Why/Why";
import { useOnScreen } from "@/hooks/useOnScreen";

export default function Home() {
  // Ensure page starts at top on refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    // Disable browser scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);
  const { ref: heroSectionRef, isVisible: isHeroSectionVisible } = useOnScreen<HTMLDivElement>({ 
    threshold: 0.1, 
    freezeOnceVisible: true 
  });

  return (
    <div className={styles.page}>
      <div 
        ref={heroSectionRef}
        className={`${styles.heroSection} ${isHeroSectionVisible ? styles.visible : ''}`}
      >
        <div className={styles.heroShape1}></div>
        <div className={styles.heroShape2}></div>
        <div className={styles.heroShape3}></div>
        <div className={styles.heroCardsContainer}>
          <div className={`${styles.heroCard} ${styles.card1} ${isHeroSectionVisible ? styles.cardVisible : ''}`}>
            <Image 
              src="/assets/hero/Hero_Illustration_Card-1.svg" 
              alt="Hero Card 1" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className={`${styles.heroCard} ${styles.card2} ${isHeroSectionVisible ? styles.cardVisible : ''}`}>
            <Image 
              src="/assets/hero/Hero_Illustration_Card-2.svg" 
              alt="Hero Card 2" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className={`${styles.heroCard} ${styles.card3} ${isHeroSectionVisible ? styles.cardVisible : ''}`}>
            <Image 
              src="/assets/hero/Hero_Illustration_Card-3.svg" 
              alt="Hero Card 3" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className={`${styles.heroCard} ${styles.card4} ${isHeroSectionVisible ? styles.cardVisible : ''}`}>
            <Image 
              src="/assets/hero/Hero_Illustration_Card-4.svg" 
              alt="Hero Card 4" 
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
        </div>
        <Header />
        <Hero />
        <Logos />
      </div>
      <main>
        <Benefits />
        <Why />
      </main>
    </div>
  );
}
