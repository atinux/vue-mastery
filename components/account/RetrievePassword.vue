<template lang="pug">
form(v-on:submit.prevent="retrievePassword")
  .form-group
    label.visually-hidden Email
    input.input.primary.-hollow(v-bind:class="{ 'is-danger': invalidEmail }" type="email" placeholder="Account Email" v-model="email"  autocomplete="email")
    p.error(v-if="invalidEmail") This email is invalid

  .form-group
    .flash.flash-error(v-if="formError.length > 0" v-text="formError")

  .form-actions
    button.button.primary(type="submit") Reset

  .form-footer
    slot
      nuxt-link(to="/account/login") Or Sign In!

</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      email: '',
      formError: ''
    }
  },
  computed: {
    invalidEmail () {
      return false // !this.email.includes('@')
    }
  },
  methods: {
    retrievePassword () {
      this.formError = ''
      console.log(this.$store)
      this.$store.dispatch('userRetrievePassword', {
        email: this.email
      })
        .then(() => {
          this.$router.push('/account/Login')
        })
        .catch((error) => {
          console.log(error)
          this.formError = error.message
        })
    }
  }
}
</script>
