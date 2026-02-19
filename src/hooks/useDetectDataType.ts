import { useEffect, useState } from 'react';
import toys from './../data/toys.json';
import accessories from './../data/accessories.json';
import pillows from './../data/pillows.json';
import kitchen from './../data/kitchen.json';
import { useParams } from 'react-router-dom';
import { ItemDetails } from '../interfaces/interfaces';

const categorySources: {
  [key: string]: { source: ItemDetails[]; heading: string };
} = {
  toys: { source: toys as ItemDetails[], heading: 'Іграшки' },
  accessories: { source: accessories as ItemDetails[], heading: 'Аксесуари' },
  pillows: { source: pillows as ItemDetails[], heading: 'Подушки' },
  kitchen: { source: kitchen as ItemDetails[], heading: 'Для кухні' },
};

const useDetectDataType = () => {
  const [products, setProducts] = useState<ItemDetails[]>([]);

  const [heading, setHeading] = useState<string>('');

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const selected = categorySources[category as string];

    if (selected) {
      setProducts(structuredClone(selected.source));
      setHeading(selected.heading);
    } else {
      setProducts([]);
      setHeading('Товари');
    }
  }, [category]);

  return {
    category,
    heading,
    products,
    setProducts,
  };
};

export default useDetectDataType;
