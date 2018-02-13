<template lang="pug">
  no-ssr    
    a.button(v-cloak 
             v-if="account"
             href="/pdf/Vue-Essentials-Cheat-Sheet.pdf"
             :class="buttonClass"
             download) Download it Free

    v-popover(offset="16" v-else v-cloak)  
      button.button.tooltip-target(:class="buttonClass") Download it Free

      template(slot="popover")
        p 
          | Please create a free account to access our cheat sheet.
        button.button.inverted.-small(type="button" v-on:click="openSignUp" v-close-popover) Sign Up
        |  or
        button.button.primary.-small(type="button" v-on:click="openLogin" v-close-popover) Login

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
    },
    openLogin () {
      this.$modal.show('login-form', { newAccount: false })
    }
  }
}
</script>
