import {
  createBrowserRouter,
  Navigate,
  ScrollRestoration,
  useParams,
} from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { RouteGuard } from './RouteGuard';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <RouteGuard />
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

          const ProductListWrapper = () => {
            const params = useParams();
            return <Component.default key={params.category} />;
          };

          return { Component: ProductListWrapper };
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
      {
        path: '/404',
        lazy: async () => {
          const Component = await import('../pages/NotFound');
          return { Component: Component.default };
        },
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);
