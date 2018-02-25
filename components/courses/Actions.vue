<template lang="pug">
.actions
  div(v-if="course.lessonsCount" v-cloak)
    span(v-if="course.hasOwnProperty('progression')") {{course.progression}}% completed
    span(v-else) {{ course.lessonsCount | pluralizeLesson }}
    .button.primary.-full(v-if="checkCourseStarted(course.slug)" v-cloak)
      | Resume

    .button.secondary.border.-full(v-else v-cloak)
      | Play

  div(v-else v-cloak)
    div(v-if="isSubscribed(course.slug)")
      span Subscribed
    div(v-else)
      span Coming Soon

      .button.primary.border.-full(@click="subscribedToMailingList(course.slug)" v-if="account" v-cloak)
        | Notify Me

      button.button.primary.border.-full(v-else v-cloak @click="openLogin") Notify Me
</template>


<script>
import { mapState } from 'vuex'

export default {
  props: ['course'],

  computed: {
    ...mapState({
      account: result => result.account.account
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

    isSubscribed (courseSlug) {
      let subscribed = false
      if (this.account && typeof (this.account['courses']) !== 'undefined') {
        const completedCourse = this.account.courses[courseSlug]
        if (completedCourse) {
          subscribed = completedCourse.subscribed || false
        }
      }
      return subscribed
    },

    subscribedToMailingList (courseSlug) {
      this.$store.dispatch('userUpdateSubscribe', courseSlug)
    },

    openLogin () {
      this.$modal.show('login-form', {
        newAccount: true,
        header: 'Please create a free account to get notified when new lessons are available.'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

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
