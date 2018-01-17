const functions = require('firebase-functions')
const Mailerlite = require('mailerlite')

// Configure Mailerlite
const mailerlite = new Mailerlite(functions.config().mailerlite.key)
const mailerliteSubscribers = mailerlite.Subscribers

exports.createCustomer = functions.auth.user().onCreate(event => {
  // user auth data
  const user = event.data
  const displayName = user.displayName

  return mailerliteSubscribers.addSubscriber('8738992', user.email, displayName, {}, 1)
    .then((res) => {
      console.log(res)
    })
})
