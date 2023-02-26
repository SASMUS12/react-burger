import {
  ADD_BUN_TO_CONSTRUCTOR,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR,
  GET_INGREDIENTS_ERROR,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_ORDER_INFO_ERROR,
  GET_ORDER_INFO_REQUEST,
  GET_ORDER_INFO_SUCCESS,
  REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  SEND_ORDER_ERROR,
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS
} from '../actions/burgerConstructorActions';
import { burgerConstructorReducer, initialState } from './burgerConstructorReducer';

describe('Burger constructor - редьюсер и экшены', () => {
  const testBurgerConstructorAllIngredients = [
    {
      _id: '60d3b41abdacab0026a733d2',
      name: 'Кристаллы марсианских альфа-сахаридов',
      type: 'main',
      proteins: 234,
      fat: 432,
      carbohydrates: 111,
      calories: 189,
      price: 762,
      image: 'https://code.s3.yandex.net/react/code/core.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
      __v: 0
    },
    {
      _id: '60d3b41abdacab0026a733d3',
      name: 'Мини-салат Экзо-Плантаго',
      type: 'main',
      proteins: 1,
      fat: 2,
      carbohydrates: 3,
      calories: 6,
      price: 4400,
      image: 'https://code.s3.yandex.net/react/code/salad.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
      __v: 0
    },
    {
      _id: '60d3b41abdacab0026a733d4',
      name: 'Сыр с астероидной плесенью',
      type: 'main',
      proteins: 84,
      fat: 48,
      carbohydrates: 420,
      calories: 3377,
      price: 4142,
      image: 'https://code.s3.yandex.net/react/code/cheese.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
      __v: 0
    }
  ];

  const testBurgerConstructorIngredients = [
    {
      _id: '60d3b41abdacab0026a733c8',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0,
      constructorId: '330f0b37-2a9a-484b-be1e-81d7dbe3dad2'
    },
    {
      _id: '60d3b41abdacab0026a733cf',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
      __v: 0,
      constructorId: '280839f6-d61c-4730-ab32-80cf54e58456'
    },
    {
      _id: '60d3b41abdacab0026a733cb',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
      constructorId: 'be1037a9-a0d5-4cb4-86f9-22e85ae2be77'
    }
  ];

  const testBurgerConstructorIngredientsAfterRemoval = [
    {
      _id: '60d3b41abdacab0026a733c8',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0,
      constructorId: '330f0b37-2a9a-484b-be1e-81d7dbe3dad2'
    },
    {
      _id: '60d3b41abdacab0026a733cf',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
      __v: 0,
      constructorId: '280839f6-d61c-4730-ab32-80cf54e58456'
    }
  ];

  const testBurgerConstructorIngredientsAfterAdding = [
    {
      _id: '60d3b41abdacab0026a733c8',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0,
      constructorId: '330f0b37-2a9a-484b-be1e-81d7dbe3dad2'
    },
    {
      _id: '60d3b41abdacab0026a733cf',
      name: 'Соус с шипами Антарианского плоскоходца',
      type: 'sauce',
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
      __v: 0,
      constructorId: '280839f6-d61c-4730-ab32-80cf54e58456'
    },
    {
      _id: '60d3b41abdacab0026a733cb',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
      constructorId: 'be1037a9-a0d5-4cb4-86f9-22e85ae2be77'
    },
    {
      _id: '60d3b41abdacab0026a733ca',
      name: 'Говяжий метеорит (отбивная)',
      type: 'main',
      proteins: 800,
      fat: 800,
      carbohydrates: 300,
      calories: 2674,
      price: 3000,
      image: 'https://code.s3.yandex.net/react/code/meat-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
      __v: 0,
      constructorId: '2d9fd75e-3596-441d-87be-187a07f34960'
    }
  ];

  const testBurgerConstructorBun = {
    _id: '60d3b41abdacab0026a733c7',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
    __v: 0,
    constructorId: '1654127e-95c6-4a44-b47f-28b4d00e1638'
  };

  const testAddedIngredient = {
    _id: '60d3b41abdacab0026a733ca',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
    constructorId: '2d9fd75e-3596-441d-87be-187a07f34960'
  };

  test('Должно вернуться исходное состояние', () => {
    expect(burgerConstructorReducer(undefined, {})).toEqual(initialState);
  });

  test('Запрос ингредиентов с сервера - отправка запроса', () => {
    expect(burgerConstructorReducer(undefined, { type: GET_INGREDIENTS_REQUEST })).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  test('Запрос ингредиентов с сервера - успех', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: GET_INGREDIENTS_SUCCESS,
        payload: testBurgerConstructorAllIngredients
      })
    ).toEqual({
      ...initialState,
      allIngredients: testBurgerConstructorAllIngredients,
      isLoading: false,
      error: ''
    });
  });

  test('Запрос ингредиентов с сервера - ошибка', () => {
    expect(burgerConstructorReducer(undefined, { type: GET_INGREDIENTS_ERROR })).toEqual({
      ...initialState,
      isLoading: false,
      error: 'Не удалось загрузить ингредиенты'
    });
  });

  test('Отправка заказа - отправка запроса', () => {
    expect(burgerConstructorReducer(undefined, { type: SEND_ORDER_REQUEST })).toEqual({
      ...initialState
    });
  });

  test('Отправка заказа - успех', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: SEND_ORDER_SUCCESS,
        payload: 25819
      })
    ).toEqual({
      ...initialState,
      orderNumber: 25819
    });
  });

  test('Отправка заказа - ошибка', () => {
    expect(burgerConstructorReducer(undefined, { type: SEND_ORDER_ERROR })).toEqual({
      ...initialState
    });
  });

  test('Добавление соуса или начинки в заказ', () => {
    expect(
      burgerConstructorReducer(
        {
          ...initialState,
          constructorIngredients: testBurgerConstructorIngredients
        },
        {
          type: ADD_INGREDIENT_TO_CONSTRUCTOR,
          payload: testAddedIngredient
        }
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: testBurgerConstructorIngredientsAfterAdding
    });
  });

  test('Добавление булки в заказ', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: ADD_BUN_TO_CONSTRUCTOR,
        payload: testBurgerConstructorBun
      })
    ).toEqual({
      ...initialState,
      constructorBun: testBurgerConstructorBun
    });
  });

  test('Удаление ингредиента из заказа', () => {
    expect(
      burgerConstructorReducer(
        {
          ...initialState,
          constructorIngredients: testBurgerConstructorIngredients
        },
        {
          type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
          payload: 'be1037a9-a0d5-4cb4-86f9-22e85ae2be77'
        }
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: testBurgerConstructorIngredientsAfterRemoval
    });
  });

  test('Очистка заказа', () => {
    expect(
      burgerConstructorReducer(
        {
          ...initialState,
          constructorIngredients: testBurgerConstructorIngredients,
          constructorBun: testBurgerConstructorBun
        },
        { type: CLEAR_CONSTRUCTOR }
      )
    ).toEqual({
      ...initialState,
      constructorIngredients: [],
      constructorBun: null
    });
  });

  test('Запрос информации о конкретном заказе - отправка запроса', () => {
    expect(burgerConstructorReducer(undefined, { type: GET_ORDER_INFO_REQUEST })).toEqual({
      ...initialState
    });
  });

  test('Запрос информации о конкретном заказе - успех', () => {
    expect(
      burgerConstructorReducer(undefined, {
        type: GET_ORDER_INFO_SUCCESS,
        payload: 32861
      })
    ).toEqual({
      ...initialState,
      currentOrder: 32861
    });
  });

  test('Запрос информации о конкретном заказе - ошибка', () => {
    expect(burgerConstructorReducer(undefined, { type: GET_ORDER_INFO_ERROR })).toEqual({
      ...initialState
    });
  });
});
