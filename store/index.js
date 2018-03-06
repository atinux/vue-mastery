// import * as types from './mutation-types'
import Vuex from 'vuex'
import account from './modules/account'
import courses from './modules/courses'
import * as firebase from 'firebase'

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
      // storage: state => state.storage,
      openNav: state => state.openNav
    },
    actions: {
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
      // [types.APP_READY] (state, app) {
      //   state.storage = app.storage
      // },
      toggleNav (state) {
        state.openNav = !state.openNav
      }
    }
  })
}

export default createStore
