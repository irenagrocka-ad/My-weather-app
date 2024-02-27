describe('test forecast app', () => {
  beforeEach(() => {
    cy.visit('/')

  })
  it('loads the page ad conduct search', () => {
    cy.url().should('include', '/');
    cy.get('#search-button').should('contain', 'Search');
    cy.get('#search-input').should('be.visible').type('Lisbon');
    cy.get('#search-button').click();
    cy.get('#current-city').should('contain', 'Lisbon');
  })
})