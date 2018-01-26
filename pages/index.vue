<template lang="pug">
  div
    .container
      Hero

    .container
      CourseList

    .container
      CheatSheetMain

    .container
      CommunitySupport

    .container
      VuePodcast

</template>

<script>
import Hero from '~/components/static/Hero'
import CourseList from '~/components/courses/List'
import CommunitySupport from '~/components/static/CommunitySupport'
import CheatSheetMain from '~/components/static/CheatSheetMain'
import VuePodcast from '~/components/static/VuePodcast'

export default {
  middleware: 'anonymous',
  head: {
    title: 'Home page'
  },
  components: {
    Hero,
    CourseList,
    CommunitySupport,
    CheatSheetMain,
    VuePodcast
  }
}
</script>

<style lang="stylus" scoped>


</style>
