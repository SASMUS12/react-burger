import { request } from '../../utils/request';
import { baseUrl } from '../../utils/api';
import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
  CLEAR_CONSTRUCTOR,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  CHANGE_INGREDIENTS_ORDER
} from '../actions/burgerConstructorActions';

export const getIngredients = () => {
  const dataUrl = baseUrl + '/ingredients';

  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });

    request(dataUrl)
      .then(responseData => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          payload: responseData.data
        });
      })
      .catch(error => {
        dispatch({
          type: GET_INGREDIENTS_ERROR
        });
        alert('Ошибка при загрузке данных: ' + error);
      });
  };
};

export const sendOrder = constructorIngredients => {
  const dataUrl = baseUrl + '/orders';

  const ingredients = constructorIngredients;

  return function (dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST
    });

    request(dataUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ingredients: ingredients })
    })
      .then(responseData => {
        dispatch({
          type: SEND_ORDER_SUCCESS,
          payload: responseData.order.number
        });
        dispatch({
          type: CLEAR_CONSTRUCTOR
        });
      })
      .catch(error => {
        dispatch({
          type: SEND_ORDER_ERROR
        });
        alert('Ошибка при отправке данных: ' + error);
      });
  };
};

export const addIngredientToConstructor = item => {
  return function (dispatch) {
    dispatch({
      type: ADD_INGREDIENT_TO_CONSTRUCTOR,
      payload: { ...item, constructorId: crypto.randomUUID() }
    });
  };
};

export const addBunToConstructor = item => {
  return function (dispatch) {
    dispatch({
      type: ADD_BUN_TO_CONSTRUCTOR,
      payload: { ...item, constructorId: crypto.randomUUID() }
    });
  };
};

export const changeIngredientsSort = (dragIndex, hoverIndex, constructorIngredients) => {
  return function (dispatch) {
    const dragItem = constructorIngredients[dragIndex];
    const newSortIngredients = [...constructorIngredients];
    const prevItem = newSortIngredients.splice(hoverIndex, 1, dragItem);
    newSortIngredients.splice(dragIndex, 1, prevItem[0]);

    dispatch({
      type: CHANGE_INGREDIENTS_ORDER,
      payload: newSortIngredients
    });
  };
};
