<template lang="pug">
  no-ssr    
    button.button.primary.-small(v-cloak @click="openLogin") Unlock content

</template>

<script>
export default {
  name: 'unlockButton',
  props: ['courseLink', 'account'],
  methods: {
    openLogin () {
      this.$modal.show('login-form', {
        newAccount: true,
        headerTitle: 'Sign up and unlock the content',
        header: 'Please create a free account to unlock the content of the course.'
      })
    }
  }
}
</script>
