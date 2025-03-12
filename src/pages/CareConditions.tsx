import React from 'react';
import { careConditions, careConditionsTitle } from '@constants/texts';
import useRandomImages from '@hooks/useRandomImages';
import Slider from '../components/Slider/Slider';

const CareConditions: React.FC = () => {
  const images = useRandomImages();

  return (
    <>
      <div className='heading'>
        <h1>{careConditionsTitle}</h1>
      </div>

      <div className='item-all'>
        <div className='item-left'>
          <Slider images={images} />
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
