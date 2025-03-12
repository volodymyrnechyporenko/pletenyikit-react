import useScrollItemsOnClick from '@hooks/useScrollItemsOnClick';
import styles from './Slider.module.scss';
import SliderCard from './SliderCard';

interface SliderProps {
  images: string[];
}

const Slider = ({ images }: SliderProps) => {
  const { containerRef, handleCardClick } = useScrollItemsOnClick();

  return (
    <div className={styles['slider-container']}>
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
