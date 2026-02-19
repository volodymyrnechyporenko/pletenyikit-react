import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

const useDetectSliderSwipe = (
  containerRef: RefObject<HTMLDivElement | null>,
  setCurrentIndex: Dispatch<SetStateAction<number>>,
  routeChanged: boolean,
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (container && !routeChanged) {
      let rafId: number | null = null;

      const handleScroll = () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          rafId = null;
          const cardWidth =
            (container.children[0] as HTMLDivElement)?.offsetWidth || 0;
          const scrollLeft = container.scrollLeft;
          const index = Math.round(scrollLeft / cardWidth);
          setCurrentIndex(index);
        });
      };

      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
        if (rafId !== null) cancelAnimationFrame(rafId);
      };
    }
  }, [containerRef, setCurrentIndex, routeChanged]);
};

export default useDetectSliderSwipe;
