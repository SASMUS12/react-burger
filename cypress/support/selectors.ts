export const selectors = {
  login: {
    emailField: '[data-testid=email_input]',
    passwordField: '[data-testid=password_input]'
  },

  header: {
    personalText: '[data-testid=personalText]'
  },

  modal: {
    container: '[data-testid=modalContainer]',
    orderNumber: '[data-test=orderNumber]',
    closeButton: '[data-testid=modalCloseButton]'
  },

  ingredients: {
    ingredient: '[data-test=ingredientListItem]'
  },

  constructor: {
    container: '[data-test=constructorContainer]',
    bunTop: '[data-test=constructorBunTop]',
    bunBottom: '[data-test=constructorBunBottom]',
    innerItems: '[data-test=constructorInnerItems]',
    submitOrderButton: '[data-test=submitOrderButton]'
  }
};
