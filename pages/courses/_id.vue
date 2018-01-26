<template lang="pug">
  .container.course-wrapper(v-if="course" v-cloak)
    .lesson-header
      h1 {{ course.title }}

    .lesson-video(v-if="current.videoEmbedId" v-cloak)
      vimeo(:videoId = "current.videoEmbedId")

    .lessons-list(v-if="course.lessons" v-cloak)
      h2 Lesson in this course
      ul
        li(v-for="(lesson, key) in course.lessons" v-bind:class="{ active: selectedLessonId === key }")
          h3 {{ lesson.title }}
          label {{ lesson.duration }}
          input(type="radio" v-model="selectedLessonId" v-bind:value="key")

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
      button.prev(v-on:click="selectedLessonId -= 1" rel="prev" v-bind:disabled="selectedLessonId === 0") Previous Lesson
      button.next(v-on:click="selectedLessonId += 1" rel="next" v-bind:disabled="selectedLessonId === course.lessons.length -1") Next Lesson

</template>

<script>
import { mapState } from 'vuex'
import lessonList from '~/components/lessons/List'
import vimeo from '~/components/lessons/Vimeo'

export default {
  data () {
    return {
      selectedLessonId: 0
    }
  },

  components: {
    lessonList,
    vimeo
  },

  computed: {
    ...mapState({ course: result => result.courses.course }),
    current () {
      return this.course.lessons[this.selectedLessonId]
    }
  },

  mounted () {
    this.$store.dispatch('getCourse', this.$route.params.id)
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