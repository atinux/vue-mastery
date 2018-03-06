const functions = require('firebase-functions')
const Mailerlite = require('mailerlite')
const mailerlite = new Mailerlite(functions.config().mailerlite.key)
const mailerliteSubscribers = mailerlite.Subscribers
const mailerliteList = mailerlite.Lists
// const SparkPost = require('sparkpost')

const nodemailer = require('nodemailer')
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

module.exports = {
  subscribeUser (account, listID, isSubcribing) {
    if (isSubcribing) {
      console.log(`Subscribe ${account.email} to mailing list ${listID}`)
      return mailerliteSubscribers.addSubscriber(listID, account.email, account.displayName, {}, 1)
    } else {
      console.log(`Unsubscribe ${account.email} from mailing list ${listID}`)
      return mailerliteSubscribers.deleteSubscriber(listID, account.email)
    }
  },

  getMailerList (mailerliteListName) {
    return mailerliteList.getAll().then((res) => {
      const list = res.Results.filter(list => list.name === mailerliteListName)
      if (list.length) {
        console.log(`Using list: ${mailerliteListName}`)
        return list[0].id
      } else {
        console.log(`Create new list: ${mailerliteListName}`)
        return mailerliteList.addList(mailerliteListName).then(res => res.id)
      }
    })
  },

  sendContactEmail (val) {
    // const client = new SparkPost(functions.config().sparkpost.key)
    // client.transmissions.send({
    //   transmissionBody: {
    //     recipients: [{ address: { email: 'schweiger.pierre@gmail.com', name: 'Vue Mastery Team' } }],
    //     content: { template_id: 'contact' },
    //     substitution_data: {'email': val.email, 'name': val.name, 'message': val.message},
    //     campaign_id: 'Contact'
    //   }
    // }, (err, res) => {
    //   console.warn(err ? err.stack : `Email Sent for test to ${val.email}`)
    // })
    const mailOptions = {
      from: 'Vue Mastery <noreply@firebase.com>',
      // to: 'team@vuemastery.com'
      to: 'schweiger.pierre@gmail.com'
    }

    // The user subscribed to the newsletter.
    mailOptions.subject = `Vue Mastery website Request`
    mailOptions.text = `Message from ${val.name}: ${val.message}`
    return mailTransport.sendMail(mailOptions).then(() => {
      return console.log('New email sent from:', val.name)
    })
  }
}
