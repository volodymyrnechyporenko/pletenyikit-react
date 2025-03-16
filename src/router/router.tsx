import { createBrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../pages/Main';
import ProductList from '../components/ProductList/ProductList';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import CareConditions from '../pages/CareConditions';

export const routes = [
  <Routes>
    <Route path='/' element={<Main />} />
    <Route path='/:category' element={<ProductList />} />
    <Route path='/:category/:link' element={<ProductDetails />} />
    <Route path='care-conditions' element={<CareConditions />} />
  </Routes>,
];

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Main,
    lazy: async () => {
      const Component = await import('../pages/Main');
      return { Component: Component.default };
    },
  },
  {
    path: '/:category',
    Component: ProductList,
    lazy: async () => {
      const Component = await import('../components/ProductList/ProductList');
      return { Component: Component.default };
    },
  },
  {
    path: '/:category/:link',
    Component: ProductDetails,
    lazy: async () => {
      const Component = await import(
        '../components/ProductDetails/ProductDetails'
      );
      return { Component: Component.default };
    },
  },
  {
    path: '/care-conditions',
    Component: CareConditions,
    lazy: async () => {
      const Component = await import('../pages/CareConditions');
      return { Component: Component.default };
    },
  },
]);
