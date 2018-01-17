const functions = require('firebase-functions')
// const admin = require('firebase-admin')
const Mailerlite = require('mailerlite')
// const stripe = require('stripe')(functions.config().stripe.token)

// Configure Mailerlite
const mailerlite = new Mailerlite(functions.config().mailerlite.key)
const mailerliteSubscribers = mailerlite.Subscribers

// Configure stripe
// stripe.currency = functions.config().stripe.currency || 'USD'

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailConfirmation = functions.database.ref('/users/{uid}').onWrite(event => {
  const snapshot = event.data

  if (!snapshot.changed('subscribedToMailingList')) {
    return null
  }
})

exports.createCustomer = functions.auth.user().onCreate(event => {
  // user auth data
  const user = event.data
  const displayName = user.displayName

  return mailerliteSubscribers.addSubscriber('8738992', user.email, displayName, {}, 1)
    .then((res) => {
      console.log(res)
    })

  // register Stripe user
  // return stripe.customers.create({
  //   email: user.email
  // })
  //   .then(customer => {
  //     // update database with stripe customer id
  //     const updates = {}
  //     updates[`/customers/${customer.id}`] = user.uid
  //     updates[`/users/${user.uid}/customerId`] = customer.id
  //     return admin.database().ref().update(updates)
  //   })
})
