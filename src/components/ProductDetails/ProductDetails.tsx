import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SimilarItem from '@components/SimilarItem/SimilarItem';
import styles from './ProductDetails.module.scss';
import useDetectDataType from '@hooks/useDetectDataType';
import { ItemDetails } from '@interfaces/interfaces';
import Slider from '../Slider/Slider';

const ProductDetails: React.FC = () => {
  const { link } = useParams<{ link: string }>();
  const [product, setProduct] = useState<ItemDetails | null>(null);

  const { category, products } = useDetectDataType();

  useEffect(() => {
    if (link) {
      const foundProduct = products.find(p => p.link === link);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [link, products]);

  if (!product) return;

  return (
    <>
      <div className='heading'>
        <h1>{product.category}</h1>
      </div>
      <div className='item-all'>
        <div className='item-left'>
          <Slider images={product.images} />
        </div>
        <div className='item-right'>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.dimensions}</p>
          <p>{product.amount}</p>
          <div className='price'>{product.price} грн</div>
        </div>
      </div>
      {product.similar && <h3>Схожі товари</h3>}
      <div className={styles['product-similar']}>
        {product.similar &&
          product.similar.map(item => (
            <Link key={item.link} to={`/${category}/${item.link}`}>
              <SimilarItem item={item} />
            </Link>
          ))}
      </div>
    </>
  );
};

export default ProductDetails;
