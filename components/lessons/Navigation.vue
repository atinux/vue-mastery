<template lang="pug">
.lessons-nav(v-if="lessons && lessons.length > 1" v-cloak)
  button.prev(v-on:click="goTo(-1)" rel="prev" v-bind:disabled="isFirst") Previous Lesson
  button.next(v-on:click="goTo(1)" rel="next" v-bind:disabled="isLast") Next Lesson
</template>

<script>
export default {
  name: 'navigation',
  props: ['lessons', 'selected'],
  computed: {
    isFirst () { return this.selected === 0 },
    isLast () { return this.selected === this.lessons.length - 1 }
  },
  methods: {
    goTo (direction) {
      this.$emit('selectLesson', this.lessons[this.selected + direction].id)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>