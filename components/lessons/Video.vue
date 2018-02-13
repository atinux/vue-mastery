<template lang="pug">
  .lesson-video(v-if="videoId" v-cloak)
    vimeo-player(ref="player" :video-id = "videoId" player-width="860" @ended="videoEnded" @ready="onReady")
</template>

<script>
export default {
  name: 'vimeo',
  props: ['videoId'],
  methods: {
    onReady () {
      this.$refs.player.play()
    },
    videoEnded () {
      this.$emit('videoEnded')
    }
  }
}
</script>

<style lang="stylus">
.lesson-video
  position: relative
  padding-bottom: 56.25%
  height: 0
  overflow: hidden
  max-width: 100%

  > div,
  iframe,
  object,
  embed
    position: absolute !important
    top: 0 !important
    left: 0 !important
    width: 100% !important
    height: 100% !important
</style>