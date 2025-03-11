import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import SimilarItem from '@components/SimilarItem/SimilarItem';
import styles from './ProductDetails.module.scss'
import useDetectDataType from '@hooks/useDetectDataType';
import { ProductDetails } from '@interfaces/interfaces';

const ProductDetailsPage: React.FC = () => {
  const { link } = useParams<{ link: string }>();
  const [product, setProduct] = useState<ProductDetails | null>(null);

  const {category, products} = useDetectDataType();

  useEffect(() => {
    if (link) {
      const foundProduct = products.find((p) => p.link === link);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [link, products]);

  if (!product) return;

  return (
    <>
      <div className="heading">
        <h1>{product.category}</h1>
      </div>

      <div className="item-all">
        <div className="item-left">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            effect="fade"
          >
            {product.images.map((image) => (
              <SwiperSlide key={image}>
                <img src={`/src/assets/img/${image}`} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="item-right">
          <div className="item-text">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.dimensions}</p>
            <p>{product.amount}</p>
            <div className="price">{product.price} грн</div>
          </div>
        </div>
      </div>
      {product.similar && <h3>Схожі товари</h3>}
      <div className={styles['product-similar']}>
        {product.similar &&
          product.similar.map((item) => (
            <Link key={item.link} to={`/${category}/${item.link}`}>
              <SimilarItem item={item} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default ProductDetailsPage;
