import React from 'react';
import PropTypes from 'prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './constructor-item.module.css';

const ConstructorItem = ({ data, type }) => {
  return (
    <div className={styles.menu}>
      {data.type !== 'bun' && <DragIcon type="primary" />}
      <ConstructorElement
        isLocked={data.type === 'bun' ? true : false}
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        type={type}
        
      />
    </div>
  );
};

ConstructorItem.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string
};

export default ConstructorItem;
