<template lang="pug">
.banner
  .body
    h1.title The ultimate learning resource for Vue developers
    p.lead Weekly Vue.js tutorials to guide your journey to Mastery.
  .player
    .play-button
  .actions
    nuxt-link.button.secondary(to="/courses") START LEARNING
</template>

<script>
export default {
  'name': 'Hero'
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
    height 379px
    max-width: 100%
    background-color $black
    display flex
    align-items center
    justify-content center
  .play-button
    height 70px
    width 70px
    background-color #FFFFFF
    border-radius 50%
    display flex
    align-items center
    justify-content center
    &:after
      content ''
      width 0px
      height 0px
      border-top 12px solid transparent
      border-bottom 12px solid transparent
      border-left 20px solid $black
      margin-right -7px
  .actions
    display: grid
    grid-row-start: 4
    justify-content: center
    align-items: center
</style>
