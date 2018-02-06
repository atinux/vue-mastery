<template lang="pug">
.lessons-list(v-if="lessons" v-cloak)
  h4.title Lesson in this course
  .lessons-list-scroll
    .list-item(v-for="(lesson, index) in lessons" 
               v-bind:class="{ active: current === lesson.id , completed: lesson.isCompleted }"
               @click="selectLesson(lesson.id)")
      .list-item-content
        h4.list-item-title {{ index + 1 }}. {{ lesson.title }}
        .list-item-meta
          i.far.fa-clock
          span {{ lesson.duration | time}}
      .list-item-actions
        label.checkmark
          input(type="checkbox" v-model="lesson.isCompleted")
          span.check
</template>

<script>
export default {
  name: 'list',
  props: ['lessons', 'current'],
  methods: {
    selectLesson (lessonId) {
      this.$emit('selectLesson', lessonId)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables.styl'
.lessons-list
  grid-area list
  background-color: #1E3247
  color: #fff
  position relative
  min-height 260px
  overflow-y hidden

.lessons-list-scroll
  position absolute
  display block
  top 60px
  bottom 0
  width 100%
  min-height 200px
  overflow-y scroll

.list-item
  display flex
  align-items center
  cursor: pointer
  justify-content space-between
  padding 14px 24px
  background-color #1E3247

  .list-item-meta
    display flex
    align-items center
    color #A1B8BA
    i
      margin-right 8px

  &.active
    background: linear-gradient(to right, #41B782 , #86D169)
    .list-item-title
      font-weight 600
    .list-item-meta
      color #C1FFC3
    .checkmark .check
      border-color $primary-color
      background-color #FFF

  &.completed
    background-color #EBEBEB

  &:hover
    background: linear-gradient(to right, #41B782 , #86D169)


.list-item-title
  font-size 18px
  font-weight 400

.list-item-actions
  margin-left 20px

.title
  display flex
  align-items center
  margin-bottom 0
  padding 0 24px
  font-size 18px
  font-weight 600
  height 60px
  background-color #444444

.title,
.list-item
  border-bottom: 1px solid #767D84

+tablet-up()
  .title
    height 76px
    font-size 24px
  .lessons-list-scroll
    top 76px
    height: 100%

+laptop-up()
  .list-item-title
    font-size 24px

</style>
