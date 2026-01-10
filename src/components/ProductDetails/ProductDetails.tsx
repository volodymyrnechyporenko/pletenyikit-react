import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './ProductDetails.module.scss';
import Slider from '../Slider/Slider';
import SimilarItem from '../SimilarItem/SimilarItem';
import useDetectDataType from '../../hooks/useDetectDataType';
import { ItemDetails } from '../../interfaces/interfaces';

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

  if (!product) {
    return (
      <div className={styles['product-details-skeleton']}>
        <div className='heading'>
          <div className={styles['skeleton-heading']}></div>
        </div>
        <div className='item-all'>
          <div className='item-left'>
            <div className={styles['skeleton-slider']}></div>
          </div>
          <div className='item-right'>
            <div className={styles['skeleton-title']}></div>
            <div className={styles['skeleton-text']}></div>
            <div className={styles['skeleton-text']}></div>
            <div className={styles['skeleton-text']}></div>
            <div className={styles['skeleton-price']}></div>
          </div>
        </div>
      </div>
    );
  }

  const images =
    product.images && Array.isArray(product.images) ? product.images : [];
  const description =
    product.description && Array.isArray(product.description)
      ? product.description
      : [];
  const similar =
    product.similar && Array.isArray(product.similar) ? product.similar : [];
  const categoryName = product.category || 'Товар';
  const productName = product.name || '';
  const productPrice = product.price ?? 0;

  return (
    <>
      <div className='heading'>
        <h1>{categoryName}</h1>
      </div>
      <div className='item-all'>
        <div className='item-left'>
          {images.length > 0 ? (
            <Slider images={images} />
          ) : (
            <div className={styles['skeleton-slider']}></div>
          )}
        </div>
        <div className='item-right'>
          <h2>{productName}</h2>
          {description.length > 0 &&
            description.map((text, index) => (
              <p key={`desc-${index}`}>{text}</p>
            ))}
          <div className='price'>{productPrice} грн</div>
        </div>
      </div>
      {similar.length > 0 && <h3>Схожі товари</h3>}
      {similar.length > 0 && (
        <div className={styles['product-similar']}>
          {similar.map(
            (item, index) =>
              item.link && (
                <Link
                  key={item.link || `similar-${index}`}
                  to={`/${category}/${item.link}`}>
                  <SimilarItem item={item} />
                </Link>
              ),
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
