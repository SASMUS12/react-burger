import React, { useState, useEffect, useCallback } from 'react';
import styles from './app.module.css';
import PropTypes from 'prop-types';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import AppHeader from '../app-header/app-header';
import Columns from '../columns/columns';
import IngredientDetails from '../ingredient-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [constructorState, setConstructorState] = useState([]);
  const [isOpened, setOpened] = useState(false);
  const [ingredientData, setIngredientData] = useState(null);

  const openIngredientDetails = data => {
    setOpened(true);
    setIngredientData(data);
  };

  const openOrderDetails = () => {
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
    setIngredientData(null);
  };

  const updateConstructorData = useCallback(ingredientData => {
    setConstructorState([...constructorState, ingredientData]);
  });

  async function fetchApiomponents() {
    try {
      const API_URL = 'https://norma.nomoreparties.space/api/ingredients/';
      const res = await fetch(API_URL);
      const data = await res.json();
      setIngredients(data.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchApiomponents();
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main}>
        <Columns>
          <BurgerIngredients
            ingredients={ingredients}
            updateConstructor={updateConstructorData}
            openModal={openIngredientDetails}
          />
          <BurgerConstructor data={constructorState} openModal={openOrderDetails} />
        </Columns>
        {!!isOpened && !!ingredientData && (
          <Modal title="Детали ингредиента" closeModal={closeModal}>
            <IngredientDetails data={ingredientData} />
          </Modal>
        )}
        {!!isOpened && ingredientData === null && (
          <Modal closeModal={closeModal}>
            <OrderDetails />
          </Modal>
        )}
      </main>
    </div>
  );
}

App.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object)
};

export default App;
