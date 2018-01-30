import Vue from 'vue'

Vue.filter('time', (value) => {
  return value.replace(/^0(?:0:0?)?/, '')
})

Vue.filter('pluralizeLesson', (value) => {
  return `${value} Lesson${value > 1 ? 's' : ''}`
})
