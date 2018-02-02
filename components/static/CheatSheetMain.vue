<template lang="pug">
  .banner
    .media
      img(src="/images/img-cheatsheet-example.png")
    .body
      h2.h1.title Get the Ultimate Vue Cheat Sheet
      p.lead All the essential syntax at your fingertips.
      a.button.inverted(href="/pdf/Vue-Essentials-Cheat-Sheet.pdf" download) Download it Free
</template>

<script>
export default { 'name': 'CheatSheetMain' }
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables'
  .banner
    grid-template-columns 1fr 1fr
    padding-top $vertical-space
    background-image url(/images/bkg-cheatsheet-main.jpg)
    grid-template-areas "body body"\
                        "media media"
  .media
    display grid
    grid-area media
    justify-content center
  .body
    display grid
    grid-area body
    padding-bottom $vertical-space
    text-align center
    .title
      color $secondary-color
      margin 0
    .lead
      max-width 690px
      font-size 24px
      color $secondary-color
    .button
      justify-self center
      text-transform uppercase
  +laptop-up()
    .banner
      grid-template-areas "media body"\
                          "media body"
</style>
