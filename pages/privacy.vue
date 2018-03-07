<template lang="pug">
.container
  .page-header
    .wrapper
      h1.title Privacy Policy
  .wrapper
    div(v-html="privacy")
</template>
<script>
import Privacy from '~/static/privacy.md'
export default {
  middleware: 'anonymous',
  // head: {
  //   title: 'Privacy Policy'
  // }
  head () {
    return {
      title: 'Privacy Policy'
    }
  },
  computed: {
    privacy () {
      return Privacy
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/css/_variables'

.wrapper
  margin-top ($vertical-space/4)
  margin-bottom ($vertical-space/4)

.page-header
  height 220px
  display flex
  align-items center
  background url(/static/images/bkg-courses.svg) no-repeat
  background-size cover

.title
  margin 0
  font-size 60px
  font-weight 600
  color #FFFFFF
  line-height 60px
</style>
