<template lang="pug">
  div(v-if="course" v-cloak)
    h1 {{ course.title }}
    p {{ course.description }}
    label Difficulty {{ course.difficulty }}
    label Duration {{ course.duration }}
    img(v-bind:src="course.image[0].image[0].url" :alt="course.image[0].description")
    label Course count {{ course.lessonsCount }}

    .lesson-video(v-if="course.lessons !== undefined && current" v-cloak)
      p Video Url {{ current.videoEmbedUrl}}

    .lessons-list(v-if="course.lessons" v-cloak)
      ul
        li(v-for="(lesson, key) in course.lessons" v-bind:class="{ active: selectedLessonId === key }")
          h3 {{ lesson.title }}
          label {{ lesson.duration }}
          input(type="radio" v-model="selectedLessonId" v-bind:value="key")

    .lesson-body(v-if="current")
      h2 {{ current.title}}
      div(v-html="current.body")

    .lesson-ressources(v-if="current.resources && current.resources.length" v-cloak)
      h3 Lesson Ressource{{ current.resources.length > 1 ? 's' : '' }}
      ul
        li(v-for="ressource in current.resources")
          h4 {{ ressource[Object.keys(ressource)[0]] }}

    .lesson-challenge(v-if="current.codingChallenge" v-cloak)
      h3 Coding Challenge
      div(v-html="current.codingChallenge")

    a(:href="current.downloadLink" download) Download

    .lessons-nav(v-if="course.lessons && course.lessons.length > 1" v-cloak)
      button.prev(v-on:click="selectedLessonId -= 1" rel="prev" v-bind:disabled="selectedLessonId === 0") Previous Lesson
      button.next(v-on:click="selectedLessonId += 1" rel="next" v-bind:disabled="selectedLessonId === course.lessons.length -1") Next Lesson

</template>

<script>
import { mapState } from 'vuex'
import lessonList from '~/components/lessons/List'

export default {
  data () {
    return {
      selectedLessonId: 0
    }
  },

  component: {
    lessonList
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
.lessons-list
  .active
    background-color: green
</style>