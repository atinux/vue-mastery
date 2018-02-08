const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

module.exports = {
  account (id) {
    const accountPath = `accounts/${id}`
    return admin.database().ref(accountPath).once('value')
  },

  course (id) {
    const pathToCourse = `flamelink/environments/production/content/courses/en-US/${id}`
    return admin.database().ref(pathToCourse).once('value')
  }
}
