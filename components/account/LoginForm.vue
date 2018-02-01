<template lang="pug">
form
  fieldset
    legend.h2 Login
    .form-group
      label Email
      input.input(v-bind:class="{ '-is-error': invalidEmail }" type="email" placeholder="Account Email" v-model="email" autocomplete="email")
      span.help-text.-is-error(v-if="invalidEmail" v-cloak) This email is invalid

    .form-group
      label Password
      input.input(v-bind:class="{ '-is-error': invalidPassword }" type="password" placeholder="Password" v-model="password")
      span.help-text.-is-error(v-if="invalidPassword" v-cloak) This password is invalid

    .form-group
      slot
        nuxt-link(to="/account/signup") Signup
        |
        nuxt-link(to="/account/password") Forgot your password?

    .form-group
      .flash.flash-error(v-if="formError.length > 0" v-text="formError" v-cloak)

    .form-actions
      button.button.primary(type="submit") Log In

    .control-group.-spaced
      GoogleButton.button.secondary.border.-small(label="Sign in with Google")
      GithubButton.button.secondary.border.-small(label="Sign in with Github")
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
