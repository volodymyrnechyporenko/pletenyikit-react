import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductItem {
  id: number;
  name: string;
  price: number;
  link: string;
  images: string[];
}

interface ProductProps {
  product: ProductItem;
  productPath: string;
}

const Product: React.FC<ProductProps> = ({ product, productPath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      pathname: `/${productPath}/${product.id}`,
      search: new URLSearchParams({
        name: product.name,
        price: product.price.toString(),
        link: product.link,
        images: JSON.stringify(product.images),
      }).toString(),
    });
  };

  try {
    return (
      <div className='product' onClick={handleClick}>
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
  } catch (error) {
    console.error('Error loading image:', error);
    return (
      <div className='product' onClick={handleClick}>
        <div className='product-price'>{product.price}</div>
        <div className='product-title'>{product.name}</div>
        <div className='product-image'>Image Not Found</div>
      </div>
    );
  }
};

export default Product;
