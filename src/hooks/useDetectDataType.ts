import { useEffect, useState } from 'react';
import toys from '@data/toys';
import accessories from '@data/accessories';
import pillows from '@data/pillows';
import kitchen from '@data/kitchen';
import { useParams } from 'react-router-dom';

interface ProductDetails {
  id: number;
  category: string;
  images: string[];
  name: string;
  description: string;
  dimensions?: string;
  amount?: string;
  price: number;
  similar?: { img: string, price: number, link: string }[];
  link: string;
}

const useDetectDataType = () => {
  const [products, setProducts] = useState<ProductDetails[]>([]);

  const [heading, setHeading] = useState<string>('');

  const { category } = useParams<{ category: string }>();

  useEffect(() => {
    const categoryData: { [key: string]: { data: ProductDetails[]; heading: string } } = {
      toys: { data: toys, heading: 'Іграшки' },
      accessories: { data: accessories, heading: 'Аксесуари' },
      pillows: { data: pillows, heading: 'Подушки' },
      kitchen: { data: kitchen, heading: 'Для кухні' },
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
    setProducts
  }
}

export default useDetectDataType;
