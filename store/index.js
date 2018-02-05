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
      openNav: false
    },
    getters: {
      openNav: state => state.openNav
    },
    actions: {
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
