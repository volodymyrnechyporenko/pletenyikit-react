import React from 'react';
import { careConditions, careConditionsTitle } from '@constants/texts';
import useRandomImages from '@hooks/useRandomImages';
import ImageCard from '../components/ImageCard/ImageCard';
import useScrollItemsOnClick from '@hooks/useScrollItemsOnClick';

const CareConditions: React.FC = () => {
  const images = useRandomImages();

  const { containerRef, handleCardClick } = useScrollItemsOnClick();

  return (
    <>
      <div className='heading'>
        <h1>{careConditionsTitle}</h1>
      </div>

      <div className='item-all'>
        <div className='item-left'>
          <div className='image-block'>
            <div className='image-scrollable' ref={containerRef}>
              {images.map((image, index) => (
                <ImageCard
                  key={image}
                  image={image}
                  handleClick={() => handleCardClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className='item-right'>
          <div style={{ marginTop: '-24px' }}>
            {careConditions.map(item => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CareConditions;
