import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './ScrollToTop.module.scss';
import useArrowToScrollToTop from '../../hooks/useArrowToScrollToTop';

const ScrollToTop: React.FC = () => {
  const { isVisible, scrollTop } = useArrowToScrollToTop();

  return (
    <div
      style={{ display: isVisible ? 'block' : 'none' }}
      className='scrollToTop'>
      <button
        type='button'
        className={styles['scroll-to-top']}
        aria-label='Прокрутити вгору'
        onClick={scrollTop}>
        <FontAwesomeIcon icon={faAngleUp} size='3x' />
      </button>
    </div>
  );
};

export default ScrollToTop;
