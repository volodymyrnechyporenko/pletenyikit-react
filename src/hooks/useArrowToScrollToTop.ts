import { useEffect, useState } from 'react';

const THROTTLE_MS = 100;

const useArrowToScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    let lastCall = 0;

    const scrollListener = () => {
      const now = Date.now();
      if (lastCall === 0 || now - lastCall >= THROTTLE_MS) {
        lastCall = now;
        setIsVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return {scrollTop, isVisible}
}

export default useArrowToScrollToTop;
