<template lang="pug">
  div
    button.button.primary.border(type="button" v-on:click="openShare") Share
    no-ssr
      modal(name="share" v-cloak height="auto")
        social-sharing(inline-template)
          .social-wrapper
            network(network="facebook")
              i.fab.fa-facebook Facebook
            network(network="googleplus")
              i.fab.fa-google-plus Google +
            network(network="linkedin")
              i.fab.fa-linkedin LinkedIn
            network(network="reddit")
              i.fab.fa-reddit Reddit
            network(network="twitter")
              i.fab.fa-twitter Twitter
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
