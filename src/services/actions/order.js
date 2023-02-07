import { orderOptions, request } from '../../utils/api';
import { clearConstructor } from './constructor';
export const GET_ORDER_REQUEST = 'CREATE_REQUEST'; //СОЗДАТЬ ЗАПРОС НА ЗАКАЗ
export const GET_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS'; //СОЗДАНИЕ ДЕТАЛЕЙ ЗАКАЗА
export const GET_ORDER_SUCCESS = 'CREATE_ORDER'; //УСПЕХ СОЗДАНИЯ ЗАКАЗА
export const GET_ORDER_FAILED = 'CREATE_FAILED'; //НЕ УДАЛОСЬ СОЗДАТЬ ЗАКАЗ

const getOrderRequest = () => {
  return {
    type: GET_ORDER_REQUEST
  };
};

const getOrderFailed = err => {
  return {
    type: GET_ORDER_FAILED,
    payload: err
  };
};

const getOrderSuccess = data => {
  return {
    type: GET_ORDER_SUCCESS,
    payload: data
  };
};

export const clearOrderDetails = () => {
  return {
    type: GET_ORDER_DETAILS
  };
};

export const createOrder = dataIds => {
  return async dispatch => {
    dispatch(getOrderRequest());
    try {
      const data = await request('orders', orderOptions(dataIds));
      dispatch(getOrderSuccess(data));
      dispatch(clearConstructor());
    } catch (err) {
      dispatch(getOrderFailed(err));
    }
  };
};
