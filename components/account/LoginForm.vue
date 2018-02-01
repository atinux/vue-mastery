<template lang="pug">
form
  fieldset
    .form-group
      label.visually-hidden Email
      input.input.primary.-hollow(v-bind:class="{ 'is-danger': invalidEmail }" type="email" placeholder="Account Email" v-model="email" autocomplete="email")

      p.error(v-if="invalidEmail" v-cloak) This email is invalid

    .form-group
      label.visually-hidden Password
      input.input.primary.-hollow(v-bind:class="{ 'is-danger': invalidPassword }" type="password" placeholder="Password" v-model="password")

      p.error(v-if="invalidPassword" v-cloak) This password is invalid
    
    .form-group
      GoogleButton.button.inverted.primary.-small(label="Sign In With Google")
      GithubButton.button.inverted.primary.-small(label="Sign In With Github")
    
    .flash-error(v-if="formError.length > 0" v-text="formError" v-cloak)

    .form-actions
      button.button.primary(type="submit") Log In
    
    .form-footer
      slot
        nuxt-link(to="/account/signup") Signup
        | 
        nuxt-link(to="/account/password") Forgot your password?

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
      return !this.email.includes('@') && this.email !== ''
    },
    invalidPassword () {
      return !this.password.length > 6
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
