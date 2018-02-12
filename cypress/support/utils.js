export const visitHome = () => cy.visit('/')
export const visitAbout = () => cy.visit('/about')
export const visitCourses = () => cy.visit('/courses')
export const visitCourse = () => cy.visit('/courses/**')
export const currentUser = {
  email: 'test@test.com',
  password: 'thisisatest'
}
