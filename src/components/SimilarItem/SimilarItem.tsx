import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Item {
  price: number;
  img: string;
  link: string;
}

interface ItemProps {
  item: Item;
  itemPath: string;
}

const ItemComponent: React.FC<ItemProps> = ({ item, itemPath }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({
      pathname: `/${itemPath}`, // Construct the path
      search: new URLSearchParams({
        link: item.link,
      }).toString(),
    });
  };

  try {
    const imagePath = new URL(`../assets/img/${item.img}`, import.meta.url).href;

    return (
      <div className="product" onClick={handleClick}>
        <div className="product-price">{item.price}</div>
        <img loading="lazy" src={imagePath} className="product-image" alt="" />
      </div>
    );
  } catch (error) {
    console.error('Error loading image:', error);
    return (
      <div className="product" onClick={handleClick}>
        <div className="product-price">{item.price}</div>
        <div className="product-image">Image Not Found</div>
      </div>
    );
  }
};

export default ItemComponent;