import { selectors } from '../support/selectors';

describe("Drag'n'Drop", () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1400, 1000);
  });

  describe('Перетаскивание ингредиентов в конструктор', () => {
    it('Перетаскивание булки', () => {
      // Ждем загрузку первого ингредиента
      cy.wait(1000);
      cy.get(selectors.ingredients.ingredient + ':eq(0)').trigger('dragstart');

      cy.get(selectors.constructor.container).should('exist');
      cy.get(selectors.constructor.container).trigger('drop');

      cy.get(selectors.constructor.bunTop).should('exist');
      cy.get(selectors.constructor.bunBottom).should('exist');

      cy.get(selectors.ingredients.ingredient + ':eq(3)').trigger('dragstart');
      cy.get(selectors.constructor.container).trigger('drop');
      cy.get(selectors.constructor.innerItems).should('not.be.empty');
    });
  });
});
