import React, { FC } from 'react';
import styles from './orders-dashboard.module.css';
import { useAppSelector } from '../../services/types';
import { TOrder } from '../../services/types';

const OrdersDashboard: FC = () => {
  const { orders, totalOrders, totalOrdersToday } = useAppSelector(store => store.wsReducer);

  const ordersReady: TOrder[] = orders
    .filter((order: TOrder) => order.status === 'done')
    .slice(0, 20);
  const ordersInProgress: TOrder[] = orders
    .filter((order: TOrder) => order.status === 'pending')
    .slice(0, 20);

  return (
    <div className={styles.container}>
      <div className={styles.statuses}>
        <div className={styles.status}>
          <h2 className="text text_type_main-medium pb-6">Готовы:</h2>
          <div className={`${styles.statusReady} text text_type_digits-default`}>
            <div className={styles.numbers}>
              {ordersReady.map(item => (
                <div key={item._id}>{item.number}</div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.ordersDashboardStatus}>
          <h2 className="text text_type_main-medium pb-6">В работе:</h2>
          <div className="text text_type_digits-default">
            <div className={styles.orderDashboardNumbers}>
              {ordersInProgress.map(item => (
                <div key={item._id}>{item.number}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
      <h2 className="text text_type_digits-large">{totalOrders}</h2>
      <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
      <h2 className="text text_type_digits-large">{totalOrdersToday}</h2>
    </div>
  );
};

export default OrdersDashboard;
