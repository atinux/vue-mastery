<template lang="pug">
  .container
    Hero
    .courses-wrapper
      Free
      CourseList
    CheatSheetMain
    CommunitySupport
    VuePodcast
</template>

<script>
import CourseList from '~/components/courses/List'
import Free from '~/components/courses/Free'
import Hero from '~/components/static/Hero'
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
    Free,
    CommunitySupport,
    CheatSheetMain,
    VuePodcast
  }
}
</script>

<style lang="stylus" scoped>
  .courses-wrapper
    display: grid;
    grid-template-columns: 49% 49%;
    grid-column-gap: 2%;

    .list
      padding: 60px 4%

</style>
