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
    let data: ProductDetails[] = [];
    let pageHeading: string = '';

    switch (category) {
      case 'toys':
        data = toys;
        pageHeading = 'Іграшки';
        break;
      case 'accessories':
        data = accessories;
        pageHeading = 'Аксесуари';
        break;
      case 'pillows':
        data = pillows;
        pageHeading = 'Подушки';
        break;
      case 'kitchen':
        data = kitchen;
        pageHeading = 'Для кухні';
        break;
      default:
        data = [];
        pageHeading = 'Товари';
    }

    setProducts(data);
    setHeading(pageHeading);
  }, [category]);

  return {
    category,
    heading,
    products,
    setProducts
  }
}

export default useDetectDataType;
