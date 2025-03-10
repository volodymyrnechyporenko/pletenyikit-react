import React from 'react';

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

const Product: React.FC<ProductProps> = ({ product }) => (
  <div className='product'>
    <div className='product-price'>{product.price}</div>
    <div className='product-title'>{product.name}</div>
    <img
      loading='lazy'
      src={`/src/assets/img/${product.images[0]}`}
      className='product-image'
      alt=''
    />
  </div>
);

export default Product;
