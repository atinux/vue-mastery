<template lang="pug">
div
  .list(v-if="courses" v-cloak)
    nuxt-link.list-card.card(:to="`/courses/${course.slug}/${course.lessons[0].slug}`"
                              v-for="course, key in courses" :key="course.id" v-if="course.lessons")
      courseList(:course="course")
    .list-card.card.coming-soon(v-else)
      courseList(:course="course")

  fakeList(v-else)
</template>

<script>
import { mapState } from 'vuex'
import courseList from '~/components/courses/List'
import courseAction from '~/components/courses/Actions'
import fakeList from '~/components/courses/FakeList'

export default {
  computed: {
    ...mapState({ courses: result => result.courses.featured })
  },

  mounted () {
    this.$store.dispatch('featured')
  },

  components: {
    courseList,
    courseAction,
    fakeList
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

.list,
.list-unstyled
  > .list-card
    margin-bottom: 35px

.list-card
  display flex
  flex-direction column
  justify-content space-between
  cursor: pointer

  +tablet-up()
    flex-direction row

.coming-soon
  position relative
  overflow hidden
  .media-block
    opacity 0.4
  &:after
    content 'Coming soon'
    position absolute
    top 25px
    right -40px
    width 300px
    height 50px
    transform rotate(33deg)
    background linear-gradient(to top right, #41B782 , #86D169)
    line-height 50px
    text-indent 120px
    font-weight 600
    color #fff

</style>
