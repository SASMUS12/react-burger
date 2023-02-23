import { request } from '../../utils/request';
import { BASE_URL } from '../../utils/api';
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
  CHANGE_INGREDIENTS_ORDER,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_ERROR
} from '../actions/burgerConstructorActions';
import { TAppThunk, TConstructorIngredient, TIngredient } from '../types';
import { getCookie } from '../../utils/cookies';

export const getIngredients = (): TAppThunk => {
  const dataUrl = BASE_URL + '/ingredients';
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

export const sendOrder = (constructorIngredients: TConstructorIngredient[]): TAppThunk => {
  const dataUrl = BASE_URL + '/orders';
  const ingredients = constructorIngredients;

  return function (dispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST
    });

    request(dataUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getCookie('accessToken')
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

export const addIngredientToConstructor = (item: TIngredient) => {
  return {
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    payload: { ...item, constructorId: crypto.randomUUID() }
  };
};

export const addBunToConstructor = (item: TIngredient) => {
  return {
    type: ADD_BUN_TO_CONSTRUCTOR,
    payload: { ...item, constructorId: crypto.randomUUID() }
  };
};

export const changeIngredientsSort = (
  dragIndex: number,
  hoverIndex: number,
  constructorIngredients: TConstructorIngredient[]
) => {
  const dragItem = constructorIngredients[dragIndex];
  const newSortIngredients = [...constructorIngredients];
  const prevItem = newSortIngredients.splice(hoverIndex, 1, dragItem);
  newSortIngredients.splice(dragIndex, 1, prevItem[0]);
  return {
    type: CHANGE_INGREDIENTS_ORDER,
    payload: newSortIngredients
  };
};

export const getOrderInfo = (orderId: string): TAppThunk => {
  const dataUrl = BASE_URL + '/orders/' + orderId;

  return function (dispatch) {
    dispatch({
      type: GET_ORDER_INFO_REQUEST
    });

    request(dataUrl)
      .then(responseData => {
        dispatch({
          type: GET_ORDER_INFO_SUCCESS,
          payload: responseData.orders[0]
        });
      })
      .catch(error => {
        dispatch({
          type: GET_ORDER_INFO_ERROR
        });
        alert('Ошибка при загрузке данных: ' + error);
      });
  };
};
