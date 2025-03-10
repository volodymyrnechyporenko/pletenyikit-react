import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import AboutUs from './components/AboutUs/AboutUs';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import Main from './pages/Main';

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
          <Route path='/' element={<Main />} />
          <Route path='/accessories' element={<ProductList />} />
          <Route path='/kitchen' element={<ProductList />} />
          <Route path='/pillows' element={<ProductList />} />
          <Route path='/toys' element={<ProductList />} />
        </Routes>
        <AboutUs />
      </main>
      <Footer />
    </>
  );
};

export default App;
