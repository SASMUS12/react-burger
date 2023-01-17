import React from 'react';
import PropTypes from 'prop-types';
import styles from './burger-ingredients.module.css';
import Tabs from '../tabs/tabs';
import IngredientsGrid from '../ingredients-grid/ingredients-grid';

const BurgerIngredients = ({ ingredients, updateConstructor, openModal }) => {
  return (
    <section className={styles.section}>
      <h1 className={`${styles.heading} text text_type_main-large mb-5`}>Соберите бургер</h1>
      <Tabs />
      <div className={`${styles.wrapper} mt-10 pr-2 my-scroll`}>
        <h2 className={`${styles.heading} text text_type_main-medium`}>Булки</h2>
        <IngredientsGrid
          type={'bun'}
          ingredients={ingredients}
          updateConstructor={updateConstructor}
          openModal={openModal}
        />
        <h2 className={`${styles.heading} text text_type_main-medium`}>Соусы</h2>
        <IngredientsGrid
          type={'sauce'}
          ingredients={ingredients}
          updateConstructor={updateConstructor}
          openModal={openModal}
        />
        <h2 className={`${styles.heading} text text_type_main-medium`}>Начинки</h2>
        <IngredientsGrid
          type={'main'}
          ingredients={ingredients}
          updateConstructor={updateConstructor}
          openModal={openModal}
        />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateConstructor: PropTypes.func,
  openModal: PropTypes.func
};

export default BurgerIngredients;
