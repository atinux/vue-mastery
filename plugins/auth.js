import firebaseConfig from '~/firebase'
import firebase from 'firebase'

export default function ({
  store,
  redirect
}) {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

  // return firebase.auth().onAuthStateChanged((user) => {
  //   if (user) {
  //     store.commit('setUser', user)
  //   }
  // })

  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      store.commit('setUser', user)
      resolve()
    })
  })
}
