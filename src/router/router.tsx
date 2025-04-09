import {
  createBrowserRouter,
  Outlet,
  ScrollRestoration,
} from 'react-router-dom';
import Layout from '../components/Layout/Layout';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
        <ScrollRestoration />
      </Layout>
    ),
    children: [
      {
        index: true,
        lazy: async () => {
          const Component = await import('../pages/Main');
          return { Component: Component.default };
        },
      },
      {
        path: '/:category',
        lazy: async () => {
          const Component = await import(
            '../components/ProductList/ProductList'
          );
          return { Component: Component.default };
        },
      },
      {
        path: '/:category/:link',
        lazy: async () => {
          const Component = await import(
            '../components/ProductDetails/ProductDetails'
          );
          return { Component: Component.default };
        },
      },
      {
        path: '/about-pletenyi-kit',
        lazy: async () => {
          const Component = await import('../components/AboutUs/AboutUs');
          return { Component: Component.default };
        },
      },
      {
        path: '/care-conditions',
        lazy: async () => {
          const Component = await import('../pages/CareConditions');
          return { Component: Component.default };
        },
      },
    ],
  },
]);
