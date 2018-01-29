<template lang="pug">
  div(v-if="latests" v-cloak)
    h3 Latest
    ul
      li(v-for="lesson in latests")
        nuxt-link(:to="path(lesson)")
          h3 {{ lesson.title }}
          p {{ lesson.description }}
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

<style lang="stylus" scoped></style>