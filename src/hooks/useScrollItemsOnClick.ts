import { useRef } from 'react';

const useScrollItemsOnClick = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleCardClick = (index: number) => {
    if (containerRef.current) {
      const cardElement = containerRef.current.querySelector(
        `.image-scrollable > div:nth-child(${index + 1})`,
      ) as HTMLElement | null;
      if (cardElement) {
        const cardWidth = cardElement.offsetWidth;
        const currentScrollLeft = containerRef.current.scrollLeft;
        const targetScrollLeft = currentScrollLeft + cardWidth;

        containerRef.current.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth',
        });
      }
    }
  };

  return { containerRef, handleCardClick };
};

export default useScrollItemsOnClick;
