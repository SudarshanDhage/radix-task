'use client';

import { useCallback } from 'react';

/**
 * Custom hook for scrolling to a section by ID
 * @returns Function to scroll to a section
 */
export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: string): void => {
    try {
      const section = document.getElementById(sectionId);
      if (!section) {
        // Silently fail - section might not exist yet or might be removed
        return;
      }
      section.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      // Silently handle errors - prevent breaking the app if scroll fails
      if (process.env.NODE_ENV === 'development') {
        console.error('Error scrolling to section:', error);
      }
    }
  }, []);

  return { scrollToSection };
}
