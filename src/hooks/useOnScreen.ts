'use client';
import { useEffect, useRef, useState, useMemo, RefObject } from 'react';

interface UseOnScreenOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useOnScreen<T extends HTMLElement = HTMLElement>(
  options: UseOnScreenOptions = { threshold: 0.1, rootMargin: '0px' }
) {
  const ref = useRef<T>(null) as RefObject<T>;
  const [isVisible, setIsVisible] = useState(false);

  // Memoize options to prevent unnecessary re-renders
  const observerOptions = useMemo(
    () => ({
      threshold: options.threshold,
      rootMargin: options.rootMargin,
      root: options.root,
    }),
    [options.threshold, options.rootMargin, options.root]
  );

  const freezeOnceVisible = options.freezeOnceVisible ?? false;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (freezeOnceVisible) {
          observer.unobserve(element);
        }
      } else if (!freezeOnceVisible) {
        setIsVisible(false);
      }
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [observerOptions, freezeOnceVisible]);

  return { ref, isVisible };
}
