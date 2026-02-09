import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className={styles['foot-all']}>
        <div className={styles['foot-left']}>
          <h3>Плетений КіТ</h3>
          <h4>Найгарніша реінкарнація пряжі</h4>
          <p>
            Наші вироби можна замовити тут, у фейсбук, вайбері чи інстаграмі. Ви
            отримаєте відповіді на можливі питання та вичерпну інформацію про
            вироби.
          </p>
          <p>
            До замовлення ми додаємо стильні умови догляду, візитки та крафтові
            пакети з ручками для подушок, тож, отримуючи наш виріб, ви можете не
            турбуватись про вигляд пакування, якщо виріб призначено на
            подарунок.
          </p>
          <p>
            Доступні опції доставки: Нова пошта, Укрпошта, Meest Express чи
            самовивіз.
          </p>
        </div>
        <div className={styles['foot-right']}>
          <h3>Маєте питання чи пропозиції?</h3>
          <p>
            З нами можна зв'язатись за номером телефону, у Viber та Telegram (з
            10:00 до 20:00):
          </p>
          <p>
            <a href='tel:+380630546382' aria-label='Подзвонити Плетений КіТ'>
              +38 063 054 63 82
            </a>
          </p>
          <p>або у соціальних мережах:</p>
          <p>
            <a
              href='https://www.facebook.com/PletenyiKiT'
              target='_blank'
              aria-label='Плетений КіТ у Facebook'
              rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faFacebookSquare} size='3x' />
            </a>
            &nbsp;&nbsp;
            <a
              href='https://www.instagram.com/pletenyi_kit/'
              target='_blank'
              aria-label='Плетений КіТ в Instagram'
              rel='noopener noreferrer'>
              <FontAwesomeIcon icon={faInstagram} size='3x' />
            </a>
          </p>
          <p>© PletenyiKit.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
