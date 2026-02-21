import React from 'react';
import styles from './AboutUs.module.scss';
import { aboutUsTitle, aboutUsValues } from '../../constants/texts';

const aboutUrl = 'https://pletenyikit.com/about-pletenyi-kit';
const aboutDescription =
  'Плетений КіТ — сімейне хоббі. Плетені подушки, іграшки та аксесуари ручної роботи. Хто такий Плетений КіТ та до чого тут реінкарнація?';

const AboutUs: React.FC = () => (
  <>
    <title>Про нас | Плетений КіТ</title>
    <meta name="description" content={aboutDescription} />
    <link rel="canonical" href={aboutUrl} />
    <meta property="og:url" content={aboutUrl} />
    <meta property="og:title" content="Про нас | Плетений КіТ" />
    <meta property="og:description" content={aboutDescription} />
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

export default AboutUs;
