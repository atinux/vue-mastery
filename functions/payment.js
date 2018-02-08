const functions = require('firebase-functions')
const admin = require('firebase-admin')
const stripe = require('stripe')(functions.config().stripe.token)

// Configure stripe
stripe.currency = functions.config().stripe.currency || 'USD'

module.exports = {
  // register Stripe user
  register (user) {
    return stripe.customers.create({
      email: user.email
    })
      .then(customer => {
        // update database with stripe customer id
        const updates = {}
        updates[`/accounts/${user.uid}/customerId`] = customer.id
        return admin.database().ref().update(updates)
      })
  }
}
