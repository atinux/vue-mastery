<template lang="pug">
  .lesson-header
    img.lesson-header-img(v-bind:src="course.image[0].image[0].url" :alt="course.image[0].description")
    h1 {{ course.title }}
</template>

<script>
export default {
  name: 'header',
  props: ['course']
}
</script>

<style lang="stylus" scoped>
.lesson-header
  background-color: #0A2B4E
  color: #fff
  height 144px
  display flex
  align-items center

.lesson-header-img
  width: 120px
  height: 120px
  overflow hidden
  object-fit contain
</style>