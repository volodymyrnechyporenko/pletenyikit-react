import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AboutUs from './components/AboutUs/AboutUs';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import Main from './pages/Main';
import ProductDetails from '@components/ProductDetails/ProductDetails';

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent: React.FC = () => {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/:category" element={<ProductList />} />
          <Route path="/:category/:link" element={<ProductDetails />} />
        </Routes>
        <AboutUs />
      </main>
      <Footer />
    </>
  );
};

export default App;
