import React, { FC, useEffect } from 'react';
import styles from './orders-feed.module.css';
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from '../../services/actions/wsActions';
import { useAppDispatch, useAppSelector } from '../../services/types';
import OrdersFeedItem from '../orders-feed-item/orders-feed-item';
import { TOrder } from '../../services/types';
import { WS_BASE_URL } from '../../utils/api';
import { useLocation, Link, useRouteMatch } from 'react-router-dom';

const OrdersFeed: FC = () => {
  const dispatch = useAppDispatch();
  const wsUrl = WS_BASE_URL + '/orders/all';

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
  const { path } = useRouteMatch();

  return (
    <div className={`${styles.container} pr-2`}>
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
            displayStatus={false}
          />
        </Link>
      ))}
    </div>
  );
};

export default OrdersFeed;
