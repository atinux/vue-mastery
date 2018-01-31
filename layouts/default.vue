<template lang="pug">
  .wrapper
    Navigation(:class="$route.name")
    nuxt
    Bottom
</template>

<script>
import Navigation from '~/components/header/Navigation.vue'
import Bottom from '~/components/footer/Footer.vue'

export default {
  components: {
    Navigation,
    Bottom
  }
}
</script>
