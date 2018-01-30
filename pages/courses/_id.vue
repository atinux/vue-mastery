<template lang="pug">
  .container.course-wrapper(v-if="course" v-cloak)
    .lesson-header
      h1 {{ course.title }}

    .lesson-video(v-if="current.videoEmbedId" v-cloak)
      vimeo(:videoId = "current.videoEmbedId" :meta = "videoMeta")

    .lessons-list(v-if="course.lessons" v-cloak)
      h2 Lesson in this course
      ul
        li(v-for="(lesson, key) in course.lessons" 
           v-bind:class="{ active: selectedLessonId === lesson.id , completed: lesson.isCompleted }")
          h3 {{ lesson.title }}
          label {{ lesson.duration | time}}
          input(type="radio" v-model="selectedLessonId" v-bind:value="lesson.id" v-on:click="updateUrl")

    .lesson-content(v-if="current")
      h2 {{ current.title}}
      div(v-html="current.body")

    aside.lesson-aside
      a(:href="current.downloadLink" download) Download
      .lesson-ressources(v-if="current.resources && current.resources.length" v-cloak)
        h3 Lesson Ressource{{ current.resources.length > 1 ? 's' : '' }}
        ul
          li(v-for="ressource in current.resources")
            h4 {{ ressource[Object.keys(ressource)[0]] }}

      .lesson-challenge(v-if="current.codingChallenge" v-cloak)
        h3 Coding Challenge
        div(v-html="current.codingChallenge")

    .lessons-nav(v-if="course.lessons && course.lessons.length > 1" v-cloak)
      button.prev(v-on:click="goTo(-1)" rel="prev" v-bind:disabled="isFirst") Previous Lesson
      button.next(v-on:click="goTo(1)" rel="next" v-bind:disabled="isLast") Next Lesson

</template>

<script>
import { mapState } from 'vuex'
import lessonList from '~/components/lessons/List'
import vimeo from '~/components/lessons/Vimeo'

export default {
  data () {
    return {
      courseId: parseInt(this.$route.params.id),
      selectedLessonId: parseInt(this.$route.query.lesson) || null,
      lessonNumber: null,
      videoMeta: null
    }
  },

  components: {
    lessonList,
    vimeo
  },

  computed: {
    ...mapState({
      course: result => result.courses.course,
      accounts: result => result.accounts.account
    }),

    current () {
      let currentLesson = null
      let courseStarted = false
      // Check if user is logged
      if (this.accounts) {
        // Check if the user already started the course
        courseStarted = this.accounts.completed[this.courseId]
      }
      // If no lesson selected, get the first one of the course
      if (this.selectedLessonId === null) this.selectedLessonId = this.course.lessons[0].id
      this.course.lessons.map((lesson, index) => {
        // Find the selected lesson in the list
        if (this.selectedLessonId === lesson.id) {
          // Load the current lesson
          currentLesson = lesson
          // Keep track of lesson index for the carousel
          this.lessonNumber = index
        }
        // Check if the user already watched the lesson video til the end
        lesson.isCompleted = courseStarted ? courseStarted.completedLessons[lesson.id] : false
      })
      // Add data to video component to save watched videos
      // TODO improve this flow?
      this.videoMeta = {
        lessonId: this.selectedLessonId,
        courseId: this.courseId
      }
      return currentLesson
    },

    isFirst () { return this.lessonNumber === 0 },

    isLast () { return this.lessonNumber === this.course.lessons.length - 1 }
  },

  methods: {
    updateUrl () {
      // Change url without redirecting to avoid page jump
      history.pushState({}, null, `/courses/${this.courseId}?lesson=${this.selectedLessonId}`)
    },

    goTo (lessonIndex) {
      this.lessonNumber += lessonIndex
      const nextLesson = this.course.lessons[this.lessonNumber]
      // Double check if the index is not out of the array
      if (nextLesson) {
        this.selectedLessonId = nextLesson.id
        this.updateUrl()
      } else { console.log('Error: Lesson not found in course') }
    }
  },

  mounted () {
    this.$store.dispatch('getCourse', this.courseId)
  }
}
</script>

<style lang="stylus" scoped>
.lesson-header
  grid-area header
  height 144px
  display flex
  align-items center

.lesson-video
  grid-area video

.lessons-list
  grid-area list
  .completed
    background-color grey
  .active
    background-color green

.lesson-content
  grid-area content

.lesson-aside
  grid-area sidebar

.lessons-nav
  grid-area footer

.course-wrapper
  display grid
  grid-gap 10px
  grid-template-columns 1fr 1fr 490px
  grid-template-areas "header  header  header"\
                       "video   video   list"\
                       "content content sidebar"\
                       "footer  footer  footer"
</style>