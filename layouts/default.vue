<template lang="pug">
  .wrapper
    Navigation(:class="$route.name")
    nuxt
    Bottom
    AuthForm
</template>

<script>
import Navigation from '~/components/header/Navigation.vue'
import Bottom from '~/components/footer/Footer.vue'
import AuthForm from '~/components/account/modal.vue'

export default {
  components: {
    Navigation,
    Bottom,
    AuthForm
  }
}
</script>
