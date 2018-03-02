<template lang="pug">
  .lesson-content
    h2 {{ course.title}}
    div.lesson-body(v-html="body")
    unlock(v-if="locked" v-cloak)
</template>

<script>
import unlock from '~/components/lessons/Unlock'

export default {
  name: 'body',
  props: ['course', 'locked'],
  components: {
    unlock
  },
  computed: {
    body () {
      let text = this.course.markdown
      if (this.locked) {
        text = text.slice(0, 400) + '...'
      }
      return this.$md.render(text)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

.lesson-content
  padding 0 4%
  +tablet-up()
    margin $vertical-space 0

.lesson-body
  font-size 22px
</style>
