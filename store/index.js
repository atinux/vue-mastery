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
      openNav: state => state.openNav
    },
    actions: {
      nuxtServerInit ({ commit }, { req }) {
        if (!firebase.apps.length) {
          console.log('sdasdasdasd')
          const firebaseApp = firebase.initializeApp(firebaseConfig)
          this.commit(types.APP_READY, flamelink({ firebaseApp }))
        } else {
          console.log('DDDDDWDSDSDSDSSDSD', firebase.app().options)
          this.commit(types.APP_READY, flamelink({ firebaseApp: firebase.app() }))
        }
      },
      toggleNav ({ commit }) {
        commit('toggleNav')
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
