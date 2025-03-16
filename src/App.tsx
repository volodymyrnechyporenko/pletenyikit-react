import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Header from './components/Header/Header';
import AboutUs from './components/AboutUs/AboutUs';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Footer from './components/Footer/Footer';
import useScrollPageToTop from '@hooks/useScrollPageToTop';
import { router, routes } from './router/router';

const App: React.FC = () => {
  return (
    <RouterProvider routes={routes} router={router}>
      <AppContent />
    </RouterProvider>
  );
};

const AppContent: React.FC = () => {
  useScrollPageToTop();

  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <AboutUs />
      </main>
      <Footer />
    </>
  );
};

export default App;
