import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import toys from '@data/toys';
import accessories from '@data/accessories';
import pillows from '@data/pillows';
import kitchen from '@data/kitchen';
import { filterCheap, filterExpensive, filterTitle } from '@data/texts';
import styles from './ProductList.module.scss';
import Product from '@components/Product/Product';

interface Product {
  id: number;
  name: string;
  price: number;
  link: string;
  images: string[];
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [heading, setHeading] = useState<string>('');

  const { pathname } = useLocation();

  const category = pathname.split('/')[1];

  useEffect(() => {
    let data: Product[] = [];
    let pageHeading: string = '';

    switch (category) {
      case 'toys':
        data = toys;
        pageHeading = 'Іграшки';
        break;
      case 'accessories':
        data = accessories;
        pageHeading = 'Аксесуари';
        break;
      case 'pillows':
        data = pillows;
        pageHeading = 'Подушки';
        break;
      case 'kitchen':
        data = kitchen;
        pageHeading = 'Для кухні';
        break;
      default:
        data = [];
        pageHeading = 'Товари';
    }

    setProducts(data);
    setHeading(pageHeading);
  }, [category]);

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
            <Product
              key={product.id}
              product={product}
              productPath={`${category}Details`}
            />
          ))}
      </div>
    </>
  );
};

export default ProductList;
