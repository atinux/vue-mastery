<template lang="pug">
  .section
    h2.title Free Videos
    div(v-if="free" v-cloak)
      .media-block(v-for="lesson in free")
        .media
          img(v-bind:src="lesson.image[0].image[0].url" :alt="lesson.image[0].image[0].description" class="-large")
        .body
          nuxt-link(:to="path(lesson)" class="list-free -inverted")
            h3.title {{ lesson.title }}
            p.content {{ lesson.description }}
          nuxt-link(to='/' class="-inverted")
            span.meta
              b Associated Course
              | &nbsp;• {{ lesson.duration | time }}

    nuxt-link.button.border.border-primary(to="/courses") More
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({ free: result => result.courses.free })
  },

  mounted: function () {
    this.$store.dispatch('freeVideos')
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

.section
  color #fff

  .button
    color: $primary-color

  > .title
    margin-bottom ($vertical-space/3)
    font-weight 600
</style>
