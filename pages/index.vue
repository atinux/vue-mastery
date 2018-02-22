<template lang="pug">
  .homepage
    .hero
      Hero
    .free-videos
      Free
    .course-list
      .section
        h2.title Courses
        Featured
        nuxt-link.button.primary.border(to="/courses") More
    .meet-teachers
      MeetTeachers
    .cheatsheet
      CheatSheetMain
    .community
      CommunitySupport
</template>

<script>
import Featured from '~/components/courses/Featured'
import Free from '~/components/courses/Free'
import Hero from '~/components/static/Hero'
import MeetTeachers from '~/components/static/MeetTeachers'
import CommunitySupport from '~/components/static/CommunitySupport'
import CheatSheetMain from '~/components/static/CheatSheetMain'

export default {
  middleware: 'anonymous',
  head () {
    return {
      title: 'Home page'
    }
  },
  components: {
    Hero,
    Featured,
    Free,
    MeetTeachers,
    CommunitySupport,
    CheatSheetMain
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

containers = hero free-videos course-list meet-teachers cheatsheet community
.homepage
  display grid
  grid-template-columns 1fr 1fr
  grid-template-areas "hero hero"\
    "free-videos free-videos"\
    "course-list course-list"\
    "meet-teachers meet-teachers"\
    "cheatsheet cheatsheet"\
    "community community"

  for container in containers
    .{container}
      grid-area container

.section
  .title
    margin-bottom ($vertical-space/3)
    font-weight 600
    color $secondary-color
    text-align center
    +tablet-up()
      font-size 40.5px
      text-align left

.free-videos
  background-color $secondary-color

.button
  width 100%

+tablet-up()
  .button
    width max-content
+laptop-up()
  .homepage
    grid-template-areas "hero hero"\
      "free-videos course-list"\
      "meet-teachers meet-teachers"\
      "cheatsheet cheatsheet"\
      "community community"\
      "podcast podcast"
</style>
