export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';

export const handleRemoveItem = item => {
  return {
    type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
    payload: item
  };
};
