// import * as types from './mutation-types'
import Vuex from 'vuex'
import account from './modules/account'
import courses from './modules/courses'

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
