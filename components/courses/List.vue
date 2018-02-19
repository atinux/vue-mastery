<template lang="pug">
.media-block(v-if="course")
  .media
    img(v-bind:src="course.image[0].url")
  
  .body
    h3.title {{ course.title }}
    p.content {{ course.description }}
  
    .meta(v-if="showDetail" v-cloak)
      label
        b {{ course.lessons.length | pluralizeLesson }}
      label
        span ・
        | {{ course.difficulty }}
      label.-has-icon
        span ・
        i.far.fa-clock
        | {{ course.duration | time }}

</template>

<script>
export default {
  props: ['showDetail', 'course']
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'

.media
  img
    +tablet-up()
      width: 120px
      height: 120px

</style>
