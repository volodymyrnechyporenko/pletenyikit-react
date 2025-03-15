import { useCallback, useRef } from 'react';

const useScrollItemsOnClick = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = useCallback((index: number) => {
    if (containerRef.current) {
      const children = containerRef.current.children;
      if (index >= 0 && index < children.length) {
        const cardElement = children[index] as HTMLElement | null;
        if (cardElement) {
          const cardWidth = cardElement.offsetWidth;
          const targetScrollLeft = index * cardWidth;

          containerRef.current.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth',
          });
        }
      }
    }
  }, []);

  return { containerRef, handleCardClick };
};

export default useScrollItemsOnClick;
