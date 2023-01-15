import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';

const IngredientCard = ({ data, updateConstructor, openModal }) => {
   const [counter, setCounter] = useState(0);

  const handleClick = () => {
    updateConstructor(data);
    openModal(data);
    setCounter(counter);
  };

  return (
    <button className={`${styles.wrapper} btn-default`} onClick={handleClick}>
      <img src={data.image} className={`${styles.photo_img} mr-4 ml-4`} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
      {counter > 0 && <Counter count={counter + 1} size="default" />}
    </button>
  );
};

IngredientCard.propTypes = {
  data: PropTypes.object,
  updateConstructor: PropTypes.func,
  openModal: PropTypes.func
};

export default IngredientCard;
