import React from 'react';
import Header from '../Header/Header';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <a href='#main-content' className='skip-link'>
      Перейти до основного контенту
    </a>
    <Header />
    <ScrollToTop />
    <main id='main-content'>{children}</main>
    <Footer />
  </>
);

export default Layout;
