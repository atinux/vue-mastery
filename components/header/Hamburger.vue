<template>
  <button class="hamburger" @click="toggleNav()">Toggle menu</button>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'hamburger',
  methods: {
    // Update navigation bar status with vuex store
    ...mapActions([
      'toggleNav'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables.styl'

.hamburger
  background-color: transparent
  display: flex
  right: 0
  margin: 0
  padding: 0
  width: 5rem
  height: 4rem
  font-size: 0
  text-indent: -9999px
  z-index: 40
  appearance: none
  box-shadow: none
  border-radius: 0
  border: none
  cursor: pointer
  transition: transform .2s ease-in
  transform: translateX(0)
  animation : .6s ease-out 1.5s normal none infinite showburger
  animation-iteration-count: 1
  animation-fill-mode: forwards
  overflow: hidden
  position: absolute

  +laptop-up()
    transform: translateX(200%)

  &:focus
    outline: 0

  &:before,
  &:after
    content: ''
    display: block
    height: 2px
    width: 2rem
    background-color: $black
    transition: transform .1s ease-in-out, margin-top .1s ease-in-out .1s
    position: absolute
    right: 1rem
    top: 50%

  &:before
    margin-top: -0.6rem

  &:after
    margin-top: 0.3rem

.open-nav
  .hamburger
    &:before,
    &:after
      transition: transform .1s ease-in-out .1s, margin-top .1s ease-in-out

    &:before
      transform: rotate(45deg)
      margin-top: 0

    &:after
      transform: rotate(-45deg)
      margin-top: 0


@keyframes showburger
  0%
    transform: translateX(200%)
    height: 0rem
  
  50%
    transform: translateX(0)
    height: 0rem

  100%
    transform: translateX(0)
    height: 4rem

</style>
