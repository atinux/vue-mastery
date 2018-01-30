<template lang="pug">
  vimeo-player(:video-id = "videoId" player-width="860" @ended="videoEnded")
</template>

<script>
export default {
  name: 'vimeo',
  props: ['videoId', 'meta'],
  methods: {
    videoEnded () {
      this.$store.dispatch('userUpdateCompleted', this.meta)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>