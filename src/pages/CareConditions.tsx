import React from 'react';
import { careConditions, careConditionsTitle } from '@constants/texts';
import useRandomImages from '@hooks/useRandomImages';
import ImageCard from '../components/ImageCard/ImageCard';

const CareConditions: React.FC = () => {
  const images = useRandomImages();

  return (
    <>
      <div className='heading'>
        <h1>{careConditionsTitle}</h1>
      </div>

      <div className='item-all'>
        <div className='item-left'>
          <div className='image-block'>
            <div className='image-scrollable'>
              {images.map(image => (
                <ImageCard key={image} image={image} />
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
