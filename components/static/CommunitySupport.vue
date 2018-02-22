<template lang="pug">
  .banner
    .wrapper
      .body
        h2.title We Support the Community
        p.lead In addition to supporting your journey to Vue mastery, we also support Vue.js itself. $5 of your monthly subscription goes directly to the Vue.js organization, supporting its sustainability and growth.
</template>

<script>
export default { name: 'CommunitySupport' }
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
.wrapper
  grid-template-rows $vertical-space 1fr $vertical-space
  align-items center
  justify-content center
  text-align center
.banner
  background-image url(/images/bkg-giveback.svg)
  +desktop-up()
    background-size contain
    background-repeat repeat-x
.body
  grid-row-start 2

.title
  color $primary-color
  margin 0
  +tablet-up()
    font-size 56px

.lead
  max-width 690px
  font-size 16px
  color $gray

.amount
  color $primary-color
  margin 0

+tablet-up()
  .lead
    font-size 24px
</style>
