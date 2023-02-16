import React from 'react';
import styles from './app-header.module.css'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AppHeader = () => {

  const { userName, isAuthenticated } = useSelector(store => store.userReducer);

  return(
    <header className={styles.header}>
      <div className={`${styles.headerContainer} pt-4 pb-4`}>
        <nav className={styles.linksBlock}>
          <div className="pt-4 pr-5 pb-4 pl-5">
          <Link to="/" className={styles.menu__link}>
            <BurgerIcon type="primary" />
            <span className="text text_type_main-default">Конструктор</span>
          </Link>
          </div>
          <div className="pt-4 pr-5 pb-4 pl-5">
            <ListIcon type="secondary" />
            <span className="text text_type_main-default text_color_inactive">Лента заказов</span>
          </div>
        </nav>
        <div className={styles.logoBlock}>
          <Link to="/">
              <Logo />
          </Link>
        </div>
        <div className={styles.personalBlock}>
          <div className="pt-4 pr-5 pb-4 pl-5">
            <ProfileIcon type="secondary" />
            <Link to="/profile">
              {(isAuthenticated && userName)
                ? <span className="text text_type_main-default text_color_inactive">{userName}</span>
                : <span className="text text_type_main-default text_color_inactive">Личный кабинет</span>
              }
            </Link>
          </div>
        </div>
      </div>
    </header>
  )

}

export default AppHeader;
