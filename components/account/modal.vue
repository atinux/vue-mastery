<template lang="pug">
  no-ssr
    modal(name="login-form" v-cloak height="auto" @before-open="beforeOpen")
      AuthForm(:newAccount="newAccount" :headerTitle="headerTitle" :header="header")
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
      newAccount: true,
      headerTitle: false,
      header: false,
      redirect: false
    }
  },
  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },
  watch: {
    account () {
      this.$modal.hide('login-form', { newAccount: false })
      if (this.redirect) this.$router.push(this.redirect)
    }
  },
  methods: {
    beforeOpen (event) {
      this.newAccount = event.params.newAccount
      this.headerTitle = event.params.headerTitle
      this.header = event.params.header
      this.redirect = event.params.redirect || false
    }
  }
}
</script>
