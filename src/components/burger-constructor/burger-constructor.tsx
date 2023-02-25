import React, { useState, FC } from 'react';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { useDrop } from 'react-dnd';
import {
  sendOrder,
  addIngredientToConstructor,
  changeIngredientsSort,
  addBunToConstructor
} from '../../services/action-creators/burgerConstructorActionCreators';
import { useHistory } from 'react-router-dom';
import {
  TConstructorIngredient,
  TIngredient,
  useAppDispatch,
  useAppSelector
} from '../../services/types/index';
import { REMOVE_INGREDIENT_FROM_CONSTRUCTOR } from '../../services/actions/burgerConstructorActions';

const BurgerConstructor: FC = () => {
  const [isModalActive, setModalActive] = useState<boolean>(false);
  const allIngredients = useAppSelector(store => store.burgerConstructorReducer.allIngredients);
  const constructorIngredients = useAppSelector(
    store => store.burgerConstructorReducer.constructorIngredients
  );
  const bun = useAppSelector(store => store.burgerConstructorReducer.constructorBun);
  const isAuthenticated = useAppSelector(store => store.userReducer.isAuthenticated);
  const dispatch = useAppDispatch();
  let history = useHistory();

  const handleMakeOrderClick = () => {
    if (!isAuthenticated) {
      history.replace({ pathname: '/login' });
    } else {
      let orderIngredients;
      if (bun) {
        orderIngredients = constructorIngredients.concat(bun);
      } else {
        orderIngredients = constructorIngredients;
      }
      dispatch(sendOrder(orderIngredients));
      setModalActive(true);
    }
  };

  const handleRemoveItem = (constructorId: string) => {
    dispatch({
      type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
      payload: constructorId
    });
  };

  let allCost = constructorIngredients.reduce((sum: number, currentItem: TIngredient) => {
    return sum + currentItem.price;
  }, 0);

  if (bun) allCost += 2 * bun.price;

  const handleCloseModal = () => {
    setModalActive(false);
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId: { id: string }) {
      const item = allIngredients.find((item: TIngredient) => item._id === itemId.id);
      if (item) {
        if (item.type === 'bun') dispatch(addBunToConstructor(item));
        if (item && item.type !== 'bun') dispatch(addIngredientToConstructor(item));
      }
    }
  });

  const moveIngredient = (
    dragIndex: number,
    hoverIndex: number,
    constructorIngredients: TConstructorIngredient[]
  ) => {
    dispatch(changeIngredientsSort(dragIndex, hoverIndex, constructorIngredients));
  };

  return (
    <>
      <div className={`${styles.container} mt-25 mb-8 `} ref={dropTarget} data-test="constructorContainer">
        {bun && (
          <div className="pb-4 pl-5">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        <div className={`${styles.items} pr-4`} data-test="constructorInnerItems">
          {constructorIngredients.map((item: TConstructorIngredient, index: number) => (
            <div key={item.constructorId} className={styles.item}>
              <BurgerConstructorElement
                ingredient={item}
                index={index}
                handleClose={() => handleRemoveItem(item.constructorId)}
                moveIngredient={moveIngredient}
              />
            </div>
          ))}
        </div>

        {bun && (
          <div className="pl-8 pr-4" data-test="constructorBunBottom">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>

      <div className={styles.order}>
        <div className={`${styles.orderAll} mr-10 `}>
          <p className="text text_type_digits-medium">{allCost}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.orderSubmit}>
          <Button
            htmlType="button"
            type="primary"
            size="large"
            onClick={handleMakeOrderClick}
            disabled={constructorIngredients.length === 0 && !bun ? true : false}
          >
            Оформить заказ
          </Button>
        </div>
      </div>

      {isModalActive && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerConstructor;
