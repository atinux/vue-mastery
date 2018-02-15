<template lang="pug">
div
  .list(v-if="courses" v-cloak)
    div(v-for="course, key, index in courses" v-if="index < 3")
      .list-card.card(@click="link(course)" v-bind:class="{ showAction: showAction }")
        .media-block
          .media
            img(v-bind:src="course.image[0].image[0].url" :alt="course.image[0].description")
          .body
            h3.title {{ course.title }}
            p.content {{ course.description }}
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
            div(v-if="isSubscribed(course.id)")
              span Subscribed
            div(v-else)
              span Coming Soon

              .button.primary.border.-full(@click="subscribedToMailingList(course.id)" v-if="account" v-cloak)
                | Notify Me

              button.button.primary.border.-full(v-else v-cloak @click="openLogin") Notify Me

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
      // Check if there is lesson in the course
      if (course.lessonsCount) {
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
        this.$router.push(`/courses/${course.id}?lesson=${lessonId}`)
      }
      return true
    },
    isSubscribed (courseId) {
      let subscribed = false
      if (this.account && typeof (this.account['courses']) !== 'undefined') {
        const completedCourse = this.account.courses[courseId]
        if (completedCourse) {
          subscribed = completedCourse.subscribed || false
        }
      }
      return subscribed
    },
    subscribedToMailingList (courseId) {
      this.$store.dispatch('userUpdateSubscribe', courseId)
    },
    openLogin () {
      this.$modal.show('login-form', {
        newAccount: true,
        header: 'Please create a free account to get notified when new lessons are available.'
      })
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
    > div
      margin-bottom: 35px

  .media
    img
      +tablet-up()
        width: 120px
        height: 120px


  .list-card
    display flex
    flex-direction column
    justify-content space-between
    +tablet-up()
      flex-direction row


  .actions
    display flex
    align-items center
    justify-content center
    width 100%
    text-align: center
    margin-top 20px
    +tablet-up()
      width 200px
      margin-left 4%
      margin-top: 0
    span
      font-weight: 700
</style>
