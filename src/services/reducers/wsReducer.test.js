import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE
} from '../actions/wsActions';
import { wsReducer, initialState } from './wsReducer';

describe('Websocket - редьюсер и экшены', () => {
  const testWsMessage = {
    success: true,
    orders: [
      {
        _id: '63ec88e7936b17001be5df11',
        ingredients: [
          '60d3b41abdacab0026a733c7',
          '60d3b41abdacab0026a733c9',
          '60d3b41abdacab0026a733c9',
          '60d3b41abdacab0026a733d1',
          '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Бессмертный фалленианский флюоресцентный бургер',
        createdAt: '2023-02-15T07:25:27.868Z',
        updatedAt: '2023-02-15T07:25:28.269Z',
        number: 40846
      },
      {
        _id: '63ec7f31936b17001be5defc',
        ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c6'],
        status: 'done',
        name: 'Краторный бургер',
        createdAt: '2023-02-15T06:44:01.872Z',
        updatedAt: '2023-02-15T06:44:02.362Z',
        number: 40845
      },
      {
        _id: '63ec7ed7936b17001be5defa',
        ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c6'],
        status: 'done',
        name: 'Краторный бургер',
        createdAt: '2023-02-15T06:42:31.280Z',
        updatedAt: '2023-02-15T06:42:31.647Z',
        number: 40844
      },
      {
        _id: '63ec7e7c936b17001be5def6',
        ingredients: [
          '60d3b41abdacab0026a733c7',
          '60d3b41abdacab0026a733c9',
          '60d3b41abdacab0026a733c7'
        ],
        status: 'done',
        name: 'Бессмертный флюоресцентный бургер',
        createdAt: '2023-02-15T06:41:00.579Z',
        updatedAt: '2023-02-15T06:41:00.997Z',
        number: 40843
      },
      {
        _id: '63ec7e57936b17001be5def1',
        ingredients: ['60d3b41abdacab0026a733c6', '60d3b41abdacab0026a733c6'],
        status: 'done',
        name: 'Краторный бургер',
        createdAt: '2023-02-15T06:40:23.936Z',
        updatedAt: '2023-02-15T06:40:24.347Z',
        number: 40842
      }
    ],
    total: 40755,
    totalToday: 106
  };

  test('Должно вернуться исходное состояние', () => {
    expect(wsReducer(undefined, {})).toEqual(initialState);
  });

  test('Успешное подключение к сокету', () => {
    expect(wsReducer(undefined, { type: WS_CONNECTION_SUCCESS })).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: true
    });
  });

  test('Ошибка подключения к сокету', () => {
    expect(wsReducer(undefined, { type: WS_CONNECTION_ERROR })).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false
    });
  });

  test('Подключение к сокету закрыто', () => {
    expect(wsReducer(undefined, { type: WS_CONNECTION_CLOSED })).toEqual({
      ...initialState,
      error: undefined,
      wsConnected: false
    });
  });

  test('Получено сообщение', () => {
    expect(
      wsReducer(undefined, {
        type: WS_GET_MESSAGE,
        payload: testWsMessage
      })
    ).toEqual({
      ...initialState,
      error: undefined,
      orders: testWsMessage.orders,
      totalOrders: testWsMessage.total,
      totalOrdersToday: testWsMessage.totalToday
    });
  });
});
