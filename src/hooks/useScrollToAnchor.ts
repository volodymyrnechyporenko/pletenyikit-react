import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToAnchor = (headerHeight: number) => {
  const location = useLocation();
  const lastHash = useRef('');
  const timeoutRef = useRef<number | null>(null);

  const scrollToElement = useCallback(
    (elementId: string) => {
      const element = document.getElementById(elementId);
      if (!element) return;

      const elementPosition = element.getBoundingClientRect().top;

      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    },
    [headerHeight],
  );

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const hash = location.hash ? location.hash.slice(1) : '';

    if (hash && document.getElementById(hash)) {
      lastHash.current = hash;

      timeoutRef.current = window.setTimeout(() => {
        scrollToElement(lastHash.current);
      }, 300);
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [location, headerHeight, scrollToElement]);

  const scrollToAnchor = (anchorId: string) => {
    lastHash.current = anchorId;
    scrollToElement(anchorId);
  };

  return { scrollToAnchor };
};

export default useScrollToAnchor;
