import { selectors } from '../support/selectors';

describe('Отправка заказа', () => {
  beforeEach(() => {
    const email = 'karvraburcar@kpjprd.rs';
    const password = 'beograd';
    cy.viewport(1400, 1000);
    cy.visit('/login');
    cy.get('[data-testid=email_input]').type(`${email}`);
    cy.get('[data-testid=password_input]').type(`${password}{enter}`);
  });

  it('Заказ должен отправляться', () => {
    cy.get(selectors.ingredients.ingredient + ':eq(0)').trigger('dragstart');
    cy.get(selectors.constructor.container).trigger('drop');
    cy.get(selectors.constructor.bunTop).should('exist');
    cy.get(selectors.constructor.bunBottom).should('exist');

    cy.get(selectors.ingredients.ingredient + ':eq(3)').trigger('dragstart');
    cy.get(selectors.constructor.container).trigger('drop');
    cy.get(selectors.constructor.innerItems).should('not.be.empty');

    cy.get(selectors.constructor.submitOrderButton).should('not.have.attr', 'disabled');
    cy.get(selectors.constructor.submitOrderButton).click();

    cy.get(selectors.modal.container).should('exist');
    cy.get(selectors.modal.orderNumber, { timeout: 20000 }).should('not.be.empty');
    cy.get(selectors.modal.closeButton, { timeout: 25000 }).click();

    cy.get(selectors.modal.container).should('not.exist');
    cy.get(selectors.constructor.bunTop).should('not.exist');
    cy.get(selectors.constructor.bunBottom).should('not.exist');
    cy.get(selectors.constructor.innerItems).should('be.empty');
  });
});
