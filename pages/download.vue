<template lang="pug">
  .banner
    .wrapper
      h1.title Downloading in progress
      p.lead Your download will start momentarily. If you do not see it, please click #[a.bold(href='/pdf/Vue-Essentials-Cheat-Sheet.pdf' download ref='download') restart download].

</template>

<script>
export default {
  middleware: 'anonymous',
  head () {
    return {
      title: '[Downloading...] Vue Cheat Sheet'
    }
  },
  mounted () {
    this.$refs.download.click()
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
.wrapper
  padding-top $vertical-space
  padding-bottom $vertical-space
  justify-items center
  text-align center
  +tablet-up()
    padding-top $vertical-space * 2
    padding-bottom $vertical-space * 2
.banner
  // background-image url(/images/bkg-cheatsheet-main.jpg)

.title
  color $secondary-color
  margin 0
  +tablet-up()
    font-size 56px

.lead
  max-width 690px
  font-size 16px
  color $secondary-color
  +tablet-up()
    font-size 24px

.bold
  font-weight 700

</style>
