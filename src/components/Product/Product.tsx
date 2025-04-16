import React from 'react';
import useShowSkeleton from '../../hooks/useShowSkeleton';

interface ProductItem {
  id: number;
  name: string;
  price: number;
  link: string;
  images: string[];
}

interface ProductProps {
  product: ProductItem;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const showSkeleton = useShowSkeleton();

  return (
    <div className='product'>
      <div className='product-price'>{product.price}</div>
      <div className='product-title'>{product.name}</div>
      <img
        loading='lazy'
        src={`/img/${product.images[0]}`}
        className='product-image'
        alt={product.name}
        style={{ opacity: showSkeleton ? 0 : 1 }}
      />
    </div>
  );
};

export default Product;
