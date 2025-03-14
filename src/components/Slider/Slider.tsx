import useScrollItemsOnClick from '@hooks/useScrollItemsOnClick';
import styles from './Slider.module.scss';
import SliderCard from './SliderCard';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction } from 'react';
import useDetectSliderSwipe from '../../hooks/useDetectSliderSwipe';

interface SliderProps {
  images: string[];
  currentIndex: number;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}

const Slider = ({ images, currentIndex, setCurrentIndex }: SliderProps) => {
  const { containerRef, handleCardClick } = useScrollItemsOnClick();

  const handleLeftButtonClick = () => {
    setCurrentIndex(prevIndex => Math.max(0, prevIndex - 1));
    handleCardClick(currentIndex - 1, 'left');
  };

  const handleRightButtonClick = () => {
    setCurrentIndex(prevIndex => Math.min(images.length - 1, prevIndex + 1));
    handleCardClick(currentIndex + 1, 'right');
  };

  useDetectSliderSwipe(containerRef, setCurrentIndex);

  return (
    <div className={styles['slider-container']}>
      {currentIndex > 0 && (
        <button
          className={styles['slider-to-left-btn']}
          onClick={handleLeftButtonClick}>
          <FontAwesomeIcon icon={faAngleLeft} size='2x' />
        </button>
      )}
      {currentIndex < images.length - 1 && (
        <button
          className={styles['slider-to-right-btn']}
          onClick={handleRightButtonClick}>
          <FontAwesomeIcon icon={faAngleRight} size='2x' />
        </button>
      )}
      <div className={styles['slider-scrollable-block']} ref={containerRef}>
        {images.map((image, index) => (
          <SliderCard
            key={image}
            image={image}
            handleClick={() => handleCardClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
