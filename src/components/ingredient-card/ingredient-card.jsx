import React from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd/dist/hooks';
import PropTypes from 'prop-types';
import styles from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const IngredientCard = ({ id, name, price, image }) => {
  const constructorIngredients = useSelector(
    store => store.burgerConstructorReducer.constructorIngredients
  );
  const constructorBun = useSelector (
    store => store.burgerConstructorReducer.constructorBun
  );

  let numInConstructor = 0;
  (constructorBun !==null && id === constructorBun._id) ? numInConstructor = 2 : numInConstructor = constructorIngredients.filter(item => item._id === id).length;


  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { id }
  });

  return (
    <div className={styles.ingredientCardItem} ref={dragRef}>
      {numInConstructor > 0 && <Counter count={numInConstructor} size="default" />}
      <img src={image} alt={name} className={styles.ingredientCardImage} />
      <span className={`${styles.ingredientCardPrice} text text_type_digits-default`}>
        {price}
        <CurrencyIcon type="primary" />
      </span>
      <p className={`${styles.ingredientCardName} text text_type_main-default`}>
        {name}
      </p>
    </div>
  );
};

IngredientCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
};

export default IngredientCard;
