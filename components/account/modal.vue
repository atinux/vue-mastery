<template lang="pug">
  no-ssr
    modal(name="login-form" v-cloak height="auto" @before-open="beforeOpen")
      AuthForm(:newAccount="newAccount")
</template>

<script>
import AuthForm from './AuthForm.vue'
import { mapState } from 'vuex'

export default {
  components: {
    AuthForm
  },
  data () {
    return {
      newAccount: true
    }
  },
  computed: {
    ...mapState({
      accounts: result => result.accounts.account
    })
  },
  watch: {
    accounts () {
      this.$modal.hide('login-form', { newAccount: false })
    }
  },
  methods: {
    beforeOpen (event) {
      this.newAccount = event.params.newAccount
    }
  }
}
</script>
