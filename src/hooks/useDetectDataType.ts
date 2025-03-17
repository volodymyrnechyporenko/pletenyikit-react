import { useEffect, useState } from 'react';
import toys from './../data/toys.json';
import accessories from './../data/accessories.json';
import pillows from './../data/pillows.json';
import kitchen from './../data/kitchen.json';
import { useParams } from 'react-router-dom';
import { ItemDetails } from '../interfaces/interfaces';

const useDetectDataType = () => {
  const [products, setProducts] = useState<ItemDetails[]>([]);

  const [heading, setHeading] = useState<string>('');

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const categoryData: {
      [key: string]: { data: ItemDetails[]; heading: string };
    } = {
      toys: { data: JSON.parse(JSON.stringify(toys)), heading: 'Іграшки' },
      accessories: {
        data: JSON.parse(JSON.stringify(accessories)),
        heading: 'Аксесуари',
      },
      pillows: {
        data: JSON.parse(JSON.stringify(pillows)),
        heading: 'Подушки',
      },
      kitchen: {
        data: JSON.parse(JSON.stringify(kitchen)),
        heading: 'Для кухні',
      },
    };

    const selectedCategory = categoryData[category as string];

    if (selectedCategory) {
      setProducts(selectedCategory.data);
      setHeading(selectedCategory.heading);
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
