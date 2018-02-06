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
        }
      ]})
      .then(courses => {
        commit(types.RECEIVE_COURSES, { courses })
      })
  },
  getCourse ({ commit, state, rootState }, id) {
    return db.get('courses', id, {
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
        let completed = false
        try {
          completed = rootState.account.account.completed[id]
        } catch (error) {}
        if (completed) {
          // Add completed mark to lesson already watched
          course.lessons.map((lesson, index) => {
            try {
              lesson.isCompleted = completed.completedLessons ? completed.completedLessons[lesson.id] : false
            } catch (error) {
              console.log(error)
            }
          })
        }
        // Add subscribed boolean to course
        course.subscribed = completed ? completed.subscribed : false
        commit(types.RECEIVE_COURSE, { course })
      })
  },

  lastVideos ({ commit, state }) {
    return db.get('lessons', {
      limitToLast: 3,
      populate: [{
        field: 'lessons',
        subFields: [ 'lessons' ]
      }]
    }).then(latests => {
      commit(types.RECEIVE_LATEST_VIDEOS, { latests })
    })
  },

  freeVideos ({ commit, state }) {
    // Get free lessons
    return db.get('lessons', {
      limitToLast: 3,
      orderByChild: 'free',
      equalTo: true,
      populate: [{
        field: 'image',
        subFields: [ 'image' ]
      }]
    }).then(free => {
      commit(types.RECEIVE_FREE_VIDEOS, { free })
    })
  },

  userUpdateCompleted ({ commit, state }, param) {
    let course = state.course
    course.lessons.map((lesson) => {
      if (lesson.id === param.lessonId) {
        lesson.isCompleted = true
      }
    })
    commit(types.UPDATE_COMPLETED_LESSON, { course })
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
  [types.RECEIVE_LATEST_VIDEOS] (state, { latests }) {
    state.latests = latests
  },
  [types.RECEIVE_FREE_VIDEOS] (state, { free }) {
    state.free = free
  },
  [types.UPDATE_COMPLETED_LESSON] (state, { course }) {
    state.course = course
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
