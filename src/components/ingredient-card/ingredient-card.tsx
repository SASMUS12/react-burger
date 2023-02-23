import React from 'react';
import styles from './ingredient-card.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd/dist/hooks';
import { TIngredient } from '../../services/types/index';
import { useAppSelector } from '../../hooks/useForm';

interface IIngredienCard {
  id: string;
  name: string;
  price: number;
  image: string;
  type?: string;
}

const IngredientCard = ({ id, name, price, image, type }: IIngredienCard) => {
  const constructorIngredients = useAppSelector(
    store => store.burgerConstructorReducer.constructorIngredients
  );
  const constructorBun = useAppSelector(store => store.burgerConstructorReducer.constructorBun);
  let numInConstructor = 0;
  type === 'bun' && constructorBun !== null && id === constructorBun._id
    ? (numInConstructor = 2)
    : (numInConstructor = constructorIngredients.filter(
        (item: TIngredient) => item._id === id
      ).length);

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

export default IngredientCard;
