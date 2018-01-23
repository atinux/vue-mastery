// import Vue from 'vue'
import Vuex from 'vuex'
import accounts from './modules/accounts'
import courses from './modules/courses'

// import firebaseConfig from '~/firebase'
// import firebase from 'firebase'

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig)
// }

// Vue.use(Vuex)
// const state = {
//   db: firebase.firestore()
// }

const createStore = () => {
  return new Vuex.Store({
    modules: {
      // state,
      accounts,
      courses
    }
  })
}

export default createStore
