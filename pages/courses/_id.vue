<template lang="pug">
.course-wrapper(v-if="course" v-cloak)
  
  lessonHeader(:course="course")

  lessonVideo(:videoId = "current.videoEmbedId" @videoEnded="lessonCompleted")

  lessonsList(:lessons="course.lessons" :current="lessonId"  @selectLesson="selectLesson")

  lessonBody(:course="current")

  aside.lesson-aside
    a(:href="current.downloadLink" download) Download
    socialShare
    lessonresources(:resources="current.resources")
    lessonChallenges(:challenges="current.codingChallenge")

  lessonNav(:lessons="course.lessons" :selected="selected" @selectLesson="selectLesson")

  lessonPopup

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
import socialShare from '~/components/lessons/SocialSharing'

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
    socialShare
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
      history.pushState({}, null, `/courses/${this.courseId}?lesson=${this.lessonId}`)
    },

    lessonCompleted () {
      this.$store.dispatch('userUpdateCompleted', {
        lessonId: this.lessonId,
        courseId: this.courseId
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.lesson-header
  grid-area header

.lesson-video
  grid-area video

.lessons-list
  grid-area list
  
.lesson-content
  grid-area content

.lesson-aside
  grid-area sidebar

.lessons-nav
  grid-area footer

.course-wrapper
  display grid
  grid-template-columns 1fr 1fr 490px
  grid-template-areas "header  header  header"\
                       "video   video   list"\
                       "content content sidebar"\
                       "footer  footer  footer"
</style>