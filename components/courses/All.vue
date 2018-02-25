<template lang="pug">
div
  .list(v-if="courses" v-cloak)
    nuxt-link.list-card.card(:to="link(course)"
                              v-for="course, key, index in courses" :key="course.id")
      courseList(:course="course")
      courseAction(:course="course")
  fakeList(v-else)
  
</template>

<script>
import courseList from '~/components/courses/List'
import courseAction from '~/components/courses/Actions'
import fakeList from '~/components/courses/FakeList'

export default {
  components: {
    courseList,
    courseAction,
    fakeList
  },
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
@import '~assets/css/_variables'

.content
  color: $gray

.list,
.list-unstyled
  > a
    margin-bottom: 35px

.list-card
  display flex
  flex-direction column
  justify-content space-between
  cursor: pointer

  +tablet-up()
    flex-direction row

</style>
