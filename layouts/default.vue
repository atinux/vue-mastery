<template>
  <div class="container">
    <Navigation/>
    <nuxt/>
  </div>
</template>

<script>
import Navigation from '~/components/header/Navigation.vue'

export default {
  components: {
    Navigation
  }
}
</script>