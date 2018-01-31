<template lang="pug">
  div
    h1.title Vue mastery
    h2.subtitle Login to manage your account
    LoginForm

</template>

<script>
import LoginForm from '~/components/account/LoginForm.vue'
import { mapState } from 'vuex'

export default {
  middleware: 'anonymous',
  components: {
    LoginForm
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
