import Vuex from 'vuex'
import accounts from './modules/accounts'
import courses from './modules/courses'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      accounts,
      courses
    }
  })
}

export default createStore
