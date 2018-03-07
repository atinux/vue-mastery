<template lang="pug">
div.card.badge-card(v-if="courses" v-cloak)
  nuxt-link(:to="link(course)"
                  v-for="course, key, index in courses" :key="course.id")
    .course-badge
      img(v-bind:src="course.image[0].url" v-if="course")
</template>

<script>
export default {
  props: [ 'courses', 'account' ],

  methods: {
    link (course) {
      // Check if there is lesson in the course
      if (course.lessonsCount) {
        let lessonSlug = course.lessons[0].slug
        try {
          // Get the lessons started
          let lessons = this.account.courses[course.slug].completedLessons
          // Get the last completed lesson
          for (let key in lessons) {
            if (lessons.hasOwnProperty(key) && lessons[key]) {
              if (course.lessons[key]) {
                lessonSlug = key
              } else {
                console.log('The last completed lesson doesn\'t belong to this course anymore')
              }
            }
          }
        } catch (error) {}
        // Transform to friendly url
        return `/courses/${course.slug}/${lessonSlug}`
      }
      return ''
    }
  }
}
</script>

<style lang="stylus" scoped>
  .course-badge
    width 30%
</style>
