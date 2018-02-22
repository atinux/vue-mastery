<template lang="pug">
  .banner
    .wrapper
      .body
        h2.title Grab our free 2-page cheat sheet!
        DownloadButton(buttonClass='primary')
</template>

<script>
import DownloadButton from '~/components/static/DownloadButton'

export default {
  components: {
    DownloadButton
  },
  name: 'CheatSheetAlt'
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
.wrapper
  grid-template-rows $vertical-space 1fr $vertical-space
  align-items center
  justify-content center
  text-align center

.banner
  background-image url(/images/bkg-cheatsheet-alt.jpg)
  +desktop-up()
    background-repeat repeat-x
    background-size: contain;

  .body
    grid-row-start 2

  .title
    color #fff
    +tablet-up()
      font-size 56px

  .button
    justify-self center
    text-transform uppercase
</style>
