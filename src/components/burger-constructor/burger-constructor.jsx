import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd/dist/hooks/useDrop';
import styles from './burger-constructor.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';
import { useDispatch, useSelector } from 'react-redux';
import { handleRemoveItem } from '../../services/actions/constructor.js';
import {
  sendOrder,
  addIngredientToConstructor,
  changeIngredientsSort,
  addBunToConstructor
} from '../../services/action-creators/burgerConstructorActionCreators';

const BurgerConstructor = () => {
  const [isModalActive, setModalActive] = React.useState(false);
  const allIngredients = useSelector(store => store.burgerConstructorReducer.allIngredients);
  const constructorIngredients = useSelector(
    store => store.burgerConstructorReducer.constructorIngredients
  );
  const isAuthenticated = useSelector(store => store.userReducer.isAuthenticated);
  const bun = useSelector(store => store.burgerConstructorReducer.constructorBun);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMakeOrderClick = () => {
    if (!isAuthenticated) {
      navigate({ pathname: '/login' });
    } else {
      const orderIngredients = constructorIngredients.concat(bun);
      dispatch(sendOrder(orderIngredients));
      setModalActive(true);
    }
  };

  const allCost = useMemo(() => {
    return Array.from(constructorIngredients).reduce((acc, i) => {
      return i.type === 'bun' ? acc + i.price * 2 : acc + i.price;
    }, 0);
  }, [constructorIngredients]);

  const handleCloseModal = () => {
    setModalActive(false);
  };

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      const item = allIngredients.find(item => item._id === itemId.id);
      item.type === 'bun'
        ? dispatch(addBunToConstructor(item))
        : dispatch(addIngredientToConstructor(item));
    }
  });

  const moveIngredient = (dragIndex, hoverIndex, constructorIngredients) => {
    dispatch(changeIngredientsSort(dragIndex, hoverIndex, constructorIngredients));
  };

  return (
    <>
      <div className={`${styles.container} mt-25 mb-8 `} ref={dropTarget}>
        {bun && (
          <div className="pb-4 pl-5">
            <ConstructorElement
              text={`${bun.name} (верх)`}
              price={bun.price}
              type="top"
              isLocked={true}
              thumbnail={bun.image}
            />
          </div>
        )}
        <div className={`${styles.items} pr-4`}>
          {constructorIngredients.map((item, index) => (
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
          <div className="pt-4 pl-5">
            <ConstructorElement
              text={`${bun.name} (низ)`}
              price={bun.price}
              type="bottom"
              isLocked={true}
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
        <div className={styles.submit}>
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
