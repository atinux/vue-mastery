const functions = require('firebase-functions')
const Mailerlite = require('mailerlite')
const SparkPost = require('sparkpost')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)
// const stripe = require('stripe')(functions.config().stripe.token)

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
  const val = snapshot.val()

  if (!snapshot.changed('subscribedToMailingList')) {
    return null
  }

  const message = `${val.email} to mailing list`
  console.log(val.subscribedToMailingList ? `Subscribe ${message}` : `Unsubscribe ${message}`)
  return val.subscribedToMailingList ? subscribeUserToMailerList(val, mailerliteListId) : UnSubscribeUserToMailerList(val, mailerliteListId)
})

// Subscribe a user to a course on the mailerLite course list
exports.subscribeUserToMailerliteCourse = functions.database.ref('/accounts/{uid}/courses/{cid}').onWrite(event => {
  const snapshot = event.data
  const subscribed = snapshot.val().subscribed
  const courseID = event.params.cid
  const accountID = event.params.uid

  console.log('User Id: ', accountID, ' Course Id:', courseID)
  if (!snapshot.changed('subscribed')) {
    console.log('no changes')
    return null
  }
  // Get user email address
  const account = admin.database().ref(`accounts/${accountID}`)
  return account.on('value', (snapshotAccount) => {
    const accountVal = snapshotAccount.val()
    const email = accountVal.email
    // Get course name
    const pathToCourse = `flamelink/environments/production/content/courses/en-US/${courseID}`
    const course = admin.database().ref(pathToCourse)
    return course.on('value', (snapshotCourse) => {
      const title = snapshotCourse.val().title
      createMailerList(`Course: ${title}`).then((listID) => {
        const message = `${email} to mailing list`
        console.log(subscribed ? `Subscribe ${message}` : `Unsubscribe ${message}`)
        return subscribed ? subscribeUserToMailerList(accountVal, listID) : UnSubscribeUserToMailerList(accountVal, listID)
      })
    })
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

function subscribeUserToMailerList (user, mailerliteListId) {
  return mailerliteSubscribers.addSubscriber(mailerliteListId, user.email, user.displayName, {}, 1)
    .then((res) => {
      console.log(res)
    })
}

function testIfMailerListExist (mailerliteListName) {
  return mailerliteList.getAll().then((res) => {
    let list = res.Results.filter((list) => {
      return list.name === mailerliteListName
    })
    if (list.length) {
      return list[0].id
    } else {
      return false
    }
  })
}

function createMailerList (mailerliteListName) {
  return testIfMailerListExist(mailerliteListName).then((listId) => {
    if (listId) {
      console.log('YOLO the list exist with id: ', listId)
      return listId
    } else {
      console.log('Creating list named', mailerliteListName)
      return mailerliteList.addList(mailerliteListName).then((res) => {
        console.log('New list created', res)
        return res.id
      })
    }
  })
}

function UnSubscribeUserToMailerList (user, mailerliteListId) {
  return mailerliteSubscribers.deleteSubscriber(mailerliteListId, user.email)
    .then((res) => {
      console.log(res)
    })
}
