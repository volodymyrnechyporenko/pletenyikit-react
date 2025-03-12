import styles from './ImageCard.module.scss';

const ImageCard = ({
  image,
  handleClick,
}: {
  image: string;
  handleClick: () => void;
}) => {
  return (
    <div className={styles['image-container']} onClick={handleClick}>
      <img src={`/src/assets/img/${image}`} alt='' />
    </div>
  );
};

export default ImageCard;
