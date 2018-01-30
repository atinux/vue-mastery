<template lang="pug">
  .bgk(v-if="free" v-cloak)
    h2.title Free Videos
    ul
      li(v-for="lesson in free")
        nuxt-link(:to="path(lesson)" class="list-free")
          .list-image
            img(v-bind:src="lesson.image[0].image[0].url" :alt="lesson.image[0].image[0].description")
          .list-body
            h4 {{ lesson.title }}
            p 
              | {{ lesson.description }}
              label  ・ {{ lesson.duration | time }}
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

.bgk
  background-color: #122549
  color: #fff
  padding: 60px 4%

  a
    color: #fff

.list-free
  display: grid
  width: 100%
  grid-template-columns: 26% 70%
  grid-column-gap: 2%
  grid-row-gap: 20px

.list-image
  img
    width: 150px
    height: 150px
    overflow hidden
    object-fit contain

.title
  margin-bottom: 22px

</style>