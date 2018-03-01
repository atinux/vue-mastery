<template lang="pug">
  no-ssr    
    button.button(:class="buttonClass" v-cloak @click="openLogin") Unlock content

</template>

<script>
export default {
  name: 'unlockButton',
  props: ['courseLink', 'account'],
  methods: {
    openLogin () {
      this.$modal.show('login-form', {
        newAccount: true,
        headerTitle: 'This is an example of popup header',
        header: 'Please create a free account to unlock the content of the course.'
      })
    }
  }
}
</script>
