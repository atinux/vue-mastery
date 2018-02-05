<template lang="pug">
  .wrapper(:class="openNav ? 'open-nav': ''")
    Top(:class="$route.name")
    nuxt
    VuePodcast
    Bottom
    AuthForm
</template>

<script>
import { mapGetters } from 'vuex'
import Top from '~/components/header/Header.vue'
import VuePodcast from '~/components/static/VuePodcast.vue'
import Bottom from '~/components/footer/Footer.vue'
import AuthForm from '~/components/account/modal.vue'

export default {
  components: {
    Top,
    VuePodcast,
    Bottom,
    AuthForm
  },
  computed: {
    ...mapGetters([
      'openNav'
    ])
  }
}
</script>
