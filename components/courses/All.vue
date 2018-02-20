<template lang="pug">
div
  .list(v-if="courses" v-cloak)
    nuxt-link.list-card.card(:to="link(course)" v-for="course, key, index in courses")
      courseList(:course="course")
      courseAction(:course="course")
  fakeList(v-else)
  
</template>

<script>
import { mapState } from 'vuex'

import courseList from '~/components/courses/List'
import courseAction from '~/components/courses/Actions'
import fakeList from '~/components/courses/FakeList'

export default {
  components: {
    courseList,
    courseAction,
    fakeList
  },
  computed: {
    ...mapState({
      account: result => result.account.account,
      courses: result => result.courses.courses
    })
  },

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
              lessonSlug = key
            }
          }
        } catch (error) {}
        // Transform to friendly url
        return `/courses/${course.slug}?lesson=${lessonSlug}`
      }
      return ''
    }
  },

  mounted: function () {
    this.$store.dispatch('getAllCourses')
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
