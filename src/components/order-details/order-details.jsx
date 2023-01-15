import React from 'react';
import styles from './order-details.module.css';
import nikeImg from '../../images/done.png';

const OrderDetails = () => {
  return (
    <div className={styles.wrapper}>
      <h2 className="text text_type_digits-large mb-8">034536</h2>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={nikeImg} alt="готово" className="mt-15 mb-15" />
      <p className="text text_type_main-small mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
