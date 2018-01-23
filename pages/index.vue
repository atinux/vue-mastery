<template lang="pug">
  div
    .hero
      .container
        .hero-body
          h1.title The ultimate learning resource for Vue developers
          p Weekly Vue.js tutorials to guide your journey to Mastery.
          nuxt-link.button(to="/courses") START LEARNING

        .hero-placeholder
          .hero-play

    .container
      CourseList

</template>

<script>
import CourseList from '~/components/courses/List'

export default {
  middleware: 'anonymous',
  head: {
    title: 'Home page'
  },
  components: {
    CourseList
  }
}
</script>

<style lang="stylus" scoped>
// TODO: refactor basic css

.title	
  height 120px	
  width 648px
  color #36495E
  font-size 48px
  font-weight bold	
  line-height 60px
  width 100%
  max-width 648px

.hero
  background-image url(/images/hero.svg)
  background-size cover

  .container
    height 590px
    display flex
    flex-wrap wrap
    align-items center
    justify-content space-between

$black = #222
.hero-body
  padding 40px 20px
  p
    color $black
    font-size 20px
    line-height 28px
    padding-top: 20px

.hero-placeholder
  height 379px
  width 647px
  max-width: 100%
  background-color $black
  display flex
  align-items center
  justify-content center

.hero-play
  height 70px
  width 70px
  background-color #FFFFFF
  border-radius 50%
  display flex
  align-items center
  justify-content center

  &:after
    content ''
    width 0px
    height 0px
    border-top 12px solid transparent
    border-bottom 12px solid transparent
    border-left 20px solid $black
    margin-right -7px

.button
  display flex
  align-items center
  justify-content center
  color: #ffffff
  height 53px
  width 223px
  border-radius 26.5px
  margin-top: 20px
  background-color #36495E

</style>
