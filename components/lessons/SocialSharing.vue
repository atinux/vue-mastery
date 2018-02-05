<template lang="pug">
  div.lesson-share
    button.button.inverted.primary.-small(type="button" v-on:click="openShare") Share
    no-ssr
      modal(name="share" v-cloak height="auto")
        social-sharing(inline-template)
          .social-wrapper
            network(network="facebook")
              i.fa.fa-fw.fa-facebook Facebook
            network(network="googleplus")
              i.fa.fa-fw.fa-google-plus Google +
            network(network="linkedin")
              i.fa.fa-fw.fa-linkedin LinkedIn
            network(network="reddit")
              i.fa.fa-fw.fa-reddit Reddit
            network(network="twitter")
              i.fa.fa-fw.fa-twitter Twitter
</template>

<script>
export default {
  name: 'header',
  methods: {
    openShare () {
      this.$modal.show('share')
    }
  }
}
</script>
<style lang="stylus" scoped>
.social-wrapper
  display: flex
  justify-content: space-evenly
  padding: 40px

</style>