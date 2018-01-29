<template lang="pug">
  .container
    Hero
    CourseList
    CheatSheetMain
    CommunitySupport
    VuePodcast
</template>

<script>
import CourseList from '~/components/courses/List'
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
    CommunitySupport,
    CheatSheetMain,
    VuePodcast
  }
}
</script>

<style lang="stylus" scoped>


</style>
