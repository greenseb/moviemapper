describe('E2E test', () => {
  it('does it all', () => {
    cy.visit('http://localhost:3000', { timeout: 30000 })

    cy.contains('Register').click()

    cy.get('[placeholder=username]').type('John')
    cy.get('[placeholder=email]').type('john@aceoptions.me')
    cy.get('[placeholder=password]').type('john')

    cy.get('#register-btn').click()
    cy.contains('Logout').click()

    cy.contains('Login').click()

    cy.get('[placeholder=username]').type('John')
    cy.get('[placeholder=password]').type('john')

    cy.get('#login-btn').click()

    cy.wait(1000)

    cy.get('body').dblclick('center')

    cy.get('[placeholder="Enter a location"]').type('My house in the atlantic')
    cy.get('[placeholder="This place appeared in..."]').type('This is a crappy movie location, you would die')
    cy.get('select').select('5')

    cy.get('#addpin-btn').click()
  })
})