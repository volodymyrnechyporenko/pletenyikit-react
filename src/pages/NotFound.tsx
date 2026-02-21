import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';

const baseUrl = 'https://pletenyikit.com';
const pageTitle = 'Сторінку не знайдено — Плетений КіТ';
const pageDescription =
  'Запитана сторінка не існує або була переміщена. Поверніться на головну сторінку Плетений КіТ.';

const NotFound: React.FC = () => (
  <>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="canonical" href={`${baseUrl}/404`} />
    <meta property="og:url" content={`${baseUrl}/404`} />
    <meta property="og:title" content={pageTitle} />
    <meta property="og:description" content={pageDescription} />
    <meta property="og:type" content="website" />
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>Сторінку не знайдено</h1>
        <p className={styles.text}>
          Запитана адреса не існує або сторінка була переміщена. Перевірте URL
          або поверніться на головну сторінку.
        </p>
        <Link to="/" className={styles.link}>
          На головну
        </Link>
      </div>
    </div>
  </>
);

export default NotFound;
