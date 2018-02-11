/* eslint-env mocha */
/* global cy, File */

// TODO: test scenarios:
//
// Home page
//
// New user should be created
// - Visit the home page
// - Click on sign up
// - Popup should appear
// - Enter email and password
// - Click on sign up
// - Wait for response
// - User should be visible in header

// User can logout
// - Visit the home page
// - Click on logout
// - User should be not visible in header

// New user with google account should be created
// - Visit the home page
// - Click on sign up
// - Popup should appear
// - Click on sign up with google
// - Wait for response
// - User should be visible in header

// New user with github account should be created
// - Visit the home page
// - Click on sign up
// - Popup should appear
// - Click on sign up with github
// - Wait for response
// - User should be visible in header

//
// Lesson page
//
// Test end event video
// - Visit the lesson page
// - Click the play button
// - Should play the video

// Test end event video
// - Visit the lesson page
// - Play the video
// - At the end the popup should appear

// Mark the lesson as complete
// - Visit the lesson page
// - Click on complete toggle
// - The video should be mark as completed

// The subscribe button should not be visible if user not log in
// - Visit the lesson page
// - Subscribe button should not be visible

// The subscribe button should  visible if user log in
// - Visit the lesson page
// - Login user
// - Subscribe button should be visible
// - Logout user
// - Subscribe button should not be visible

// The Subscribed lesson should be reset on user logout
// - Visit the lesson page
// - Login user
// - Click on subscribe toggle
// - Logout user
// - Lesson uncompleted should not be visible

// The completed toggle should not be visible if user not log in
// - Visit the lesson page
// - Completed toggle should be visible

// The completed toggle should be visible if user is log in
// - Visit the lesson page
// - Login user
// - Completed toggle should not be visible

// Completed lesson should be reset on user logout
// - Visit the lesson page
// - Click on complete toggle
// - Logout the user
// - lesson should be mark as uncompleted

// Test closing next video popup
// - Visit the lesson page
// - Play the video
// - At the end the popup should appear
// - Click to close video
// - Should close the popup
// - The lesson should be the same
// - The current lesson should be mark as completed

// Test closing next video popup
// - Visit the lesson page
// - Play the video
// - At the end the popup should appear
// - Click next lesson button
// - Should close the popup
// - The lesson should not be the same

//

import {
  resetDatabase,
  visit,
  getTodoApp,
  enterTodo,
  getTodoItems,
  getNewTodoInput
} from '../support/utils'

it('loads the app', () => {
  visit()
  getTodoApp().should('be.visible')
})

describe('UI', () => {
  beforeEach(resetDatabase)
  beforeEach(() => visit())

  context('basic features', () => {
    it('loads application', () => {
      getTodoApp().should('be.visible')
    })

    it('starts with zero items', () => {
      cy.get('.todo-list').find('li').should('have.length', 0)
    })

    it('adds two items', () => {
      enterTodo('first item')
      enterTodo('second item')
      getTodoItems().should('have.length', 2)
    })

    it('enters text in the input', () => {
      const text = 'do something'
      getNewTodoInput().type(text)
      getNewTodoInput().should('have.value', text)
    })

    it('can add many items', () => {
      const N = 100
      for (let k = 0; k < N; k += 1) {
        enterTodo(`item ${k + 1}`)
      }
      getTodoItems().should('have.length', N)
    })
  })

  context('advanced', () => {
    it('adds two and deletes first', () => {
      enterTodo('first item')
      enterTodo('second item')

      getTodoItems()
        .contains('first item')
        .parent()
        .find('.destroy')
        .click({ force: true }) // because it only becomes visible on hover

      cy.contains('first item').should('not.exist')
      cy.contains('second item').should('exist')
      getTodoItems().should('have.length', 1)
    })
  })

  it('uploads file with todos', () => {
    let testFile

    // reads test data from JSON file, makes test File object
    cy.fixture('example.json').then(todos => {
      const text = JSON.stringify(todos)
      testFile = new File([text], 'example.json')
    })
    // sets test File object on the Vue component
    cy.window().its('app').then(app => {
      app.file = testFile
    })
    // triggers reading File object
    cy.get('#todo-file-upload').trigger('change')

    // asserts that items from test JSON file have been
    // rendered correctly by the component
    getTodoItems().should('have.length', 4)
    getTodoItems().eq(1).find('.toggle').should('be.checked')
  })
})
