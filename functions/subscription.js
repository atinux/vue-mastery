const functions = require('firebase-functions')
const Mailerlite = require('mailerlite')
const mailerlite = new Mailerlite(functions.config().mailerlite.key)
const mailerliteSubscribers = mailerlite.Subscribers
const mailerliteList = mailerlite.Lists
const SparkPost = require('sparkpost')

// Configure Mailerlite
const mainListId = functions.config().mailerlite.mainListId // "VueMastery.com New Users" group

module.exports = {
  subscribeUser (account, listID, isSubcribing) {
    if (listID === null) listID = mainListId
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
    const client = new SparkPost(functions.config().sparkpost.key)
    client.transmissions.send({
      transmissionBody: {
        recipients: [{ address: { email: 'schweiger.pierre@gmail.com' } }],
        content: { template_id: 'contact' },
        substitution_data: {'email': val.email, 'name': val.name, 'message': val.message},
        campaign_id: 'Contact'
      }
    }, (err, res) => {
      console.warn(err ? err.stack : `Email Sent for test to ${val.email}`)
    })
  }
}
