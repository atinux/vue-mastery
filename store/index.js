// import * as types from './mutation-types'
import Vuex from 'vuex'
import account from './modules/account'
import courses from './modules/courses'
import firebaseConfig from '~/firebase'
import firebase from 'firebase'
import * as types from './mutation-types'
const flamelink = (process.server ? require('flamelink') : null)
const firebaseAdmin = (process.server ? require('firebase-admin') : null)

const createStore = () => {
  return new Vuex.Store({
    modules: {
      account,
      courses
    },
    state: {
      openNav: false,
      storage: null
    },
    getters: {
      openNav: state => state.openNav
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        if (!firebase.apps.length) {
          const firebaseApp = firebaseAdmin.initializeApp(firebaseConfig)
          this.commit(types.APP_READY, flamelink({ firebaseApp }))
        } else {
          this.commit(types.APP_READY, flamelink({ firebaseApp: firebase.app() }))
        }
      },
      toggleNav ({ commit }) {
        commit('toggleNav')
      },
      sendContactRequest ({ commit }, newData) {
        const addr = '/inquiries/'
        // Get a key for a new contact.
        return firebase.database().ref(addr).push(newData)
      }
    },
    mutations: {
      toggleNav (state) {
        state.openNav = !state.openNav
      }
    }
  })
}

export default createStore
