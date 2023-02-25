import React, { FC } from 'react';
import feedStyles from './feed.module.css';
import OrdersFeed from '../../components/orders-feed/orders-feed';
import OrdersDashboard from '../../components/orders-dashboard/orders-dashboard';

export const FeedPage: FC = () => {
  return (
    <>
      <div className={feedStyles.heading}>
        <h1 className="text text_type_main-large">Лента заказов</h1>
      </div>
      <main className={feedStyles.main}>
        <section className={feedStyles.mainSection}>
          <OrdersFeed />
        </section>
        <section className={feedStyles.mainSection}>
          <OrdersDashboard />
        </section>
      </main>
    </>
  );
};
