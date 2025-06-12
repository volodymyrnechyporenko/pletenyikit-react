import React from 'react';
import { SimilarItem } from '../../interfaces/interfaces';

interface ItemProps {
  item: SimilarItem;
}

const ItemComponent: React.FC<ItemProps> = ({ item }) => {
  const imagePath = `/img/${item.img}`;

  return (
    <div className='product' data-testid='product-container'>
      <div className='product-price' data-testid='product-price'>
        {item.price}
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
