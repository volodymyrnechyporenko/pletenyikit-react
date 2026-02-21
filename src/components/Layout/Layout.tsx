import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../Header/Header';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import Footer from '../Footer/Footer';

const defaultTitle = 'Плетений КіТ — плетені аксесуари та ручна робота';
const defaultDescription =
  'Плетені аксесуари для вас та вашої оселі: іграшки, одяг, подушки, для кухні. Найгарніша реінкарнація пряжі!';
const baseUrl = 'https://pletenyikit.com';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <Helmet
      defaultTitle={defaultTitle}
      titleTemplate={`%s | Плетений КіТ`}
    >
      <meta name="description" content={defaultDescription} />
      <link rel="canonical" href={baseUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={baseUrl} />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={defaultDescription} />
      <meta property="og:locale" content="uk_UA" />
    </Helmet>
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
