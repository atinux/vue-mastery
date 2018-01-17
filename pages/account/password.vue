<template>
  <div>
    <div class="columns">
      <div class="one-half column centered">
        <div class="hero">
          <div class="hero-body">
            <h1 class="title">Vue mastery</h1>
            <h2 class="subtitle">Retrieve your password</h2>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="one-half column centered">
        <div class="four-fifths">
          <RetrievePasswordForm />
        </div>
      </div>
    </div>
  </div>
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
