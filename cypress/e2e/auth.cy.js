import { selectors } from '../support/selectors';

describe('UI тесты', () => {
  beforeEach(() => {
    const email = 'karvraburcar@kpjprd.rs';
    const password = 'beograd';
    cy.viewport(1400, 1000);
    cy.visit('/login');
    cy.get(selectors.login.emailField).type(`${email}`);
    cy.get(selectors.login.passwordField).type(`${password}{enter}`);
  });

  it('Должно отображаться имя пользователя', () => {
    cy.get(selectors.header.personalText).should('have.text', 'Karaburma');
  });
});
