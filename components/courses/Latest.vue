<template lang="pug">
  div(v-if="latests" v-cloak)
    h3 Latest
    ul
      li(v-for="lesson in latests")
        nuxt-link(:to="'/courses/'+lesson.id")
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
  }
}
</script>

<style lang="stylus" scoped></style>