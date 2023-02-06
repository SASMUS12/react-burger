import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_ORDER_DETAILS
} from '../actions/order';

const orderData = {
  order: null,
  createOrderFailed: false,
  createOrderRequest: false,
  errorMessage: ''
};

export const orderReducer = (state = orderData, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        createOrderRequest: true
      };
    }
    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        createOrderRequest: false,
        createOrderFailed: false,
        order: {
          name: action.payload.name,
          number: action.payload.order.number
        }
      };
    }
    case GET_ORDER_FAILED: {
      return {
        ...state,
        createOrderFailed: true,
        createOrderRequest: false,
        errorMessage: action.payload
      };
    }
    case GET_ORDER_DETAILS: {
      return {
        ...state,
        createOrderRequest: false,
        createOrderFailed: false,
        order: null,
        errorMessage: ''
      };
    }
    default: {
      return state;
    }
  }
};
