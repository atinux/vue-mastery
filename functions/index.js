const functions = require('firebase-functions')
const Mailerlite = require('mailerlite')
const SparkPost = require('sparkpost')
const admin = require('firebase-admin')
// const stripe = require('stripe')(functions.config().stripe.token)

admin.initializeApp(functions.config().firebase)

// Configure Mailerlite
const mailerlite = new Mailerlite(functions.config().mailerlite.key)
const mailerliteListId = '9028842' // "VueMastery.com New Users" group
const mailerliteSubscribers = mailerlite.Subscribers
const mailerliteList = mailerlite.Lists

// Configure stripe
// stripe.currency = functions.config().stripe.currency || 'USD'

// Subscribe a user to mailerLite according to his settings.
exports.subscribeUserToMailerlite = functions.database.ref('/accounts/{uid}').onWrite(event => {
  const snapshot = event.data

  // If it's not a subscription change then return
  if (!snapshot.child('subscribedToMailingList').changed()) return null

  const val = snapshot.val()
  return subscribeUser(val, mailerliteListId, val.subscribedToMailingList)
})

// Subscribe a user to a course on the mailerLite course list
exports.subscribeUserToMailerliteCourse = functions.database.ref('/accounts/{uid}/courses/{cid}').onWrite(event => {
  const snapshot = event.data

  // If it's not a subscription change then return
  if (!snapshot.child('subscribed').changed()) return null

  const subscribing = snapshot.val().subscribed
  const courseID = event.params.cid
  const accountID = event.params.uid
  // Get user email address
  const accountPath = `accounts/${accountID}`
  const accountRef = admin.database().ref(accountPath).once('value')
  // Get course name
  const pathToCourse = `flamelink/environments/production/content/courses/en-US/${courseID}`
  const courseRef = admin.database().ref(pathToCourse).once('value')

  return Promise.all([accountRef, courseRef])
    .then(results => results.map(result => result.val()))
    .then(([account, course]) => {
      getMailerList(`Course: ${course.title}`)
        .then(listID => subscribeUser(account, listID, subscribing))
    })
})

// Subscribe a user to a course on the mailerLite course list
exports.countLessonsInCourse = functions.database.ref('/flamelink/environments/production/content/courses/en-US/{cid}/lessons/{lid}').onWrite(event => {
  const collectionRef = event.data.ref.parent
  const countRef = collectionRef.parent.child('lessonsCount')

  // Return the promise from countRef.transaction() so our function
  // waits for this async event to complete before it exits.
  return countRef.transaction(current => {
    if (event.data.exists() && !event.data.previous.exists()) {
      return (current || 0) + 1
    } else if (!event.data.exists() && event.data.previous.exists()) {
      return (current || 0) - 1
    }
  }).then(() => {
    console.log('Counter updated.')
  })
})

// Sends an email to the user when he forget his password.
// TODO: remove this if we don't use sparkpost. (NB: this as not been tested)
exports.sendEmailForgetPassword = functions.database.ref('/users/{uid}').onWrite(event => {
  const snapshot = event.data
  const val = snapshot.val()

  if (!snapshot.changed('forgetPassword')) {
    return null
  }

  const client = new SparkPost(functions.config().sparkpost.key)
  client.transmissions.send({
    transmissionBody: {
      recipients: [{ address: { email: val.email } }],
      content: {
        template_id: 'my-first-email'
      },
      substitution_data: {'name': val.displayName},
      campaign_id: 'welcome'
    }
  }, (err, res) => {
    if (err) {
      console.log(err.stack)
    } else {
      console.log(`Email Sent for test to ${val.email}`)
    }
  })
})

exports.createCustomer = functions.auth.user().onCreate(event => {
  // user auth data
  const user = event.data
  const displayName = user.displayName

  return mailerliteSubscribers.addSubscriber(mailerliteListId, user.email, displayName, {}, 1)
    .then((res) => {
      console.log(res)
    })

  // TODO: remove this if we don't use strip. (NB: this as not been tested)
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

function subscribeUser (account, listID, isSubcribing) {
  if (isSubcribing) {
    console.log(`Subscribe ${account.email} to mailing list ${listID}`)
    return mailerliteSubscribers.addSubscriber(listID, account.email, account.displayName, {}, 1)
  } else {
    console.log(`Unsubscribe ${account.email} from mailing list ${listID}`)
    return mailerliteSubscribers.deleteSubscriber(listID, account.email)
  }
}

function getMailerList (mailerliteListName) {
  return mailerliteList.getAll().then((res) => {
    let list = res.Results.filter(list => list.name === mailerliteListName)
    if (list.length) {
      console.log(`Using list: ${mailerliteListName}`)
      return list[0].id
    } else {
      console.log(`Create new list: ${mailerliteListName}`)
      return mailerliteList.addList(mailerliteListName).then(res => res.id)
    }
  })
}
