<template lang="pug">
.banner
  .media
    img(src="/images/lgo-vue-news.svg")
  .body
    h2.h1.title The Official Vue.js Podcast
    p.lead We also help produce the Official Vue.js News. It's a free community resource where we curate the most impactful Vue.js news and tutorials. Consider subscribing today.
    .actions
      nuxt-link.button.primary(to="https://news.vuejs.org/" target="_blank") Visit News.Vuejs.Org
      .button.secondary.-has-icon(@click="podcastUrl")
        i.fa.fa-volume-up
        span Listen to the podcast
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
    padding-top $vertical-space
    padding-bottom $vertical-space
    background-image url(/images/bkg-podcast.jpg)
    grid-template-areas "media media"\
                        "body body"

  .media
    display grid
    grid-area media
    align-items center
    justify-content center
    margin-bottom 1em
    img
      justify-self center
      width 70%
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
      font-size 16px
      color $secondary-color
  .actions .button
    width 100%
    & + .button
      margin-left 0

  +laptop-up()
    .banner
      padding-top ($vertical-space * 2)
      padding-bottom ($vertical-space * 2)
      grid-template-areas "body media"\
                          "body media"
    .media
      margin-bottom 0
      img
        justify-self center
        width 100%
    .body
      text-align left

      .lead
        max-width 690px
        font-size 20px

    .actions .button
      width max-content
      & + .button
        margin-left 25px
</style>
