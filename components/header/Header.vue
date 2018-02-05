<template lang="pug">
  .header
    nuxt-link.logo(to="/")
      span.visually-hidden Vue mastery
      img(src="/images/logo.png" role="logo")

    navigation
    hambuger

</template>

<script>
import navigation from './Navigation'
import hambuger from './Hamburger'

export default {
  name: 'header',
  components: {
    navigation,
    hambuger
  }
}
</script>

<style lang="stylus">
.open-nav
  .logo
    transform: translateX(-50%)
    margin-left: 50%
</style>

<style lang="stylus" scoped>
@import '~assets/css/_variables.styl'

.header
  height $header-height
  padding 0 4%
  position relative
  z-index 2
  display flex
  flex-wrap wrap
  align-items center

.logo
  display block
  max-width 200px
  margin-top -5px
  position: relative
  z-index: 1
  transition: all ease-in .2s

  img
    display block
    width 100%

  +laptop-up()
    transform: none
    max-width 282px
    min-width 200px
    margin: -10px 70px 0 0

</style>
