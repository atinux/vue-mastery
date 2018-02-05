<template lang="pug">
.lessons-list(v-if="lessons" v-cloak)
  h3.title Lesson in this course
  ul
    li.lessons-list-item(v-for="lesson in lessons" 
        v-bind:class="{ active: current === lesson.id , completed: lesson.isCompleted }")
      h4 {{ lesson.title }}
      label {{ lesson.duration | time}}
      input(type="radio" v-model="selected" v-bind:value="lesson.id" @click="selectLesson")
</template>

<script>
export default {
  name: 'list',
  props: ['lessons', 'current'],
  data () {
    return {
      selected: this.current
    }
  },
  watch: {
    current (newVal) {
      this.selected = newVal
    }
  },
  methods: {
    selectLesson () {
      this.$emit('selectLesson', this.selected)
    }
  }
}
</script>

<style lang="stylus" scoped>
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

</style>
