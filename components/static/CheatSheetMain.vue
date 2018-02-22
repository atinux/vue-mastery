<template lang="pug">
  .banner
    .wrapper
      .media
        img(src="/images/img-cheatsheet-example.png")
      .body
        h2.title Get the Ultimate Vue Cheat Sheet
        p.lead All the essential syntax at your fingertips.
        DownloadButton(buttonClass='inverted')
</template>

<script>
import DownloadButton from '~/components/static/DownloadButton'

export default {
  components: {
    DownloadButton
  },
  name: 'CheatSheetMain'
}
</script>


<style lang="stylus" scoped>
@import '~assets/css/_variables'
.wrapper
  grid-template-columns 1fr 1fr
  padding-top $vertical-space
  grid-template-areas "body body"\
                      "media media"
.banner
  background-image url(/images/bkg-cheatsheet-main.jpg)

.media
  display grid
  grid-area media
  justify-content center
  img
    align-self end
    justify-self center
    width 70%

.body
  display grid
  grid-area body
  padding-bottom 1em
  text-align center

.title
  color $secondary-color
  margin 0
  +tablet-up()
    font-size 56px

.lead
  max-width 690px
  font-size 16px
  color $secondary-color

.button
  justify-self center
  text-transform uppercase

+laptop-up()
  .wrapper
    grid-template-areas "media body"\
                        "media body"
  .media img
    justify-self center
    width 100%

  .body
    padding-bottom $vertical-space
  .lead
    font-size 24px
</style>
