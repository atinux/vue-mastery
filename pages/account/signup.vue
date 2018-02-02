<template lang="pug">
  div
    AuthForm(newAccount="true")
</template>

<script>
import AuthForm from '~/components/account/AuthForm.vue'

export default {
  middleware: 'anonymous',
  components: {
    AuthForm
  }
}
</script>
