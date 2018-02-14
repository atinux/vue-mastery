<template lang="pug">
.container
  .wrapper
    .mission-media
      PlayerPlaceholder
    .mission
      h1.title Our Mission
      p To be the ultimate learning resource for Vue Developers. We do this by:
      ul
        li Creating weekly tutorials in video and article format.
        li $5 of every $19 you give us goes to Vue
        li Co-producing the Official Vue News
        li Producing the Official Vue.js Podcast

      nuxt-link.button.secondary.border(to="/courses") View Our Courses

    .team-media
      PlayerPlaceholder
    .team
      h1.title About The Team
      p Gregg Pollack &amp; Adam Jahr are passionate at teaching computer programming online and living in Orlando, Florida.
      p Gregg previously founded Code School, and Adam previously taught at Iron Yard.

      nuxt-link.button.secondary.border(to="/contact-us") Contact Us

    .why-media
      PlayerPlaceholder
    .why
      h1.title Why Learn Vue?
      p We worked closely with the Vue Core team to produce this video which walks you through the core principles of this JS Framework.

      nuxt-link.button.secondary.border(to="/courses") START LEARNING NOW
  CheatSheetAlt
</template>

<script>
import PlayerPlaceholder from '~/components/static/PlayerPlaceholder'
import CheatSheetAlt from '~/components/static/CheatSheetAlt'

export default {
  middleware: 'anonymous',
  head: {
    title: 'About page'
  },
  components: {
    PlayerPlaceholder,
    CheatSheetAlt
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/css/_variables'
containers = mission mission-media team-media team why why-media
.wrapper
  margin-top ($vertical-space/4)
  margin-bottom ($vertical-space/4)
  grid-template-columns 1fr
  grid-row-gap ($vertical-space/4)
  align-items: center
  grid-template-areas "mission-media"\
                      "mission"\
                      "team-media"\
                      "team"\
                      "why-media"\
                      "why"


for container in containers
  .{container}
    grid-area container

.title
  color: $primary-color
  font-weight 600

ul
  list-style-type: disc
  padding-left: 25px
  padding-bottom 30px
  line-height: 25px

+laptop-up()
  .wrapper
    margin-top $vertical-space
    margin-bottom $vertical-space
    grid-template-columns 1fr 1fr
    grid-row-gap $vertical-space * 1.5
    grid-column-gap ($vertical-space/2)
    align-items: center
    grid-template-areas "mission mission-media"\
                        "team-media team"\
                        "why why-media"

</style>
