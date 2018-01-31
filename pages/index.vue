<template lang="pug">
  .index
    .hero
      Hero
    .free-videos
      Free
    .course-list
      .section
        h2.title Courses
        CourseList
    .cheatsheet
      CheatSheetMain
    .community
      CommunitySupport
    .podcast
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
  @import '~assets/css/_variables'
  containers = hero free-videos course-list cheatsheet community podcast
  .index
    display grid
    grid-template-columns 1fr 1fr
    grid-template-areas "hero hero"\
      "free-videos free-videos"\
      "course-list course-list"\
      "cheatsheet cheatsheet"\
      "community community"\
      "podcast podcast"
    for container in containers
      .{container}
        grid-area container
  .section .title
    margin-bottom ($vertical-space/3)
    font-weight 600
    color $secondary-color
  .free-videos
    background-color $secondary-color
  +laptop-up()
    .index
      grid-template-areas "hero hero"\
        "free-videos course-list"\
        "cheatsheet cheatsheet"\
        "community community"\
        "podcast podcast"
</style>
