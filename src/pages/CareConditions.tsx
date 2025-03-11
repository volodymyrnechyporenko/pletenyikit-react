import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { careConditions, careConditionsTitle } from '@constants/texts';
import useRandomImages from '@hooks/useRandomImages';

const CareConditions: React.FC = () => {
  const images = useRandomImages();

  return (
    <>
      <div className='heading'>
        <h1>{careConditionsTitle}</h1>
      </div>

      <div className='item-all'>
        <div className='item-left'>
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            effect='fade'>
            {images.map(image => (
              <SwiperSlide key={image}>
                <img src={`/src/assets/img/${image}`} alt='' />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className='item-right'>
          <div className='item-text'>
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
