<template lang='pug'>
div
  .lesson-wrapper(v-if='course' v-cloak)

    lessonHeader(:course='course')

    lessonVideo(v-if="current" :videoId = 'current.videoEmbedId' @videoEnded='lessonCompleted')

    lessonsList(:course='course' :current='lessonSlug'  @selectLesson='selectLesson')

    lessonBody(:course='current')

    aside.lesson-aside
      .control-group.-spaced
        a.button.secondary.-has-icon(:href='current.downloadLink' download v-if="current")
          i.fa.fa-download
          | Download
        socialShare
      courseSubscribe
      lessonresources(:resources='current.resources')
      lessonChallenges(:challenges='current.codingChallenge')

    lessonNav(:lessons='course.lessons' :selected='selected' @selectLesson='selectLesson' v-if="current")

    lessonPopup(@selectLesson='selectLesson')

  .lesson-wrapper(v-else)
    .lesson-header.fake
    .lesson-video.fake
      playerPlaceholder
    .lessons-list.fake
      ul.list-unstyled
        each val in [1, 2, 3]
          li
            .media-block.fake
              .media.-small.fake
              .body.fake
    .lesson-content.fake
    .lesson-aside.fake
</template>

<script>
import { mapState } from 'vuex'
import lessonHeader from '~/components/lessons/Header'
import lessonVideo from '~/components/lessons/Video'
import lessonsList from '~/components/lessons/List'
import lessonBody from '~/components/lessons/Body'
import lessonNav from '~/components/lessons/Navigation'
import lessonresources from '~/components/lessons/resources'
import lessonChallenges from '~/components/lessons/Challenges'
import lessonPopup from '~/components/lessons/Popup'
import courseSubscribe from '~/components/account/CourseSubscribe'
import socialShare from '~/components/lessons/SocialSharing'
import playerPlaceholder from '~/components/static/PlayerPlaceholder'

export default {
  head () {
    return {
      // title: this.course.title,
      // meta: [{
      //   hid: `description${this.course.id}`,
      //   name: 'description',
      //   content: this.course.description
      // }, {
      //   hid: `og:title${this.course.id}`,
      //   property: 'og:title',
      //   content: this.course.title
      // }, {
      //   hid: `og:image${this.course.id}`,
      //   property: 'og:image',
      //   content: this.course.image[0].image[0].url
      // }]
    }
  },

  data () {
    return {
      courseSlug: this.$route.params.lesson,
      lessonSlug: this.$route.params.slug,
      selected: null
    }
  },

  mounted () {
    this.$store.dispatch('getCourse', this.courseSlug)

    // TODO: @dustin remove this when popup is styled
    // setTimeout(() => {
    //   this.$modal.show('next-lesson', {
    //     lesson: {
    //       title: 'Intro to Vue.JS',
    //       description: 'If you’re just getting started with Vue, here’s where to get going. We cover all the basics and give you challenges so you can learn by doing.'
    //     }
    //   })
    // }, 500)
  },

  components: {
    lessonHeader,
    lessonVideo,
    lessonsList,
    lessonBody,
    lessonNav,
    lessonresources,
    lessonChallenges,
    lessonPopup,
    socialShare,
    courseSubscribe,
    playerPlaceholder
  },

  computed: {
    ...mapState({
      course: result => result.courses.course
    }),

    current () {
      let currentLesson = null
      // If no lesson selected, get the first one of the course
      if (this.lessonSlug === null) this.lessonSlug = this.course.lessons[0].slug
      this.course.lessons.map((lesson, index) => {
        // Find the selected lesson in the list
        if (this.lessonSlug === lesson.slug) {
          // Load the current lesson
          currentLesson = lesson
          // Keep track of lesson index for the carousel
          this.selected = index
        }
      })
      return currentLesson
    }
  },

  methods: {
    selectLesson (slug) {
      this.lessonSlug = slug
      this.$router.push(`/courses/${this.courseSlug}/${slug}`)
    },

    lessonCompleted () {
      if (this.selected < this.course.lessons.length - 1) {
        this.$modal.show('next-lesson', {
          lesson: this.course.lessons[this.selected + 1]
        })
      }
      this.$store.dispatch('userUpdateCompleted', {
        lessonSlug: this.lessonSlug,
        courseSlug: this.courseSlug,
        isCompleted: true
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '~assets/css/_variables'
.lesson-wrapper
  display grid
  grid-template-columns 1fr 1fr
  grid-template-areas 'header header'\
                      'video video'\
                      'list list'\
                      'content content'\
                      'sidebar sidebar'\
                      'footer footer'

.lesson-header
  grid-area header

.lesson-video
  grid-area video

.lesson-content
  grid-area content

.lesson-aside
  grid-area sidebar
  padding 0 4%
  > div
    margin-bottom 20px

  .control-group
    flex-direction row
    .button
      width 100%
      margin-right 15px

.lessons-nav
  grid-area footer

+tablet-up()
  .lesson-wrapper
    grid-template-columns 1fr 1fr 30%
    grid-template-areas 'header header header'\
                        'video video video'\
                        'content content list'\
                        'sidebar sidebar sidebar'\
                        'footer footer footer'

  .lesson-aside
    margin $vertical-space 0
+laptop-up()
  .lesson-wrapper
    grid-template-columns 1fr 1fr 30%
    grid-template-areas 'header  header  header'\
                         'video   video   list'\
                         'content content sidebar'\
                         'footer  footer  footer'

  .lesson-aside
    padding 0 8%

// +desktop-up()
//   .lesson-wrapper
//     grid-template-columns 50% 25% 25%
//     grid-template-areas 'header  header  header'\
//                          'video   video   list'\
//                          'content sidebar sidebar'\
//                          'footer  footer  footer'


</style>
