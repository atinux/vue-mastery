import Vue from 'vue'

Vue.filter('time', (value) => {
  return value.replace(/^0(?:0:0?)?/, '')
})
