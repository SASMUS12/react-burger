import { selectors } from '../support/selectors';

describe('Открытие и закрытие модального окна', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1400, 1000);
  });

  it('Должно открываться и закрываться модальное окно с информацией об ингредиенте', () => {
    cy.get(selectors.ingredients.ingredient + ':eq(2)').click();
    cy.get(selectors.modal.container).should('exist');
    cy.get(selectors.modal.container + ' h2').contains('Детали ингредиента');

    cy.get(selectors.modal.closeButton).click();
    cy.get(selectors.modal.container).should('not.exist');
  });
});
