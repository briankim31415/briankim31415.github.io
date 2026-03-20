import { useEffect, useRef, useState } from 'react';
import useReducedMotion from './useReducedMotion';

function useReveal(options = {}) {
  const { threshold = 0.18, rootMargin = '0px 0px -10% 0px' } = options;
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setIsVisible(true);
      return undefined;
    }

    const node = ref.current;

    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [reducedMotion, rootMargin, threshold]);

  return { ref, isVisible, reducedMotion };
}

export default useReveal;
