<template lang="pug">
  //- TODO: Add class `.-locked` to list-item when course is locked/unavailable
  .lesson-content.-locked
    h2 {{ course.title}}
    div.lesson-body(v-html="$md.render(course.markdown)")
    div.lesson-locked
      h3 This lesson is locked.
      h5 If you wish to take this lesson please,
      .control-group
        button.button.primary(type="button" v-on:click="openSignUp") Sign Up
        button.button.link(disabled) Or
        button.button.secondary(type="button" v-on:click="openLogin") Login
</template>

<script>
export default {
  name: 'body',
  props: ['course'],
  methods: {
    openLogin () {
      this.$modal.show('login-form', { newAccount: false })
    },
    openSignUp () {
      this.$modal.show('login-form', { newAccount: true })
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

.lesson-locked
  display none
  flex-flow column
  position absolute
  color $secondary-color
  left 0
  right 0
  top 50%
  transform translateY(-50%)
  justify-content center
  align-items center
  h5
    font-weight 600
  &:before
    content ''
    position absolute
    height 240px
    left 20%
    right 20%
    background white
    z-index: -1
    border-radius 6px
    border solid 1px #eee
  .button + .button
    margin-left 20px
</style>
