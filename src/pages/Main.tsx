import React from 'react';
import { Link } from 'react-router-dom';
import { BUILD_DATE } from '../constants/build-info';

const HomePage: React.FC = () => (
  <>
    <div id={`updated-${BUILD_DATE}`} className='heading'>
      <h1>Плетений КіТ</h1>
      <h2>
        Найгарніша реінкарнація пряжі!
        <br />
        Плетені аксесуари для вас та вашої оселі
      </h2>
    </div>

    <div className='product-category'>
      <div className='product'>
        <Link to='/toys'>
          <div className='category-title'>Іграшки</div>
          <img
            src={'/img/zakladka-lysychka-01.jpg'}
            className='product-image toys'
            alt=''
          />
        </Link>
      </div>
      <div className='product'>
        <Link to='/accessories'>
          <div className='category-title'>Одяг</div>
          <img
            src={'/img/mitenky-kotyky-zhovti-pukhnasti-01.jpg'}
            className='product-image accessories'
            alt=''
          />
        </Link>
      </div>
      <div className='product'>
        <Link to='/pillows'>
          <div className='category-title'>Подушки</div>
          <img
            src={'/img/kit-zhovta-smuzhka-01.jpg'}
            className='product-image pillows'
            alt=''
          />
        </Link>
      </div>
      <div className='product'>
        <Link to='/kitchen'>
          <div className='category-title'>Для кухні</div>
          <img
            src={'/img/biriuzovi-kotyky-01.jpg'}
            className='product-image kitchen'
            alt=''
          />
        </Link>
      </div>
    </div>
  </>
);

export default HomePage;
