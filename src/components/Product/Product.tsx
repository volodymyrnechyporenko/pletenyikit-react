import React from 'react';

export interface ProductItem {
  id: number;
  name: string;
  price?: number;
  link: string;
  images: string[];
}

interface ProductProps {
  product: ProductItem;
  type: 'category' | 'product';
}

const Product: React.FC<ProductProps> = ({ product, type }) => (
  <div className='product'>
    <div className={`${type}-price`}>{product?.price ?? ''}</div>
    <div className={`${type}-title`}>{product.name}</div>
    <div className='product-image-skeleton'></div>
    <img
      loading='lazy'
      src={`/img/${product.images[0]}`}
      className='product-image'
      alt={product.name}
    />
  </div>
);

export default Product;
