<template lang="pug">
  .lesson-challenge(v-if="challenges" v-cloak)
      h3 Coding Challenge
      div(v-html="challenges")
</template>

<script>
export default {
  name: 'challenges',
  props: ['challenges']
}
</script>

<style lang="stylus" scoped>

</style>
