import React, { useState, useEffect } from 'react';

interface ScrollTopfLinkProps {
  children: React.ReactNode;
}

const ScrollToTopLink: React.FC<ScrollTopfLinkProps> = ({ children }) => {
  const [visible, setVisible] = useState(false);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // Optional: Adds smooth scrolling
    });
  };

  const scrollListener = () => {
    setVisible(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <div
      onClick={scrollTop}
      style={{ display: visible ? 'block' : 'none' }}
      className='scrollToTop'>
      {children}
    </div>
  );
};

export default ScrollToTopLink;
