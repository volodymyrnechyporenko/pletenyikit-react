import React from 'react';
import { Helmet } from 'react-helmet-async';
import Slider from '../components/Slider/Slider';
import useRandomImages from '../hooks/useRandomImages';
import { careConditions, careConditionsTitle } from '../constants/texts';

const careUrl = 'https://pletenyikit.com/care-conditions';
const careDescription =
  'Умови догляду за плетеними виробами Плетений КіТ: прання подушок, іграшок та інтер\'єрних подушок. Поради з догляду.';

const CareConditions: React.FC = () => {
  const images = useRandomImages();

  return (
    <>
      <Helmet>
        <title>Умови догляду</title>
        <meta name="description" content={careDescription} />
        <link rel="canonical" href={careUrl} />
        <meta property="og:url" content={careUrl} />
        <meta property="og:title" content="Умови догляду | Плетений КіТ" />
        <meta property="og:description" content={careDescription} />
      </Helmet>
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
