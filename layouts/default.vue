<template lang="pug">
  .wrapper
    Navigation(:class="$route.name")
    nuxt
    VuePodcast
    Bottom
    AuthForm
</template>

<script>
import Navigation from '~/components/header/Navigation.vue'
import VuePodcast from '~/components/static/VuePodcast.vue'
import Bottom from '~/components/footer/Footer.vue'
import AuthForm from '~/components/account/modal.vue'

export default {
  components: {
    Navigation,
    VuePodcast,
    Bottom,
    AuthForm
  }
}
</script>
