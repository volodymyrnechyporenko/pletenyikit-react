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
        : Math.min(images.length - 1, currentIndex + 1);
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
  }, [containerRef, link]);

  return (
    <div data-testid='slider-container' className={styles['slider-container']}>
      {currentIndex > 0 && (
        <button
          title='scroll-to-left'
          className={styles['slider-to-left-btn']}
          onClick={() => handleLeftButtonClick()}>
          <FontAwesomeIcon
            data-testid='font-awesome-icon'
            icon={faAngleLeft}
            size='2x'
          />
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          title='scroll-to-right'
          className={styles['slider-to-right-btn']}
          onClick={() => handleRightButtonClick()}>
          <FontAwesomeIcon
            data-testid='font-awesome-icon'
            icon={faAngleRight}
            size='2x'
          />
        </button>
      )}
      <div className={styles['slider-pagination-container']}>
        {images.map((image, index) => (
          <button
            title={`scroll-to-item-${index}`}
            key={`scroll-to-${image}`}
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
        {images.map(image => (
          <SliderCard key={image} image={image} />
        ))}
      </div>
    </div>
  );
};

export default Slider;
