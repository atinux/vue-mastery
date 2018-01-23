<template lang="pug">
  div
    h1 Courses page
    CourseList
</template>

<script>
import CourseList from '~/components/courses/List'

export default {
  middleware: 'anonymous',
  head: {
    title: 'Courses page'
  },
  components: {
    CourseList
  }
}
</script>