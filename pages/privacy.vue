<template lang="pug">
.container
  .wrapper
    h2.title Privacy Policy
</template>
<script>
export default {
  middleware: 'anonymous',
  // head: {
  //   title: 'Privacy Policy'
  // }
  head () {
    return {
      title: 'Privacy Policy'
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~assets/css/_variables'
.wrapper
  margin-top ($vertical-space/4)
  margin-bottom ($vertical-space/4)
.title
  color: $primary-color
  font-weight 600
  +tablet-up()
    font-size 56px
</style>
