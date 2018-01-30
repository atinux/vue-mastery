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
  @import '../../assets/css/_variables'

  .banner
    grid-template-columns: auto
    grid-template-rows: ($vertical-space/1.5) auto auto auto ($vertical-space/1.5)
    align-items: center
    justify-content: center
    background-image url(/images/hero.svg)
    background-position: 85% top
    background-size: 185%
    background-repeat: no-repeat

  .body
    display: grid
    grid-row-start: 2
    justify-content: center
    align-items: center
    text-align: center

    .title
      max-width: 800px
      margin: 0
      color: $secondary-color

    .lead
      justify-self: center
      max-width: 690px
      font-size: 24px
      color: #555555

  .player
    grid-row-start: 3

  .actions
    display: grid
    grid-row-start: 4
    justify-content: center
    align-items: center
</style>
