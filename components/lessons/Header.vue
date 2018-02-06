<template lang="pug">
  .lesson-header
    .media
      img(v-bind:src="course.image[0].image[0].url" :alt="course.image[0].description")
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
@import '~assets/css/_variables.styl'
.lesson-header
  padding-left 4%
  padding-right 4%
  background-color: #0A2B4E
  color: #fff
  height 90px
  display flex
  align-items center

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
  .lesson-header
    height 116px
  .media
    width 90px
  .title
    font-size 48px

</style>
