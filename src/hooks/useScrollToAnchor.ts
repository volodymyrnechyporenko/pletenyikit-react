import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToAnchor = (headerHeight: number) => {
  const location = useLocation();
  const lastHash = useRef('');

  useEffect(() => {
    if (location.hash) {
      lastHash.current = location.hash.slice(1);
    }

    if (lastHash.current && document.getElementById(lastHash.current)) {
      setTimeout(() => {
        const element = document.getElementById(lastHash.current);
        if (element) {
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.scrollY - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
        lastHash.current = '';
      }, 100);
    }
  }, [location, headerHeight]);

  return null;
};

export default useScrollToAnchor;
