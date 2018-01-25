<template lang="pug">
  div
    h1 Courses page
    CourseList
    Latest
</template>

<script>
import CourseList from '~/components/courses/List'
import Latest from '~/components/courses/Latest'

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
    Latest
  }
}
</script>

<style lang="stylus" scoped></style>
