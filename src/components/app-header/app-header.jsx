import React from 'react';
import styles from './app-header.module.css';

import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
  Box
} from '@ya.praktikum/react-developer-burger-ui-components';

const AppHeader = () => {
  return (
    <header className={`${styles.header} pb-4 pt-4`}>
      <ul className={`${styles.content} list-default`}>
        <li>
          <nav>
            <ul className={`${styles.menu} list-default`}>
              <li>
                <a href="#" className={styles.menu__link}>
                  <BurgerIcon type="primary" />
                  <p className="text text_type_main-default">Конструктор</p>
                </a>
              </li>
              <li>
                <a href="#" className={styles.menu__link}>
                  <ListIcon type="primary" />
                  <p className="text text_type_main-default">Лента заказов</p>
                </a>
              </li>
            </ul>
          </nav>
        </li>
        <li className={styles.logo__wrapper}>
          <a href="" className={styles.header__logo}>
            <Logo />
          </a>
        </li>
        <li className={styles.profile}>
          <a href="#" className={styles.menu__link}>
            <ProfileIcon type="primary" />
            <p className="text text_type_main-default">Личный кабинет</p>
          </a>
        </li>
      </ul>
    </header>
  );
};

export default AppHeader;
