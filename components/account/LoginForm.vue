<template lang="pug">
form
  .form-group
    label Email
    .control
      input.form-control(v-bind:class="{ 'is-danger': invalidEmail }" type="email" placeholder="Account Email" v-model="email" autocomplete="email")

    p.error(v-if="invalidEmail" v-cloak) This email is invalid

  .form-group
    label Password
    .control
      input.form-control(v-bind:class="{ 'is-danger': invalidPassword }" type="password" placeholder="Password" v-model="password")

    p.error(v-if="invalidPassword" v-cloak) This password is invalid

  .form-group
    slot
      nuxt-link(to="/account/signup") Signup
      | 
      nuxt-link(to="/account/password") Forgot your password?
  
  .form-group
    .flash.flash-error(v-if="formError.length > 0" v-text="formError" v-cloak)

  .form-actions
    button.button.primary(type="submit") Log In

  .form-actions
    GoogleButton.button.secondary(label="Sign In With Google")

  .form-actions
    GithubButton.button.secondary(label="Sign In With Github")

</template>

<script>
import GoogleButton from '~/components/account/3rd-party/GoogleButton.vue'
import GithubButton from '~/components/account/3rd-party/GithubButton.vue'

export default {
  name: 'LoginForm',
  components: {
    GoogleButton,
    GithubButton
  },
  data () {
    return {
      email: '',
      password: '',
      formError: ''
    }
  },
  computed: {
    invalidEmail () {
      return !this.email.includes('@')
    },
    invalidPassword () {
      return !this.password.length > 6
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
