<template lang="pug">
no-ssr
  modal(name="next-lesson" v-cloak height="auto" @before-open="beforeOpen")
    h3.form-title(v-if="lesson") Next Lesson: {{ lesson.title }}
    .body
      p(v-if="lesson") {{ lesson.description }}

    .progress
      p Next lesson starting in:
      h2.blink(v-on:animationiteration="countdown") {{ count }}
    .form-footer
      .control-group.-spaced
        button.button.link.-full(@click="selectLesson" rel="next") Go to Next Lesson
        //- button.button.primary(@click="stop" rel="next") Cancel
</template>

<script>
export default {
  name: 'popup',
  data () {
    return {
      lesson: false,
      count: 10
    }
  },
  methods: {
    selectLesson () {
      this.$modal.hide('next-lesson')
      this.$emit('selectLesson', this.lesson.slug)
    },
    beforeOpen (event) {
      this.lesson = event.params.lesson
    },
    countdown () {
      this.count--
      if (this.count === 0) this.selectLesson()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

.body
  padding: 0 20px

.progress
  width 100%
  text-align center
  .blink
    color $secondary-color
    animation blink 1s infinite

@keyframes blink
  0%
    transform: scale(0)
    opacity: 0
	49%
    opacity: 0
    transform: scale(1)
	50%
    opacity: 1
    transform: scale(2)

</style>
