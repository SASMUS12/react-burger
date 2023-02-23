import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  CHANGE_INGREDIENTS_ORDER,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  GET_ORDER_INFO_ERROR
} from '../actions/burgerConstructorActions';
import { TConstructorIngredient, TIngredient, TOrder } from '../../services/types/index';
import { TBurgerConstructorActions } from '../actions/burgerConstructorActions';

type TBurgerConstructorState = {
  allIngredients: ReadonlyArray<TIngredient>;
  constructorIngredients: Array<TConstructorIngredient>;
  constructorBun: TConstructorIngredient | null;
  orderNumber: number | null;
  isLoading: boolean;
  error: string | null;
  currentOrder: TOrder | null;
};

export const initialState: TBurgerConstructorState = {
  allIngredients: [],
  constructorIngredients: [],
  constructorBun: null,
  orderNumber: null,
  isLoading: false,
  error: '',
  currentOrder: null
};

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
): TBurgerConstructorState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true
      };
    }

    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        allIngredients: action.payload,
        isLoading: false,
        error: ''
      };
    }

    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Не удалось загрузить ингредиенты'
      };
    }

    case ADD_BUN_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorBun: action.payload
      };
    }

    case ADD_INGREDIENT_TO_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, action.payload]
      };
    }

    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(
          (item: TConstructorIngredient) => item.constructorId !== action.payload
        )
      };
    }

    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: [],
        constructorBun: null
      };
    }

    case CHANGE_INGREDIENTS_ORDER: {
      return {
        ...state,
        constructorIngredients: action.payload
      };
    }

    case SEND_ORDER_REQUEST: {
      return {
        ...state
      };
    }

    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.payload
      };
    }

    case SEND_ORDER_ERROR: {
      return {
        ...state
      };
    }

    case GET_ORDER_INFO_REQUEST: {
      return {
        ...state
      };
    }

    case GET_ORDER_INFO_SUCCESS: {
      return {
        ...state,
        currentOrder: action.payload
      };
    }

    case GET_ORDER_INFO_ERROR: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
};
