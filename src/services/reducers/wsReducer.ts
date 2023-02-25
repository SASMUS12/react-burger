import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE
} from '../actions/wsActions';
import { TOrder } from '../types';
import type { TWSActions } from '../actions/wsActions';

type TWSState = {
  wsConnected: boolean;
  orders: TOrder[] | [];
  userOrders: [];
  totalOrders: number | null;
  totalOrdersToday: number | null;
  error?: Event;
};

export const initialState: TWSState = {
  wsConnected: false,
  orders: [],
  userOrders: [],
  totalOrders: null,
  totalOrdersToday: null
};

export const wsReducer = (state = initialState, action: TWSActions): TWSState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        totalOrders: action.payload.total,
        totalOrdersToday: action.payload.totalToday
      };

    default:
      return state;
  }
};
