import { store } from '../../services/store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TBurgerConstructorActions } from '../actions/burgerConstructorActions';
import { TUserActions } from '../actions/userActions';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TActions>;

type DispatchFunc = () => AppDispatch;

export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TConstructorIngredient = TIngredient & {
  constructorId: string;
};

export type TOrderIngredient = TIngredient & {
  quantityInOrder: number;
};

export type TActions = TBurgerConstructorActions | TUserActions;

export type TAppThunk<TReturn = void> = ThunkAction<TReturn, RootState, never, TActions>;

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
};

export type TParams = {
  number?: string;
  id?: string;
};

export type TUser = {
  name: string;
  email: string;
};

export type TWSMessage = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};
