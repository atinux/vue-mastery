import * as firebase from 'firebase'
import 'firebase/firestore'
import { firebaseAction } from 'vuexfire'

// initial state
const state = {
  all: [],
  course: null,
  lessons: []
}

// getters
const getters = {
  allCourses: state => state.all
}

// actions
const actions = {
  getAllCourses: firebaseAction(({ bindFirebaseRef }, path) => {
    firebase.firestore().collection('courses').get().then((result) => {
      console.log('results', result)
    })
    return bindFirebaseRef('all', firebase.firestore().collection(path))
  }),
  getCourse: firebaseAction(({ bindFirebaseRef }, path) => {
    const coursesRef = firebase.firestore().collection('courses')
    const query = coursesRef.where('title', '==', path)
    return bindFirebaseRef('course', query)
  }),

  getLessons: firebaseAction(({ bindFirebaseRef }, path) => {
    const coursesRef = firebase.firestore().collection('courses')
    const query = coursesRef.where('title', '==', path).collection('lessons')
    return bindFirebaseRef('course', query)
  })
}

export default {
  state,
  getters,
  actions
}
