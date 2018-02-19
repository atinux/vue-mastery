<template lang="pug">
.lessons-list(v-if="course.lessons" v-cloak)
  h3.title Lessons
  .lessons-list-scroll
    .list-item(v-for="(lesson, index) in course.lessons"
               v-bind:class="activeOrCompleted(lesson.slug)"
               @click="selectLesson(lesson.slug)")
      .list-item-content
        h4.list-item-title {{ index + 1 }}. {{ lesson.title }}
        .list-item-meta
          i.far.fa-clock
          span {{ lesson.duration | time}}
      .list-item-actions(@click.stop)
        label.checkmark
          input(type="checkbox" :checked="isCompleted(lesson.slug)" @change="toggleCompleted(lesson.slug)")
          span.check
    .list-subscribe(v-cloak v-if="account")
      courseSubscribe
</template>

<script>
import { mapState } from 'vuex'
import courseSubscribe from '~/components/account/CourseSubscribe'
export default {
  name: 'list',
  props: ['course', 'current'],
  data () {
    return {
      completedUnlogged: []
    }
  },
  components: {
    courseSubscribe
  },
  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },
  methods: {
    selectLesson (lessonSlug) {
      this.$emit('selectLesson', lessonSlug)
    },
    toggleCompleted (lessonSlug) {
      if (this.account) {
        this.$store.dispatch('userUpdateCompleted', {
          lessonSlug: lessonSlug,
          courseSlug: this.course.slug,
          isCompleted: !this.isCompleted(lessonSlug)
        })
      } else {
        this.completedUnlogged.push(lessonSlug)
        this.$modal.show('login-form', { newAccount: false })
        return true
      }
    },
    isCompleted (lessonSlug) {
      if (this.account) {
        let completed = false
        if (typeof (this.account['courses']) !== 'undefined') {
          const completedCourse = this.account.courses[this.course.slug]
          if (completedCourse && typeof (completedCourse['completedLessons']) !== 'undefined') {
            completed = this.account.courses[this.course.slug].completedLessons[lessonSlug]
          }
        }
        return completed
      } else {
        let checkCompleted = this.completedUnlogged.filter((key) => key === lessonSlug)
        return checkCompleted.length
      }
    },
    activeOrCompleted (lessonSlug) {
      return {
        active: this.current === lessonSlug,
        completed: this.isCompleted(lessonSlug)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables.styl'
.lessons-list
  grid-area list
  position relative
  min-height 260px
  overflow-y hidden
  background-color: #FFF
  border-bottom: solid 1px #CACACA
  border-left: solid 1px #CACACA

.lessons-list-scroll
  position absolute
  display block
  top 60px
  bottom 0
  width 100%
  min-height 200px
  overflow-y scroll

.list-subscribe
  display flex
  align-items center
  cursor: pointer
  justify-content space-between
  padding 14px 24px
  background-color #fff

.list-item
  display flex
  align-items center
  cursor: pointer
  justify-content space-between
  padding 14px 24px
  background-color #fff

  .list-item-meta
    display flex
    align-items center
    color #A1B8BA
    i
      margin-right 8px

  &.active,
  &:hover
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
    &:not([class*="active"]) .list-item-title
      opacity 0.4

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
  height 60px
  color: $secondary-color

.title,
.list-item:not([class*="active"]),
.list-subscribe
  border-bottom: 1px solid #CACACA

+tablet-up()
  .title
    height 76px
  .lessons-list-scroll
    top 76px
    height: 100%

+laptop-up()
  .list-item-title
    font-size 24px

</style>
