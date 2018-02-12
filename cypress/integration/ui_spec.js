/* eslint-env mocha */
/* global cy, File */
import {
  visitHome,
  // visitAbout,
  // visitCourses,
  // visitCourse,
  currentUser
} from '../support/utils'

describe('UI on Homepage', () => {
  beforeEach(visitHome)

  context('Sign up and delete account', () => {
    it('sets auth cookie when logging in via form submission', () => {
      // destructuring assignment of the this.currentUser object
      const { email, password } = currentUser

      cy.contains('.navbar-secondary', 'Sign Up').click()
      cy.get('input[type=email]').type(email)

      // {enter} causes the form to submit
      cy.get('input[type=password]').type(password)

      cy.get('form').submit()

      // we should be redirected to /account
      cy.url().should('include', '/account')

      // our auth cookie should be present
      // cy.getCookie('your-session-cookie').should('exist')

      // UI should reflect this user being logged in
      // cy.get('h1').should('contain', 'jane.lane')
    })
  })

  context('Should delete account', () => {
    it('sets auth cookie when logging in via form submission', () => {
      // destructuring assignment of the this.currentUser object
      const { email, password } = currentUser

      cy.contains('.navbar-secondary', 'Sign Up').click()
      cy.get('input[type=email]').type(email)

      // {enter} causes the form to submit
      cy.get('input[type=password]').type(password)

      cy.get('form').submit()

      // we should be redirected to /account
      cy.url().should('include', '/account')

      cy.contains('button', 'Delete Account').click()

      cy.url().should('eq', 'http://localhost:3000/')

      // our auth cookie should be present
      // cy.getCookie('your-session-cookie').should('exist')

      // UI should reflect this user being logged in
      // cy.get('h1').should('contain', 'jane.lane')
    })
  })

  /*
  context('Sign up test', () => {
    it('New user with email and password should be created', () => {
      // - Click on sign up
      // - Popup should appear
      // - Enter email and password
      // - Click on sign up
      // - Wait for response
      // - User should be visible in header
    })

    it('New user with google account should be created', () => {
      // - Click on sign up
      // - Popup should appear
      // - Click on sign up with google
      // - Wait for response
      // - User should be visible in header
    })

    it('New user with github account should be created', () => {
      // - Click on sign up
      // - Popup should appear
      // - Click on sign up with github
      // - Wait for response
      // - User should be visible in header
    })
  })

  context('Logout test', () => {
    it('User can logout', () => {
      // - Click on logout
      // - User should be not visible in header
    })
  })
})

describe('UI on Lesson page', () => {
  beforeEach(visitCourse)

  context('Video component', () => {
    it('Video should be visible', () => {
      // - Video component should be visible
    })

    it('Video should play', () => {
      // - Click the play button
      // - Should play the video
    })

    it('Next lesson popup should appear at the end of the video', () => {
      // - Play the video button
      // - At the end the popup should appear
    })
  })

  context('Lessons list component', () => {
    it('Mark the lesson as complete', () => {
      // - Click on complete toggle
      // - The video should be mark as completed
    })

    it('The completed toggle should not be visible if user not log in', () => {
      // - Logout user
      // - Visit the lesson page
      // - Completed toggle should be visible
    })

    it('The completed toggle should be visible if user is log in', () => {
      // - Login user
      // - Completed toggle should not be visible
    })

    it('Completed lesson should be reset on user logout', () => {
      // - Click on complete toggle
      // - Logout the user
      // - lesson should be mark as uncompleted
    })

    it('At the end of the video the lesson should be marked as completed', () => {
      // - Play the video button
      // - At the end the current lesson should be mark as completed
    })
  })

  context('Subscribe button', () => {
    it('The subscribe button should not be visible if user not log in', () => {
      // - Visit the lesson page
      // - Subscribe button should not be visible
    })

    it('The subscribe button should  visible if user log in', () => {
      // - Login user
      // - Subscribe button should be visible
      // - Logout user
      // - Subscribe button should not be visible
    })

    it('The Subscribed lesson should be reset on user logout', () => {
      // - Login user
      // - Click on subscribe toggle
      // - Logout user
      // - Lesson uncompleted should not be visible
    })
  })

  context('Next lesson popup component', () => {
    it('The video should open', () => {
      // - Open the popup
      // - The popup should be visible
    })

    it('The popup should open at the end of the video', () => {
      // - Play the video
      // - At the end the popup should appear
    })

    it('Closing the popup', () => {
      // - Click to close video
      // - The lesson should be the same
      // - Should close the popup
    })

    it('Closing the popup with background', () => {
      // - Click on the backgrouns to close video
      // - The lesson should be the same
      // - Should close the popup
    })

    it('Next lesson should appear', () => {
      // - Click on the next button
      // - Should close the popup
      // - The lesson should not be the same
    })
  })
  */
})
