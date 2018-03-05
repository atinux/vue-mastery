<template lang="pug">
div
  .list(v-if="courses" v-cloak)
    nuxt-link.list-card.card(:to="`/courses/${course.slug}/${course.lessons[0].slug}`"
                              v-for="course, key in courses" :key="course.id" v-if="course.lessons")
      courseList(:course="course")
    .list-card.card.coming-soon(v-else)
      courseList(:course="course")
      span soon

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

  mounted: function () {
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

</style>
