import styles from './Slider.module.scss';

interface SliderCardProps {
  image: string;
  handleClick: () => void;
}

const SliderCard = ({ image, handleClick }: SliderCardProps) => {
  return (
    <div className={styles['slider-card']} onClick={handleClick}>
      <img src={`/src/assets/img/${image}`} alt='' />
    </div>
  );
};

export default SliderCard;
