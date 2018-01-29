<template lang="pug">
.banner
  .body
    h2.h1.title The Official Vue.js Podcast
    p.lead We also help produce the Official Vue.js News. It's a free community resource where we curate the most impactful Vue.js news and tutorials. Consider subscribing today.

    .actions
      nuxt-link.button.primary(to="/") Visit News.Vuejs.Org
      nuxt-link.button.secondary(to="/") Listen to the podcast

  .media
    img(src="/images/lgo-vue-news.svg")
</template>

<script>
export default { 'name': 'VuePodcast' }
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables'

  .banner
    grid-template-columns: 49% 49%
    grid-template-rows: ($vertical-space * 2) auto ($vertical-space * 2)
    background-image url(/images/bkg-podcast.jpg)

  .media
    display: grid
    grid-row-start: 2
    align-items: center
    justify-content: center

  .body
    display: grid
    grid-row-start: 2
    align-items: center
    justify-content: center

    .title
      color: $secondary-color
      margin: 0

    .lead
      max-width: 690px
      font-size: 20px
      color: $secondary-color

    .actions .button:first-of-type
      margin-right: 1em
</style>
