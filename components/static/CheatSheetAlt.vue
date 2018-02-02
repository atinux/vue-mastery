<template lang="pug">
  .banner
    .body
      h2.h1.title Grab our free 2-page cheat sheet!
      a.button.primary(href="/pdf/Vue-Essentials-Cheat-Sheet.pdf" download) Download it Free
</template>

<script>
export default { name: 'CheatSheetAlt' }
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables'
  .banner
    grid-template-rows $vertical-space 1fr $vertical-space
    align-items center
    justify-content center
    text-align center
    background-image url(/images/bkg-cheatsheet-alt.jpg)
    .body
      grid-row-start 2
    .title
      color #fff
    .button
      justify-self center
      text-transform uppercase
</style>
