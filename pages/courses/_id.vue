<template lang="pug">
div
  .lesson-wrapper(v-if="course" v-cloak)

    lessonHeader(:course="course")

    lessonVideo(:videoId = "current.videoEmbedId" @videoEnded="lessonCompleted")

    lessonsList(:course="course" :current="lessonId"  @selectLesson="selectLesson")

    lessonBody(:course="current")

    aside.lesson-aside
      .control-group.-spaced
        a.button.secondary.-has-icon(:href="current.downloadLink" download)
          i.fa.fa-download
          | Download
        socialShare
      //- courseSubscribe
      lessonresources(:resources="current.resources")
      lessonChallenges(:challenges="current.codingChallenge")

    lessonNav(:lessons="course.lessons" :selected="selected" @selectLesson="selectLesson")

    lessonPopup(@selectLesson="selectLesson")

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
  data () {
    return {
      courseId: parseInt(this.$route.params.id),
      lessonId: parseInt(this.$route.query.lesson) || null,
      selected: null
    }
  },

  mounted () {
    this.$store.dispatch('getCourse', this.courseId)
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
      if (this.lessonId === null) this.lessonId = this.course.lessons[0].id
      this.course.lessons.map((lesson, index) => {
        // Find the selected lesson in the list
        if (this.lessonId === lesson.id) {
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
    selectLesson (id) {
      this.lessonId = id
      // Change url without redirecting to avoid page jump
      // history.pushState({}, null, `/courses/${this.courseId}?lesson=${this.lessonId}`)
      this.$router.push(`/courses/${this.courseId}?lesson=${this.lessonId}`)
    },

    lessonCompleted () {
      if (this.selected < this.course.lessons.length - 1) {
        this.$modal.show('next-lesson', {
          lesson: this.course.lessons[this.selected + 1]
        })
      }
      this.$store.dispatch('userUpdateCompleted', {
        lessonId: this.lessonId,
        courseId: this.courseId,
        isCompleted: true
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables.styl'
.lesson-wrapper
  display grid
  grid-template-columns 1fr 1fr
  grid-template-areas "header header"\
                      "video video"\
                      "list list"\
                      "content content"\
                      "sidebar sidebar"\
                      "footer footer"

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
    grid-template-areas "header header header"\
                        "video video video"\
                        "content content list"\
                        "sidebar sidebar sidebar"\
                        "footer footer footer"

  .lesson-aside
    margin $vertical-space 0
+laptop-up()
  .lesson-wrapper
    grid-template-columns 1fr 1fr 30%
    grid-template-areas "header  header  header"\
                         "video   video   list"\
                         "content content sidebar"\
                         "footer  footer  footer"

  .lesson-aside
    padding 0 8%

// +desktop-up()
//   .lesson-wrapper
//     grid-template-columns 50% 25% 25%
//     grid-template-areas "header  header  header"\
//                          "video   video   list"\
//                          "content sidebar sidebar"\
//                          "footer  footer  footer"


</style>
