import styles from './Slider.module.scss';
import SliderCard from './SliderCard';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import useDetectSliderSwipe from '../../hooks/useDetectSliderSwipe';
import { useParams } from 'react-router-dom';
import useScrollItemsOnClick from '../../hooks/useScrollItemsOnClick';

interface SliderProps {
  images: string[];
}

const Slider = ({ images }: SliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [routeChanged, setRouteChanged] = useState(false);

  const { link } = useParams();

  const { containerRef, handleCardClick } = useScrollItemsOnClick();

  const validImages = images && Array.isArray(images) ? images : [];

  useDetectSliderSwipe(containerRef, setCurrentIndex, routeChanged);

  const handleLeftButtonClick = (index?: number) => {
    const newIndex =
      index !== undefined ? index : Math.max(0, currentIndex - 1);
    setCurrentIndex(newIndex);
    handleCardClick(newIndex);
  };

  const handleRightButtonClick = (index?: number) => {
    const newIndex =
      index !== undefined
        ? index
        : Math.min(validImages.length - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    handleCardClick(newIndex);
  };

  useEffect(() => {
    setCurrentIndex(0);
    setRouteChanged(true);

    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }

    const timer = setTimeout(() => {
      setRouteChanged(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [containerRef, link, validImages.length]);

  useEffect(() => {
    if (validImages.length > 0 && currentIndex >= validImages.length) {
      setCurrentIndex(0);
    }
  }, [validImages.length, currentIndex]);

  return (
    <div
      data-testid='slider-container'
      className={styles['slider-container']}
      role='region'
      aria-label='Зображення товару'>
      {currentIndex > 0 && (
        <button
          type='button'
          className={styles['slider-to-left-btn']}
          aria-label='Попереднє зображення'
          onClick={() => handleLeftButtonClick()}>
          <FontAwesomeIcon
            data-testid='font-awesome-icon'
            icon={faAngleLeft}
            size='2x'
          />
        </button>
      )}
      {currentIndex < validImages.length - 1 && (
        <button
          type='button'
          className={styles['slider-to-right-btn']}
          aria-label='Наступне зображення'
          onClick={() => handleRightButtonClick()}>
          <FontAwesomeIcon
            data-testid='font-awesome-icon'
            icon={faAngleRight}
            size='2x'
          />
        </button>
      )}
      {validImages.length > 0 && (
        <>
          <div
            className={styles['slider-pagination-container']}
            role='tablist'
            aria-label='Номер зображення'>
            {validImages.map((image, index) => (
              <button
                type='button'
                key={`scroll-to-${image}`}
                role='tab'
                aria-label={`Зображення ${index + 1} з ${validImages.length}`}
                aria-selected={currentIndex === index}
                className={
                  styles[
                    `slider-pagination-btn${currentIndex === index ? '-active' : ''}`
                  ]
                }
                onClick={() => {
                  setCurrentIndex(index);
                  handleCardClick(index);
                }}>
                &#x2022;
              </button>
            ))}
          </div>
          <div className={styles['slider-scrollable-block']} ref={containerRef}>
            {validImages.map(image => (
              <SliderCard key={image} image={image} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Slider;
