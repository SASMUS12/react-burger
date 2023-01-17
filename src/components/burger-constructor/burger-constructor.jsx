import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ConstructorItem from '../constructor-item/constructor-item';
import styles from './burger-constructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor = ({ data, openModal }) => {
  const getPrice = useMemo(() => {
    return Array.from(data).reduce((acc, i) => {
      return i.type === 'bun' ? acc + i.price * 2 : acc + i.price;
    }, 0);
  }, [data]);

  return (
    data.length > 0 && (
      <section className={`${styles.wrapper} mt-25 pl-4`}>
        {data.map(item => {
          return (
            item.type === 'bun' && (
              <ConstructorItem data={item} key={item._id} text={`${item.name} (верх)`} type="top" />
            )
          );
        })}
        <ul className={`${styles.list} list-default my-scroll pr-2`}>
          {data.map(
            item =>
              item.type !== 'bun' && (
                <li key={item._id}>
                  <ConstructorItem data={item} />
                </li>
              )
          )}
        </ul>
        {data.map(item => {
          return (
            item.type === 'bun' && (
              <ConstructorItem
                data={item}
                key={item._id}
                text={`${item.name}+ (низ)`}
                type="bottom"
              />
            )
          );
        })}
        <div className={`${styles.checkout} mt-6`}>
          <p className="text text_type_digits-medium mr-2">{getPrice}</p>
          <CurrencyIcon type="primary" />
          <Button
            htmlType="button"
            type="primary"
            size="large"
            extraClass="ml-10 mr-4"
            onClick={openModal}
          >
            Оформить заказ
          </Button>
        </div>
      </section>
    )
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  openModal: PropTypes.func
};

export default BurgerConstructor;
