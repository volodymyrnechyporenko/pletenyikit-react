import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import logo from '/img/PletenyiKit_logo_round.png';
import styles from './Header.module.scss';
import { leftNavigation, rightNavigation } from '../../constants/navigation';

const SIDEBAR_ID = 'sidebar-menu';

const Header: React.FC = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpenRef = useRef(false);

  const toggle = () => {
    setIsBurgerActive(prev => !prev);
  };

  useEffect(() => {
    if (isBurgerActive) {
      firstLinkRef.current?.focus();
    } else if (wasOpenRef.current) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = isBurgerActive;
  }, [isBurgerActive]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBurgerActive) {
        setIsBurgerActive(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isBurgerActive]);

  const icon = isBurgerActive ? faTimes : faBars;
  const menuLabel = isBurgerActive ? 'Закрити меню' : 'Відкрити меню';

  return (
    <header>
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
        <button
          ref={menuButtonRef}
          type='button'
          className={styles['menu-icon']}
          aria-expanded={isBurgerActive}
          aria-controls={SIDEBAR_ID}
          aria-label={menuLabel}
          onClick={toggle}>
          <FontAwesomeIcon icon={icon} size='2x' />
        </button>
      </div>
      <div
        id={SIDEBAR_ID}
        role='dialog'
        aria-modal='true'
        aria-label='Меню навігації'
        className={`${styles.sidebar} ${isBurgerActive ? styles.active : ''}`}
        onClick={toggle}>
        <ul>
          {[...leftNavigation, ...rightNavigation].map((item, index) => (
            <li key={item.path} className={styles.side}>
              <Link
                to={item.path}
                ref={index === 0 ? firstLinkRef : undefined}
                onClick={() => setIsBurgerActive(false)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
