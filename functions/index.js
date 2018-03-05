const functions = require('firebase-functions')
const subscription = require('./subscription')
const db = require('./helpers')
// const payment = require('./payment')

module.exports = {
  // On account creation we add the user to mailerlite and create stripe account (phase 2)
  createCustomer: functions.auth.user()
    .onCreate(event => {
      const user = event.data
      // payment.register(user)
      return subscription.subscribeUser(user, 'main', true)
    }),

  // Subscribe a user to mailerLite according to his settings.
  subscribeUser: functions.database.ref('/accounts/{uid}')
    .onWrite(event => {
      const snapshot = event.data
      // If it's not a subscription change then return
      if (!snapshot.child('subscribedToMailingList').changed()) return null

      const val = snapshot.val()
      return subscription.subscribeUser(val, 'main', val.subscribedToMailingList)
    }),

  // Subscribe a user to a course on the mailerLite course list
  subscribeUserToCourse: functions.database.ref('/accounts/{uid}/courses/{cid}')
    .onWrite(event => {
      const snapshot = event.data

      // If it's not a subscription change then return
      if (!snapshot.child('subscribed').changed()) return null

      // Wait to get account email data and course title to subscribe the user
      return Promise.all([db.account(event.params.uid)])
        .then(results => results.map(result => result.val()))
        .then(([account]) => {
          // Get or create email course list
          subscription.getMailerList(`Course: ${event.params.cid}`)
            .then(listID => subscription.subscribeUser(account, listID, snapshot.val().subscribed))
        })
    }),

  // Subscribe a user to a course on the mailerLite course list
  sendContactForm: functions.database.ref('/flamelink/environments/production/content/contact/en-US/{cid}')
    .onCreate(event => {
      const snapshot = event.data
      let form = snapshot.val()
      return subscription.sendContactEmail({
        name: form.name,
        message: form.message,
        email: form.email
      })
    }),

  // Subscribe a user to a course on the mailerLite course list
  countLessonsInCourse: functions.database.ref('/flamelink/environments/production/content/courses/en-US/{cid}/lessons/{lid}')
    .onWrite(event => {
      const collectionRef = event.data.ref.parent
      const countRef = collectionRef.parent.child('lessonsCount')

      return collectionRef.once('value')
        .then(lessons => {
          const count = lessons.numChildren()
          console.log(`Lesson number recount: ${count}`)
          countRef.set(count)
        })
    })
}
