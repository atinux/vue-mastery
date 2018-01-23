import firebaseConfig from '~/firebase'
import firebase from 'firebase'
import * as types from '~/store/mutation-types'

export default function ({
  store,
  redirect
}) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit(types.SET_USER, user)
    }
  })
}
