import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.scss';
import {
  filterTitle,
  sortByCheapTxt,
  sortByExpensiveTxt,
} from '../../constants/texts';
import Product from '../Product/Product';
import useDetectDataType from '../../hooks/useDetectDataType';

const ProductList: React.FC = () => {
  const { category, heading, products, setProducts } = useDetectDataType();

  const sortByHighPrice = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
  };

  const sortByLowPrice = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };

  return (
    <>
      <div className='heading'>
        <h1 data-testid='heading-title'>{heading}</h1>
      </div>
      <div className={styles['filter-heading']}>{filterTitle}</div>
      <div className={styles['filter-button-wrap']}>
        <div
          data-testid='sort-by-cheap'
          className={styles['filter-button']}
          onClick={sortByLowPrice}>
          {sortByCheapTxt}
        </div>
        <div
          data-testid='sort-by-expensive'
          className={styles['filter-button']}
          onClick={sortByHighPrice}>
          {sortByExpensiveTxt}
        </div>
      </div>
      <div className='product-category'>
        {products.map(product => (
          <Link key={product.id} to={`/${category}/${product.link}`}>
            <Product product={product} type='product' />
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductList;
