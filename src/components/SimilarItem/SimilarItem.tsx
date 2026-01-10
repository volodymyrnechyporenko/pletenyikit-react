import React from 'react';
import { SimilarItem } from '../../interfaces/interfaces';

interface ItemProps {
  item: SimilarItem;
}

const ItemComponent: React.FC<ItemProps> = ({ item }) => {
  const imagePath = item?.img ? `/img/${item.img}` : '/img/placeholder.jpg';
  const price = item?.price ?? 0;

  return (
    <div className='product' data-testid='product-container'>
      <div className='product-price' data-testid='product-price'>
        {price}
      </div>
      <img
        loading='lazy'
        src={imagePath}
        className='product-image'
        alt=''
        data-testid='product-image'
      />
    </div>
  );
};

export default ItemComponent;
