import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '@assets/img/PletenyiKit_logo_round.png';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);

  const toggle = () => {
    setIsBurgerActive(!isBurgerActive);
  };

  const icon = isBurgerActive ? faTimes : faBars;

  return (
    <header>
      <div className={styles.nav}>
        <ul className={styles['nav-left']}>
          <li className={styles['menu-link']}>
            <Link to='/toys'>Іграшки</Link>
          </li>
          <li className={styles['menu-link']}>
            <Link to='/accessories'>Одяг</Link>
          </li>
          <li className={styles['menu-link']}>
            <Link to='/pillows'>Подушки</Link>
          </li>
        </ul>
        <div className={styles['nav-logo']}>
          <Link to='/'>
            <img src={logo} alt='pletenyikit' />
          </Link>
        </div>
        <ul className={styles['nav-right']}>
          <li className={styles['menu-link']}>
            <Link to='/kitchen'>Для кухні</Link>
          </li>
          <li className={styles['menu-link']}>
            <Link to='#about'>Про нас</Link>
          </li>
          <li className={styles['menu-link']}>
            <Link to='/order'>Замовлення</Link>
          </li>
        </ul>
        <div className={styles['menu-icon']}>
          <FontAwesomeIcon icon={icon} size='2x' onClick={toggle} />
        </div>
      </div>
      <div
        className={`${styles.sidebar} ${isBurgerActive ? styles.active : ''}`}
        onClick={toggle}>
        <ul>
          <li className={styles.side}>
            <Link to='/toys'>Іграшки</Link>
          </li>
          <li className={styles.side}>
            <Link to='/accessories'>Одяг</Link>
          </li>
          <li className={styles.side}>
            <Link to='/pillows'>Подушки</Link>
          </li>
          <li className={styles.side}>
            <Link to='/kitchen'>Для кухні</Link>
          </li>
          <li className={styles.side}>
            <Link to='#about'>Про нас</Link>
          </li>
          <li className={styles.side}>
            <Link to='/order'>Замовлення</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
