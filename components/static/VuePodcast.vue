<template lang="pug">
.banner
  .wrapper
    .media
      img(src="/images/lgo-vue-news.svg")
    .body
      h2.title The Official Vue.js News
      p.lead We also help produce the Official Vue.js News. It's a free community resource where we curate the most impactful Vue.js news and tutorials. Offered up in both text and audio versions. Consider subscribing today.
      .actions.control-group
        a.button.primary(href="https://news.vuejs.org/" target="_blank") Read Official Vue.js News
        a.button.secondary.-has-icon(href="https://news.vuejs.org/" target="_blank")
          i.fa.fa-volume-up
          span Listen to the podcast
</template>

<script>
export default {
  name: 'VuePodcast'
}
</script>

<style lang="stylus" scoped>
@import '~assets/css/_variables'
.banner
  padding-top $vertical-space
  padding-bottom $vertical-space
  background-image url(/images/bkg-podcast.jpg)

.wrapper
  grid-tempalate-columns 1fr 1fr
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
    +tablet-up()
      font-size 56px

  .lead
    max-width 690px
    font-size 16px
    color $secondary-color

.actions .button
  width 100%

+laptop-up()
  .banner
    padding-top ($vertical-space * 2)
    padding-bottom ($vertical-space * 2)
  .wrapper
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
