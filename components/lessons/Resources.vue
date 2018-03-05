<template lang="pug">
  .card(v-if="resources && resources.length" v-cloak)
    h3 Lesson resource{{ resources.length > 1 ? 's' : '' }}
    ul.styled-list
      li(v-for="resource in resources" v-html="$md.render(resource[Object.keys(resource)[0]])")

</template>

<script>
export default {
  name: 'resources',
  props: ['resources']
}
</script>

<style lang="stylus" scoped>
.card
  padding 40px
</style>
