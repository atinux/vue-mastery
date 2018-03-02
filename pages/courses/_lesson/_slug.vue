<template lang='pug'>
div
  //- @Dustin: version with just the class
  //- .lesson-wrapper(v-if='course' v-cloak :class="current.lock ? 'lock': 'unlock'")
  //-   unlock(:account='account' v-if='current.lock && !account' v-cloak)
  //- @dustin version where the content is completly hidden
  div(v-if='course'  v-cloak)
    .lesson-wrapper
      lessonHeader(:course='course')

      lessonVideo(v-if="current && !locked" :videoId = 'current.videoEmbedId' @videoEnded='lessonFinished' @lessonCompleted='lessonCompleted')
      .lesson-video.-locked(v-else :style="{backgroundImage: 'url('+current.image[0].url+')'}")
        unlock(:account='account')

      lessonsList(:course='course' :current='lessonSlug'  @selectLesson='selectLesson')

      lessonBody(:course='current' :locked='locked')

      aside.lesson-aside(v-if="!locked" v-cloak)
        .control-group.-spaced
          download(:courseLink='current.downloadLink', :account='account')
          socialShare
        //- courseSubscribe
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
import download from '~/components/lessons/Download'
import unlock from '~/components/lessons/Unlock'
import courseSubscribe from '~/components/account/CourseSubscribe'
import socialShare from '~/components/lessons/SocialSharing'
import playerPlaceholder from '~/components/static/PlayerPlaceholder'

export default {
  middleware: 'anonymous',
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
    download,
    unlock,
    courseSubscribe,
    playerPlaceholder
  },

  computed: {
    ...mapState({
      course: result => result.courses.course,
      account: result => result.account.account
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
    },

    locked () {
      return this.current.lock && !this.account
    }
  },

  methods: {
    selectLesson (slug) {
      this.lessonSlug = slug
      this.$router.push(`/courses/${this.courseSlug}/${slug}`)
    },

    lessonCompleted () {
      this.$store.dispatch('userUpdateCompleted', {
        lessonSlug: this.lessonSlug,
        courseSlug: this.courseSlug,
        isCompleted: true
      })
    },

    lessonFinished () {
      if (this.selected < this.course.lessons.length - 1) {
        this.$modal.show('next-lesson', {
          lesson: this.course.lessons[this.selected + 1]
        })
      }
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
  &.-locked
    position relative
    background $black
    width 100%
    height 500px

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

</style>
