<template lang="pug">
  .section
    h2.title Free Lessons
    .media-wrapper(v-if="free" v-cloak)
      .media-block(v-for="lesson in free")
        nuxt-link(:to="path(lesson)")
          .media.-video
            img(v-bind:src="lesson.image[0].url" class="-large")
        .body
          nuxt-link(:to="path(lesson)" class="list-free -inverted")
            h3.title {{ lesson.title }}
            p.content {{ lesson.description }}
          nuxt-link(to='/' class="-inverted")
            div.meta
              b {{ lessonsCourse(lesson) }}
              label.-has-icon
                span ・
                i.far.fa-clock
                | {{ lesson.duration | time }}

    .media-wrapper(v-else)
      each val in [1, 2, 3]
        .media-block.fake
          .media.fake.-small
          .body.fake

    nuxt-link.button.primary.border(to="/courses") More
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({ free: result => result.courses.free }),
    ...mapState({ courses: result => result.courses.courses })
  },

  mounted: function () {
    this.$store.dispatch('featured')
  },

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

.section
  color #fff
  height: 100%
  display: flex
  flex-direction: column
  justify-content: space-between

  > .title
    margin-bottom ($vertical-space/3)
    font-weight 600
    text-align center
    +tablet-up()
      font-size 40.5px

.button
  width 100%

.media-wrapper
  height: 100%
  padding-top: 20px

.media-block
  margin-bottom ($vertical-space/2)
  grid-template-columns auto 1fr
  grid-template-areas "media body"
  .body
    text-align left
  .meta
    justify-content flex-start


+tablet-up()
  .section > .title
    text-align left

  .button
    width max-content

</style>
