<template lang="pug">
  .lesson-content(:class="locked ? '-locked': 'unlock'")
    h2 {{ course.title}}
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
  font-size 22px

// .lesson-locked
//   display none
//   flex-flow column
//   position absolute
//   color $secondary-color
//   left 0
//   right 0
//   top 50%
//   transform translateY(-50%)
//   justify-content center
//   align-items center
//   h5
//     font-weight 600
//   &:before
//     content ''
//     position absolute
//     height 240px
//     left 20%
//     right 20%
//     background white
//     z-index: -1
//     border-radius 6px
//     border solid 1px #eee
</style>
