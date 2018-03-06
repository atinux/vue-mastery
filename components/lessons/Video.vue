<template lang="pug">
  .lesson-video.video-wrapper(v-if="videoId" v-cloak)
    vimeo-player(ref="player" :video-id = "videoId" player-width="860" @progress="videoProgress" @ready="onReady")
</template>

<script>
export default {
  name: 'vimeo',
  props: ['videoId'],
  data () {
    return {
      completed: false
    }
  },
  methods: {
    onReady () {
      this.$refs.player.play()
    },
    videoProgress (data) {
      if (data.percent > 0.85 && !this.completed) {
        this.$emit('lessonCompleted')
        this.completed = true
      }
      if (data.percent === 1) {
        this.$emit('videoEnded')
      }
    }
  }
}
</script>
