import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR,
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR,
  REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS, REFRESH_TOKEN_ERROR,
  FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR,
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR,
  UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR,
} from "../actions/userActions";

const initialState = {
  userName: null,
  userLogin: null,
  isAuthenticated: false,
  isResettingPassword: false,
  isLoading: false,
  error: ''
}

export const userReducer = (state = initialState, action ) => {

  switch(action.type) {

    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }

    case LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        error: '',
        userName: action.payload.name,
        userLogin: action.payload.email
      }
    }

    case LOGIN_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Ошибка при входе'
      }
    }

    case REGISTER_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }

    case REGISTER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: ''
      }
    }

    case REGISTER_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Ошибка при регистрации'
      }
    }

    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
      }
    }

    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
      }
    }

    case REFRESH_TOKEN_ERROR: {
      return {
        ...state,
      }
    }

    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
      }
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResettingPassword: true
      }
    }

    case FORGOT_PASSWORD_ERROR: {
      return {
        ...state,
      }
    }

    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
      }
    }

    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isResettingPassword: false,
      }
    }

    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
      }
    }

    case LOGOUT_REQUEST: {
      return {
        ...state,
      }
    }

    case LOGOUT_SUCCESS: {
      return {
        ...state,
        userName: null,
        userLogin: null,
        isAuthenticated: false
      }
    }

    case LOGOUT_ERROR: {
      return {
        ...state,
      }
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case GET_USER_SUCCESS: {
      return {
        ...state,
        userName: action.payload.name,
        userLogin: action.payload.email,
        isAuthenticated: true,
        isLoading: false,
        error: '',
      }
    }

    case GET_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Ошибка загрузки данных пользователя',
      }
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: '',
      }
    }

    case UPDATE_USER_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: 'Ошибка обновления пользователя',
      }
    }

    default:
      return state;

  }

}
