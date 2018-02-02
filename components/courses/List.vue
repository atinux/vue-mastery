<template lang="pug">
  ul.list(v-if="courses" v-cloak)
    li(v-for="course, key, index in courses" v-if="index < 3")
      nuxt-link(:to="'/courses/'+course.id" class="list-card card" v-bind:class="{ showAction: showAction }")
        .media-block
          .media
            img(v-bind:src="course.image[0].image[0].url" :alt="course.image[0].description")
          .body
            h3.title {{ course.title }}
            p.content.truncate {{ course.description }}
            div.meta(v-if="!showAction" v-cloak)
              label
                b {{ course.lessons.length | pluralizeLesson }}
              label ・ {{ course.difficulty }}
              label ・ (clock) {{ course.duration | time }}
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
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: ['showAction'],
  computed: {
    ...mapState({
      accounts: result => result.accounts.account,
      courses: result => result.courses.courses
    })
  },

  watch: {
    accounts () {
      if (!this.accounts.completed) {
        this.accounts.completed = []
      }
    }
  },

  methods: {
    checkCourseStarted (courseId) {
      let started = false
      try {
        started = this.accounts.completed[courseId]
      } catch (error) {}
      return started
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

  .list
    li
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
