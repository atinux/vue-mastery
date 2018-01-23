<template lang="pug">
  div(v-if="courses.course" v-cloak)
    h1 {{ courses.course[0].title }}

    ul(v-if="courses.lessons" v-cloak)
      li(v-for="lesson in courses.lessons") {{ lesson.title }}

    
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      id: null
    }
  },

  computed: {
    ...mapState([
      'courses'
    ])
  },

  mounted: function () {
    console.log(this.$route.params.id)
    this.$store.dispatch('getCourse', this.$route.params.id)
    this.$store.dispatch('getLessons', this.$route.params.id)
  }
}
</script>

<style scoped>

</style>