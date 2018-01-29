<template lang="pug">
  .card(v-if="latests" v-cloak)
    h3.title Latest
    ul
      li(v-for="lesson in latests")
        nuxt-link(:to="path(lesson)")
          h4 {{ lesson.title }}
          p 
            | {{ lesson.description }}
            label {{ lesson.duration }}
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
      return `/courses/${lesson.belongsToCourse}?lesson=${lesson.id}`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

.title
  color $primary-color
  margin-bottom: 22px

</style>