<template lang="pug">
.banner
  .media
    img(src="/images/lgo-vue-news.svg")
  .body
    h2.h1.title The Official Vue.js Podcast
    p.lead We also help produce the Official Vue.js News. It's a free community resource where we curate the most impactful Vue.js news and tutorials. Consider subscribing today.
    .actions
      nuxt-link.button.primary(to="https://news.vuejs.org/" target="_blank") Visit News.Vuejs.Org
      .button.secondary(@click="podcastUrl") Listen to the podcast
</template>

<script>
export default {
  name: 'VuePodcast',
  methods: {
    podcastUrl () {
      let userAgent = navigator.userAgent || navigator.vendor || window.opera
      let url = 'https://vuenews.fireside.fm/rss'
      if (/android/i.test(userAgent)) {
        url = 'https://subscribeonandroid.com/vuenews.fireside.fm/rss'
      }
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        url = 'https://itunes.apple.com/us/podcast/the-official-vue-news/id1329151772'
      }
      window.open(url, '_blank')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~assets/css/_variables'
  .banner
    grid-tempalate-columns 1fr 1fr
    padding-top ($vertical-space * 2)
    padding-bottom ($vertical-space * 2)
    background-image url(/images/bkg-podcast.jpg)
    grid-template-areas "body body"\
                        "media media"
  .media
    display grid
    grid-area media
    align-items center
    justify-content center
  .body
    display grid
    grid-area body
    align-items center
    justify-content center
    text-align center
    .title
      color $secondary-color
      margin 0
    .lead
      max-width 690px
      font-size 20px
      color $secondary-color
    .actions .button:first-of-type
      margin-right 1em
  +laptop-up()
    .banner
      grid-template-areas "body media"\
                          "body media"
    .body
      text-align left
</style>
