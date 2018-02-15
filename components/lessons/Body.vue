<template lang="pug">
  .lesson-content
    div
      h2 {{ course.title}}
      div(v-html="course.body")
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

  +desktop-up()
    width 80%
    justify-self flex-end
</style>
