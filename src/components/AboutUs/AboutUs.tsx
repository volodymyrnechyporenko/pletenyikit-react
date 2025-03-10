import React from 'react';
import styles from './AboutUs.module.scss';
import { aboutUsTitle, aboutUsValues } from '../../data';

const AboutUs: React.FC = () => {
  return (
    <>
      <div id='about' className='heading'>
        <h2>{aboutUsTitle}</h2>
      </div>
      <div className='article'>
        <div id='bottom_txt' className={styles.txt2col}>
          {aboutUsValues.map((value, index) => (
            <p key={index}>{value}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
