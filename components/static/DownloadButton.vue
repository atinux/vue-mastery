<template lang="pug">
  no-ssr
    a.button(v-cloak 
             v-if="account"
             href="/pdf/Vue-Essentials-Cheat-Sheet.pdf"
             :class="buttonClass"
             download) Download it Free
    button.button(v-cloak
                  v-else
                  @click="openSignUp"
                  :class="buttonClass"
                  download) Download it Free

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'downloadButton',
  props: ['buttonClass'],
  computed: {
    ...mapState({
      account: result => result.account.account
    })
  },
  methods: {
    openSignUp () {
      this.$modal.show('login-form', { newAccount: true })
    }
  }
}
</script>
