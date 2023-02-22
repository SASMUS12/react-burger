import { TConstructorIngredient, TIngredient, TOrder } from '../types';

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';
export const ADD_INGREDIENT_TO_CONSTRUCTOR: 'ADD_INGREDIENT_TO_CONSTRUCTOR' =
  'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const ADD_BUN_TO_CONSTRUCTOR: 'ADD_BUN_TO_CONSTRUCTOR' = 'ADD_BUN_TO_CONSTRUCTOR';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR: 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR' =
  'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';
export const CHANGE_INGREDIENTS_ORDER: 'CHANGE_INGREDIENTS_ORDER' = 'CHANGE_INGREDIENTS_ORDER';
export const SEND_ORDER_REQUEST: 'SEND_ORDER_REQUEST' = 'SEND_ORDER_REQUEST';
export const SEND_ORDER_SUCCESS: 'SEND_ORDER_SUCCESS' = 'SEND_ORDER_SUCCESS';
export const SEND_ORDER_ERROR: 'SEND_ORDER_ERROR' = 'SEND_ORDER_ERROR';
export const GET_ORDER_INFO_REQUEST: 'GET_ORDER_INFO_REQUEST' = 'GET_ORDER_INFO_REQUEST';
export const GET_ORDER_INFO_SUCCESS: 'GET_ORDER_INFO_SUCCESS' = 'GET_ORDER_INFO_SUCCESS';
export const GET_ORDER_INFO_ERROR: 'GET_ORDER_INFO_ERROR' = 'GET_ORDER_INFO_ERROR';

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly payload: TIngredient[];
}

export interface IGetIngredientsErrorAction {
  readonly type: typeof GET_INGREDIENTS_ERROR;
}

export interface IAddIngredientToConstructorAction {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly payload: TConstructorIngredient;
}

export interface IAddBunToConstructorAction {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly payload: TConstructorIngredient;
}

export interface IRemoveIngredientFromConstructorAction {
  readonly type: typeof REMOVE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly payload: string;
}

export interface IClearConstructorAction {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export interface IChangeIngredientsOrderAction {
  readonly type: typeof CHANGE_INGREDIENTS_ORDER;
  readonly payload: TConstructorIngredient[];
}

export interface ISendOrderRequestAction {
  readonly type: typeof SEND_ORDER_REQUEST;
}

export interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS;
  readonly payload: number;
}

export interface ISendOrderErrorAction {
  readonly type: typeof SEND_ORDER_ERROR;
}

export interface IGetOrderInfoRequestAction {
  readonly type: typeof GET_ORDER_INFO_REQUEST;
}

export interface IGetOrderInfoSuccessAction {
  readonly type: typeof GET_ORDER_INFO_SUCCESS;
  readonly payload: TOrder;
}

export interface IGetOrderInfoErrorAction {
  readonly type: typeof GET_ORDER_INFO_ERROR;
}

export type TBurgerConstructorActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsErrorAction
  | IAddIngredientToConstructorAction
  | IAddBunToConstructorAction
  | IRemoveIngredientFromConstructorAction
  | IClearConstructorAction
  | IChangeIngredientsOrderAction
  | ISendOrderRequestAction
  | ISendOrderSuccessAction
  | ISendOrderErrorAction
  | IGetOrderInfoRequestAction
  | IGetOrderInfoSuccessAction
  | IGetOrderInfoErrorAction;
