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
  async getAllCourses ({ commit, state }) {
    const { courses } = await db.get('courses', {
      populate: [{
        field: 'image',
        subFields: [ 'image' ]
      }, {
        field: 'lessons',
        fields: [ 'slug' ]
      }]
    })
    commit(types.RECEIVE_COURSES, { courses })
  },
  async getCourse ({ commit, state, rootState }, slug) {
    let { course } = await db.get('courses', {
      orderByChild: 'slug',
      equalTo: slug,
      populate: [{
        field: 'image',
        subFields: [ 'image' ]
      }, {
        field: 'lessons',
        subFields: [ 'lessons' ]
      }]
    })
    course = course[Object.keys(course)[0]]
    // Disable code compilation from content
    // for (let lesson of course.lessons) {
    //   lesson.body = lesson.body.replace('<code>', '<code v-pre>')
    // }
    commit(types.RECEIVE_COURSE, { course })
  },

  async featured ({ commit, state }) {
    const { featured } = await db.get('home', {
      populate: [ {
        field: 'free',
        fields: [ 'title', 'slug', 'description', 'belongsToCourse', 'duration', 'image' ],
        populate: [ 'image' ]
      }, {
        field: 'featured',
        fields: [ 'title', 'slug', 'description', 'image', 'lessons' ],
        populate: [ 'image', 'lessons' ]
      }]
    })
    commit(types.RECEIVE_FEATURED, { featured })
  },

  async latest ({ commit, state }) {
    const { latests } = await db.get('course', {
      populate: [ {
        field: 'latests',
        fields: [ 'title', 'slug', 'description', 'belongsToCourse', 'duration' ]
      }]
    })
    commit(types.RECEIVE_LATEST, { latests })
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
