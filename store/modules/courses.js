import * as types from '../mutation-types'

// initial state
const state = {
  firelink: null,
  courses: null,
  course: null,
  lessons: null,
  latests: null
}

// getters
const getters = {
  content: state => state.firelink,
  allCourses: state => state.courses,
  course: state => state.course,
  lessons: state => state.lessons,
  latests: state => state.latests
}

// actions
const actions = {
  getAllCourses ({ commit, state }) {
    return state.firelink.content.get('courses', {
      populate: [
        {
          field: 'image',
          subFields: [ 'image' ]
        }
      ]})
      .then(courses => {
        commit(types.RECEIVE_COURSES, { courses })
      })
  },
  getCourse ({ commit, state }, id) {
    return state.firelink.content.get('courses', id, {
      populate: [
        {
          field: 'image',
          subFields: [ 'image' ]
        },
        {
          field: 'lessons',
          subFields: [ 'lessons' ]
        }
      ]})
      .then(course => {
        commit(types.RECEIVE_COURSE, { course })
      })
  },

  lastVideos ({ commit, state }) {
    return state.firelink.content.get('lessons', {
      limitToLast: 2,
      populate: [{
        field: 'lessons',
        subFields: [ 'lessons' ]
      }]
    }).then(latests => {
      commit(types.RECEIVE_LATEST_VIDEOS, { latests })
    })
  }
}

// mutations
const mutations = {
  [types.SET_FIRELINK] (state, app) {
    state.firelink = app
  },
  [types.RECEIVE_COURSES] (state, { courses }) {
    state.courses = courses
  },
  [types.RECEIVE_COURSE] (state, { course }) {
    state.course = course
  },
  [types.RECEIVE_LATEST_VIDEOS] (state, { latests }) {
    state.latests = latests
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
