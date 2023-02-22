/* eslint-disable jsx-a11y/alt-text */
import React, { FC } from 'react';
import styles from './order-details.module.css';
import iconOrder from '../../images/iconOrder.svg';
import { useAppSelector } from '../../hooks/useForm';

const OrderDetails: FC = () => {

  const order = useAppSelector(store => store.burgerConstructorReducer.order);

  return (
    <div className={`${styles.orderDetailsContainer} pt-30 pb-30`}>
      <h2 className="text text_type_digits-large mb-8">{order}</h2>
      <span className="text text_type_main-medium">идентификатор заказа</span>
      <img src={iconOrder} alt={"Заказ"} className="mt-15 mb-15" />
      <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
      <span className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</span>
    </div>
  )

}

export default OrderDetails;
