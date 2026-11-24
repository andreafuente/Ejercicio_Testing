
describe('Login - E2E', () => {
  it('should display the login form', () => {
    // Arrange
    cy.visit('/login');

    // Assert
    cy.get('input[name="user"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');

    cy.contains('button', 'Login').should('be.visible');
  });


it('should validate required fields when submitting empty form', () => {
  // Arrange
  cy.visit('/login');

  // Act
  cy.contains('button', 'Login').click();

  // Assert
  cy.get('input[name="user"]')
    .should('have.value', '');

  cy.get('input[name="password"]')
    .should('have.value', '');

  cy.get('input[name="user"]')
    .should('have.attr', 'aria-invalid', 'true');

  cy.get('input[name="password"]')
    .should('have.attr', 'aria-invalid', 'true');
});

it('should reject invalid login credentials', () => {
  // Arrange
  cy.visit('/login');

  // Act
  cy.get('input[name="user"]')
    .type('usuario_incorrecto');

  cy.get('input[name="password"]')
    .type('clave_incorrecta', { log: false });

  cy.contains('button', 'Login').click();

  // Assert
  cy.location('pathname')
    .should('eq', '/login');

  cy.get('input[name="user"]')
    .should('have.value', 'usuario_incorrecto');
});

it('should login successfully with valid credentials', () => {
  // Arrange
  cy.visit('/login');

  // Act
  cy.get('input[name="user"]')
    .type('admin');

  cy.get('input[name="password"]')
    .type('test', { log: false });

  cy.contains('button', 'Login').click();

  // Assert
  cy.location('hash')
    .should('eq', '#/submodule-list');
});

});
