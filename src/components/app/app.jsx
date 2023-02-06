import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import MainPage from '../main-page/main-page';
import { getIngredients } from '../../services/actions/ingredients';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <MainPage />
    </div>
  );
}

export default App;
