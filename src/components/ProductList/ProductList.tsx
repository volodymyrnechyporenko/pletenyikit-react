import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.scss';
import {
  filterCheap,
  filterExpensive,
  filterTitle,
} from '../../constants/texts';
import Product from '../Product/Product';
import useDetectDataType from '../../hooks/useDetectDataType';

const ProductList: React.FC = () => {
  const { category, heading, products, setProducts } = useDetectDataType();

  const priceLow = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };

  const priceHigh = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
  };

  return (
    <>
      <div className='heading'>
        <h1>{heading}</h1>
      </div>
      <div className={styles['filter-heading']}>{filterTitle}</div>
      <div className={styles['filter-button-wrap']}>
        <div className={styles['filter-button']} onClick={priceLow}>
          {filterCheap}
        </div>
        <div className={styles['filter-button']} onClick={priceHigh}>
          {filterExpensive}
        </div>
      </div>
      <div className='product-category'>
        {products
          .slice()
          .reverse()
          .map(product => (
            <Link key={product.id} to={`/${category}/${product.link}`}>
              <Product product={product} type='product' />
            </Link>
          ))}
      </div>
    </>
  );
};

export default ProductList;
