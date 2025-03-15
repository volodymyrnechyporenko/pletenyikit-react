import { Dispatch, RefObject, SetStateAction, useEffect } from 'react';

const useDetectSliderSwipe = (
  containerRef: RefObject<HTMLDivElement | null>,
  setCurrentIndex: Dispatch<SetStateAction<number>>,
  routeChanged: boolean,
) => {
  useEffect(() => {
    const container = containerRef.current;
    if (container && !routeChanged) {
      const handleScroll = () => {
        if (!routeChanged) {
          const cardWidth =
            (container.children[0] as HTMLDivElement)?.offsetWidth || 0;
          const scrollLeft = container.scrollLeft;
          const index = Math.round(scrollLeft / cardWidth);
          setCurrentIndex(index);
        }
      };

      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [containerRef, setCurrentIndex, routeChanged]);
};

export default useDetectSliderSwipe;
