import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrag } from 'react-dnd';
import { ingredientType } from '../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient.module.css';
import { setIngredientDetails } from '../../services/actions/ingredient-details';

const Ingredient = ({ data }) => {
  const constructorData = useSelector(store => store.constructorData.constructorItems);
  const dispatch = useDispatch();
  const counter = useMemo(() => {
    return data.type === 'bun'
      ? constructorData.filter(item => item._id === data._id).length * 2
      : constructorData.filter(item => item._id === data._id).length;
  }, [constructorData, data._id, data.type]);

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...data, uuid: Date.now() },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const openIngredientModal = e => {
    e.preventDefault();
    dispatch(setIngredientDetails(data));
  };

  return (
    <button
      className={`${styles.wrapper} ${isDrag && styles.wrapper_onDrag} btn-default`}
      ref={dragRef}
      onClick={e => openIngredientModal(e)}
    >
      <img src={data.image} alt={data.name} className={`${styles.img} mr-4 ml-4`} />
      <div className={styles.price}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{data.name}</p>
      {counter > 0 && <Counter count={counter} size="default" />}
    </button>
  );
};

Ingredient.propTypes = {
  data: ingredientType.isRequired
};

export default Ingredient;
