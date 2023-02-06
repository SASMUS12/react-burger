export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';  //НАБОР ОТДЕЛЬНЫХ ДЕТАЛЕЙ
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS' //ОЧИСТКА ДЕТАЛЕЙ ИНГРЕДИЕНТОВ

export const setIngredientDetails = (data) => {
  return {
    type: SET_INGREDIENT_DETAILS,
    payload: data
  }
}

export const clearIngredientDetails = () => {
  return {
    type: CLEAR_INGREDIENT_DETAILS,
  }
}
