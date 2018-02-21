<template lang="pug">
  .lesson-content
    h2 {{ course.title}}
    div.lesson-body(v-html="course.body")
</template>

<script>
export default {
  name: 'body',
  props: ['course']
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables.styl'

.lesson-content
  padding 0 4%
  +tablet-up()
    margin $vertical-space 0

.lesson-body
  font-size 22px
</style>
