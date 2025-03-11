import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '@assets/img/PletenyiKit_logo_round.png';
import styles from './Header.module.scss';
import useScrollToAnchor from '@hooks/useScrollToAnchor';
import { leftNavigation, rightNavigation } from '@constants/navigation';

const Header: React.FC = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setIsBurgerActive(!isBurgerActive);
  };

  useEffect(() => {
    setHeaderHeight(headerRef.current?.clientHeight ?? 0);
  }, []);

  useScrollToAnchor(headerHeight);

  const icon = isBurgerActive ? faTimes : faBars;

  return (
    <header ref={headerRef}>
      <div className={styles.nav}>
        <div className={styles['nav-left']}>
          {leftNavigation.map(item => (
            <Link
              key={item.path}
              className={styles['menu-link']}
              to={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className={styles['nav-logo']}>
          <Link to='/'>
            <img src={logo} alt='pletenyikit' />
          </Link>
        </div>
        <div className={styles['nav-right']}>
          {rightNavigation.map(item => (
            <Link
              key={item.path}
              className={styles['menu-link']}
              to={item.path}>
              {item.name}
            </Link>
          ))}
        </div>
        <div className={styles['menu-icon']}>
          <FontAwesomeIcon icon={icon} size='2x' onClick={toggle} />
        </div>
      </div>
      <div
        className={`${styles.sidebar} ${isBurgerActive ? styles.active : ''}`}
        onClick={toggle}>
        <ul>
          {[...leftNavigation, ...rightNavigation].map(item => (
            <li key={item.path} className={styles.side}>
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
