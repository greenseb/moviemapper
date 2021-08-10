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
    cy.get('[placeholder="Add link to location image"]').type('https://assets.cdn.moviepilot.de/files/51a8df6053dbdbd4c7b261318a848add7ab76097af8e8567c77fbf427c22/fill/1024/492/The_Hangover.jpg')
    cy.get('[placeholder="This place appeared in..."]').type('This is a crappy movie location, you would die')
    cy.get('select').select('5')
    cy.get('[placeholder="Add link to Youtube video"]').type('https://www.youtube.com/watch?v=xlrqaAjBwS4&ab_channel=hangover')

    cy.get('#addpin-btn').click()
    cy.get('body').click('center')

    cy.get('#location-image').click()
    cy.get('.clip').click()
    cy.get('#delete-btn').click()

  })
})