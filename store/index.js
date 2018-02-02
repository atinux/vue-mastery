import Vuex from 'vuex'
import account from './modules/account'
import courses from './modules/courses'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      account,
      courses
    }
  })
}

export default createStore
