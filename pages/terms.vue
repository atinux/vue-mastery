<template lang="pug">
.container
  .wrapper
    h1.title Terms of Service
</template>
<script>
export default {
  middleware: 'anonymous',
  head: {
    title: 'Terms of Service'
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
