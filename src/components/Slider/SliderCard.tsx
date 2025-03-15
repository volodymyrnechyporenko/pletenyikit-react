import styles from './Slider.module.scss';

interface SliderCardProps {
  image: string;
}

const SliderCard = ({ image }: SliderCardProps) => {
  return (
    <div className={styles['slider-card']}>
      <img src={`/src/assets/img/${image}`} alt='' />
    </div>
  );
};

export default SliderCard;
