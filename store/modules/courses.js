import * as types from '../mutation-types'

let db = null

// initial state
const state = {
  courses: null,
  course: null,
  lessons: null,
  latests: null,
  free: null
}

// getters
const getters = {
  allCourses: state => state.courses,
  course: state => state.course,
  lessons: state => state.lessons,
  latests: state => state.latests,
  free: state => state.free
}

// actions
const actions = {
  getAllCourses ({ commit, state }) {
    return db.get('courses', {
      populate: [
        {
          field: 'image',
          subFields: [ 'image' ]
        },
        {
          field: 'lessons',
          fields: [ 'slug' ]
        }
      ]})
      .then(courses => {
        commit(types.RECEIVE_COURSES, { courses })
      })
  },
  getCourse ({ commit, state, rootState }, slug) {
    return db.get('courses', {
      orderByChild: 'slug',
      equalTo: slug,
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
        course = course[Object.keys(course)[0]]
        commit(types.RECEIVE_COURSE, { course })
      })
  },

  featured ({ commit, state }) {
    return db.get('home', {
      populate: [ {
        field: 'free',
        fields: [ 'title', 'slug', 'description', 'belongsToCourse', 'duration', 'image' ],
        subFields: [ 'image' ]
      }, {
        field: 'latests',
        fields: [ 'title', 'slug', 'description', 'belongsToCourse', 'duration' ],
        subFields: [ 'belongsToCourse' ]
      }]
    }).then(featured => {
      commit(types.RECEIVE_FEATURED, { featured })
    })
  }
}

// mutations
const mutations = {
  [types.APP_READY] (state, app) {
    db = app.content
  },
  [types.RECEIVE_COURSES] (state, { courses }) {
    state.courses = courses
  },
  [types.RECEIVE_COURSE] (state, { course }) {
    state.course = course
  },
  [types.RECEIVE_FEATURED] (state, { featured }) {
    state.free = featured.free
    state.latests = featured.latests
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
