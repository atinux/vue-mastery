<template lang="pug">
.container
  .page-header
    .wrapper
      h1.title Terms of Service
  .wrapper
    div(v-html="terms")
</template>
<script>
import Terms from '~/static/terms.md'
export default {
  middleware: 'anonymous',
  head: {
    title: 'Terms of Service'
  },
  computed: {
    terms () {
      return Terms
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
// h1
//   color: $primary-color
//   font-weight 600
//   +tablet-up()
//     font-size 56px
</style>
