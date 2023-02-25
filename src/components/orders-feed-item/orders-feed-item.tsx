import React from 'react';
import styles from './orders-feed-item.module.css';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient, useAppSelector } from '../../services/types';

interface IOrdersFeedItem {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
  displayStatus: boolean;
}

const OrdersFeedItem = ({
  createdAt,
  ingredients,
  name,
  number,
  status,
  updatedAt,
  _id,
  displayStatus
}: IOrdersFeedItem) => {
  const { allIngredients } = useAppSelector(store => store.burgerConstructorReducer);

  let orderIngredients: TIngredient[] = [];
  ingredients.forEach(currentItem => {
    let currentIngredient = allIngredients.find((item: TIngredient) => item._id === currentItem);
    if (currentIngredient) {
      orderIngredients.push(currentIngredient);
    }
  });

  let previewIngredients = [];
  let restIngredients: number | null = null;
  if (orderIngredients.length > 5) {
    previewIngredients = orderIngredients.slice(0, 6);
    restIngredients = orderIngredients.length - 5;
  } else {
    previewIngredients = orderIngredients.slice();
  }

  let orderSum = orderIngredients.reduce((sum, currentItem) => {
    return sum + currentItem.price;
  }, 0);

  const formatStatus = (status: string) => {
    switch (status) {
      case 'created':
        return 'Создан';
      case 'pending':
        return 'Готовится';
      case 'done':
        return 'Выполнен';
      default:
        return 'Неизвестен';
    }
  };

  return (
    <div className={`${styles.container} p-6`}>
      <div className={styles.heading}>
        <div className="text text_type_digits-default">#{number}</div>
        <div className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(updatedAt)} />
        </div>
      </div>
      <div>
        <div className="text text_type_main-medium">{name}</div>
        {displayStatus && (
          <div className="text text_type_main-default mt-2">{formatStatus(status)}</div>
        )}
      </div>
      <div className={styles.details}>
        <div className={styles.ingredients}>
          {previewIngredients.map((item, index) => (
            <div className={styles.preview} key={number + item._id + index}>
              <img src={item.image} className={styles.previewImage} alt={item.name} />
              {index === 5 && (
                <div
                  className={`${styles.ingredients} text text_type_main-default`}
                >{`+${restIngredients}`}</div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.cost}>
          <div className="text text_type_digits-default">{orderSum}</div>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
};

export default OrdersFeedItem;
