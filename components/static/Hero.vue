<template lang="pug">
  .banner
    .body
      h1.title The ultimate learning resource for Vue developers
      p.lead Weekly Vue.js tutorials to guide your journey to Mastery.
    PlayerPlaceholder

    .actions
      nuxt-link.button.secondary(to="/courses") START LEARNING
</template>

<script>
import PlayerPlaceholder from '~/components/static/PlayerPlaceholder'

export default {
  name: 'Hero',
  components: {
    PlayerPlaceholder
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables'

  .banner
    grid-row-gap 20px
    margin-top -($header-height)
    padding-top ($header-height + $vertical-space/2.5)
    padding-bottom ($vertical-space/2.5)
    background-image url(/images/hero.svg)
    background-position center top
    background-size auto
    background-repeat no-repeat

    +laptop-up()
      padding-top ($header-height + $vertical-space/1.5)
      padding-bottom ($vertical-space/1.5)
      // background-position 85% top
      // background-size 185%
      background-size cover
      background-position bottom

  .body
    display grid
    justify-content center
    align-items center
    text-align center

  .title
    max-width 800px
    margin 0
    color $secondary-color

  .lead
    font-size 18px
    color $gray

    +laptop-up()
      font-size: 24px

  .actions
    display flex
    justify-content center

</style>
