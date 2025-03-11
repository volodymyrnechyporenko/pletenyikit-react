import React from 'react';

interface Item {
  price: number;
  img: string;
  link: string;
}

interface ItemProps {
  item: Item;
}

const ItemComponent: React.FC<ItemProps> = ({ item }) => {


  const imagePath = `/src/assets/img/${item.img}`;

  return (
    <div className="product">
      <div className="product-price">{item.price}</div>
      <img loading="lazy" src={imagePath} className="product-image" alt="" />
    </div>
  );
};

export default ItemComponent;
