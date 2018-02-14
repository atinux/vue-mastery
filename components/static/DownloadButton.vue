<template lang="pug">
  no-ssr    
    a.button(v-cloak 
             v-if="account"
             href="/pdf/Vue-Essentials-Cheat-Sheet.pdf"
             :class="buttonClass"
             download) Download it Free

    button.button(:class="buttonClass" v-else v-cloak @click="openLogin") Download it Free

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
    openLogin () {
      this.$modal.show('login-form', {
        newAccount: false,
        header: 'Please create a free account to access our cheat sheet.'
      })
    }
  }
}
</script>
