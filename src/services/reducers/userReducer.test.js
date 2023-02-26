import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  GET_USER_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_ERROR,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  UPDATE_USER_ERROR,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS
} from '../actions/userActions';
import { userReducer, initialState } from './userReducer';

describe('User - редьюсер и экшены', () => {
  test('Должно вернуться исходное состояние', () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  test('Логин - отправка запроса', () => {
    expect(userReducer(undefined, { type: LOGIN_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('Логин - успех', () => {
    expect(
      userReducer(undefined, {
        type: LOGIN_SUCCESS,
        payload: {
          name: 'Jack Maxwell',
          email: 'orion255@anotherfakeemailserver.net'
        }
      })
    ).toEqual({
      ...initialState,
      isAuthenticated: true,
      isLoading: false,
      error: '',
      userName: 'Jack Maxwell',
      userLogin: 'orion255@anotherfakeemailserver.net'
    });
  });

  test('Логин - ошибка', () => {
    expect(userReducer(undefined, { type: LOGIN_ERROR })).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка при входе'
    });
  });

  test('Регистрация - отправка запроса', () => {
    expect(userReducer(undefined, { type: REGISTER_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('Регистрация - успех', () => {
    expect(userReducer(undefined, { type: REGISTER_SUCCESS })).toEqual({
      ...initialState,
      isLoading: false,
      error: ''
    });
  });

  test('Регистрация - ошибка', () => {
    expect(userReducer(undefined, { type: REGISTER_ERROR })).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка при регистрации'
    });
  });

  test('Запрос на восстановление пароля - отправка запроса', () => {
    expect(userReducer(undefined, { type: FORGOT_PASSWORD_REQUEST })).toEqual({
      ...initialState
    });
  });

  test('Запрос на восстановление пароля - успех', () => {
    expect(userReducer(undefined, { type: FORGOT_PASSWORD_SUCCESS })).toEqual({
      ...initialState,
      isResettingPassword: true
    });
  });

  test('Запрос на восстановление пароля - ошибка', () => {
    expect(userReducer(undefined, { type: FORGOT_PASSWORD_ERROR })).toEqual({
      ...initialState
    });
  });

  test('Установка нового пароля - отправка запроса', () => {
    expect(userReducer(undefined, { type: RESET_PASSWORD_REQUEST })).toEqual({
      ...initialState
    });
  });

  test('Установка нового пароля - успех', () => {
    expect(userReducer(undefined, { type: RESET_PASSWORD_SUCCESS })).toEqual({
      ...initialState,
      isResettingPassword: false
    });
  });

  test('Установка нового пароля - ошибка', () => {
    expect(userReducer(undefined, { type: RESET_PASSWORD_ERROR })).toEqual({
      ...initialState
    });
  });

  test('Выход из системы - отправка запроса', () => {
    expect(userReducer(undefined, { type: LOGOUT_REQUEST })).toEqual({
      ...initialState
    });
  });

  test('Выход из системы - успех', () => {
    expect(userReducer(undefined, { type: LOGOUT_SUCCESS })).toEqual({
      ...initialState,
      userName: null,
      userLogin: null,
      isAuthenticated: false
    });
  });

  test('Выход из системы - ошибка', () => {
    expect(userReducer(undefined, { type: LOGOUT_ERROR })).toEqual({
      ...initialState
    });
  });

  test('Запрос информации о пользователе - отправка запроса', () => {
    expect(userReducer(undefined, { type: GET_USER_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('Запрос информации о пользователе - успех', () => {
    expect(
      userReducer(undefined, {
        type: GET_USER_SUCCESS,
        payload: {
          name: 'Martin Greiber',
          email: 'm.greiber@nonexistingmailserver.com'
        }
      })
    ).toEqual({
      ...initialState,
      userName: 'Martin Greiber',
      userLogin: 'm.greiber@nonexistingmailserver.com',
      isAuthenticated: true,
      isLoading: false,
      error: ''
    });
  });

  test('Запрос информации о пользователе - ошибка', () => {
    expect(userReducer(undefined, { type: GET_USER_ERROR })).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка загрузки данных пользователя'
    });
  });

  test('Обновление информации о пользователе - отправка запроса', () => {
    expect(userReducer(undefined, { type: UPDATE_USER_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('Обновление информации о пользователе - успех', () => {
    expect(userReducer(undefined, { type: UPDATE_USER_SUCCESS })).toEqual({
      ...initialState,
      isLoading: false,
      error: ''
    });
  });

  test('Обновление информации о пользователе - ошибка', () => {
    expect(userReducer(undefined, { type: UPDATE_USER_ERROR })).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Ошибка обновления пользователя'
    });
  });
});
