<template lang="pug">
    ul(v-if="courses.all" v-cloak)
      li(v-for="course in courses.all")
        nuxt-link.navbar-profile(:to="'/courses/'+course.title")
          .course-image
            img(v-bind:src="course.image" width="100" height="100" :alt="course.title")
          h3 {{ course.title }}
          p {{ course.description }}
</template>
  

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState([
      'courses'
    ])
  },

  mounted: function () {
    this.$store.dispatch('getAllCourses', 'courses')
  }
}
</script>

<style lang="stylus" scoped>
  .course-image
    img
      border-radius 100px
      overflow hidden
      border 2px solid #b2b1b0

</style>