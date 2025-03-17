import React from 'react';
import Header from '../Header/Header';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import AboutUs from '../AboutUs/AboutUs';
import Footer from '../Footer/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Header />
    <ScrollToTop />
    <main>
      {children}
      <AboutUs />
    </main>
    <Footer />
  </>
);

export default Layout;
