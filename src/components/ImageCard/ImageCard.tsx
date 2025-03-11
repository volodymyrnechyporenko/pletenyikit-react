import styles from './ImageCard.module.scss';

const ImageCard = ({ image }: { image: string }) => {
  return (
    <div className={styles['image-container']}>
      <img src={`/src/assets/img/${image}`} alt='' />
    </div>
  );
};

export default ImageCard;
