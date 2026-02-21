import React, { useCallback, useEffect, useMemo, useRef, useState, } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.scss';
import { filterTitle, sortByCheapTxt, sortByExpensiveTxt, } from '../../constants/texts';
import Product from '../Product/Product';
import useDetectDataType from '../../hooks/useDetectDataType';
import { ItemDetails } from '../../interfaces/interfaces';

const baseUrl = 'https://pletenyikit.com';

type SortOrder = 'none' | 'low' | 'high';

const ProductList: React.FC = () => {
  const { category, heading, products, setProducts } = useDetectDataType();
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const originalProductsRef = useRef<ItemDetails[]>([]);
  const prevCategoryRef = useRef<string | undefined>(undefined);
  const prevSortOrderForRefUpdate = useRef<SortOrder>('none');

  useEffect(() => {
    if (prevCategoryRef.current !== category) {
      prevCategoryRef.current = category;
      originalProductsRef.current = [];
      setSortOrder('none');
      prevSortOrderForRefUpdate.current = 'none';
    } else if (
      prevSortOrderForRefUpdate.current === 'none' &&
      sortOrder !== 'none'
    ) {
      if (products.length > 0) {
        originalProductsRef.current = [...products];
      }
      prevSortOrderForRefUpdate.current = sortOrder;
    } else if (
      prevSortOrderForRefUpdate.current !== 'none' &&
      sortOrder === 'none'
    ) {
      prevSortOrderForRefUpdate.current = 'none';
    }
  }, [category, products, sortOrder]);

  const sortedProducts = useMemo(() => {
    if (sortOrder === 'none') {
      return originalProductsRef.current.length > 0
        ? originalProductsRef.current
        : products;
    }

    const sourceProducts =
      originalProductsRef.current.length > 0
        ? originalProductsRef.current
        : products;

    return [...sourceProducts].sort((a, b) => {
      const priceA = a?.price ?? 0;
      const priceB = b?.price ?? 0;
      return sortOrder === 'low' ? priceA - priceB : priceB - priceA;
    });
  }, [sortOrder, products]);

  const prevSortOrderRef = useRef<SortOrder>('none');
  useEffect(() => {
    if (prevSortOrderRef.current !== sortOrder) {
      prevSortOrderRef.current = sortOrder;
      setProducts(sortedProducts);
    }
  }, [sortOrder, sortedProducts, setProducts]);

  const sortByHighPrice = useCallback(() => {
    setSortOrder(prev => (prev === 'high' ? 'none' : 'high'));
  }, []);

  const sortByLowPrice = useCallback(() => {
    setSortOrder(prev => (prev === 'low' ? 'none' : 'low'));
  }, []);

  const canonicalUrl = category ? `${baseUrl}/${category}` : baseUrl;
  const metaDescription = `Купити плетені ${heading?.toLowerCase() ?? 'товари'} — Плетений КіТ. Ручна робота, якісна пряжа.`;

  const pageTitle = `${heading ?? 'Категорія'} | Плетений КіТ`;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <div className='heading'>
        <h1 data-testid='heading-title'>{heading}</h1>
      </div>
      <div className={styles['filter-heading']}>{filterTitle}</div>
      <div
        className={styles['filter-button-wrap']}
        role='group'
        aria-label='Сортування'>
        <button
          type='button'
          data-testid='sort-by-cheap'
          className={styles['filter-button']}
          aria-pressed={sortOrder === 'low'}
          onClick={sortByLowPrice}>
          {sortByCheapTxt}
        </button>
        <button
          type='button'
          data-testid='sort-by-expensive'
          className={styles['filter-button']}
          aria-pressed={sortOrder === 'high'}
          onClick={sortByHighPrice}>
          {sortByExpensiveTxt}
        </button>
      </div>
      <div className='product-category'>
        {sortedProducts.length === 0 && category ? (
          <div className={styles['product-list-skeleton']}>
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className={styles['skeleton-product-card']}>
                <div className={styles['skeleton-product-image']}></div>
              </div>
            ))}
          </div>
        ) : (
          sortedProducts
            .filter(product => product && product.link && product.id)
            .map(product => (
              <Link
                key={`${sortOrder}-${product.id}`}
                to={`/${category}/${product.link}`}>
                <Product product={product} type='product' />
              </Link>
            ))
        )}
      </div>
    </>
  );
};

export default ProductList;
