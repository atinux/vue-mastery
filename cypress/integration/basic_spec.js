const liveSite = 'https://vue-mastery.firebaseapp.com/'

describe('Test homepage elements', function () {
  beforeEach(function () {
    cy.visit(liveSite)
  })

  context('Home page basic features', () => {
    it('Test that the <title> is correct', function () {
      cy.title().should('include', 'Home page')
    })

    it('Home page should contain 3 free videos', function () {
      cy.get('.free-videos .media-block')
        .should('have.length', 3)
    })

    it('Home page should contain 3 courses', function () {
      cy.get('.course-list .list-card')
        .should('have.length', 3)
    })

    it('Home page should contain one hero section', function () {
      cy.get('.hero')
        .should('have.length', 1)
    })

    it('Home page should contain one free videos section', function () {
      cy.get('.free-videos')
        .should('have.length', 1)
    })

    it('Home page should contain one courses list section', function () {
      cy.get('.course-list')
        .should('have.length', 1)
    })

    it('Home page should contain one meet the teachers section', function () {
      cy.get('.meet-teachers')
        .should('have.length', 1)
    })

    it('Home page should contain one cheatsheet section', function () {
      cy.get('.cheatsheet')
        .should('have.length', 1)
    })

    it('Home page should contain one community section', function () {
      cy.get('.community')
        .should('have.length', 1)
    })

    it('Home page should contain one banner section', function () {
      cy.get('.banner')
        .should('have.length', 5)
    })

    it('Home page should contain one footer section', function () {
      cy.get('.footer')
        .should('have.length', 1)
    })
  })
})

describe('Test Courses elements', function () {
  beforeEach(function () {
    cy.visit(liveSite + '/courses')
  })
  context('Courses page basic features', () => {
    it('Test that the <title> is correct', function () {
      cy.title().should('include', 'Courses page')
    })

    it('Courses page should contain 3 lessons', function () {
      cy.get('.courses-body .list-card')
        .should('not.be.empty')
    })

    it('Courses page should contain 3 latest videos', function () {
      cy.get('.card .media-block')
        .should('have.length', 3)
    })

    it('Courses page should contain one hero section', function () {
      cy.get('.courses-header')
        .should('have.length', 1)
    })

    it('Courses page should contain one courses body section', function () {
      cy.get('.courses-body')
        .should('have.length', 1)
    })

    it('Courses page should contain one banner section', function () {
      cy.get('.banner')
        .should('have.length', 2)
    })

    it('Courses page should contain one footer section', function () {
      cy.get('.footer')
        .should('have.length', 1)
    })
  })
})
