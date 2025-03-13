import { useCallback, useRef } from 'react';

const useScrollItemsOnClick = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = useCallback(
    (index: number, direction: 'left' | 'right' = 'right') => {
      if (containerRef.current) {
        const children = containerRef.current.children;
        if (index >= 0 && index < children.length) {
          const cardElement = containerRef.current.querySelector(
            `:scope > div:nth-child(${index + 1})`,
          ) as HTMLElement | null;
          if (cardElement) {
            const cardWidth = cardElement.offsetWidth;
            const currentScrollLeft = containerRef.current.scrollLeft;
            let targetScrollLeft;

            if (direction === 'left') {
              targetScrollLeft = currentScrollLeft - cardWidth;
            } else {
              targetScrollLeft = currentScrollLeft + cardWidth;
            }

            containerRef.current.scrollTo({
              left: targetScrollLeft,
              behavior: 'smooth',
            });
          }
        }
      }
    },
    [],
  );

  return { containerRef, handleCardClick };
};

export default useScrollItemsOnClick;
