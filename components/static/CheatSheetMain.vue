<template lang="pug">
  .banner
    .media
      img(src="/images/img-cheatsheet-example.png")

    .body
      h2.h1.title Get the Ultimate Vue Cheat Sheet
      p.lead All the essential syntax at your fingertips.
      nuxt-link.button.inverted(to="/download") Download it Free
</template>

<script>
export default { 'name': 'CheatSheetMain' }
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables'

  .banner
    display grid
    grid-template-columns: 49% 49%
    grid-template-rows: $vertical-space auto $vertical-space
    background-image url(/images/bkg-cheatsheet-main.jpg)

  .media
    display: grid
    grid-row-start: 2
    grid-row-end: span 2
    justify-content: center

  .body
    display: grid
    grid-row-start: 2
    align-items: center
    text-align: center
    justify-content: center

    .title
      color: $secondary-color
      margin: 0

    .lead
      max-width: 690px
      font-size: 24px
      color: $secondary-color

    .button
      justify-self: center
      text-transform: uppercase
</style>
