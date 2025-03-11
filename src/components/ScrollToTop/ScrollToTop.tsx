import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './ScrollToTop.module.scss';
import useArrowToScrollToTop from '@hooks/useArrowToScrollToTop';

const ScrollToTop: React.FC = () => {
  const {isVisible, scrollTop} = useArrowToScrollToTop();

  return (
    <div
      onClick={scrollTop}
      style={{ display: isVisible ? 'block' : 'none' }}
      className='scrollToTop'>
      <a className={styles['scroll-to-top']}>
        <FontAwesomeIcon icon={faAngleUp} size='3x' />
      </a>
    </div>
  );
};

export default ScrollToTop;
