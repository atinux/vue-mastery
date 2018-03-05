import * as types from '../mutation-types'

let db = null

// initial state
const state = {
  courses: null,
  course: null,
  lessons: null,
  latests: null,
  free: null,
  featured: null
}

// getters
const getters = {
  courses: state => state.courses,
  course: state => state.course,
  lessons: state => state.lessons,
  latests: state => state.latests,
  free: state => state.free,
  featured: state => state.featured
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
          subFields: [ 'lessons', 'image' ],
          populate: [ 'image' ]
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
        populate: [ 'image', 'belongsToCourse' ]
      }, {
        field: 'featured',
        fields: [ 'title', 'slug', 'description', 'image', 'lessons' ],
        populate: [ 'image', 'lessons' ]
      }]
    }).then(featured => {
      commit(types.RECEIVE_FEATURED, { featured })
    })
  },

  latest ({ commit, state }) {
    return db.get('course', {
      populate: [ {
        field: 'latests',
        fields: [ 'title', 'slug', 'description', 'belongsToCourse', 'duration', 'image' ],
        populate: [ 'image' ]
      }]
    }).then(latests => {
      commit(types.RECEIVE_LATEST, { latests })
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
    state.featured = featured.featured
  },
  [types.RECEIVE_LATEST] (state, { latests }) {
    state.latests = latests.latests
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
