import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import styles from './ScrollToTop.module.scss';
import ScrollToTopLink from '@components/ScrollToTopLink/ScrollToTopLink';

const ScrollToTop: React.FC = () => {
  return (
    <ScrollToTopLink>
      <a className={styles['scroll-to-top']}>
        <FontAwesomeIcon icon={faAngleUp} size='3x' />
      </a>
    </ScrollToTopLink>
  );
};

export default ScrollToTop;
