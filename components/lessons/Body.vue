<template lang="pug">
  .lesson-content
    h2 {{ course.title}}
    div(v-html="course.body")
</template>

<script>
export default {
  name: 'body',
  props: ['course']
}
</script>

<style lang="stylus" scoped>

</style>
