<template lang="pug">
.container.course-wrapper(v-if="course" v-cloak)
  .lesson-header
    img(v-bind:src="course.image[0].image[0].url" :alt="course.image[0].description")
    h1 {{ course.title }}

  .lesson-video(v-if="current.videoEmbedId" v-cloak)
    vimeo(:videoId = "current.videoEmbedId" :meta = "videoMeta")

  .lessons-list(v-if="course.lessons" v-cloak)
    h3.title Lesson in this course
    ul
      li.lessons-list-item(v-for="(lesson, key) in course.lessons" 
          v-bind:class="{ active: selectedLessonId === lesson.id , completed: lesson.isCompleted }")
        h4 {{ lesson.title }}
        label {{ lesson.duration | time}}
        input(type="radio" v-model="selectedLessonId" v-bind:value="lesson.id" v-on:click="updateUrl")

  .lesson-content(v-if="current")
    h2 {{ current.title}}
    div(v-html="current.body")

  aside.lesson-aside
    socialShare
    a(:href="current.downloadLink" download) Download
    button.button.inverted.primary.-small(type="button" v-on:click="openShare") Share
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

  no-ssr
    modal(name="next-lesson" v-cloak height="auto")
      h2 Next Lesson:
</template>

<script>
import { mapState } from 'vuex'
import vimeo from '~/components/lessons/Vimeo'
import socialShare from '~/components/lessons/SocialSharing'

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
    vimeo,
    socialShare
  },

  computed: {
    ...mapState({
      course: result => result.courses.course,
      account: result => result.account.account
    }),

    current () {
      let currentLesson = null
      let courseStarted = false
      try {
        courseStarted = this.account.completed[this.courseId]
      } catch (error) {
        console.log('User not loggin')
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
    },

    openShare () {
      this.$modal.show('share')
    }
  },

  mounted () {
    this.$store.dispatch('getCourse', this.courseId)
  }
}
</script>

<style lang="stylus" scoped>
.lesson-header
  background-color: #0A2B4E
  color: #fff
  grid-area header
  height 144px
  display flex
  align-items center

  img
    width: 120px
    height: 120px
    overflow hidden
    object-fit contain


.lesson-video
  grid-area video

.lessons-list
  grid-area list
  background-color: #1E3247
  color: #fff
  
  .lessons-list-item
    background-color: #1E3247
  
  .completed
    background-color #ccc
  
  .active
    background: linear-gradient(to top right, #41B782 , #86D169)

  .title
    background-color: #444444
    margin-bottom: 0

  .title,
  .lessons-list-item
    padding: 15px 20px
    border-bottom: 1px solid #ccc

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