import React from 'react';
import styles from './AboutUs.module.scss';
import { aboutUsTitle, aboutUsValues } from '../../constants/texts';

const AboutUs: React.FC = () => {
  return (
    <>
      <div className='heading'>
        <h1>Про нас</h1>
        <h2>{aboutUsTitle}</h2>
      </div>
      <div className='article'>
        <div id='bottom_txt' className={styles.txt2col}>
          {aboutUsValues.map(value => (
            <p key={value}>{value}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
