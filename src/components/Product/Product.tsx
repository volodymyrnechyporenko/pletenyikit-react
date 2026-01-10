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

const Product: React.FC<ProductProps> = React.memo(
  ({ product, type }) => {
    const imageSrc =
      product?.images && product.images.length > 0
        ? `/img/${product.images[0]}`
        : '/img/placeholder.jpg';

    return (
      <div className='product'>
        <div data-testid='price' className={`${type}-price`}>
          {product?.price ?? ''}
        </div>
        <div data-testid='name' className={`${type}-title`}>
          {product?.name ?? ''}
        </div>
        <div data-testid='skeleton' className='product-image-skeleton'></div>
        <img
          loading='lazy'
          src={imageSrc}
          className='product-image'
          alt={product?.name ?? 'Product'}
        />
      </div>
    );
  },
  (prevProps, nextProps) => {
    const prevFirstImage =
      prevProps.product?.images && prevProps.product.images.length > 0
        ? prevProps.product.images[0]
        : '';
    const nextFirstImage =
      nextProps.product?.images && nextProps.product.images.length > 0
        ? nextProps.product.images[0]
        : '';

    return (
      prevProps.product?.id === nextProps.product?.id &&
      prevProps.product?.name === nextProps.product?.name &&
      prevProps.product?.price === nextProps.product?.price &&
      prevFirstImage === nextFirstImage &&
      prevProps.type === nextProps.type
    );
  },
);

Product.displayName = 'Product';

export default Product;
