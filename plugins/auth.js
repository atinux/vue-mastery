import firebaseConfig from '~/firebase'
import firebase from 'firebase'
import * as types from '~/store/mutation-types'
import flamelink from 'flamelink'

export default function ({
  store,
  redirect
}) {
  if (!firebase.apps.length) {
    const firebaseApp = firebase.initializeApp(firebaseConfig)
    store.commit(types.APP_READY, flamelink({ firebaseApp }))
  }

  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.commit(types.SET_USER, user)
    }
  })
}
