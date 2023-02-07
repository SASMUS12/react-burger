import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './app.module.css';
import { getIngredients } from '../../services/actions/ingredients';
import { clearIngredientDetails } from '../../services/actions/ingredient-details';
import { clearOrderDetails } from '../../services/actions/order';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import Columns from '../columns/columns';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

function App() {
  const dispatch = useDispatch();
  const details = useSelector(store => store.ingredientData.currentIngredient);
  const orderData = useSelector(store => store.orderData.order);
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const closeModal = () => {
    details ? dispatch(clearIngredientDetails()) : dispatch(clearOrderDetails());
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <DndProvider backend={HTML5Backend}>
          <Columns>
            <BurgerIngredients />
            <BurgerConstructor />
          </Columns>
        </DndProvider>
        {details && (
          <Modal title="Детали ингредиента" closeModal={closeModal}>
            <IngredientDetails data={details} />
          </Modal>
        )}
        {orderData && (
          <Modal closeModal={closeModal}>
            <OrderDetails orderNumber={orderData.number} />
          </Modal>
        )}
      </main>
    </div>
  );
}

export default App;
