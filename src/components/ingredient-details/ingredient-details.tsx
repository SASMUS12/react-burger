import React, { FC } from 'react';
import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { TIngredient } from '../../services/types/index';
import { useAppSelector } from '../../hooks/useForm';

const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const allIngredients = useAppSelector(store => store.burgerConstructorReducer.allIngredients);
  const currentIngredient = allIngredients.find((item: TIngredient) => item._id === id);

  return (
    <div className={`${styles.container} pb-15`}>
      <img src={currentIngredient.image_large} alt={currentIngredient.name} />
      <span className={`${styles.name} text text_type_main-medium mt-4`}>
        {currentIngredient.name}
      </span>
      <div className={`${styles.items} mt-8`}>
        <div className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
          <p className="text text_type_main-default text_color_inactive">
            {currentIngredient.calories}
          </p>
        </div>
        <div className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_main-default text_color_inactive">
            {currentIngredient.proteins}
          </p>
        </div>
        <div className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_main-default text_color_inactive">{currentIngredient.fat}</p>
        </div>
        <div className={styles.item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_main-default text_color_inactive">
            {currentIngredient.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
