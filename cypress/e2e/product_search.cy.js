describe('Product Search and Navigation', () => {
  beforeEach(() => {
    cy.visit('http://hipermayorista.vercel.app')
  })

  it('should search for a product', () => {
    cy.get('input[name="search"]').type('Laptop{enter}')
    cy.url().should('include', 'search')
    cy.contains('"Laptop"')
  })

  it('should navigate to the catalog', () => {
    cy.get('a[href="/products"]').click()
    cy.url().should('include', '/products')
    cy.contains('Productos')
  })
})
