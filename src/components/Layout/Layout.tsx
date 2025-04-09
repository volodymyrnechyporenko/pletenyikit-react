import React from 'react';
import Header from '../Header/Header';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <ScrollToTop />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
