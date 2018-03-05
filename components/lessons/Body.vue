<template lang="pug">
  .lesson-content(:class="locked ? '-locked': 'unlock'")
    h1 {{ course.title}}
    div.lesson-body(v-html="body")
    .lesson-locked(v-if="locked" v-cloak)
      unlock
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

  &.-locked
    position relative
    .lesson-locked
      display flex
    h2
      opacity 0.5
    .lesson-body
      opacity 0.5
      position relative
      height 300px
      overflow hidden
      &:after
        content ''
        position absolute
        left 0
        right 0
        bottom 0
        height 220px
        background linear-gradient(to top,
                    rgba(255,255,255,1),
                    rgba(255,255,255,0.6),
                    rgba(255,255,255,0))

.lesson-body
  font-size 16px
  +tablet-up()
    font-size 22px
</style>
