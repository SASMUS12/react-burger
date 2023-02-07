export const ADD_CONSTRUCTOR_ITEM = 'ADD_CONSTRUCTOR_ITEM'; //ДОБАВИТЬ ЭЛЕМЕНТ КОНСТРУКТОРА
export const ADD_CONSTRUCTOR_BUN = 'ADD_CONSTRUCTOR_BUN'; //ДОБАВИТЬ КОНСТРУКТОР BUN
export const DELETE_ITEM = 'DELETE_ITEM'; //УДАЛИТЬ ЭЛЕМЕНТ
export const UPDATE_ON_ITEM_MOVE = 'UPDATE_ON_ITEM_MOVE'; //ОБНОВЛЕНИЕ О ПЕРЕМЕЩЕНИИ ТОВАРА
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR'; //ОЧИСТИТЬ КОНСТРУКТОР

export const addItem = data => {
  return {
    type: ADD_CONSTRUCTOR_ITEM,
    payload: data
  };
};

export const addBun = data => {
  return {
    type: ADD_CONSTRUCTOR_BUN,
    payload: data
  };
};

export const updateConstructor = data => {
  return {
    type: UPDATE_ON_ITEM_MOVE,
    payload: data
  };
};

export const clearConstructor = () => {
  return {
    type: CLEAR_CONSTRUCTOR
  };
};

export const deleteItem = data => {
  return {
    type: DELETE_ITEM,
    payload: data
  };
};
