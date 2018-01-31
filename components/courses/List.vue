<template lang="pug">
  ul.list(v-if="courses" v-cloak)
    li(v-for="course, key, index in courses" v-if="index < 3")
      nuxt-link(:to="'/courses/'+course.id" class="list-card card" v-bind:class="{ showAction: showAction }")
        .media-block
          .media
            img(v-bind:src="course.image[0].image[0].url" :alt="course.image[0].description")
          .body
            h3.title {{ course.title }}
            p.truncate {{ course.description }}
            div(v-if="!showAction" v-cloak)
              label {{ course.lessons.length | pluralizeLesson }}
              label ・ {{ course.difficulty }}
              label ・ (clock) {{ course.duration | time }}
        .actions(v-if="showAction" v-cloak)
          //- .list-actions(v-if="showAction" v-cloak)
          div(v-if="course.lessonsCount" v-cloak)
            p {{ course.lessonsCount | pluralizeLesson }}
            .button.primary(v-if="course.lessonsCount > 0 && accounts && accounts.completed[course.id]" v-cloak)
              | Resume

            .button.inverted.border(v-if="(course.lessonsCount > 0 && !accounts) || (course.lessonsCount > 0 && !accounts.completed[course.id])" v-cloak)
              | Begin

          div(v-else v-cloak)
            .button.inverted.border.border-primary
              | Get notified
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

  mounted: function () {
    this.$store.dispatch('getAllCourses')
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables'
  .list
    li
      margin-bottom: 35px

  .title
    font-weight: 100

  .media
    img
      width: 120px
      height: 120px
      object-fit contain

  .list-card
    display flex
    justify-content space-between
    //
    // &.showAction
    //   grid-template-columns: 20% 50% 26%

  .list-actions
    text-align: center

</style>
