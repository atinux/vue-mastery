<template lang="pug">
  .container
    .courses-header
      .wrapper
        h1.title Our Courses
    .courses-body.wrapper
      CourseList(showAction="true")
      Latest
    CheatSheetAlt
</template>

<script>
import CourseList from '~/components/courses/List'
import Latest from '~/components/courses/Latest'
import CheatSheetAlt from '~/components/static/CheatSheetAlt'

export default {
  middleware: 'anonymous',
  // head: {
  //   title: 'Courses page',
  //   meta: [
  //     { hid: 'description', name: 'description', content: 'This is the page description' }
  //   ]
  // },
  head () {
    return {
      title: 'Courses page'
    }
  },
  components: {
    CourseList,
    Latest,
    CheatSheetAlt
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

.courses-header
  height 220px
  display flex
  align-items center
  background url(/static/images/bkg-courses.svg) no-repeat
  background-size cover

.title
  margin 0
  font-size 60px
  font-weight 600
  color #FFFFFF
  line-height 60px

.courses-body
  display grid
  width 100%
  grid-column-gap 2%
  grid-row-gap 45px
  padding-top ($vertical-space/2)
  padding-bottom ($vertical-space/2)

  +laptop-up()
    grid-template-columns 63% 35%
</style>
