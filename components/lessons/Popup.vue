<template lang="pug">
no-ssr
  modal(name="next-lesson" v-cloak height="auto" @before-open="beforeOpen")
    h2(v-if="lesson") Next Lesson: {{ lesson.title }}
    p(v-if="lesson") {{ lesson.description }}

    .progress
      svg(height="60" width="60")
        circle(cx="30" cy="30" r="20" stroke-width="10" fill="none" v-on:animationend="selectLesson")

    button.button.primary(@click="selectLesson" rel="next") Next Lesson
    //- button.button.primary(@click="stop" rel="next") Cancel
</template>

<script>
export default {
  name: 'popup',
  data () {
    return {
      lesson: false
    }
  },
  methods: {
    selectLesson () {
      this.$modal.hide('next-lesson')
      this.$emit('selectLesson', this.lesson.slug)
    },
    beforeOpen (event) {
      this.lesson = event.params.lesson
    }
  }
}
</script>

<style lang="stylus" scoped>
$offset = 130
$stroke = #444

.progress
  transform: rotate(-90deg)
  stroke: $stroke
  position: absolute
  left: 233px
  bottom: 0px

  circle
    stroke-dasharray: $offset
    stroke-dashoffset: $offset
    animation: dash 30s normal forwards

@keyframes dash
  50%
    stroke-dashoffset: 0
  100%
    stroke-dashoffset: -$offset
</style>
