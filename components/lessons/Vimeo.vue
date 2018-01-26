<template lang="pug">
  vimeo-player(:video-id = "videoId" player-width="860" @ended="videoEnded")
</template>

<script>
export default {
  name: 'vimeo',
  props: ['videoId'],
  methods: {
    videoEnded () {
      console.log('videoEnded')
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>