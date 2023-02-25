import React, { useRef } from 'react';
import styles from './burger-constructor-element.module.css';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { TConstructorIngredient, useAppSelector } from '../../services/types/index';

interface IBurgerConstructorElement {
  ingredient: TConstructorIngredient;
  handleClose: () => void;
  index: number;
  moveIngredient: (
    dragIndex: number,
    hoverIndex: number,
    constructorIngredients: TConstructorIngredient[]
  ) => void;
}

export const BurgerConstructorElement = ({
  ingredient,
  handleClose,
  index,
  moveIngredient
}: IBurgerConstructorElement) => {
  const constructorIngredients = useAppSelector(
    store => store.burgerConstructorReducer.constructorIngredients
  );
  const id = ingredient.constructorId;
  const ref = useRef<HTMLLIElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'ingredient-sort',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item: unknown, monitor) {
      const thisItem = item as IBurgerConstructorElement;
      if (!ref.current) {
        return;
      }
      const dragIndex = thisItem.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex, constructorIngredients);

      thisItem.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient-sort',
    item: () => {
      return { id, index };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.15 : 1;
  drag(drop(ref));

  return (
    <li className={styles.item} ref={ref} style={{ opacity }} data-handler-id={handlerId}>
      <div className={styles.dragIconBlock}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={handleClose}
      />
    </li>
  );
};
