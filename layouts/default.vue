<template lang="pug">
  .wrapper
    Navigation
    nuxt
    Footer
</template>

<script>
import Navigation from '~/components/header/Navigation.vue'
import Footer from '~/components/footer/Footer.vue'

export default {
  components: {
    Navigation,
    Footer
  }
}
</script>
