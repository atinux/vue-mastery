<template lang="pug">
  div
    .panel
      .panel-body
        h1.title Our Mission
        p To be the ultimate learning resource for Vue Developers. We do this by:
        ul
          li Creating weekly tutorials in video and article format.
          li $5 of every $19 you give us goes to Vue
          li Co-producing the Official Vue News
          li Producing the Official Vue.js Podcast

        nuxt-link.button.secondary.border(to="/courses") View Our Courses

      PlayerPlaceholder

    .panel.inverted
      .panel-body
        h1.title Our Mission
        p Gregg Pollack &amp; Adam Jahr are passionate at teaching computer programming online and living in Orlando, Florida.
        p Gregg previously founded Code School, and Adam previously taught at Iron Yard.

        nuxt-link.button.secondary.border(to="/contact-us") Contact Us

      PlayerPlaceholder

    .panel
      .panel-body
        h1.title Why Learn Vue?
        p We worked closely with the Vue Core team to produce this video which walks you through the core principles of this JS Framework.

        nuxt-link.button.secondary.border(to="/courses") START LEARNING NOW

      PlayerPlaceholder
    CheatSheetAlt
    VuePodcast
</template>

<script>
import PlayerPlaceholder from '~/components/static/PlayerPlaceholder'
import CheatSheetAlt from '~/components/static/CheatSheetAlt'
import VuePodcast from '~/components/static/VuePodcast'

export default {
  middleware: 'anonymous',
  head: {
    title: 'About page'
  },
  components: {
    PlayerPlaceholder,
    CheatSheetAlt,
    VuePodcast
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/_variables'

.title
  color: $primary-color
  font-weight 600

ul
  list-style-type: disc
  padding-left: 25px
  padding-bottom 30px
  line-height: 25px

.panel
  display: flex
  width: 100%
  padding: 60px 4%
  justify-content: space-between

  > div
    flex: 1
    padding: 20px
    margin: 0 20px

  &.inverted
    flex-flow: row-reverse

</style>
