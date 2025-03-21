import styles from './Slider.module.scss';

interface SliderCardProps {
  image: string;
}

const SliderCard = ({ image }: SliderCardProps) => (
  <div className={styles['slider-card']}>
    <img src={`/img/${image}`} alt='' />
  </div>
);

export default SliderCard;
