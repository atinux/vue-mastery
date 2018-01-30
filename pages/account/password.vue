<template lang="pug">
  div
    h1.title Vue mastery
    h2.subtitle Retrieve your password
    RetrievePasswordForm
</template>

<script>
import RetrievePasswordForm from '~/components/account/RetrievePassword.vue'
import { mapState } from 'vuex'

export default {
  middleware: 'anonymous',
  components: {
    RetrievePasswordForm
  },
  watch: {
    // firebase is sometimes slow so we need to account for
    // the user getting authenticated late in the game...
    user (to, from) {
      this.$router.push('/account')
    }
  },
  computed: mapState([
    'user'
  ])
}
</script>
