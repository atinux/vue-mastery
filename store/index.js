// import * as types from './mutation-types'
import Vuex from 'vuex'
import account from './modules/account'
import courses from './modules/courses'
import firebaseConfig from '~/firebase'
import firebase from 'firebase'
import * as types from './mutation-types'
import flamelink from 'flamelink'

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
      nuxtServerInit ({ commit }, { req }) {
        if (!firebase.apps.length) {
          const firebaseApp = firebase.initializeApp(firebaseConfig)
          this.commit(types.APP_READY, flamelink({ firebaseApp }))
        } else {
          console.log(firebase.app())
          this.commit(types.APP_READY, flamelink({ firebaseApp: firebase.app() }))
        }
      },
      toggleNav ({ commit }) {
        commit('toggleNav')
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
