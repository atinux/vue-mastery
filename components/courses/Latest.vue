<template lang="pug">
  div
    .card(v-if="latests" v-cloak)
      h2.title Latest Videos
      div(v-for="lesson in latests")
        nuxt-link(:to="path(lesson)")
          .media-block
            .body
              h4 {{ lesson.title }}
              p {{ lesson.description }}
              div.meta
                b Associated Course
                label.-has-icon
                  span ・
                  i.far.fa-clock
                  | {{ lesson.duration | time }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({ latests: result => result.courses.latests })
  },

  mounted: function () {
    this.$store.dispatch('lastVideos')
  },

  methods: {
    path (lesson) {
      return `/courses/${lesson.belongsToCourse[0].slug}?lesson=${lesson.slug}`
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables'
  .title
    color $primary-color
    font-weight 600
    margin-bottom: 22px

  .media-block
    grid-column-gap 0
    margin-bottom ($vertical-space/3)

  .body p
    margin 0

  h4
    font-size 22px
    font-weight: 600
    color $secondary-color

</style>
