import { baseUrl } from '../../utils/api';
import { getCookie, setCookie } from '../../utils/cookies';
import { request, requestWithRefresh } from '../../utils/request';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR
} from '../actions/userActions';

export const login = (email, password) => {
  const requestUrl = baseUrl + '/auth/login';

  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });

    request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(responseData => {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: responseData.user
        });
        localStorage.setItem('refreshToken', responseData.refreshToken);
        let authToken;
        authToken = responseData.accessToken.split('Bearer ')[1];
        if (authToken) {
          setCookie('accessToken', authToken);
        }
      })
      .catch(error => {
        dispatch({
          type: LOGIN_ERROR
        });
        alert('Ошибка при логине: ' + error);
      });
  };
};

export const register = (email, password, name) => {
  const requestUrl = baseUrl + '/auth/register';

  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });

    request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email, password: password, name: name })
    })
      .then(responseData => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: responseData.data
        });
      })
      .catch(error => {
        dispatch({
          type: REGISTER_ERROR
        });
        alert('Ошибка при регистрации: ' + error);
      });
  };
};

export const refreshToken = () => {
  const requestUrl = baseUrl + '/auth/token';

  return function (dispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST
    });

    request(requestUrl)
      .then(responseData => {
        dispatch({
          type: REFRESH_TOKEN_SUCCESS,
          payload: responseData.data
        });
      })
      .catch(error => {
        dispatch({
          type: REFRESH_TOKEN_ERROR
        });
        alert('Ошибка при обновлении токена: ' + error);
      });
  };
};

export const forgotPassword = email => {
  const requestUrl = baseUrl + '/password-reset';

  return function (dispatch) {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST
    });

    request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
      .then(responseData => {
        dispatch({
          type: FORGOT_PASSWORD_SUCCESS
        });
      })
      .catch(error => {
        dispatch({
          type: FORGOT_PASSWORD_ERROR
        });
        alert('Ошибка при запросе на восстановление пароля: ' + error);
      });
  };
};

export const resetPassword = (newPassword, resetPasswordCode) => {
  const requestUrl = baseUrl + '/password-reset/reset';

  return function (dispatch) {
    dispatch({
      type: RESET_PASSWORD_REQUEST
    });

    request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: newPassword, token: resetPasswordCode })
    })
      .then(responseData => {
        dispatch({
          type: RESET_PASSWORD_SUCCESS
        });
      })
      .catch(error => {
        dispatch({
          type: RESET_PASSWORD_ERROR
        });
        alert('Ошибка при восстановлении пароля: ' + error);
      });
  };
};

export const logout = () => {
  const requestUrl = baseUrl + '/auth/logout';

  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });

    request(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: localStorage.getItem('refreshToken') ?? '' })
    })
      .then(responseData => {
        dispatch({
          type: LOGOUT_SUCCESS
        });
      })
      .catch(error => {
        dispatch({
          type: LOGOUT_ERROR
        });
        alert('Ошибка при выходе из системы: ' + error);
      });
  };
};

export const getUser = () => {
  const requestUrl = baseUrl + '/auth/user';

  return function (dispatch) {
    dispatch({
      type: GET_USER_REQUEST
    });

    requestWithRefresh(requestUrl, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + getCookie('accessToken')
      }
    })
      .then(responseData => {
        dispatch({
          type: GET_USER_SUCCESS,
          payload: responseData.user
        });
      })
      .catch(error => {
        dispatch({
          type: GET_USER_ERROR
        });
        alert('Ошибка загрузки пользователя: ' + error);
      });
  };
};

export const updateUser = (name, email, password) => {
  const requestUrl = baseUrl + '/auth/user';

  return function (dispatch) {
    dispatch({
      type: UPDATE_USER_REQUEST
    });

    requestWithRefresh(requestUrl, {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + getCookie('accessToken')
      },
      body: JSON.stringify({ name: name, email: email, password: password })
    })
      .then(responseData => {
        dispatch({
          type: UPDATE_USER_SUCCESS,
          payload: responseData.user
        });
      })
      .catch(error => {
        dispatch({
          type: UPDATE_USER_ERROR
        });
        alert('Ошибка обновления пользователя: ' + error);
      });
  };
};
