<template lang="pug">
div
  .list(v-if="courses" v-cloak)
    div(v-for="course, key, index in courses" v-if="index < 3")
      a(:href="link(course)" class="list-card card" v-bind:class="{ showAction: showAction }")
        .media-block
          .media
            img(v-bind:src="course.image[0].image[0].url" :alt="course.image[0].description")
          .body
            h3.title {{ course.title }}
            p.content.truncate {{ course.description }}
            div.meta(v-if="!showAction" v-cloak)
              label
                b {{ course.lessons.length | pluralizeLesson }}
              label
                span ・
                | {{ course.difficulty }}
              label.-has-icon
                span ・
                i.far.fa-clock
                | {{ course.duration | time }}
        .actions(v-if="showAction" v-cloak)
          div(v-if="course.lessonsCount" v-cloak)
            span {{ course.lessonsCount | pluralizeLesson }}
            .button.primary.-full(v-if="checkCourseStarted(course.id)" v-cloak)
              | Resume

            .button.secondary.border.-full(v-else v-cloak)
              | Play

          div(v-else v-cloak)
            span Coming Soon
            .button.primary.border.-full
              | Notify Me

  ul.list-unstyled(v-else)
    each val in [1, 2, 3]
      li
        .media-block.fake
          .media.-small.fake
          .body.fake
        .actions.fake
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['showAction'],
  computed: {
    ...mapState({
      account: result => result.account.account,
      courses: result => result.courses.courses
    })
  },

  methods: {
    checkCourseStarted (courseId) {
      let started = false
      try {
        started = this.account.courses[courseId].started
      } catch (error) {}
      return started
    },
    link (course) {
      let lessonId = course.lessons[0]
      try {
        // Get the lessons started
        let lessons = this.account.courses[course.id].completedLessons
        // Get the last completed lesson
        for (let key in lessons) {
          if (lessons.hasOwnProperty(key) && lessons[key]) {
            lessonId = key
          }
        }
      } catch (error) {}
      return `/courses/${course.id}?lesson=${lessonId}`
    }
  },

  mounted: function () {
    this.$store.dispatch('getAllCourses')
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables'

  .title
    color: $secondary-color
  .content
    color: $gray

  .list,
  .list-unstyled
    > div
      margin-bottom: 35px

  .media
    img
      width: 120px
      height: 120px
      object-fit contain

  .list-card
    display flex
    justify-content space-between

  .actions
    display flex
    align-items center
    width 200px
    margin-left 4%
    text-align: center
    span
      font-weight: 700
</style>
