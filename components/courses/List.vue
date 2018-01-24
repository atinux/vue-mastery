<template lang="pug">
  ul(v-if="courses" v-cloak)
    li(v-for="course in courses.courses")
      nuxt-link.navbar-profile(:to="'/courses/'+course.id")
        .course-image
          img(v-bind:src="course.image[0].image[0].url" :alt="course.image[0].description")
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
    this.$store.dispatch('getAllCourses')
  }
}
</script>

<style lang="stylus" scoped>
  .course-image
    img
      width: 100px
      height: 100px
      border-radius 100px
      overflow hidden
      border 2px solid #b2b1b0
      object-fit contain

</style>