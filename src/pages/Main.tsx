import React from 'react';
import { Link } from 'react-router-dom';
import { BUILD_DATE } from '../constants/build-info';
import categories from './../data/categories.json';
import Product, { ProductItem } from '../components/Product/Product';

const HomePage: React.FC = () => {
  const formattedCategories: ProductItem[] = JSON.parse(
    JSON.stringify(categories),
  );

  return (
    <>
      <div id={`updated-${BUILD_DATE}`} className='heading'>
        <h1>Плетений КіТ</h1>
        <h2>
          Найгарніша реінкарнація пряжі!
          <br />
          Плетені аксесуари для вас та вашої оселі
        </h2>
      </div>
      <div className='product-category'>
        {formattedCategories.map(category => (
          <Link key={category.id} to={category.link}>
            <Product product={category} type='category' />
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
