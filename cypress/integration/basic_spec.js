let liveSite = 'https://vue-mastery.firebaseapp.com/'

describe('Test homepage elements', function () {
  beforeEach(function () {
    cy.visit(liveSite)
  })

  it('Test that the <title> is correct', function () {
    cy.title().should('include', 'Home page')
    //   ↲               ↲            ↲
    // subject        chainer      value
  })

  it('Home page should contain 3 free videos', function () {
    // https://on.cypress.io/contains
    cy.get('.free-videos .media-block')
      .should('have.length', 3)
  })

  it('Home page should contain 3 free videos', function () {
    // https://on.cypress.io/contains
    cy.get('.free-videos .media-block')
      .should('have.length', 3)
  })
})
