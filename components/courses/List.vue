<template lang="pug">
  ul.list(v-if="courses" v-cloak)
    li(v-for="course in courses")
      nuxt-link(:to="'/courses/'+course.id" class="list-card card")
        
        .list-image
          img(v-bind:src="course.image[0].image[0].url" :alt="course.image[0].description")
        
        .list-body
          h3.title {{ course.title }}
          p {{ course.description }}
        
        .list-actions(v-if="showAction && course.lessonsCount" v-cloak)
          p {{ course.lessonsCount }} Lesson{{ course.lessonsCount > 1 ? 's' : '' }}
          .button.primary(v-if="course.lessonsCount > 0 && accounts.completed[course.id]" v-cloak)
            | Resume

          .button.inverted.border(v-if="course.lessonsCount > 0 && accounts && !accounts.completed[course.id]" v-cloak)
            | Begin

          .button.inverted.border.border-primary(v-if="course.lessonsCount === 0 && accounts" v-cloak)
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

  mounted: function () {
    this.$store.dispatch('getAllCourses')
  }
}
</script>

<style lang="stylus" scoped>  

  .list
    li
      margin-bottom: 35px

  .title
    font-weight: 100

  .list-image
    img
      width: 150px
      height: 150px
      border-radius 100px
      overflow hidden
      border 1px solid #b2b1b0
      object-fit contain

  .list-card
    display: grid
    width: 100%
    grid-template-columns: 20% 50% 26%
    grid-column-gap: 2%
    grid-row-gap: 20px
    text-decoration: none

  .list-actions
    text-align: center

</style>