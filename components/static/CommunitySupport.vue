<template lang="pug">
  .banner
    .body
      h2.h1.title We Support the Community
      p.lead In addition to supporting your journey to Vue mastery, we also support Vue.js itself. $5 of your monthly subscription goes directly to the Vue.js organization, supporting its sustainability and growth.
      span.h1.amount $5
</template>

<script>
export default { name: 'CommunitySupport' }
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables'

  .banner
    grid-template-columns auto
    grid-template-rows $vertical-space auto $vertical-space
    align-items center
    justify-content center
    text-align center
    background-image url(/images/bkg-giveback.svg)

  .body
    grid-row-start 2

  .title
    color $primary-color
    margin 0

  .lead
    max-width 690px
    font-size 24px
    color #555555

  .amount
    color $primary-color
    margin 0
</style>
