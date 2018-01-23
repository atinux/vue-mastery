import * as firebase from 'firebase'
import 'firebase/firestore'
import { firebaseAction } from 'vuexfire'

// initial state
const state = {
  all: [],
  course: null
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
    firebase.firestore().collection('courses').doc('27db1KQV2BiGkHUpabSX').get().then((result) => {
      console.log('result', result.lessons)
    })
    return bindFirebaseRef('course', firebase.firestore().collection('courses').doc(path))
  })
}

export default {
  state,
  getters,
  actions
}
