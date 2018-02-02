import * as firebase from 'firebase'
import * as types from '../mutation-types'

import { firebaseMutations, firebaseAction } from 'vuexfire'

// initial state
const state = {
  user: null,
  account: null
}

// getters
const getters = {
  isAuthenticated (state) {
    return !!state.user
  }
}

function createNewAccount (user) {
  return firebase.database().ref(`accounts/${user.uid}`).set({
    displayName: user.displayName || user.email.split('@')[0], // use part of the email as a username
    email: user.email,
    image: user.newImage || '/images/default-profile.png', // supply a default profile image for all users
    subscribedToMailingList: true,
    completed: {}
  })
}

function checkForFirstTime (user) {
  firebase.database().ref('accounts').child(user.uid).once('value', (snapshot) => {
    if (snapshot.val() === null) createNewAccount(user)
  })
}

// actions
const actions = {
  setAccountRef: firebaseAction(({ bindFirebaseRef }, path) => {
    return bindFirebaseRef('account', firebase.database().ref(path))
  }),
  resetUser ({
    state
  }) {
    state.user = null
    state.account = null
  },
  userCreate ({ state }, account) {
    return firebase.auth()
      .createUserWithEmailAndPassword(account.email, account.password)
      .then((user) => {
        user.sendEmailVerification().then(() => {
          // Email sent.
          return createNewAccount(user)
        }).catch((error) => {
          // An error happened.
          console.log(`Can't create the new account. Error:  ${error}`)
        })
      })
  },
  userGoogleLogin ({ commit }) {
    firebase.auth().useDeviceLanguage()
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/plus.login')
    provider.setCustomParameters({
      'login_hint': 'user@example.com'
    })
    return firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        checkForFirstTime({
          newImage: result.additionalUserInfo.profile.picture, // just use their existing user image to start
          ...result.user
        })
        return commit(types.SET_USER, result.user)
      }).catch((error) => {
        console.log(error)
      })
  },
  userGithubLogin ({ commit }) {
    firebase.auth().useDeviceLanguage()
    const provider = new firebase.auth.GithubAuthProvider()
    provider.addScope('user:email')
    return firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        checkForFirstTime({
          newImage: result.additionalUserInfo.profile.avatar_url, // just use their existing user image to start
          ...result.user
        })
        return commit(types.SET_USER, result.user)
      }).catch((error) => {
        console.log(error)
      })
  },
  userLogin ({ state }, account) {
    return firebase.auth()
      .signInWithEmailAndPassword(account.email, account.password)
      .then((user) => {
        return this.commit(types.SET_USER, user)
      })
  },
  userLogout ({ state }) {
    return firebase.auth()
      .signOut()
      .then(() => {
        this.dispatch('resetUser')
      })
  },
  userRetrievePassword ({ state }, account) {
    return firebase.auth()
      .sendPasswordResetEmail(account.email)
      .then(() => {
        // Email sent.
        console.log(`Retreive password for the account ${account.email}`)
      }).catch((error) => {
        // An error happened.
        console.log(`Can't send retrieve password email. Error:  ${error}`)
      })
  },
  userUpdate ({ state }, newData) {
    return firebase.database().ref(`accounts/${state.user.uid}`).update({
      displayName: newData.displayName,
      subscribedToMailingList: newData.subscribedToMailingList
    })
  },
  userUpdateImage ({ state }, image) {
    return firebase.database().ref(`accounts/${state.user.uid}`).update({
      image
    })
  },
  userUpdateCompleted ({ state }, lesson) {
    let completed = state.user.completed || {}
    // Check if already started the course
    if (completed[lesson.courseId] === undefined) {
      completed[lesson.courseId] = {
        started: true,
        completedLessons: {}
      }
    }
    completed[lesson.courseId].completedLessons[lesson.lessonId] = true
    return firebase.database().ref(`accounts/${state.user.uid}`).update({
      completed
    })
  }
}

// mutations
const mutations = {
  ...firebaseMutations,
  [types.SET_USER] (state, user) {
    state.user = user
    return this.dispatch('setAccountRef', `accounts/${state.user.uid}`)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
