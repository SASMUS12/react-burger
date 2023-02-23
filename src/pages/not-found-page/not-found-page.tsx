import React, { FC } from 'react';
import styles from './not-found-page.module.css';
import { Link } from 'react-router-dom';

export const NotFoundPage: FC = () => {
  return (
    <section className={styles.notFoundWrapper}>
      <div className={styles.notFound}>
        <h1 className="text text_type_digits-large">404</h1>
        <p>Упс... Такой страницы нет.</p>
        <p>
          <Link to="/">Вернутся на главную</Link>
        </p>
      </div>
    </section>
  );
};
