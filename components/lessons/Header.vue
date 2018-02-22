<template lang="pug">
  .lesson-header
    .wrapper
      .media
        img(v-bind:src="course.image[0].url")
      .body
        h1.title {{ course.title }}
</template>

<script>
export default {
  name: 'header',
  props: ['course']
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
.wrapper
  color: #fff
  height 90px
  display flex
  align-items center
.lesson-header
  background-color: #0A2B4E

.title
  margin 0
  font-size 34px
  font-weight 600

.media
  width 60px
  margin-right 1.5em
  img
  height: 90px
  overflow hidden
  object-fit contain

+tablet-up()
  .wrapper
    height 116px
  .media
    width 90px
  .title
    font-size 48px

</style>
