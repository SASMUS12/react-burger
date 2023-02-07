import { request } from '../../utils/api';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'; //ЗАПРОС НА ПОЛУЧЕНИЕ
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'; //ПОЛУЧИТЕ ИНГРЕДИЕНТЫ УСПЕХА
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'; //ДОСТАТЬ ИНГРЕДИЕНТЫ НЕ УДАЛОСЬ

const getIngredientsRequest = () => {
  return {
    type: GET_INGREDIENTS_REQUEST
  };
};

const getIngredientsFailed = err => {
  return {
    type: GET_INGREDIENTS_FAILED,
    payload: err
  };
};

const getIngredientsSuccess = data => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    payload: data
  };
};

//Получение ингредиентов

export function getIngredients() {
  return async dispatch => {
    dispatch(getIngredientsRequest());
    try {
      const data = await request('ingredients');
      dispatch(getIngredientsSuccess(data.data));
    } catch (err) {
      dispatch(getIngredientsFailed(err));
    }
  };
}
