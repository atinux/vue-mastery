<template lang="pug">
  .container
    .courses-header
      h1.title Our Courses
    .courses-body
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
  head: {
    title: 'Courses page',
    meta: [
      { hid: 'description', name: 'description', content: '' },
      { hid: 'description', name: 'description', content: 'This is the page description' }
    ]
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

.container
  > div
    padding-left: 4%
    padding-right: 4%

.courses-header
  height: 220px
  display: flex
  align-items: center
  background: url(/static/images/bkg-courses.svg) no-repeat

.title
  margin: 0
  font-size: 60px
  font-weight 600
  color: #FFFFFF
  line-height: 60px

.courses-body
  display: grid
  width: 100%
  grid-column-gap: 2%
  grid-row-gap: 45px
  padding: 60px 4%

  +laptop-up()
    grid-template-columns: 63% 35%
</style>
