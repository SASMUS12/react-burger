import React, { FC, useEffect } from 'react';
import styles from './orders.module.css';
import { logout } from '../../services/action-creators/userActionCreators';
import { TOrder, useAppDispatch, useAppSelector } from '../../services/types/index';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/wsActions';
import { WS_BASE_URL } from '../../utils/api';
import { getCookie } from '../../utils/cookies';
import OrdersFeedItem from '../../components/orders-feed-item/orders-feed-item';
import { useLocation, Link, useRouteMatch, NavLink } from 'react-router-dom';

export const OrdersPage: FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector(store => store.userReducer);

  const handleLogoutClick = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(logout());
  };

  const wsUrl = WS_BASE_URL + '/orders?token=' + getCookie('accessToken');

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      payload: wsUrl
    });

    return () => {
      dispatch({
        type: WS_CONNECTION_CLOSED
      });
    };
  }, [dispatch, wsUrl]);

  const { orders } = useAppSelector(store => store.wsReducer);

  const location = useLocation();
  const { path, url } = useRouteMatch();

  if (isLoading) {
    return <h1>Загрузка</h1>;
  }

  if (!isLoading && error && error.length > 0) {
    return <h1>Ошибка</h1>;
  }

  return (
    <main className={styles.profileMain}>
      <section className={styles.profileMenu}>
        <p className="text text_type_main-medium pt-4 pb-4">Профиль</p>
        <p className="text text_type_main-medium pt-4 pb-4 text_color_inactive">
          <NavLink to={url} exact={true}>
            История заказов
          </NavLink>
        </p>
        <a href="/">
          <p
            className="text text_type_main-medium pt-4 pb-4 text_color_inactive"
            onClick={handleLogoutClick}
          >
            Выход
          </p>
        </a>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </section>
      <section className={styles.profileOrdersSection}>
        <div className={`${styles.profileOrdersContainer} pr-2`}>
          {orders.map((order: TOrder) => (
            <Link
              to={{ pathname: `${path}/${order.number}`, state: { background: location } }}
              key={order._id}
            >
              <OrdersFeedItem
                createdAt={order.createdAt}
                ingredients={order.ingredients}
                name={order.name}
                number={order.number}
                status={order.status}
                updatedAt={order.updatedAt}
                _id={order._id}
                displayStatus={true}
              />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
};
