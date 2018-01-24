<template lang="pug">
  div(v-if="courses.course" v-cloak)
    h1 {{ courses.course.title }}
    p {{ courses.course.description }}
    label Difficulty {{ courses.course.difficulty }}
    label Duration {{ courses.course.duration }}
    img(v-bind:src="courses.course.image[0].image[0].url" :alt="courses.course.image[0].description")
    label Course count {{ courses.course.lessonsCount }}

    div(v-if="courses.course.lessons[selectedLesson]")
      p Video Url {{ courses.course.lessons[selectedLesson].videoEmbedUrl}}

    ul(v-if="courses.course.lessons" v-cloak)
      li(v-for="(lesson, key) in courses.course.lessons")
        h3 {{ lesson.title }}
        label {{ lesson.duration }}
        input(type="radio" v-model="selectedLesson" v-bind:value="key")

    div(v-if="courses.course.lessons[selectedLesson]")
      h2 {{ courses.course.lessons[selectedLesson].title}}
      div(v-html="courses.course.lessons[selectedLesson].body")



</template>

<script>
// author:"Pierre Schweiger"
// belongsToCourse:1516791397640
// body:"<p><span style=\"font-size:20px\">Intro to Vue.JS lessons 1 title</span></p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse risus augue, laoreet eget velit vel, placerat ultricies felis. Phasellus et tellus ante. Sed porttitor tellus fringilla orci lobortis, ut bibendum velit gravida. Ut quis neque sodales, egestas orci ut, congue augue. Sed eu neque ut quam sagittis interdum eget non mi. Donec est sapien, finibus aliquet eros eget, ullamcorper viverra magna. Mauris efficitur justo vitae rhoncus euismod. Nulla sed commodo ipsum. Sed finibus lacus et neque lacinia consectetur. Sed consectetur euismod bibendum.</p>\n\n<p>Vestibulum id ultrices justo. Maecenas at imperdiet est. Duis sodales consectetur lorem, eget porttitor erat elementum eget. In iaculis mattis semper. Integer turpis nulla, hendrerit eu porttitor in, tempus a nulla. Phasellus est enim, ornare at ullamcorper at, tempor eu neque. Aliquam at enim vitae felis bibendum ornare vitae vel mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur sit amet aliquet lectus. Praesent lacinia semper nunc, a facilisis augue. Duis pulvinar fringilla massa, at volutpat odio volutpat in. Vestibulum convallis vitae neque non accumsan. Nulla sed egestas dolor. Maecenas posuere sed erat ultrices ullamcorper. Phasellus ut aliquet risus, vitae luctus sem. Vestibulum molestie nulla in aliquet molestie.</p>\n"
// codingChallenge:""
// date:"2018-01-24T11:32:02+01:00"
// description:"Intro to Vue.JS lessons 1 paragraph"
// downloadLink:"https://test.com/"
// duration:"00:06:00"
// id:1516790332278
// image:Array[1]
// lessonNumber:1
// resources:Array[2]
// status:"published"
import { mapState } from 'vuex'
import lessonList from '~/components/lessons/List'

export default {
  data () {
    return {
      selectedLesson: 0
    }
  },

  component: {
    lessonList
  },

  computed: {
    ...mapState([
      'courses'
    ])
  },

  mounted: function () {
    this.$store.dispatch('getCourse', this.$route.params.id)
    this.$store.dispatch('getLessons', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>