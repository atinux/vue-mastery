<template lang="pug">
  div(v-if="latests" v-cloak)
    h2.title Latest Free Videos
    div(v-for="lesson in latests")
      nuxt-link(:to="path(lesson)")
        .media-block
          .media.-video
            img(v-bind:src="lesson.image[0].url")
          .body
            h4 {{ lesson.title }}
            .meta
              b {{ lessonsCourse(lesson) }}
            .meta
              label.-has-icon
                i.far.fa-clock
                | {{ lesson.duration | time }}
</template>

<script>

export default {
  props: ['latests', 'courses'],

  methods: {
    path (lesson) {
      if (this.courses) {
        const course = this.courses[lesson.belongsToCourse]
        return `/courses/${course.slug}/${lesson.slug}`
      }
      return '#'
    },
    lessonsCourse (lesson) {
      if (this.courses) {
        const course = this.courses[lesson.belongsToCourse]
        return course.title
      }
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
  +tablet-up()
    font-size 40.5px

.media-block
  grid-column-gap 20px
  margin-bottom ($vertical-space/4)
  border-bottom solid 1px #EEE
  padding-bottom ($vertical-space/4)

.body p
  margin 0

.media
  max-width 160px

.meta
  margin-bottom 10px

h4
  font-size 20px
  font-weight: 600
  color $secondary-color

</style>
