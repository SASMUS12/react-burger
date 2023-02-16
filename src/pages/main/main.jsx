import React from 'react';
import styles from './main.module.css';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const MainPage = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <section className={styles.mainSection}>
            <BurgerIngredients />
          </section>
          <section className={styles.mainSection}>
            <BurgerConstructor />
          </section>
        </main>
      </DndProvider>
    </>
  );
};
